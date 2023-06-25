import Nav from "../../components/nav/Nav";
import "./habits.css";
import HabitsCalendar from "./components/HabitsCalendar"
import $ from "jquery";
import { Key, useEffect, useState } from "react";
import { habitCreateAPI, habitDeleteAPI, habitResistCreateAPI, habitResistDeleteAPI, taskCreateAPI, taskDeleteAPI } from "../../utilities/backendRequests";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { DataSnapshot, Database, getDatabase, onValue, ref } from "firebase/database";
import firebaseConfig from "../../firebaseConfig";


const app: FirebaseApp = initializeApp(firebaseConfig);
const database: Database = getDatabase(app)
const auth: Auth = getAuth()


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


interface DayInterface {
    day: number,
    month: number,
    year: number
}


function HabitsBar() {
    return (
        <div id = "habits-bar">
            <div className = "habits-bar-link"
            onClick = {openOrCloseHabitStackCreatorWindow}
            >
                Habit Stack Creator
            </div>
            <div className = "habits-bar-link"
            onClick = {openOrCloseHabitCreatorWindow}
            >
                Habit Creator
            </div>
            <div className = "habits-bar-link"
            onClick = {openOrCloseHabitResistorWindow}
            >
                Habit Resistor
            </div>
            <div className = "habits-bar-link"
            onClick = {openOrCloseDailyRatingWindow}
            >
                Daily Rating
            </div>
            <div className = "habits-bar-link"
            onClick = {openOrCloseHabitCardWindow}
            >
                Habit Card
            </div>


        </div>
    )
}

function HappinessGraph() {
    return (
        <div id = "happiness-graph">
            <div className = "happiness-graph-header">
                Happiness Graph
            </div>

        </div>
    )
}

function ToDoListItem(props: {name: string, index: number, itemsSetter: Function, items: string[]}) {
    return (
        <div className = "todo-list-item">
            <div className = "todo-list-item-name">
                {props.name}
            </div>
            <div className = "todo-list-item-remove-button"
            onClick = {
                () => {
                    // remove the item from the list
                }
            }
            >
                ✔️
            </div>
        </div>
    )
}

function ToDoList() {

    /*
        Whenever a new item is added to the list, it will be sent to the database.
        To display the items, they will be fetched from the database.
    */

    const [tasks, setTasks] = useState({})

    const day = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    useEffect(() => {
        // fetch the tasks from the database
        const tasksRef = ref(database, "users/" +  getCookie("user") + "/tasks/" + year + "/" + month + "/" + day)
        return onValue(tasksRef, (snapshot: DataSnapshot) => {
            const data = snapshot.val();
            setTasks(data);
            console.log(data)
        })
    }, [])


    return (
        <div className = "todo-list">
            <div className = "todo-list-header">
                Tasks
            </div>
            <div className = "day-info-tasks-widget">
                {
                    // TODO: render the tasks here
                    (function() {
                        if (tasks == null || tasks == undefined) {
                            return (
                                <></>
                            )
                        }

                        const components = []

                        for (let i = 0; i < Object.keys(tasks).length; i++) {
                            const key = Object.keys(tasks)[i];
                            components.push(
                                <DayInfoTask
                                name = {tasks[key]}
                                index = {i}
                                year = {year}
                                month = {month}
                                day = {day}
                                />
                            )
                        }
                        return components
                    })()
                }
            </div>

            <div className = "todo-list-input">
                <input type="text" placeholder = "Add a new task" className = "todo-list-name-input" id = "todo-list-widget-name-input">

                </input>
                <div className = "todo-list-add-item-button"
                onClick = {
                    async () => {
                        const taskName: string = $("#todo-list-widget-name-input").val() as string;
                        
                        const result = await taskCreateAPI(auth, taskName, year, month, day)
                        if (!result.success) {
                            alert(result.errorMessage)
                        }
                        else {
                            $("#todo-list-widget-name-input").val("")
                        }
                    }
                }
                >
                    +
                </div>

            </div>
        </div>
    )
}

function DailyCompletion() {
    return (
        <div className = "daily-completion">
            <div className = "daily-completion-header">
                Daily Completion
            </div>

        </div>
    )
}



function HabitsYouWantToDo() {

    const [habits, setHabits] = useState({})
    
    const [editMode, setEditMode] = useState(false)


    useEffect(() => {
        // fetch the habits from the database
        const habitsRef = ref(database, "/users/" +  getCookie("user") + "/habits")
        return onValue(habitsRef, (snapshot: DataSnapshot) => {
            const data = snapshot.val();
            setHabits(data);
            console.log(data)
        })
    }, [])


    return (
        <div className = "habits-you-want-to-do-widget">
            <div style = {{
                display: "flex",
            }}>            
                <div className = "habits-you-want-to-do-widget-edit-button"
                onClick = {
                    () => {
                        setEditMode(!editMode)
                    }
                }
                >
                    ⚙️
                </div>
                <div className = "habits-you-want-to-do-widget-header">
                    Habits you want to do
                </div>
            </div>
            <div className = "habits-you-want-to-do-list">
                {
                    Object.keys(habits).map(habitName =>
                        <HabitsYouWantToDoListItem
                            editMode = {editMode}
                            habitName = {habitName}
                            action = {habits[habitName].iWill}
                            time = {habits[habitName].atTime}
                            location = {habits[habitName].atLocation}
                            obvious = {habits[habitName].obvious}
                            attractive = {habits[habitName].attractive}
                            easy = {habits[habitName].easy}
                            satisfying = {habits[habitName].satisfying}
                        />
                    )
                }
            </div>
        </div>
    )
}

