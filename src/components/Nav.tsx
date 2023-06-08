// nav bar for the website
// nav bar is a component that is used in all pages

export default function Nav() {

    return (
        <div className = "flex justify-center items-center mt-10">
            <div className = "grid-cols-3">
                <a href = "/" className="mx-20 col-span-1 text-3xl font-bold underline">Home</a>
                 <a href = "/dashboard" className="mx-20 col-span-1 text-3xl font-bold underline">Dashboard</a>
                <a href = "/social" className="mx-20 first-line:col-span-1 text-3xl font-bold underline">Social</a>
            </div>
        </div>
    )
}