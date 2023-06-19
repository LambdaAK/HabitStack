import date from "date-and-time"
import "./habitscalendar.css"
import { useEffect, useState } from "react"


interface MonthColorMapping {
    "Janurary": string,
    "Feburary": string,
    "March": string,
    "April": string,
    "May": string,
    "June": string,
    "July": string,
    "August": string,
    "September": string,
    "October": string,
    "November": string,
    "December": string
}

interface MonthTextColorMapping {
    "Janurary": string,
    "Feburary": string,
    "March": string,
    "April": string,
    "May": string,
    "June": string,
    "July": string,
    "August": string,
    "September": string,
    "October": string,
    "November": string,
    "December": string
}

const monthColors: MonthColorMapping = {
    "Janurary": "#E6E6FA",
    "Feburary": "#6495ED",
    "March": "#00FF7F",
    "April": "#FFD700",
    "May": "#9ACD32",
    "June": "#FF69B4",
    "July": "#FFA500",
    "August": "#FFFF00",
    "September": "#FF4500",
    "October": "#8B4513",
    "November": "#FF6347",
    "December": "#4682B4"
}

const monthTextColors: MonthTextColorMapping = {
    "Janurary": "black",
    "Feburary": "white",
    "March": "black",
    "April": "black",
    "May": "white",
    "June": "white",
    "July": "white",
    "August": "black",
    "September": "white",
    "October": "white",
    "November": "white",
    "December": "white"
}

function colorOfMonth(month: string): string {
    if (!Object.keys(monthColors).includes(month)) {
        return "#E6E6FA"
    }
    return monthColors[month]
}

function textColorOfMonth(month: string): string {
    if (!Object.keys(monthTextColors).includes(month)) {
        return "black"
    }
    return monthTextColors[month]
}


function getDaysInMonth(month: string, year: number): number {

    if (month == "Feburary" && date.isLeapYear(year)) {
        return 29
    }
    else if (month == "Janurary" 
    || month == "March" 
    || month == "May" 
    || month == "July" 
    || month == "August" 
    || month == "October" 
    || month == "December") {
        return 31
    }
    else if (month == "April" 
    || month == "June" 
    || month == "September" 
    || month == "November") {
        return 30
    }
    else {
        return 28
    }

}

function numberToMonth(month: number): string {
    switch (month) {
        case 0:
            return "Janurary"
        case 1:
            return "Feburary"
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
            return "Janurary"
    }
}

function monthToNumber(month: string): number {
    switch (month) {
        case "Janurary":
            return 0
        case "Feburary":
            return 1
        case "March":
            return 2
        case "April":
            return 3
        case "May":
            return 4
        case "June":
            return 5
        case "July":
            return 6
        case "August":
            return 7
        case "September":
            return 8
        case "October":
            return 9
        case "November":
            return 10
        case "December":
            return 11
        default:
            return 0
    }
}


function findDayOfTheWeekFirstDayOfMonth(monthNumber: number, year: number): string {
    const firstDayOfMonth: Date = new Date(year, monthNumber, 1)
    const dayOfWeek: string = date.format(firstDayOfMonth, "dddd")
    return dayOfWeek
}



function Sunday() {
    return (
        <div className="week-day-label sunday"
        style = {
            {
                backgroundColor: "#A3D6CC"
            }
        }
        >
            Sun
        </div>
    )
}

function Monday() {
    return (
        <div className="week-day-label monday"
        style = {
            {
                backgroundColor: "#85C4BA"
            }
        }>
            Mon
        </div>
    )
}

function Tuesday() {
    return (
        <div className="week-day-label tuesday"
        style = {
            {
                backgroundColor: "#68B2A9"
            }
        }>
            Tues
        </div>
    )
}

function Wednesday() {
    return (
        <div className="week-day-label wednesday"
        style = {
            {
                backgroundColor: "#4B9F97"
            }
        }>
            Wed
        </div>
    )
}

function Thursday() {
    return (
        <div className="week-day-label thursday"
        style = {
            {
                backgroundColor: "#2E8D86"
            }
        }>
            Thurs
        </div>
    )
}

function Friday() {
    return (
        <div className="week-day-label friday"
        style = {
            {
                backgroundColor: "#117B74"
            }
        }>
            Fri
        </div>
    )
}

function Saturday() {
    return (
        <div className="week-day-label saturday"
        style = {
            {
                backgroundColor: "#006962"
            }
        }>
            Sat
        </div>
    )
}

function numberOfWeekDay(day: string): number {
    switch (day) {
        case "Sunday":
            return 0
        case "Monday":
            return 1
        case "Tuesday":
            return 2
        case "Wednesday":
            return 3
        case "Thursday":
            return 4
        case "Friday":
            return 5
        case "Saturday":
            return 6
        default:
            return 0
    }
}

