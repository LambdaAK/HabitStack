const { Auth, getAuth, signInWithEmailAndPassword } = require("firebase/auth")
const { Database, getDatabase, ref, onValue, get, set } = require("firebase/database")

/**
 * If req's header has an id-token, then it will verify the id token and return the user's uuid.
 * If the id token is invalid, then it will return an empty string.
 * @param {Request} req 
 * @param {Response} res 
 */
async function verifyIdToken(admin, req, res) {
    // get the id from the request header
    const idToken = req.headers['id-token']
    if (idToken == undefined) {
        return ""
    }
   try {
        const decodedToken = await admin.auth().verifyIdToken(idToken)
        const uuid = decodedToken.uid;
        return uuid
   }
   catch {
        return ""
   }

}

/**
 * 
 * @param {string} uuid 
 * @param {string} serverId 
 * @param {Response} res 
 * @returns boolean
 */
async function userInServer (database, uuid, serverId, res) {
    const userServersRef = ref(database, `users/${uuid}/servers`)
    const userServersSnapshot = await get(userServersRef)
    const userServers = Object.keys(userServersSnapshot.val())
    if (userServers == undefined) {
        res.send(JSON.stringify({"error": "User not in server"}))
        return false
    }
    if (!userServers.includes(serverId)) {
        res.send(JSON.stringify({"error": "User not in server"}))
        return false
    }
    return true
}

/**
 * 
 * @param {string} serverId 
 * @param {Response} res 
 * @returns boolean
 */
async function serverExists (database, serverId, res) {
    const serversRef = ref(database, "servers")
    const serversSnapshot = await get(serversRef)
    const servers = serversSnapshot.val()
    if (servers == undefined 
        || servers == null 
        || !Object.keys(servers).includes(serverId))
    {
        res.send(JSON.stringify({"error": "Server does not exist"}))
        return false
    }
    return true
}

module.exports = {
    verifyIdToken,
    userInServer,
    serverExists
}