function HabitsYouWantToDoListItem(props: {editMode: boolean, habitName: string, action: string, time: string, location: string, obvious: string, attractive: string, easy: string, satisfying: string}) {
    
    const [dropDown, setDropDown] = useState(false) // whether the properties of the habit should be rendered
    
    return (
        <div className = "habits-you-want-to-do-list-item-container"
        onClick = {
            () => {
                setDropDown(!dropDown)
            }
        }
        >
            {
                (function() {
                    if (props.editMode) {
                        return (
                            <div className = "habits-you-want-to-do-list-delete-item-button"
                            onClick = {
                                async () => {
                                    // delete the item from the database
                                    const result = await habitDeleteAPI(auth, props.habitName)
                                    if (!result.success) {
                                        alert(result.errorMessage)
                                    }  
                                }
                            }
                            >
                                ✖️
                            </div>
                        )
                    }
                })()
            }
            <div className = "habits-you-want-to-do-list-item"
            onClick = {
                () => {
                    // if in edit mode, open up the habit creator
                    if (props.editMode) {
                        // set the properties
                        $("#habit-creator-window-name-input").val(props.habitName)
                        $("#action-input").val(props.action)
                        $("#time-input").val(props.time)
                        $("#location-input").val(props.location)
                        $("#obvious-input").val(props.obvious)
                        $("#attractive-input").val(props.attractive)
                        $("#easy-input").val(props.easy)
                        $("#satisfying-input").val(props.satisfying)

                        // open the window
                        openOrCloseHabitCreatorWindow()
                    }
                }
            }
            >
                <div className = "habits-you-want-to-do-list-name"
                style = {
                    (function() {
                        if (dropDown) return {
                            marginBottom: "2rem"
                        }
                        else return {}
                    })()
                }
                >
                    {props.habitName}
                </div>
                {
                    // if the drop down is open, render the properties
                    (function() {
                        if (!dropDown) return <></>
                        else return (
                            <div className = "habits-you-want-to-do-list-name">
                                    <div>
                                        {`I will ${props.action} at ${props.time} at ${props.location}`}
                                    </div>
                                    <div>
                                        {`I will make it obvious by ${props.obvious}`}
                                    </div>
                                    <div>
                                        {`I will make it attractive by ${props.attractive}`}
                                    </div>
                                    <div>
                                        {`I will make it easy by ${props.easy}`}
                                    </div>
                                    <div>
                                        {`I will make it satisfying by ${props.satisfying}`}
                                    </div>
                            </div>
                            
                        )
                    })()
                }
            </div>
        </div>
    )
}


function HabitsYouWantToResist() {
    
    const [habits, setHabits] = useState({})
    
    const [editMode, setEditMode] = useState(false)


    useEffect(() => {
        // fetch the habits from the database
        const habitsRef = ref(database, "/users/" +  getCookie("user") + "/habitresists")
        return onValue(habitsRef, (snapshot: DataSnapshot) => {
            const data = snapshot.val();
            setHabits(data);
        })
    }, [])


    return (
        <div className = "habits-you-want-to-do-widget">
            <div style = {{
                display: "flex",
            }}>            
                <div className = "habits-you-want-to-do-widget-edit-button"
                onClick = {
                    () => {
                        setEditMode(!editMode)
                    }
                }
                >
                    ⚙️
                </div>
                <div className = "habits-you-want-to-do-widget-header">
                    Habits you want to resist
                </div>
            </div>
            <div className = "habits-you-want-to-do-list">
                {
                    Object.keys(habits).map(habitName =>
                        <HabitsYouWantToResistListItem
                            editMode = {editMode}
                            name = {habitName}
                            invisible = {habits[habitName].invisible}
                            unattractive = {habits[habitName].unattractive}
                            difficult = {habits[habitName].difficult}
                            unsatisfying = {habits[habitName].unsatisfying}
                        />
                    )
                }
            </div>
        </div>
    )
}

