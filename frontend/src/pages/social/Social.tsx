import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, Unsubscribe, User, getAuth, onAuthStateChanged } from "firebase/auth";
import { DataSnapshot, Database, get, getDatabase, onValue, ref, set, update } from "firebase/database";
import firebaseConfig from "../../firebaseConfig";
import "./social.css"
import { useEffect, useState } from "react";
import $ from "jquery"
import {v4 as uuidv4} from 'uuid';
import { sendMessageAPI, serverCreateAPI, APIResult, serverInviteCreateAPI, serverInviteDeleteAPI, serverJoinAPI, serverNameChangeAPI, serverLeaveAPI } from "../../utilities/backendRequests";

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

function ArrayLikeObjectToArray(object: object) {
    if (object == null) return []
    let array: any[] = []
    for (let i = 0; i < Object.keys(object).length; i++) {
        const key = Object.keys(object)[i]
        const property = object[key]
        array.push(property)
    }
    return array
}


function ServerButton(props: {serverId: string, currentServerIdSetter: Function}) {

    const [serverName, setServerName] = useState <string> ("")
    const [serverOwner, setServerOwner] = useState <string> ("")

    // double check the unsubscriber here
    useEffect(() => {
        // get the server name
        const serverNameRef = ref(database, "servers/" + props.serverId + "/name")
        return onValue(serverNameRef, (snapshot: DataSnapshot) => {
            //alert("server name ref")
            const serverName = snapshot.val()
            setServerName(serverName)
        })
    }, [props])

    useEffect(() => {
        const serverOwnerRef = ref(database, "servers/" + props.serverId + "/owner")
        return onValue(serverOwnerRef, (snapshot: DataSnapshot) => {
            //alert("server owner ref")
            const serverOwner = snapshot.val()
            setServerOwner(serverOwner)
        })
    }, [props])


    return (
        <>
            <div className = "server-button" key = {props.serverId}
            onClick = {
                () => {
                // if the server options window is open, close it
                const serverOptionsWindow = $("#server-options-window")
                if (serverOptionsWindow.css("display") != "none") {
                    openOrCloseServerOptionsWindow()
                }
                // set the current server id
                props.currentServerIdSetter(props.serverId)
                }
            }
            >
                {serverName}
                {
                    (function() {
                        if (getCookie("user") == serverOwner) {
                            return (
                                <>
                                    <svg className = "server-bar-owner-icon" xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 576 512"><path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6H426.6c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z"/></svg>
                                </>
                            )
                        }
                        else {
                            <></>
                        }
                    })()
                }
            </div>
        </>
    )
}

