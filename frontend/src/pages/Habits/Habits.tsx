import Nav from "../../components/nav/Nav";
import "./habits.css";
import HabitsCalendar from "./components/HabitsCalendar"
import $ from "jquery";
import { useState } from "react";


function HabitsBar() {
    return (
        <div id = "habits-bar">
            <div className = "habits-bar-link">
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
            </div>
        </>
    )
}