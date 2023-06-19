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
            <div className = "habits-bar-link">
                Habit Creator
            </div>
            <div className = "habits-bar-link">
                Habit Resistor
            </div>
            <div className = "habits-bar-link"
            onClick = {openOrCloseDailyRatingWindow}
            >
                Daily Rating
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
    } else {
        $("#daily-rating-window").css("display", "none");
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
            </div>
        </>
    )
}