function HabitsYouWantToResistListItem(props: {editMode: boolean, name: string, invisible: string, unattractive: string, difficult: string, unsatisfying: string}) {
      
    const [dropDown, setDropDown] = useState(false) // whether the properties of the habit should be rendered
    
    return (
        <div className = "habits-you-want-to-do-list-item-container"
        onClick = {
            () => {
                setDropDown(!dropDown)
            }
        }
        >
            {
                (function() {
                    if (props.editMode) {
                        return (
                            <div className = "habits-you-want-to-do-list-delete-item-button"
                            onClick = {
                                async () => {
                                    // delete the item from the database
                                    const result = await habitResistDeleteAPI(auth, props.name)
                                    if (!result.success) {
                                        alert(result.errorMessage)
                                    }  
                                }
                            }
                            >
                                ✖️
                            </div>
                        )
                    }
                })()
            }
            <div className = "habits-you-want-to-do-list-item"
            onClick = {
                () => {
                    // if in edit mode, open up the habit creator
                    if (props.editMode) {
                        // set the properties
                        $("#habit-resistor-window-name-input").val(props.name)
                        $("#invisible-input").val(props.invisible)
                        $("#unattractive-input").val(props.unattractive)
                        $("#difficult-input").val(props.difficult)
                        $("#unsatisfying-input").val(props.unsatisfying)
                        // open the window
                        openOrCloseHabitResistorWindow()
                    }
                }
            }
            >
                <div className = "habits-you-want-to-do-list-name"
                style = {
                    (function() {
                        if (dropDown) return {
                            marginBottom: "2rem"
                        }
                        else return {}
                    })()
                }
                >
                    {props.name}
                </div>
                {
                    // if the drop down is open, render the properties
                    (function() {
                        if (!dropDown) return <></>
                        else return (
                            <div className = "habits-you-want-to-do-list-name">
                                    <div>
                                        {`I will make it invisible by ${props.invisible}`}
                                    </div>
                                    <div>
                                        {`I will make it unattractive by ${props.unattractive}`}
                                    </div>
                                    <div>
                                        {`I will make it difficult by ${props.difficult}`}
                                    </div>
                                    <div>
                                        {`I will make it unsatisfying by ${props.unattractive}`}
                                    </div>
                            </div>
                            
                        )
                    })()
                }
            </div>
        </div>
    )
}


function DailyRatingWindowExitButton() {
    return (
        <div className = "daily-rating-window-exit-button"
        onClick = {openOrCloseDailyRatingWindow}
        >
           ✖️
        </div>
    )
}

function openOrCloseHabitCreatorWindow() {
    if ($("#habit-creator-window").css("display") === "none") {
        $("#habit-creator-window").css("display", "flex");
        $("html").css("overflow", "hidden")
    } else {
        $("#habit-creator-window").css("display", "none");
        $("html").css("overflow", "auto")
    }
}

function ExitHabitCreatorWindowButton() {
    return (
        <div className = "habit-creator-window-exit-button"
        onClick = {openOrCloseHabitCreatorWindow}
        >
           ✖️
        </div>
    )
}

function HabitCreatorWindow() {
    /*
    Habit Name
    Habit Description
    I will (action) at time (time) at location (location)
    I will make it obvious by (obvious)
    I will make it attractive by (attractive)
    I will make it easy by (easy)
    I will make it satisfying by (satisfying)
    */

    return (
        <div id = "habit-creator-window">
            <ExitHabitCreatorWindowButton />
            <div className = "habit-creator-window-header">
                Habit Creator
            </div>
            <input id = "habit-creator-window-name-input"
            placeholder = "Habit Name"
            >

            </input>

            <div className = "implementation-intention-header">
                Implementation Intention
            </div>

            <div className = "implementation-intention-input-area">
                <div className = "implementation-intention-sub-label">
                    I will
                </div>
                <input className = "implementation-intention-input"
                placeholder = "action"
                id = "action-input"
                >
                </input>
                <div className = "implementation-intention-sub-label">
                    at time
                </div>
                <input className = "implementation-intention-input"
                placeholder = "time"
                id = "time-input"
                >
                </input>
                <div className = "implementation-intention-sub-label">
                    at location
                </div>
                <input className = "implementation-intention-input"
                placeholder = "location"
                id = "location-input"
                >
                </input>
            </div>

            <div className = "the-laws-header">
                    The Habit Change Laws
            </div>
            <div className = "the-laws-input-area">

                
                <div className = "implementation-intention-sub-label">
                    I will make it obvious by
                </div>
                <input className = "implementation-intention-input"
                placeholder = "obvious"
                id = "obvious-input"
                >
                </input>
                <div className = "implementation-intention-sub-label">
                    I will make it attractive by
                </div>
                <input className = "implementation-intention-input"
                placeholder = "attractive"
                id = "attractive-input"
                >
                </input>
                <div className = "implementation-intention-sub-label">
                    I will make it easy by
                </div>
                <input className = "implementation-intention-input"
                placeholder = "easy"
                id = "easy-input"
                >
                </input>
                <div className = "implementation-intention-sub-label">
                    I will make it satisfying by
                </div>
                <input className = "implementation-intention-input"
                placeholder = "satisfying"
                id = "satisfying-input"
                >
                </input>
                
            </div>
            <div id = "create-habit-button"
            onClick = {
                async () => {
                    // get the properties
                    const name: string = $("#habit-creator-window-name-input").val() as string;
                    const action: string = $("#action-input").val() as string;
                    const time: string = $("#time-input").val() as string;
                    const location: string = $("#location-input").val() as string;
                    const obvious: string = $("#obvious-input").val() as string;
                    const attractive: string = $("#attractive-input").val() as string;
                    const easy: string = $("#easy-input").val() as string;
                    const satisfying: string = $("#satisfying-input").val() as string;

                    // send the request
                    const result =  await habitCreateAPI(auth, name, action, time, location, obvious, attractive, easy, satisfying)

                    if (result.success) {
                        // empty the fields
                        $("#habit-creator-window-name-input").val("")
                        $("#action-input").val("")
                        $("#time-input").val("")
                        $("#location-input").val("")
                        $("#obvious-input").val("")
                        $("#attractive-input").val("")
                        $("#easy-input").val("")
                        $("#satisfying-input").val("")
                        openOrCloseHabitCreatorWindow()
                    }
                    else {
                        alert(result.errorMessage)
                    }
                }
            }
            >
                Create Habit
            </div>
        </div>
    )

    
}

