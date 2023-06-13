import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, Unsubscribe, getAuth, onAuthStateChanged } from "firebase/auth";
import { DataSnapshot, Database, get, getDatabase, onValue, ref, set, update } from "firebase/database";
import firebaseConfig from "../../firebaseConfig";
import "./social.css"
import { useEffect, useState } from "react";
import $ from "jquery"

/*

[{"content" : "aaaa", "author" : "EvkeutUYeqVW6pwhDH0k0f144eI2"}]

*/

const app: FirebaseApp = initializeApp(firebaseConfig);
const database: Database = getDatabase(app)
const auth: Auth = getAuth()


/**
 * 
 * @param object the array-like object to append to
 * @param value the value to append to the array-like object
 */
function appendToArrayLikeObject(object: object, value: any): object {

    if (object == null) {
        object = {}
    }

    // find the smallest natural number that is not a key in object
    let smallestNaturalNumberNotKey = 0
    for (let i = 0; i < Object.keys(object).length; i++) {
        if (Object.keys(object).includes(i.toString())) {
            smallestNaturalNumberNotKey++
        }
    }

    // set the property
    Object.assign(object, {[smallestNaturalNumberNotKey] : value})
    
    return object;
}



function ServerButton(props: {serverId: string}) {

    const [serverName, setServerName] = useState <string> ("")

    // double check the unsubscriber here
    useEffect(() => {
        // get the server name
        const serverNameRef = ref(database, "servers/" + props.serverId + "/name")
        onValue(serverNameRef, (snapshot: DataSnapshot) => {
            const serverName = snapshot.val()
            setServerName(serverName)
        })
    }, [])


    return (
        <>
            <div className = "server-button" key = {props.serverId}>
                {serverName}
            </div>
        </>
    )
}

function MessagesSection (props: {serverId: string}) {
    alert("passed into MessagesSection is " + props.serverId)
    const [messages, setMessages] = useState <{content: string, author: string}[]> ([])

    useEffect(() => {
        // get the messages
        const messagesRef = ref(database, "servers/" + props.serverId + "/messages")
        get(messagesRef).then((snapshot: DataSnapshot) => {
            const _messages = snapshot.val()
            setMessages(_messages)
        })
    }, [])

    if (messages == null) {
        return (
            <div className = "server-messages">
                messages is null
            </div>
        )
    }
    

    return (
        <div className = "server-messages">
            {
                messages.map((message: {content: string, author: string}) =>
                    <Message content = {message.content} author = {message.author}/>
                )
            }
        </div>
    )

}


function Message(props: {content: string, author: string}) {
    
    const [authorName, setAuthorName] = useState <string> ("")

    useEffect(() => {
        // get the author name
        const authorNameRef = ref(database, "users/" + props.author + "/username")
        
        onValue(authorNameRef, (snapshot: DataSnapshot) => {
            const authorName = snapshot.val()
            setAuthorName(authorName)
        })
    }
    , [])

    return (
        <div className = "message" key = {props.author}>
            <div className = "message-author">
                {authorName}
            </div>
            <div className = "message-content">
                {props.content}
            </div>
        </div>
    )
    
}

async function sendMessage(serverId: string) {
    // get the content of the message
    const messageContent: string = $("#message-input").val() as string
    // trim leading spaces

    // make sure it's not empty
    if (messageContent == "") {
        alert("message is empty")
        return
    }
    
    const currentUser = auth.currentUser

    if (currentUser == null) {
        alert("not logged in, attempting to send a message")
        return
    }

    const currentUserId = currentUser.uid

    // get the server id

    // send the message to the database

    const messagesRef = ref(database, "servers/" + serverId + "/messages")
    // get the current messages


    const messagesSnapshot = await get(messagesRef)
    let msgList = messagesSnapshot.val()

    // add the new message
    msgList = appendToArrayLikeObject(msgList, {"content" : messageContent, "author" : currentUserId})
    
    // send the new message
    console.log(msgList);console.log(msgList);console.log(msgList);console.log(msgList);console.log(msgList);console.log(msgList);console.log(msgList)
    

    set(messagesRef, msgList)

}


export default function Social() {


    let [serversUserIn, setServersUserIn] = useState <string[]> ([])
    let [currentServerId, setCurrentServerId] = useState <string> ("")


    useEffect(() => {
        $("#message-input").keyup((event: KeyboardEvent) => {
            if (event.keyCode === 13) {
                if (currentServerId != null) {
                    sendMessage(currentServerId)
                }

            }
        });

        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // logged in
                // get the uuids of the servers the user is in
                const userServersRef = ref(database, "users/" + user.uid + "/servers")
                // sets an event listener for a change in the value of the user's servers
                const serversUserInSnapshot: DataSnapshot = await get(userServersRef)
                const userServers = serversUserInSnapshot.val()
                alert('got user servers')
                setServersUserIn(userServers)
                setCurrentServerId(userServers[0])
            }

            else {
                alert('not logged in social')
                // not logged in
                setServersUserIn([])
            }

        })
    }, [])

    return (
        <>
            <div className = "social-container">
                <div className = "servers-bar">
                    {
                        serversUserIn.map((serverId) => 
                             
                            <ServerButton serverId = {serverId}/>
                             
                        )
                    }
                </div>
                <div className = "open-server">
                {
                    (function() {
                        if (currentServerId != null) {
                            return (
                                <>
                                    <MessagesSection serverId = {currentServerId}/>
                                </>
                            )
                        }
                        else {
                            return (
                                <>
                                    <div className = "server-messages">
                                        No current server
                                    </div>
                                </>
                            )
                        }
                    })()
                }
                    <input id = "message-input">

                    </input>
                </div>
            </div>
        </>
    )
}