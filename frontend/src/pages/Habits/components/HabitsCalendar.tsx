import date from "date-and-time"
import "./habitscalendar.css"


function getDaysInMonth(month: string): number {
    const year: number = getYear()
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

function getYear(): number {
    const now: Date = new Date()
    const year: number = now.getFullYear()
    return year
    
}


function getMonth(): string {
    const now: Date = new Date()
    const month: string = date.format(now, "MMMM")
    return month
}

function findDayOfTheWeekFirstDayOfMonth(month: string): string {
    const year: number = getYear()
    const firstDayOfMonth: Date = new Date(year, date.parse(month, "MMMM").getMonth(), 1)
    const dayOfWeek: string = date.format(firstDayOfMonth, "dddd")
    return dayOfWeek
}



function Sunday() {
    return (
        <div className="week-day-label sunday">
            Sunday
        </div>
    )
}

function Monday() {
    return (
        <div className="week-day-label monday">
            Mon
        </div>
    )
}

function Tuesday() {
    return (
        <div className="week-day-label tuesday">
            Sun
        </div>
    )
}

function Wednesday() {
    return (
        <div className="week-day-label wednesday">
            Wed
        </div>
    )
}

function Thursday() {
    return (
        <div className="week-day-label thursday">
            Thurs
        </div>
    )
}

function Friday() {
    return (
        <div className="week-day-label friday">
            Fri
        </div>
    )
}

function Saturday() {
    return (
        <div className="week-day-label saturday">
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
        <div className = "empty-calendar-cell"
        style = {extraStyle}
        >
            
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
        <div className = "empty-calendar-cell"
        style = {extraStyle}
        >
            
        </div>
    )
}


export default function HabitsCalendar() {

    return (
        <div id="habits-calendar">
            <div className = "month-label">
                {getMonth()}
            </div>

            <div className = "days-container">
                <Sunday />
                <Monday />
                <Tuesday />
                <Wednesday />
                <Thursday />
                <Friday />
                <Saturday />
                <EmptyCalendarCell columnSpan = {numberOfWeekDay(findDayOfTheWeekFirstDayOfMonth(getMonth()))} />
                
                {
                    // render the days of the month
                    (function() {
                        const eachday = []
                        
                        const daysInMonth: number = getDaysInMonth(getMonth())
                        for (let i = 1; i <= daysInMonth; i++) {
                            eachday.push(i)
                        }

                        const components = eachday.map((day) => {
                            return (
                                <div className = "calendar-day">
                                    {day}
                                </div>
                            )
                        })
                        return components
                    })()
                }

                <EmptyCalendarCellEnd columnSpan = {7 - numberOfWeekDay(findDayOfTheWeekFirstDayOfMonth(getMonth())) - getDaysInMonth(getMonth()) % 7} />

                

            </div>
            
        </div>
    )
}