function openOrCloseHabitResistorWindow() {
    if ($("#habit-resistor-window").css("display") === "none") {
        $("#habit-resistor-window").css("display", "flex");
        $("html").css("overflow", "hidden")
    } else {
        $("#habit-resistor-window").css("display", "none");
        $("html").css("overflow", "auto")
    }
}

function ExitHabitResistorWindowButton() {
    return (
        <div className = "habit-resistor-window-exit-button"
        onClick = {openOrCloseHabitResistorWindow}
        >
           ✖️
        </div>
    )
}

function HabitResistorWindow() {

    return (
        <div id = "habit-resistor-window">
            <ExitHabitResistorWindowButton />
            <div className = "habit-resistor-window-header">
                Habit Resistor
            </div>
            <input id = "habit-resistor-window-name-input"
            placeholder = "Habit Name"
            >
            </input>
            <div className = "the-laws-header">
                    The Inversions of the Habit Change Laws
            </div>
            <div className = "the-laws-input-area">

                
                <div className = "implementation-intention-sub-label">
                    I will make it invisible by
                </div>
                <input className = "implementation-intention-input"
                placeholder = "invisible"
                id = "invisible-input"
                >
                </input>
                <div className = "implementation-intention-sub-label">
                    I will make it unattractive by
                </div>
                <input className = "implementation-intention-input"
                placeholder = "unattractive"
                id = "unattractive-input"
                >
                </input>
                <div className = "implementation-intention-sub-label">
                    I will make it difficult by
                </div>
                <input className = "implementation-intention-input"
                placeholder = "difficult"
                id = "difficult-input"
                >
                </input>
                <div className = "implementation-intention-sub-label">
                    I will make it unsatisfying by
                </div>
                <input className = "implementation-intention-input"
                placeholder = "unsatisfying"
                id = "unsatisfying-input"
                >
                </input>
                
            </div>
            <div id = "resist-habit-button"
            onClick = {
                async () => {
                    // get the values
                    const name: string = $("#habit-resistor-window-name-input").val() as string;
                    const invisible: string = $("#invisible-input").val() as string;
                    const unattractive: string = $("#unattractive-input").val() as string;
                    const difficult: string = $("#difficult-input").val() as string;
                    const unsatisfying: string = $("#unsatisfying-input").val() as string;

                    // send the request

                    alert(`name: ${name}, invisible: ${invisible}, unattractive: ${unattractive}, difficult: ${difficult}, unsatisfying: ${unsatisfying}`)

                    const result = await habitResistCreateAPI(auth, name, invisible, unattractive, difficult, unsatisfying)
                    if (!result.success) {
                        alert(result.errorMessage)
                    }
                    else {
                        // empty the fields and close the window
                        $("#habit-resistor-window-name-input").val("")
                        $("#invisible-input").val("")
                        $("#unattractive-input").val("")
                        $("#difficult-input").val("")
                        $("#unsatisfying-input").val("")
                        openOrCloseHabitResistorWindow()
                    }
                }
            }
            >
                Resist Habit
            </div>

        </div>
    )

}

function ratingOfNumber(number: number) {
    switch (number) {
        case 1:
            return "😭"
        case 2:
            return "😢"
        case 3:
            return "😞"
        case 4:
            return "😔"
        case 5:
            return "🙁"
        case 6:
            return "😐"
        case 7:
            return "🙂"
        case 8:
            return "😊"
        case 9:
            return "😀"
        case 10:
            return "😁"
        default:
            return ""
    }
}