function MessagesSection (props: {serverId: string}) {
    const [messages, setMessages] = useState <{content: string, author: string}[]> ([])

    useEffect(() => {
        // get the messages
        const messagesRef = ref(database, "servers/" + props.serverId + "/messages")
        return onValue(messagesRef, (snapshot: DataSnapshot) => {
            //alert("messages ref")
            const _messages = snapshot.val()
            if (_messages != null) {
                setMessages(_messages)
            }
            else {
                setMessages([])
            }

            const serverMessages = document.getElementsByClassName("server-messages")[0]
            // scroll to the bottom of the messages
            setTimeout(() => {
                serverMessages.scrollTop = serverMessages.scrollHeight
            }, 1)
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
    , [props.content, props.author])

    let extraClasses = ""

    if (props.author == getCookie("user")) {
        extraClasses += " message-from-current-user"
    }

    return (
        <div className = {"message" + extraClasses} key = {props.author}>
            <div className = "message-author">
                {authorName}
            </div>
            <div className = "message-content">
                {props.content}
            </div>
        </div>
    )
    
}

async function sendMessage(serverId: string): Promise<void> {
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

    // send the message to the database
    const result: APIResult = await sendMessageAPI(auth, messageContent, serverId)
    if (result.success) {
        // make the input field empty
        $("#message-input").val("")
    }
    else {
        alert(result.errorMessage)
    }

}

function ServerCreationWindow() {
    return (
        <div id = "server-creation-window">

   
            <div className = "exit-server-creation-window-button"
            onClick = {openOrCloseServerCreationWindow}
            >✖️</div>
            <div className = "server-creation-window-header">
                Create new server
            </div>
         

            
            <div className = "server-creation-server-name-header">
                Server Name
            </div>
            <input type="text" id = "server-name-input" className = "text-input" placeholder="Server Name" />

            <FinishCreatingServerButton/>
        </div>
    )
}

function JoinServerWindow() {
    return (
        <div id = "join-server-window">
            <div className = "exit-server-creation-window-button"
            onClick = {openOrCloseJoinServerWindow}
            >✖️</div>
            <div className = "join-server-header">
                Join A Server
            </div>
            <div className = "server-join-server-invite-header">
                Code
            </div>
             <input type="text" id = "server-invite-input" className = "text-input" placeholder="Server Invite Code" />
            <FinishJoiningServerButton/>
        </div>
    )
}

function FinishJoiningServerButton() {
    return (
        <div id = "finish-joining-server-button"
        onClick = {joinServer}
        >
            Join
        </div>
    )
}

async function joinServer() {
    // get the invite code from the field
    const inviteCode = $("#server-invite-input").val() as string

    const result = await serverJoinAPI(auth, inviteCode)

    if (!result.success) {
        alert(result.errorMessage)
    }
    else {
        // clear the input
        $("#server-invite-input").val("")
        // make the window disappear
        openOrCloseJoinServerWindow()
    }
}
// 163ccfc4-7a2d-453b-b7bd-306942e3be45

function openOrCloseServerCreationWindow() {
// if the server creation window is invisible, make it visible
                // if it's visible, make it invisible
                const window = $("#server-creation-window")
                if (window.css("display") == "none") {
                    // make the rest of the page darker
                    window.css("display", "flex")
                    $("#social-container").css("opacity", "0.5")

                }
                else if (window.css("display") == "flex") {
                    window.css("display", "none")
                    $("#social-container").css("opacity", "1")
                }
}

function openOrCloseJoinServerWindow() {
    const window = $("#join-server-window")
    if (window.css("display") == "none") {
        window.css("display", "flex")
        $("#social-container").css("opacity", "0.5")
    }
    else if (window.css("display") == "flex") {
        window.css("display", "none")
        $("#social-container").css("opacity", "1")
    }
}

function CreateNewServerButton() {
    return (
        <div className = "create-new-server-button"
        onClick = {openOrCloseServerCreationWindow}>
            Create new server
        </div>
    )
}

function JoinServerButton() {
    return (
        <div className = "join-server-button"
        onClick = {openOrCloseJoinServerWindow}
        >
            Join server
        </div>
    )
}

function FinishCreatingServerButton() {
    return (
        <div className = "finish-creating-server-button"
        onClick = {createServer}
        >
            Create
        </div>
    )
}

async function createServer() {
    // first, get the name of the server
    const serverName = $("#server-name-input").val() as string
    // if it's empty, alert and return
    if (serverName == "") {
        alert("Server name is empty")
        return
    }

    // get the current user
    const currentUserUUID: string | null = getCookie("user")

    if (currentUserUUID == null) {
        alert("not logged in, trying to create server")
        return
    }

    // create the server
    const result = await serverCreateAPI(auth, serverName)
    
    if (!result.success) {
        alert(result.errorMessage)
    }
    else {
        // clear the input
        $("#server-name-input").val("")
        // make the window disappear
        openOrCloseServerCreationWindow()
    }

}

function ServerInfoBar(props: {serverId: string, currentServerSetter: Function}) {
    
    const [serverName, setServerName] = useState <string> ("")
    const [serverOwner, setServerOwner] = useState <string> ("")

    useEffect(() => {
        // get the server name
        const serverNameRef = ref(database, "servers/" + props.serverId + "/name")
        return onValue(serverNameRef, (snapshot: DataSnapshot) => {
            const serverName = snapshot.val()
            setServerName(serverName)
            // make the server header visible
            //$("#server-info-bar-server-name").css("display", "block")
        })
    }, [props.serverId])

    useEffect(() => {
        // if serverName is "", make the header invisible
        if (props.serverId == "") {
            $("#server-info-bar-server-name").css("display", "none")
        }
        // otherwise, make it visible
        else {
            $("#server-info-bar-server-name").css("display", "block")
        }
    }, [serverName])

    useEffect(() => {
        // get the server owner
        const serverOwnerRef = ref(database, "servers/" + props.serverId + "/owner")
        return onValue(serverOwnerRef, (snapshot: DataSnapshot) => {
            const serverOwner = snapshot.val()
            setServerOwner(serverOwner)
        })
    }, [props.serverId])

    return (
        <div className = "server-info-bar">
            <div style = {{
                // use a flex box to put the buttons on top of one another
                display: "flex",
                flexDirection: "column",
                marginRight: "2rem",
                marginLeft: "1.2rem"
            }}>
                <ExitOpenServerButton 
                    currentServerSetter={props.currentServerSetter}
                    currentServerNameSetter = {setServerName}
                    currentServer = {props.serverId}
                />
                <ServerOptionsButton/>
            </div>
            <div id = "server-info-bar-server-name">
                {serverName}
            </div>
        </div>
    )
}

function ServerOptionsWindow(props: {serverId: string}) {
    const [serverName, setServerName] = useState <string> ("")
    const [serverInvites, setServerInvites] = useState <string[]> ([])
    const [serverOwner, setServerOwner] = useState <string> ("")

    useEffect(() => {
        // set the placeholder of the server name input to the current server name
        const serverNameRef = ref(database, "servers/" + props.serverId + "/name")
        return onValue(serverNameRef, (snapshot: DataSnapshot) => {
            const serverName = snapshot.val()
            setServerName(serverName)
        })
    }, [props.serverId])

    useEffect(() => {
        const serverOwnerRef = ref(database, "servers/" + props.serverId + "/owner")
        return onValue(serverOwnerRef, (snapshot: DataSnapshot) => {
            const serverOwner = snapshot.val()
            setServerOwner(serverOwner)
        })
    }, [props.serverId])

    useEffect(() => {
        // get the list of server invites
        const serverInvitesRef = ref(database, "servers/" + props.serverId + "/invites")
        return onValue(serverInvitesRef, (snapshot: DataSnapshot) => {
            const serverInvites = snapshot.val()
            if (serverInvites != null) {
                setServerInvites(serverInvites)
            }
            else {
                setServerInvites([])
            }
        })
    }, [props.serverId])

    return (
        <div id = "server-options-window">
            <div className = "exit-server-options-window-button"
            onClick = {openOrCloseServerOptionsWindow}
            >✖️</div>
            <div className = "server-options-window-header">
                Server Options
            </div>
            <input
            type = "text" 
            id = "server-options-window-server-name-input" 
            placeholder = {serverName}
            style = {
                (function() {
                    // if the logged in user is not the owner, don't display this window
                    if (getCookie("user") != serverOwner) {
                        return {
                            "display" : "none"
                        }
                    }
                })()
            }
            />
            {
                // if the user is not the owner of the server, display the leave server button
                (function() {
                    if (getCookie("user") != serverOwner) {
                        return (<LeaveServerButton currentServer = {props.serverId}/>)
                    }
                })()
            }
            <ul id = "server-options-window-server-invite-list"
            style = {
                (function() {
                    // if the logged in user is not the owner, don't display this window
                    if (getCookie("user") != serverOwner) {
                        return {
                            "display" : "none"
                        }
                    }
                })()
            }
            
            >
                <li className = "server-options-window-server-invite-list-header">
                    Invites
                </li>
                
                {
                    // make a list of the server invites from the object
                    (function() {
                        const arrayOfServerInvites = ArrayLikeObjectToArray(serverInvites)

                        return (
                            arrayOfServerInvites.map((serverInvite) =>
                                <li className = "server-options-window-server-invite-list-item" key = {serverInvite}>

                                    <div style = {{
                                        textAlign: "center",
                                        marginTop: "auto",
                                        marginBottom: "auto",
                                        marginRight: "1.5rem"
                                    }}>
                                        {serverInvite}
                                    </div>

                                    <div className = "server-options-window-remove-invite-button"
                                    onClick = {async () => {
                                        // delete the invite
                                        const result = await serverInviteDeleteAPI(auth, props.serverId, serverInvite)
                                        if (!result.success) {
                                            alert(result.errorMessage)
                                        }
                                    }}
                                    >
                                        ✖️
                                    </div>
                                </li>
                            )
                        )
                    })()
                }
                <div className = "server-options-window-add-invite-button"
                onClick = {
                    async () => {
                        // create the invite
                        const result = await serverInviteCreateAPI(auth, props.serverId)
                        if (!result.success) {
                            alert(result.errorMessage)
                        }

                    }
                }
                >
                +
                </div>
            </ul>
            

            <div id = "server-options-window-apply-changes-button"
            onClick = {() => applyServerChanges(props.serverId)}
            >
                Apply Changes
            </div>

        </div>
    )
}

async function applyServerChanges(serverId: string) {
    // check if the content of the server name input is not empty
    const serverName = $("#server-options-window-server-name-input").val() as string
    if (serverName != "") {
        // change the server name
        const result = await serverNameChangeAPI(auth, serverId, serverName)
        if (!result.success) {
            alert(result.errorMessage)
        }
        else {
            // clear the field
            $("#server-options-window-server-name-input").val("")
        }
    }

    // close the window
    openOrCloseServerOptionsWindow()
    
}

function openOrCloseServerOptionsWindow() {
    const window = $("#server-options-window")
    if (window.css("display") == "none") {
        window.css("display", "flex")
    }
    else if (window.css("display") == "flex") {
        window.css("display", "none")
        $("#social-container").css("opacity", "1")
        // make all fields empty
        $("#server-options-window-server-name-input").val("")
    }
}

function ConfirmLeaveServerWindow(props: {serverId: string, currentServerSetter: Function, currentServer: string}) {
    return (
        <div id = "confirm-leave-server-window">
            <div className = "confirm-leave-server-window-header">
                Are you sure you want to leave this server?
            </div>
            <div className = "confirm-leave-server-window-buttons">
                <div className = "confirm-leave-server-window-yes-button"
                onClick = {async () => {
                    // close the window
                    openOrCloseConfirmLeaveServerWindow()

                    // if the options window is open, close it
                    const serverOptionsWindow = $("#server-options-window")
                    if (serverOptionsWindow.css("display") != "none") {
                        openOrCloseServerOptionsWindow()
                    }

                    // if the server is the current server, set the current server to ""
                    if (props.currentServer == props.serverId) {
                        props.currentServerSetter("")
                    }

                    // leave the server
                    const result = await serverLeaveAPI(auth, props.serverId)
                    if (!result.success) {
                        alert(result.errorMessage)
                    }

                }}
                >
                    Yes
                </div>
                <div className = "confirm-leave-server-window-no-button"
                onClick = {
                    () => {
                        // close the window
                        openOrCloseConfirmLeaveServerWindow()
                    }
                }
                >
                    No
                </div>
            </div>
        </div>
    )
}

function openOrCloseConfirmLeaveServerWindow() {
    const window = $("#confirm-leave-server-window")
    if (window.css("display") == "none") {
        window.css("display", "flex")
    }
    else if (window.css("display") == "flex") {
        window.css("display", "none")

    }
}



function ServerOptionsButton() {
    return (
        <div className = "server-options-button"
        onClick = {openOrCloseServerOptionsWindow}
        >
            ⚙️
        </div>
    )
}

function ExitOpenServerButton(props: {currentServerSetter: Function, currentServerNameSetter: Function, currentServer: string}) {
    
    if (props.currentServer == "") {
        return (
            <></>
        )
    }
    
    return (
        <div className = "exit-open-server-button"
        onClick = {() => {
            props.currentServerSetter("")
            props.currentServerNameSetter("")
        }}
        >
        ✖️  
        </div>
    )
}

function LeaveServerButton(props: {currentServer: string}) {
    return (
        <div className = "leave-server-button"
        onClick = {openOrCloseConfirmLeaveServerWindow}
        >
            Leave Server
        </div>
    )
}

export default function Social() {

    let [serversUserIn, setServersUserIn] = useState <string[]> ([])
    let [currentServerId, setCurrentServerId] = useState <string> ("")

    useEffect(() => {
        // scroll down to the bottom of the messages
        const serverMessages = document.getElementsByClassName("server-messages")[0]
        serverMessages.scrollTop = serverMessages.scrollHeight
    })


    useEffect(() => {
        
        // get the current user

        const user = getCookie("user")

        if (user != null) {
            // logged in
            // get the uuids of the servers the user is in
            const userServersRef = ref(database, "users/" + user + "/servers") // change here
            // sets an event listener for a change in the value of the user's servers
            
            onValue(userServersRef, (snapshot: DataSnapshot) => {
                //alert("user servers ref")
                const userServers = snapshot.val()

                if (userServers == null) {
                    setServersUserIn([])
                    setCurrentServerId("")
                }

                else {
                    setServersUserIn(Object.keys(userServers))
                    if (currentServerId == "" && (Object.keys(userServers)).length > 0) {
                        //setCurrentServerId(Object.keys(userServers)[0])
                    }
                }

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
            <div id = "social-container">
                <div className = "servers-bar">
                    {
                        serversUserIn.map((serverId) => 
                             
                            <ServerButton serverId = {serverId} currentServerIdSetter={setCurrentServerId}/>
                             
                        )
                    }
                    
                    <div className = "server-bar-divider-vertical"> </div>
                    <CreateNewServerButton/>
                    <JoinServerButton/>
                </div>
                <div className = "open-server" style = {
                    (function() {
                        if (currentServerId != "") {
                            return {
                                "display" : "flex"
                            }
                        }
                        else {
                            return {
                                "display" : "none"
                            }
                        }
                    })()
                }>
                    <ServerInfoBar serverId = {currentServerId} currentServerSetter = {setCurrentServerId}/>
                    
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
                    <input id = "message-input" placeholder = "Send Message" onKeyUp={(e) => {
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
            <ServerCreationWindow/>
            <JoinServerWindow/>
            <ServerOptionsWindow serverId = {currentServerId}/>
            <ConfirmLeaveServerWindow 
                serverId = {currentServerId} 
                currentServerSetter={setCurrentServerId} 
                currentServer= {currentServerId}
            />
        </>
    )
}