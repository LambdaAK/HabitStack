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
            <div className = "happiness-graph-header">
                Happiness Graph
            </div>

        </div>
    )
}

function ToDoList() {
    return (
        <div className = "todo-list">
            <div className = "todo-list-header">
                Todo List
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
    return (
        <div className = "daily-completion">
            <div className = "daily-completion-header">
                Habits you want to do
            </div>

        </div>
    )
}

function HabitsYouWantToResist() {
    return (
        <div className = "daily-completion">
            <div className = "daily-completion-header">
                Habits you want to avoid
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

function DayInfo(props: {month: number, day: number, year: number}) {
    const monthString: string = stringOfMonth(props.month);
    const dateString: string = `${monthString} ${props.day}, ${props.year}`
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
    return (
        <>
            <div className = "habits-container">
                <HabitsBar />
                <div className = "habits-grid">
                    <HabitsCalendar/>
                    <HappinessGraph/>
                    <ToDoList/>
                    <DailyCompletion/>
                    <HabitsYouWantToDo/>
                    <HabitsYouWantToResist/>
                </div>
                
                
                <DailyRatingWindow />
                <HabitCreatorWindow />
                <HabitResistorWindow />
                <HabitStackCreatorWindow />
                <HabitCardWindow />
                <DayInfo month = {1} day = {1} year = {2021}/>
            </div>
        </>
    )
}