function DailyRatingWindowHappinessRatingButton(props: {thisRating: number, ratingSetter: Function, currentRating: number}) {
    
    // determine whether this rating button is selected
    const selected: boolean = (function() {
        if (props.thisRating == props.currentRating) return true
        else return false
    })()

    // if it's selected, add the selected class

    const extraCSS: string = (function() {
        if (selected) return "daily-rating-input-button-selected"
        else return ""
    })()
    
    return (
        <div className = {"daily-rating-input-button" + " " + extraCSS}
        onClick = {
            () => {
                // if it's already selected, set the rating to -1
                if (selected) {
                    props.ratingSetter(-1);
                }
                else {
                    props.ratingSetter(props.thisRating);
                }
            }
        }
        >
            {
                ratingOfNumber(props.thisRating)
            }
        </div>
    )
}

function DailyRatingWindowStandardRatingButton(props: {thisRating: number, ratingSetter: Function, currentRating: number}) {
    // determine whether this rating button is selected
    const selected: boolean = (function() {
        if (props.thisRating == props.currentRating) return true
        else return false
    })()

    // if it's selected, add the selected class

    const extraCSS: string = (function() {
        if (selected) return "daily-rating-input-button-selected"
        else return ""
    })()
    
    return (
        <div className = {"daily-rating-input-button" + " " + extraCSS}
        onClick = {
            () => {
                // if it's already selected, set the rating to -1
                if (selected) {
                    props.ratingSetter(-1);
                }
                else {
                    props.ratingSetter(props.thisRating);
                }
            }
        }
        >
            {
                props.thisRating
            }
        </div>
    )
}

function DailyRatingWindow() {

    const [happinessRating, setHappinessRating] = useState(-1);
    const [stickRating, setStickRating] = useState(-1);
    const [avoidRating, setAvoidRating] = useState(-1);

    return (
        <div id = "daily-rating-window">
            <DailyRatingWindowExitButton />
            <div className = "daily-rating-window-header">
                Daily Rating
            </div>
            <div className = "daily-rating-window-sub-header">
                How happy were you today?
            </div>
            <div className = "daily-rating-input-panel">
                {
                    (function() {
                        let buttons = [];
                        for (let i = 1; i <= 10; i++) {
                            buttons.push(
                                <DailyRatingWindowHappinessRatingButton
                                thisRating = {i}
                                ratingSetter = {setHappinessRating}
                                currentRating = {happinessRating}
                                />
                            )
                        }
                        return buttons
                    })()
                }
            </div>
            <div className = "daily-rating-window-sub-header">
                How well did you stick to your desired habits today?
            </div>
            <div className = "daily-rating-input-panel">
            {
                    (function() {
                        let buttons = [];
                        for (let i = 1; i <= 5; i++) {
                            buttons.push(
                                <DailyRatingWindowStandardRatingButton
                                thisRating = {i}
                                ratingSetter = {setStickRating}
                                currentRating = {stickRating}
                                />
                            )
                        }
                        return buttons
                    })()
                }
            </div>
            <div className = "daily-rating-window-sub-header">
                How well did you avoid the habits you want to avoid today?
            </div>
            <div className = "daily-rating-input-panel">
            {
                    (function() {
                        let buttons = [];
                        for (let i = 1; i <= 5; i++) {
                            buttons.push(
                                <DailyRatingWindowStandardRatingButton
                                thisRating = {i}
                                ratingSetter = {setAvoidRating}
                                currentRating = {avoidRating}
                                />
                            )
                        }
                        return buttons
                    })()
                }
            </div>
            <div className = "daily-rating-window-sub-header">
                What is something memorable about today?
            </div>
            <input type="text" className = "daily-rating-text-input" />
            <div className = "daily-rating-submit-button">
                Submit
            </div>

        </div>
    )
}


function openOrCloseDailyRatingWindow() {
    if ($("#daily-rating-window").css("display") === "none") {
        $("#daily-rating-window").css("display", "flex");
        $("html").css("overflow", "hidden")
    } else {
        $("#daily-rating-window").css("display", "none");
        $("html").css("overflow", "auto")
    }
}


const dailyRatingEmojis = [
    "😭", // 1
    "😢",
    "😞",
    "😔",
    "🙁",
    "😐",
    "🙂",
    "😊",
    "😀",
    "😁" // 10
]


function openOrCloseHabitStackCreatorWindow() {
    if ($("#habit-stack-creator-window").css("display") === "none") {
        $("#habit-stack-creator-window").css("display", "flex");
        $("html").css("overflow", "hidden")
    } else {
        $("#habit-stack-creator-window").css("display", "none");
        $("html").css("overflow", "auto")
    }
}

function ExitHabitStacksCreatorWindowButton() {
    return (
        <div className = "habit-creator-window-exit-button"
        onClick = {openOrCloseHabitStackCreatorWindow}
        >
           ✖️
        </div>
    )
}

function stringOfMonth(month: number) {
    switch (month) {
        case 0:
            return "January"
        case 1:
            return "February"
        case 2:
            return "March"
        case 3:
            return "April"
        case 4:
            return "May"
        case 5:
            return "June"
        case 6:
            return "July"
        case 7:
            return "August"
        case 8:
            return "September"
        case 9:
            return "October"
        case 10:
            return "November"
        case 11:
            return "December"
        default:
            return ""
    }
}

