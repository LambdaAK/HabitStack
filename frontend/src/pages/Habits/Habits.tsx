import Nav from "../../components/nav/Nav";
import "./habits.css";
import HabitsCalendar from "./components/HabitsCalendar"
import $ from "jquery";
import { Key, useEffect, useState } from "react";


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
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [action, setAction] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");
    const [obvious, setObvious] = useState("");
    const [attractive, setAttractive] = useState("");
    const [easy, setEasy] = useState("");
    const [satisfying, setSatisfying] = useState("");

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
                >
                </input>
                <div className = "implementation-intention-sub-label">
                    at time
                </div>
                <input className = "implementation-intention-input"
                placeholder = "time"
                >
                </input>
                <div className = "implementation-intention-sub-label">
                    at location
                </div>
                <input className = "implementation-intention-input"
                placeholder = "location"
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
                >
                </input>
                <div className = "implementation-intention-sub-label">
                    I will make it attractive by
                </div>
                <input className = "implementation-intention-input"
                placeholder = "attractive"
                >
                </input>
                <div className = "implementation-intention-sub-label">
                    I will make it easy by
                </div>
                <input className = "implementation-intention-input"
                placeholder = "easy"
                >
                </input>
                <div className = "implementation-intention-sub-label">
                    I will make it satisfying by
                </div>
                <input className = "implementation-intention-input"
                placeholder = "satisfying"
                >
                </input>
                
            </div>
            <div id = "create-habit-button">
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
    const [name, setName] = useState("")
    const [invisible, setInvisible] = useState("")
    const [unattractive, setUnattractive] = useState("")
    const [difficult, setDifficult] = useState("")
    const [unsatisfying, setUnsatisfying] = useState("")

    return (
        <div id = "habit-resistor-window">
            <ExitHabitResistorWindowButton />
            <div className = "habit-resistor-window-header">
                Habit Resistor
            </div>
            <input id = "habit-creator-window-name-input"
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
                >
                </input>
                <div className = "implementation-intention-sub-label">
                    I will make it unattractive by
                </div>
                <input className = "implementation-intention-input"
                placeholder = "unattractive"
                >
                </input>
                <div className = "implementation-intention-sub-label">
                    I will make it difficult by
                </div>
                <input className = "implementation-intention-input"
                placeholder = "difficult"
                >
                </input>
                <div className = "implementation-intention-sub-label">
                    I will make it unsatisfying by
                </div>
                <input className = "implementation-intention-input"
                placeholder = "unsatisfying"
                >
                </input>
                
            </div>
            <div id = "resist-habit-button">
                Resist Habit
            </div>

        </div>
    )

}

function DailyRatingWindow() {

    const [rating, setRating] = useState(6);

    return (
        <div id = "daily-rating-window">
            <DailyRatingWindowExitButton />
            <div className = "daily-rating-window-header">
                Daily Rating
            </div>
            <div className = "current-daily-rating-header">
                Current Rating: 
                <span className = "current-daily-rating">
                    {dailyRatingEmojis[rating - 1]}
                </span>

            </div>
            <div className = "daily-rating-input-panel">
                {
                    (function() {
                        let buttons = [];
                        for (let i = 1; i <= 10; i++) {
                            buttons.push(
                                <div className = "daily-rating-input-button"
                                onClick = {() => setRating(i)}
                                >
                                    {dailyRatingEmojis[i - 1]}
                                </div>
                            )
                        }
                        return buttons
                    })()
                }
            </div>
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

function HabitCardHabit(props: {habitsSetter: Function, habits: string[], index: number}) {
    
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
        <div className = "habit-card-habit">
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
            <input className = "habit-card-habit-name" placeholder = "Habit Name">
       
            </input>
            <div className = "habit-card-habit-delete-button">
                ✖️
            </div>
        </div>
    )
}


function HabitCardWindow() {


    const [habits, setHabits] = useState(["First habit"])



    return (
        <div id = "habit-card-window">
            <ExitHabitCardWindowButton />
            <div className = "habit-card-window-header">
                Habit Card
            </div>
            <div className = "habit-card-window-habits-field">
                {
                    (function() {
                        const components = [];
                        for (let i = 0; i < habits.length; i++) {
                            components.push(
                            <HabitCardHabit 
                                habitsSetter = {setHabits}
                                habits = {habits}
                                index = {i}
                            />)
                        }
                        return components
                    })()
                }
                <div className = "habit-card-window-add-habit-button">
                    Add a daily habit
                </div>
            </div>
            <div className = "habit-card-window-complete-button">
                Complete
            </div>
            
            

        </div>
    )
}

export default function Habits() {
    return (
        <>
            <div className = "habits-container">
                <HabitsBar />
                <HabitsCalendar />
                <HappinessGraph />
                <DailyRatingWindow />
                <HabitCreatorWindow />
                <HabitResistorWindow />
                <HabitStackCreatorWindow />
                <HabitCardWindow />
            </div>
        </>
    )
}