function EmptyCalendarCell(props: {columnSpan: number}) {

    const columnSpan: number = props.columnSpan

    if (columnSpan == 0) {
        return (
            <></>
        )
    }

    const extraStyle = {
        gridColumn: `1 / span ${columnSpan}`
    }


    return (
        <div className = "empty-calendar-cell fly-in-from-bottom"
        style = {extraStyle}
        >
            
        </div>
    )
}

function MonthLeftButton(props: {monthNumberSetter: Function, yearNumberSetter: Function, monthNumber: number, yearNumber: number}) {
    
    const prevMonthNumber = (function() {
        if (props.monthNumber == 0) {
            return 11
        }
        else {
            return props.monthNumber - 1
        }
    })()
    
    return (
        <div id = "month-left-button"
        style = {
            // style the button based on the previous month
            {
                backgroundColor: colorOfMonth(numberToMonth((prevMonthNumber))),
                color: textColorOfMonth(numberToMonth(prevMonthNumber))
            }
        }
        onClick = {
            () => {
                // decrement the month by one
                if (props.monthNumber == 0) {
                    // set the month to 11 and decrement the year
                    props.monthNumberSetter(11)
                    props.yearNumberSetter(props.yearNumber - 1)
                }
                // otherwise just decrement the month
                else {
                    props.monthNumberSetter(props.monthNumber - 1)
                }
            }
        }
        >
            {"<"}
        </div>
    )
}

function MonthRightButton(props: {monthNumberSetter: Function, yearNumberSetter: Function, monthNumber: number, yearNumber: number}) {
    
    const nextMonthNumber = (function() {
        if (props.monthNumber == 11) {
            return 0
        }
        else {
            return props.monthNumber + 1
        }
    })()
   
   
    return (
        <div id = "month-right-button"
        style = {
            // style the button based on the previous month
            {
                backgroundColor: colorOfMonth(numberToMonth((nextMonthNumber))),
                color: textColorOfMonth(numberToMonth(nextMonthNumber))
            }
        }
        onClick = {
            () => {
                // increment the month by one
                if (props.monthNumber == 11) {
                    // set the month to 0 and increment the year
                    props.monthNumberSetter(0)
                    props.yearNumberSetter(props.yearNumber + 1)
                }
                // otherwise just increment the month
                else {
                    props.monthNumberSetter(props.monthNumber + 1)
                }
            }
        }
        >
            {">"}
        </div>
    )
}

function EmptyCalendarCellEnd(props: {columnSpan: number}) {

    const columnSpan: number = props.columnSpan

    if (columnSpan == 0) {
        return (
            <></>
        )
    }

    const extraStyle = {
        gridColumn: `span ${columnSpan} / -1`
    }

    return (
        <div className = {"empty-calendar-cell" + " " + "fly-in-from-bottom"}
        style = {extraStyle}
        >
            
        </div>
    )
}

function Day(props: {day: number, month: number, year: number}) {

    const [extraCSS, setExtraCSS] = useState({
        opacity: 0,
    })

    const possibleExtraClasses = [
        "fly-in-from-bottom",
        "fly-in-from-left",
        "fly-in-from-right",
        "fly-in-from-top"
    ]

    const [extraClasses, setExtraClasses] = useState("")

    useEffect(() => {
        setTimeout(() => {
                // make it visible
            setExtraCSS({
                opacity: 1
            })
            const extraClass: string = possibleExtraClasses[props.day % 4]
            setExtraClasses(extraClass)
        }, props.day * 100)

    }, [])

    useEffect(() => {
        // make the opacity 0
        setExtraCSS({
            opacity: 0
        })
        // set the extra classes to empty
        setExtraClasses("")
        // set the timeout
        setTimeout(() => {
            // make it visible
            setExtraCSS({
                opacity: 1
            })
            const extraClass: string = possibleExtraClasses[props.day % 4]
            setExtraClasses(extraClass)
        }, props.day * 15)
    }, [props.day, props.month, props.year])

    return (
        <div className = {"calendar-day" + " " + extraClasses}
        style = {extraCSS}
        >
            <div>
               {props.day} 
            </div>
            
        </div>
    )
}

/*
    January (Winter): #E6E6FA (Lavender)
    February (Winter): #6495ED (Cornflower Blue)
    March (Spring): #00FF7F (Spring Green)
    April (Spring): #FFD700 (Gold)
    May (Spring): #9ACD32 (Yellow Green)
    June (Summer): #FF69B4 (Hot Pink)
    July (Summer): #FFA500 (Orange)
    August (Summer): #FFFF00 (Yellow)
    September (Autumn/Fall): #FF4500 (Orange Red)
    October (Autumn/Fall): #8B4513 (Saddle Brown)
    November (Autumn/Fall): #FF6347 (Tomato)
    December (Winter): #4682B4 (Steel Blue)
*/