function DayInfoTask(props: {name: string, index: number, year: number, month: number, day: number}) {
    return (
        <div className = "day-info-task">
            <div className = "day-info-task-name">
                {props.name}
            </div>

            <div className = "day-info-task-complete-button"
            onClick = {
                async () => {
                    // delete the task from the database
                    const result = await taskDeleteAPI(auth, props.index, props.year, props.month, props.day)
                    if (!result.success) {
                        alert(result.errorMessage)
                    }
                }
            }
            >
                ✔️
            </div>

        </div>
    )
}

function DayInfo(props: {dayInfo: DayInterface, dayInfoSetter: Function}) {
    const monthString: string = stringOfMonth(props.dayInfo.month);
    const dateString: string = `${monthString} ${props.dayInfo.day}, ${props.dayInfo.year}`

    const [tasks, setTasks] = useState({})

    useEffect(() => {
        // fetch the tasks from the database
        const tasksRef = ref(database, "users/" +  getCookie("user") + "/tasks/" + props.dayInfo.year + "/" + props.dayInfo.month + "/" + props.dayInfo.day)
        return onValue(tasksRef, (snapshot: DataSnapshot) => {
            const data = snapshot.val();
            setTasks(data);
            console.log(data)
        })
    }, [props.dayInfo.day, props.dayInfo.month, props.dayInfo.year])


    return (
        <div id = "day-info-window">
            <div className = "day-info-exit-button"
            onClick = {
                () => {
                    $("#day-info-window").css("display", "none")
                }
            }
            >
                ✖️
            </div>
            <div className = "day-info-day">
                {dateString}
            </div>
            <div className = "day-info-tasks-header">
                Tasks
            </div>
            <div className = "day-info-tasks">
                {
                    // TODO: render the tasks here
                    (function() {
                        if (tasks == null || tasks == undefined) {
                            return (
                                <></>
                            )
                        }

                        const components = []

                        for (let i = 0; i < Object.keys(tasks).length; i++) {
                            const key = Object.keys(tasks)[i];
                            components.push(
                                <DayInfoTask
                                name = {tasks[key]}
                                index = {i}
                                year = {props.dayInfo.year}
                                month = {props.dayInfo.month}
                                day = {props.dayInfo.day}
                                />
                            )
                        }
                        return components
                    })()
                }
            </div>

            <div className = "day-info-create-task-section">
                <input id = "day-info-create-task-name"
                placeholder = "Add a new task"
                >

                </input>
                <div className = "day-info-create-task-button"
                onClick = {
                    async () => {
                        const taskName: string = $("#day-info-create-task-name").val() as string;
                        
                        const result = await taskCreateAPI(auth, taskName, props.dayInfo.year, props.dayInfo.month, props.dayInfo.day)
                        if (!result.success) {
                            alert(result.errorMessage)
                        }
                        else {
                            $("#day-info-create-task-name").val("")
                        }
                    }
                }
                >
                    +
                </div>
            </div>
        </div>  
    )
}

function HabitStackHabit(props: {habits: string[], habitsSetter: Function, index: number}) {

    const renderUp: boolean = (function() {
        if (props.index == 0) return false
        else return true
    })()

    const renderDown: boolean = (function() {
        if (props.index == props.habits.length - 1) return false
        else return true
    })()
    
    return (
        <div className = "habit-stack-habit">
            <div className = "habit-stack-move-habit-buttons">
                {
                    (function() {
                        const components = [];
                        if (renderUp) {
                            components.push(
                                <div className = "habit-stack-move-habit-button"
                                onClick = {
                                    () => {
                                        // swap the habit with the one above it
                                        const newHabits = [...props.habits];
                                        const temp = newHabits[props.index - 1];
                                        newHabits[props.index - 1] = newHabits[props.index];
                                        newHabits[props.index] = temp;
                                        props.habitsSetter(newHabits);
                                    }
                                }
                                >
                                ↑
                                </div>
                            )
                        }
                        if (renderDown) {
                            components.push(
                                <div className = "habit-stack-move-habit-button"
                                onClick = {
                                    () => {
                                        // swap the habit with the one below it
                                        const newHabits = [...props.habits];
                                        const temp = newHabits[props.index + 1];
                                        newHabits[props.index + 1] = newHabits[props.index];
                                        newHabits[props.index] = temp;
                                        props.habitsSetter(newHabits);
                                    }
                                }
                                >
                                ↓
                                </div>
                            )
                        }
                        return components
                    })()
                }                
            </div>
            <div className = "habit-stack-habit-name">
                {props.habits[props.index]}
            </div>
            <div className = "habit-stack-delete-habit-button"
            onClick = {
                () => {
                    const newHabits = [...props.habits];
                    newHabits.splice(props.index, 1);
                    props.habitsSetter(newHabits);
                }
            }
            >
                ✖️
            </div>
        </div>
    )
}

