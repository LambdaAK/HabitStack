const {Server} = require('socket.io')
const express = require('express');
const firebaseConfig = require('./firebaseConfig');
const bodyParser = require('body-parser');
const cors = require('cors');


const { Auth, getAuth, signInWithEmailAndPassword } = require("firebase/auth")
const { Database, getDatabase, ref, onValue, get, set, update } = require("firebase/database")

const admin = require("firebase-admin");
const credentials = require("./credentials.json")

const appendToArrayLikeObject = require("./utilities/appendToArrayLikeObject")

const { verifyIdToken, userInServer, serverExists } = require("./utilities/verification")

const {v4} = require('uuid')
const generateUUID = v4

admin.initializeApp({
    credential: admin.credential.cert(credentials),
    databaseURL: "https://habit-tracker-5ecf3-default-rtdb.firebaseio.com/"
})

// firebase client
const firebase = require('firebase/app');
const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = admin.database()


// express stuff
const expressApp = express()
expressApp.use(cors())
const expressPort = 3000

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
async function handleMessageSend(req, res) {
    const uuid = await verifyIdToken(admin, req, res)
    if (uuid == "") {
        res.status(401).send(JSON.stringify({"error": "Invalid id token"}))
        return
    }

    const message = req.body.message
    if (message == undefined) {
        res.status(400).send(JSON.stringify({"error": "No message provided"}))
        return
    }

    if (message == "") {
        res.status(400).send(JSON.stringify({"error": "Empty message"}))
        return
    }

    // get the server
    const serverId = req.body.server
    if (serverId == undefined) {
        res.status(400).send(JSON.stringify({"error": "No server provided"}))
        return
    }

    // check that the server exists
    if (!await serverExists(database, serverId, res)) {
        return
    }

    // need to check if the user is in the server
    // get the user's servers
    if (!await userInServer(database, uuid, serverId, res)) {
        return
    }
    

    // send the message to the database

    const messageRef = ref(database, `servers/${serverId}/messages`)
    const messageSnapshot = await get(messageRef)
    const messages = messageSnapshot.val()
    if (messages == undefined) {
        // no messages yet
        const newMessageRef = ref(database, `servers/${serverId}/messages/0`)
        // set the message
        await set(newMessageRef, {
            "author": uuid,
            "content": message
        })
        res.status(200).send(JSON.stringify({"message": "Message sent"}))
        return

    }

    // append the message to the server
    const newMessages = appendToArrayLikeObject(messages, {
        "content": message,
        "author": uuid,
    })

    // send the new object back to the database

    await set(messageRef, newMessages)

    res.status(200).send(JSON.stringify({"message": "Message sent"}))
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
async function handleServerCreate(req, res) {
    // verify the id token
    const uuid = await verifyIdToken(admin, req, res)
    if (uuid == "") {
        res.status(401).send(JSON.stringify({"error": "Invalid id token"}))
        return
    }

    // get the server name
    const serverName = req.body.name
    if (serverName == undefined) {
        res.status(400).send(JSON.stringify({"error": "No server name provided"}))
        return
    }

    // make a server id
    const serverId = generateUUID()
    // create the server
    
    const newServerRef = ref(database, `servers/${serverId}`)
    await set(newServerRef, {
        "name": serverName,
        "owner": uuid,
    })

    // then, add the server to the user's servers
    const userServersRef = ref(database, `users/${uuid}/servers`)
    const userServersSnapshot = await get(userServersRef)
    const userServers = userServersSnapshot.val()
    if (userServers == undefined) {
        // the user is not in any servers yet
        await set(userServersRef, {
            [serverId]: true
        })
        return
    }

    Object.assign(userServers, {[serverId]: true})

    await set(userServersRef, userServers)

    res.status(200).send(JSON.stringify({"message": "Server created", "serverId": serverId}))
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
async function handleUserNameChange(req, res) {
    // verify the id token
    const uuid = await verifyIdToken(admin, req, res)
    if (uuid == "") {
        res.status(401).send(JSON.stringify({"error": "Invalid id token"}))
        return
    }
    // get the new name
    const newName = req.body.username
    if (newName == undefined) {
        res.status(400).send(JSON.stringify({"error": "No new name provided"}))
        return
    }
    // make sure the new nane is not empty
    if (newName == "") {
        res.status(400).send(JSON.stringify({"error": "Empty name"}))
        return
    }
    // set the new name
    const userRef = ref(database, `users/${uuid}`)
    await update(userRef, {
        "username": newName
    })

    res.status(200).send(JSON.stringify({"message": "Name changed"}))
}

async function handleServerInviteCreate(req, res) {
    // verify the id token
    const uuid = await verifyIdToken(admin, req, res)
    if (uuid == "") {
        res.status(401).send(JSON.stringify({"error": "Invalid id token"}))
        return
    }

    // get the server id
    const server = req.body.server
    if (server == undefined) {
        res.status(400).send(JSON.stringify({"error": "No server provided"}))
        return
    }

    // make sure the server exists
    if (!await serverExists(database, server, res)) {
        return
    }

    // make sure the user is the owner of the server
    const serverRef = ref(database, `servers/${server}`)
    const serverSnapshot = await get(serverRef)
    const serverData = serverSnapshot.val()
    if (serverData == undefined) {
        res.status(400).send(JSON.stringify({"error": "Server does not exist"}))
        return
    }
    if (serverData.owner != uuid) {
        res.status(400).send(JSON.stringify({"error": "User is not the owner of the server"}))
        return
    }

    // make a new invite

    const inviteId = generateUUID()
    const invitesRef = ref(database, `servers/${server}/invites`)
    const invitesSnapshot = await get(invitesRef)
    const invites = invitesSnapshot.val()
    
    // append the invite to the current invites
    const newInvites = appendToArrayLikeObject(invites, inviteId)
    await set(invitesRef, newInvites)
    res.send(JSON.stringify({"message": "Invite created", "inviteId": inviteId}))

}

async function handleServerInviteDelete(req, res) {
    // verify the id token
    const uuid = await verifyIdToken(admin, req, res)
    if (uuid == "") {
        res.status(401).send(JSON.stringify({"error": "Invalid id token"}))
        return
    }

    // get the server id
    const server = req.body.server
    if (server == undefined) {
        res.status(400).send(JSON.stringify({"error": "No server provided"}))
        return
    }

    // make sure the server exists
    if (!await serverExists(database, server, res)) {
        return
    }

    // make sure the user is the owner of the server
    const serverRef = ref(database, `servers/${server}`)
    const serverSnapshot = await get(serverRef)
    const serverData = serverSnapshot.val()
    if (serverData == undefined || serverData == null) {
        res.status(400).send(JSON.stringify({"error": "Server does not exist"}))
        return
    }
    if (serverData.owner != uuid) {
        res.status(400).send(JSON.stringify({"error": "User is not the owner of the server"}))
        return
    }

    // get the invite id
    const inviteId = req.body.invite
    if (inviteId == undefined) {
        res.status(400).send(JSON.stringify({"error": "No invite provided"}))
        return
    }

    // get the server's list of invites
    const invitesRef = ref(database, `servers/${server}/invites`)
    const invitesSnapshot = await get(invitesRef)
    const invites = invitesSnapshot.val()

    // make sure the invite exists
    if (invites == undefined || invites == null || !invites.includes(inviteId)) {
        res.status(400).send(JSON.stringify({"error": "Invite does not exist"}))
        return
    }

    // remove the invite
    const newInvites = invites.filter(invite => invite != inviteId)
    // send the updated list of invites
    await set(invitesRef, newInvites)

    res.send(JSON.stringify({message: "Invite deleted"}))

}

async function handleJoinServer(req, res) {
    // verify the id token
    const uuid = await verifyIdToken(admin, req, res)
    if (uuid == "") {
        res.status(401).send(JSON.stringify({"error": "Invalid id token"}))
        return
    }

    // get the invite

    const invite = req.body.invite
    if (invite == undefined) {
        res.status(400).send(JSON.stringify({"error": "No invite provided"}))
        return
    }

    // get the corresponding server id
    // first, get the servers object
    const serversRef = ref(database, `servers`)
    const serversSnapshot = await get(serversRef)
    const servers = serversSnapshot.val()
    if (servers == undefined || servers == null) {
        res.status(400).send(JSON.stringify({"error": "Server does not exist"}))
        return
    }

    // iterate through the servers

    let serverIdToJoin = ""

    for (let i = 0; i < Object.keys(servers).length; i++) {
        const serverId = Object.keys(servers)[i]
        const server = servers[serverId]
        const invites = server.invites
        if (invites == undefined || invites == null) {
            continue
        }
        if (invites.includes(invite)) {
            // this is the server
            serverIdToJoin = serverId
            break;
        }
    }

    if (serverIdToJoin == "") {
        res.status(400).send(JSON.stringify({"error": "Invite does not exist"}))
        return
    }

    // add the server to the user's servers
    const userServersRef = ref(database, `users/${uuid}/servers`)
    const userServersSnapshot = await get(userServersRef)
    const userServers = userServersSnapshot.val()
    if (userServers == undefined || userServers == null) {
        // first server
        await set(userServersRef, {
            [serverIdToJoin]: true
        })

    }
    else {
        // append the server
        Object.assign(userServers, {[serverIdToJoin]: true})
        await set(userServersRef, userServers)
    }
    
    res.send(JSON.stringify({"message": "Server joined"}))
}

async function handleServerNameChange(req, res) {
    console.log("handling server name change")
    // verify the id token
    const uuid = await verifyIdToken(admin, req, res)
    if (uuid == "") {
        res.status(401).send(JSON.stringify({"error": "Invalid id token"}))
        return
    }

    // get the server id
    const server = req.body.server
    if (server == undefined) {
        res.status(400).send(JSON.stringify({"error": "No server provided"}))
        return
    }

    // get the new name
    const newName = req.body.name
    if (newName == undefined) {
        res.status(400).send(JSON.stringify({"error": "No new name provided"}))
        return
    }

    if (newName == "") {
        res.status(400).send(JSON.stringify({"error": "Empty name"}))
        return
    }

    // make sure the server exists
    if (!await serverExists(database, server, res)) {
        res.status(400).send(JSON.stringify({"error": "Server does not exist"}))
        return
    }

    // make sure the user is in the server

    const userServersRef = ref(database, `users/${uuid}/servers`)
    const userServersSnapshot = await get(userServersRef)
    const userServers = Object.keys(userServersSnapshot.val())

    if (!userServers.includes(server)) {
        res.status(400).send(JSON.stringify({"error": "User is not the owner of the server"}))
        return
    }

    // make sure the user is the owner of the server

    const serverRef = ref(database, `servers/${server}`)
    const serverSnapshot = await get(serverRef)
    const serverData = serverSnapshot.val()
    if (serverData == undefined || serverData == null) {
        res.status(400).send(JSON.stringify({"error": "Server does not exist"}))
        return
    }
    
    if (serverData.owner != uuid) {
        res.status(400).send(JSON.stringify({"error": "User is not the owner of the server"}))
        return
    }

    // change the name

    await update(serverRef, {
        "name": newName
    })

    res.send(JSON.stringify({"message": "Server name changed"}))
    console.log("changing server name")
}

async function handleUserCreate(req, res) {
    const uuid = await verifyIdToken(admin, req, res)
    if (uuid == "") {
        res.status(401).send(JSON.stringify({"error": "Invalid id token"}))
        return
    }

    const username = req.body.username
    if (username == undefined) {
        res.status(400).send(JSON.stringify({"error": "No username provided"}))
        return
    }

    if (username == "") {
        res.status(400).send(JSON.stringify({"error": "Empty username"}))
        return
    }

    // make sure the user hasn't been created yet
    const userRef = ref(database, `users/${uuid}`)
    const userSnapshot = await get(userRef)
    const userData = userSnapshot.val()
    if (userData != undefined) {
        res.status(400).send(JSON.stringify({"error": "User already exists"}))
        return
    }

    // create the user
    await set(userRef, {
        "username": username,
    })

    res.send(JSON.stringify({"message": "User created"}))
}

async function handleServerLeave(req, res) {
    // verify the id token
    const uuid = await verifyIdToken(admin, req, res)
    if (uuid == "") {
        res.status(401).send(JSON.stringify({"error": "Invalid id token"}))
        return
    }

    // get the server id
    const server = req.body.server
    if (server == undefined) {
        res.status(400).send(JSON.stringify({"error": "No server provided"}))
        return
    }

    const userServersRef = ref(database, `users/${uuid}/servers`)
    const userServersSnapshot = await get(userServersRef)
    const userServers = Object.keys(userServersSnapshot.val())

    // make sure the user is in the server
    if (!userServers.includes(server)) {
        res.status(400).send(JSON.stringify({"error": "User is not in the server"}))
        return
    }

    const refOfUserServerToLeave = ref(database, `users/${uuid}/servers/${server}`)
    await set(refOfUserServerToLeave, null)
    res.send(JSON.stringify({"message": "Server left"}))
}

async function handleHabitCreatorCreate(req, res) {
    // verify the id token
    const uuid = await verifyIdToken(admin, req, res)
    if (uuid == "") {
        res.status(401).send(JSON.stringify({"error": "Invalid id token"}))
        return
    }

    // get the name of the habit
    const name = req.body.name

    if (name == "") {
        res.status(400).send(JSON.stringify({"error": "No name provided"}))
        return
    }

    // make sure that there isn't already a habit with the same name

    const userHabitsRef = ref(database, `users/${uuid}/habits`)
    const userHabitsSnapshot = await get(userHabitsRef)
    const userHabits = userHabitsSnapshot.val()

    // make sure that the key is null

    let duplicate = false;

    if (userHabits != null && userHabits[name] != null) {
        // if there are other habits, and there is a habit with the same name
        duplicate = true;
    }

    // get the other properties of the habit from the request

    const iWill = req.body.iWill
    const atTime = req.body.atTime
    const atLocation = req.body.atLocation
    const obvious = req.body.obvious
    const attractive = req.body.attractive
    const easy = req.body.easy
    const satisfying = req.body.satisfying

    // make sure that all of the properties are defined and not empty strings

    if (iWill == undefined || iWill == "") {
        res.status(400).send(JSON.stringify({"error": "No iWill provided"}))
        return
    }

    if (atTime == undefined || atTime == "") {
        res.status(400).send(JSON.stringify({"error": "No atTime provided"}))
        return
    }

    if (atLocation == undefined || atLocation == "") {
        res.status(400).send(JSON.stringify({"error": "No atLocation provided"}))
        return
    }

    if (obvious == undefined || obvious == "") {
        res.status(400).send(JSON.stringify({"error": "No obvious provided"}))
        return
    }

    if (attractive == undefined || attractive == "") {
        res.status(400).send(JSON.stringify({"error": "No attractive provided"}))
        return
    }

    if (easy == undefined || easy == "") {
        res.status(400).send(JSON.stringify({"error": "No easy provided"}))
        return
    }

    if (satisfying == undefined || satisfying == "") {
        res.status(400).send(JSON.stringify({"error": "No satisfying provided"}))
        return
    }

    // create the habit

    const habitRef = ref(database, `users/${uuid}/habits/${name}`)
    await set(habitRef, {
        "iWill": iWill,
        "atTime": atTime,
        "atLocation": atLocation,
        "obvious": obvious,
        "attractive": attractive,
        "easy": easy,
        "satisfying": satisfying,
    })

    if (!duplicate) {
      res.send(JSON.stringify({"message": "Habit created"}))  
    }
    else {
        res.send(JSON.stringify({"message": "Habit edited"}))
    }
}

async function handleHabitDelete(req, res) {
    // verify the id token
    const uuid = await verifyIdToken(admin, req, res)
    if (uuid == "") {
        res.status(401).send(JSON.stringify({ "error": "Invalid id token" }))
        return
    }

    // get the name of the habit
    const name = req.body.name

    // make sure it's not null or empty
    if (name == undefined || name == null || name == "") {
        res.status(400).send(JSON.stringify({ "error": "No name provided" }))
        return
    }

    // delete it
    const habitRef = ref(database, `users/${uuid}/habits/${name}`)
    await set(habitRef, null)
    res.send(JSON.stringify({"message": "Habit deleted"}))



}


expressApp.post("/message/send", bodyParser.json(), (req, res) => {
    console.log("sending message")
    handleMessageSend(req, res)
})

expressApp.post("/server/create", bodyParser.json(), (req, res) => {
    handleServerCreate(req, res)
})

expressApp.post("/user/username/change", bodyParser.json(), (req, res) => {
    handleUserNameChange(req, res)
})

expressApp.post("/user/create", bodyParser.json(), (req, res) => {
    handleUserCreate(req, res)
})

expressApp.post("/server/invite/create", bodyParser.json(), (req, res) => {
    handleServerInviteCreate(req, res)
})

expressApp.post("/server/invite/delete", bodyParser.json(), (req, res) => {
    handleServerInviteDelete(req, res)
})

expressApp.post("/server/join", bodyParser.json(), (req, res) => {
    handleJoinServer(req, res)
})

expressApp.post("/server/name/change", bodyParser.json(), (req, res) => {
    handleServerNameChange(req, res)
})

expressApp.post("/server/leave", bodyParser.json(), (req, res) => {
    handleServerLeave(req, res)
})

expressApp.post("/habit/create", bodyParser.json(), (req, res) => {
    handleHabitCreatorCreate(req, res)
})

expressApp.post("/habit/delete", bodyParser.json(), (req, res) => {
    handleHabitDelete(req, res)
})

expressApp.listen(expressPort, () => {
    console.log(`Running express server on port ${expressPort}`)
})
