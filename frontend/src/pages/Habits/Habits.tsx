import Nav from "../../components/nav/Nav";
import "./habits.css";
import HabitsCalendar from "./components/HabitsCalendar"


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
            <div className = "habits-bar-link">
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



function DailyRatingWindow() {

}



export default function Habits() {
    return (
        <>
            <div className = "habits-container">
                <HabitsBar />
                <HabitsCalendar />
                <HappinessGraph />
            </div>
        </>
    )
}