function HabitStackCreatorWindow() {

    const [habits, setHabits] = useState([])


    return (
        <div id = "habit-stack-creator-window">
            <ExitHabitStacksCreatorWindowButton />
            <div className = "habit-stack-creator-window-header">
                Habit Stack Creator
            </div>
            <input id = "habit-stack-name-input" placeholder = "Habit Stack Name">

            </input>
            <div id = "habit-stack-area">
            {
                (function() {
                    const components = [];
                    for (let i = 0; i < habits.length; i++) {
                        components.push(<HabitStackHabit 
                            habits = {habits}
                            habitsSetter = {setHabits}
                            index = {i}
                        />)
                    }
                    return components
                })()
            }
            
            </div>

            <div className = "habit-stack-habit-creation-row">
                <div id = "habit-stack-add-habit-button"
                onClick = {
                    () => {
                        const newHabitName: string = $("#habit-stack-habit-creation-input").val() as string;
                        if (newHabitName == "") {
                            alert("Please enter a habit name")
                            return
                        }
                        const newHabits = [...habits];
                        newHabits.push(newHabitName as never);
                        setHabits(newHabits);
                        // clear the input
                        $("#habit-stack-habit-creation-input").val("")
                    }
                }
                >
                    <span>+</span>
                </div>
                <input id = "habit-stack-habit-creation-input"
                placeholder = "Habit Name"
                ></input>
            </div>
            <div id = "finish-creating-habit-stack-button">
                Create Habit Stack
            </div>
            
            
        </div>
    )
}

function openOrCloseHabitCardWindow() {
    if ($("#habit-card-window").css("display") === "none") {
        $("#habit-card-window").css("display", "flex");
        $("html").css("overflow", "hidden")
    } else {
        $("#habit-card-window").css("display", "none");
        $("html").css("overflow", "auto")
    }
}

function ExitHabitCardWindowButton() {
    return (
        <div className = "habit-card-window-exit-button"
        onClick = {openOrCloseHabitCardWindow}
        >
           ✖️
        </div>
    )
}


function HabitCardHabit(props: {habit: string, rating: number, habits: HabitCardWindowHabitWithRating[], habitSetter: Function, index: number}) {

    const renderUp = (function() {
        if (props.index == 0) return false
        else return true
    })()

    const renderDown = (function() {
        if (props.index == props.habits.length - 1) return false
        else return true
    })()


        
    const ratingString: "" | "+" | "=" | "-" = 
        (function() {
        switch (props.rating) {
            case 1:
                return "+"
            case 2:
                return "="
            case 3:
                return "-"
            default:
                return ""
        }
        })()

    return (
        <div className = "habit-card-habit">

            <div className = "habit-stack-move-habit-buttons">
                {
                    (function() {
                        const components = [];
                        if (renderUp) {
                            components.push(
                                <div className = "habit-stack-move-habit-button"
                                onClick = {
                                    () => {
                                        // swap the habit with the one above it
                                        const newHabits = [...props.habits];
                                        const temp = newHabits[props.index - 1];
                                        newHabits[props.index - 1] = newHabits[props.index];
                                        newHabits[props.index] = temp;
                                        props.habitSetter(newHabits);
                                    }
                                }
                                >
                                ↑
                                </div>
                            )
                        }
                        if (renderDown) {
                            components.push(
                                <div className = "habit-stack-move-habit-button"
                                onClick = {
                                    () => {
                                        // swap the habit with the one below it
                                        const newHabits = [...props.habits];
                                        const temp = newHabits[props.index + 1];
                                        newHabits[props.index + 1] = newHabits[props.index];
                                        newHabits[props.index] = temp;
                                        props.habitSetter(newHabits);
                                    }
                                }
                                >
                                ↓
                                </div>
                            )
                        }
                        return components
                    })()
                }                
            </div>

            <div className = "habit-card-habit-rating">
                {ratingString}
            </div>

            <div className = "habit-card-habit-name">
                {props.habit}
            </div>

            <div className = "habit-card-habit-delete-button"
            onClick = {
                () => {
                    const newHabits = [...props.habits];
                    newHabits.splice(props.index, 1);
                    props.habitSetter(newHabits);
                }
            }
            >
                ✖️
            </div>

        </div>
    )


}