function MonthLabel(props: {monthNumber: number, yearNumber: number}) {
    const monthName: string = numberToMonth(props.monthNumber)
    const yearNumber: number = props.yearNumber

    const [color, setColor] = useState("")
    const [textColor, setTextColor] = useState("")

    useEffect(() => {
        switch (monthName) {
            case "Janurary":
                setColor("#E6E6FA")
                setTextColor("black")
                break
            case "Feburary":
                setColor("#6495ED")
                setTextColor("white")
                break
            case "March":
                setColor("#00FF7F")
                setTextColor("black")
                break
            case "April":
                setColor("#FFD700")
                setTextColor("black")
                break
            case "May":
                setColor("#9ACD32")
                setTextColor("white")
                break
            case "June":
                setColor("#FF69B4")
                setTextColor("white")
                break
            case "July":
                setColor("#FFA500")
                setTextColor("white")
                break
            case "August":
                setColor("#FFFF00")
                setTextColor("black")
                break
            case "September":
                setColor("#FF4500")
                setTextColor("white")
                break
            case "October":
                setColor("#8B4513")
                break
            case "November":
                setColor("#FF6347")
                break
            case "December":
                setColor("#4682B4")
                break
            default:
                setColor("#E6E6FA")
        }
    }, [monthName])

    return (
        <div className = "month-label"
        style = {
            {
                backgroundColor: color,
                color: textColor
            }
        }
        >
            {
                `${monthName} ${yearNumber}`
            }
        </div>
    )
}




export default function HabitsCalendar() {

    // get the current day, month, and year

    const d: Date = new Date()

    const startingDay: number = d.getDate()
    const startingMonth: number = d.getMonth()
    const startingYear: number = d.getFullYear()

    const [dayNumber, setDayNumber] = useState(startingDay) // use this to somehow color the the current day
    const [monthNumber, setMonthNumber] = useState(startingMonth)
    const [yearNumber, setYearNumber] = useState(startingYear)

    const [animateDays, setAnimateDays] = useState(true)

    useEffect(() => {
        setAnimateDays(true)
    }, [])


    return (
        <div id="habits-calendar">

            <div className = "habits-calendar-top-container">
                <MonthLeftButton 
                    monthNumberSetter={setMonthNumber} 
                    yearNumberSetter={setYearNumber} 
                    monthNumber = {monthNumber} 
                    yearNumber = {yearNumber}
                />
                <MonthLabel monthNumber = {monthNumber} yearNumber = {yearNumber} />
                <MonthRightButton 
                    monthNumberSetter={setMonthNumber} 
                    yearNumberSetter={setYearNumber} 
                    monthNumber = {monthNumber} 
                    yearNumber = {yearNumber}
                />
            </div>
            

            <div className = "days-container">
                <Sunday />
                <Monday />
                <Tuesday />
                <Wednesday />
                <Thursday />
                <Friday />
                <Saturday />
                <EmptyCalendarCell columnSpan = {numberOfWeekDay(findDayOfTheWeekFirstDayOfMonth(monthNumber, yearNumber))} />
                
                {
                    // render the days of the month
                    (function() {
                        const eachday = []
                        
                        const daysInMonth: number = getDaysInMonth(numberToMonth(monthNumber), yearNumber)
                        for (let i = 1; i <= daysInMonth; i++) {
                            eachday.push(i)
                        }

                        const components = eachday.map((day) => {
                            return (
                                <Day day = {day} month = {monthNumber} year = {yearNumber}/>
                            )
                        })
                        return components
                    })()
                }

                <EmptyCalendarCellEnd 
                    columnSpan = {
                        (function() {
                            // get the day of the week of the last day of the month
                            const lastDayOfTheMonth: number = getDaysInMonth(numberToMonth(monthNumber), yearNumber)
                            const d: Date = new Date(yearNumber, monthNumber, lastDayOfTheMonth)
                            const dayOfTheWeek: string = date.format(d, "dddd")
                          
                            switch(dayOfTheWeek) {
                                case "Sunday":
                                    return 6
                                case "Monday":
                                    return 5
                                case "Tuesday":
                                    return 4
                                case "Wednesday":
                                    return 3
                                case "Thursday":
                                    return 2
                                case "Friday":
                                    return 1
                                case "Saturday":
                                    return 0
                                default:
                                    return 0
                            }
                        })()
                    }
                        
                />

            </div>
            
        </div>
    )
}
