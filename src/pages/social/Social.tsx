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

function getCookie(name: string) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i = 0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}


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


function ServerButton(props: {serverId: string, currentServerIdSetter: Function}) {

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
            <div className = "server-button" key = {props.serverId}
            
            onClick = {
                () => {
                props.currentServerIdSetter(props.serverId)
                }
            }
            >
                {serverName}
            </div>
        </>
    )
}

function MessagesSection (props: {serverId: string}) {
    const [messages, setMessages] = useState <{content: string, author: string}[]> ([])

    useEffect(() => {
        console.log("messages section")
        // get the messages
        const messagesRef = ref(database, "servers/" + props.serverId + "/messages")
        onValue(messagesRef, (snapshot: DataSnapshot) => {
            const _messages = snapshot.val()
            if (_messages) {
                setMessages(_messages)
            }
            else {
                setMessages([])
            }
        })


    }, [props.serverId])

    return (
        <div className = "server-messages">
            {
                messages.map((message) =>
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
    
    set(messagesRef, msgList)
    .catch((error: Error) => {
        alert(error.message)
    })

}


export default function Social() {

    let [serversUserIn, setServersUserIn] = useState <string[]> ([])
    let [currentServerId, setCurrentServerId] = useState <string> ("")

    useEffect(() => {
        
        // get the current user

        const user = getCookie("user")

        if (user != null) {
            // logged in
            // get the uuids of the servers the user is in
            const userServersRef = ref(database, "users/" + user + "/servers")
            // sets an event listener for a change in the value of the user's servers
            get(userServersRef) // probably should be using onValue() here
            .then((snapshot: DataSnapshot) => {
                const userServers = snapshot.val()
                setServersUserIn(userServers)
                setCurrentServerId(userServers[0])
            })
        }

        else {
            alert('not logged in social')
            // not logged in
            setServersUserIn([])
        }

        
    }, [])

    return (
        <>
            <div className = "social-container">
                <div className = "servers-bar">
                    {
                        serversUserIn.map((serverId) => 
                             
                            <ServerButton serverId = {serverId} currentServerIdSetter={setCurrentServerId}/>
                             
                        )
                    }
                </div>
                <div className = "open-server">
                {
                   
                    (function() {
                        if (currentServerId != "") {
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
                                        
                                    </div>
                                </>
                            )
                        }
                    })()
                
                }
                    <input id = "message-input" onKeyUp={(e) => {
                        if (e.key == "Enter") {
                            if (currentServerId != "") {
                                sendMessage(currentServerId)
                            }
                            else {
                                alert("not in a server")
                            }
                        }
                    }}>

                    </input>
                </div>
            </div>
        </>
    )
}