function HabitCardHabitInput(props: {habitSetter: Function, habits: HabitCardWindowHabitWithRating[]}) {
    
    const [selectedRatingButton, setSelectedRatingButton] = useState(0);
    const [minusCSS, setMinusCSS] = useState("");
    const [equalsCSS, setEqualsCSS] = useState("");
    const [plusCSS, setPlusCSS] = useState("");

    /*
    0 is not selected
    - is 1
    = is 2
    + is 3
    */

    useEffect(() => {
        switch (selectedRatingButton) {
            case 0:
                setMinusCSS("")
                setEqualsCSS("")
                setPlusCSS("")
                break
            case 1:
                setMinusCSS("habit-card-habit-rate-button-selected")
                setEqualsCSS("")
                setPlusCSS("")
                break
            case 2:
                setMinusCSS("")
                setEqualsCSS("habit-card-habit-rate-button-selected")
                setPlusCSS("")
                break
            case 3:
                setMinusCSS("")
                setEqualsCSS("")
                setPlusCSS("habit-card-habit-rate-button-selected")
                break
        }
    }, [selectedRatingButton])


    return (
        <div className = "habit-card-habit-input">
            <div className = "habit-card-habit-rate-buttons">
                <div className = {"habit-card-habit-rate-button" + " " + minusCSS}
                onClick = {
                    () => {
                        if (selectedRatingButton == 1) {
                            setSelectedRatingButton(0);
                        }
                        else {
                            setSelectedRatingButton(1);
                        }

                    }
                }
                >
                    +
                </div>
                <div className = "habit-card-habit-rate-button-divider"></div>
                <div className = {"habit-card-habit-rate-button" + " " + equalsCSS}
                onClick = {
                    () => {
                        if (selectedRatingButton == 2) {
                            setSelectedRatingButton(0);
                        }
                        else {
                            setSelectedRatingButton(2);
                        }

                    }
                }
                >
                    =
                </div>
                <div className = "habit-card-habit-rate-button-divider"></div>
                <div className = {"habit-card-habit-rate-button" + " " + plusCSS}
                onClick = {
                    () => {
                        if (selectedRatingButton == 3) {
                            setSelectedRatingButton(0);
                        }
                        else {
                            setSelectedRatingButton(3);
                        }
                    }
                }
                >
                    -
                </div>
            </div>
            <input id = "habit-card-habit-name-input" placeholder = "Habit Name">
       
            </input>
            <div className = "habit-card-habit-add-button"
            onClick = {
                () => {
                    // add the habit to the habit card
                    const newHabitName: string = $("#habit-card-habit-name-input").val() as string;
                    if (newHabitName == "") {
                        alert("Please enter a habit name")
                        return
                    }
                    // make sure a rating button is selected
                    if (selectedRatingButton == 0) {
                        alert("Please select a rating")
                        return
                    }

                    const newHabitRating: number = selectedRatingButton;
                    const newHabit = {
                        name: newHabitName,
                        rating: newHabitRating
                    }
                    const newHabits = [...props.habits];
                    newHabits.push(newHabit);
                    props.habitSetter(newHabits);
                    // empty the input field
                    $("#habit-card-habit-name-input").val("")
                    // reset the rating button field
                    setSelectedRatingButton(0);
                }
            }
            >
                +
            </div>
        </div>
    )
}

interface HabitCardWindowHabitWithRating {
    name: string,
    rating: number,
}

function HabitStacksWidget() {
    return (
        <div className = "todo-list">
            <div className = "todo-list-header">
                Habit Stacks
            </div>
            <div className = "habit-stacks-widget-habit-stacks">
            
            </div>
        </div>
    )
}

function HabitCardWindow() {

    const [habits, setHabits] =  useState<HabitCardWindowHabitWithRating[]>([])

    useEffect(() => {
        console.log(habits)
    })

    return (
        <div id = "habit-card-window">
            <ExitHabitCardWindowButton />
            <div className = "habit-card-window-header">
                Habit Card
            </div>
            <div className = "habit-card-window-habits-field">
                {
                    // render each habit
                    (function(){
                        const components = [];
                        for (let i = 0; i < habits.length; i++) {
                            components.push(<HabitCardHabit 
                                habit = {habits[i].name}
                                rating = {habits[i].rating}
                                habits = {habits}
                                habitSetter = {setHabits}
                                index = {i}
                            />)
                        }
                        return components
                    })()
                }
                
            </div>
            <HabitCardHabitInput
                habitSetter = {setHabits}
                habits = {habits}
            />
            
            <div className = "habit-card-window-complete-button">
                Complete
            </div>
            
            

        </div>
    )
}

export default function Habits() {
    const [dateToDisplayOnDayInfoWindow, setDateToDisplayOnDayInfoWindow] = useState({day: 1, month: 0, year: 0})
    return (
        <>
            <div className = "habits-container">
                <HabitsBar />
                <div className = "habits-grid">
                    <HabitsCalendar
                        dayInfo = {dateToDisplayOnDayInfoWindow}
                        dayInfoSetter = {setDateToDisplayOnDayInfoWindow}
                    />
                    <ToDoList/>
                    <DailyCompletion/>
                    <HabitsYouWantToDo/>
                    <HabitsYouWantToResist/>
                    <HabitStacksWidget/>
                    <HappinessGraph/>
                </div>
                
                <DailyRatingWindow />
                <HabitCreatorWindow />
                <HabitResistorWindow />
                <HabitStackCreatorWindow />
                <HabitCardWindow />
                <DayInfo
                    dayInfo = {dateToDisplayOnDayInfoWindow}
                    dayInfoSetter = {setDateToDisplayOnDayInfoWindow}
                />
            </div>
        </>
    )
}