import SearchIcon from '@mui/icons-material/Search';

export default function Navbar() {
    return (
        <main className="flex flex-col">
            <nav className="bg-black p-3 flex justify-between items-center fixed top-0 w-full z-70">
                <div className="text-3xl font-bold pl-5">
                    EventPro
                </div>
                <div className="flex gap-10 pl-20">
                    <a href="http://localhost:3000">Home</a>
                    <a href="http://localhost:3000">About</a>
                    <a href="http://localhost:3000">Events</a>
                    <a href="http://localhost:3000">Contact</a>
                </div>
                <div className="flex gap-5 pr-4">
                    <div className="relative">
                        <input type="text" placeholder="Search" className="border-2 rounded-md p-1 pr-9 text-gray-900" />
                        <SearchIcon className="absolute top-1/2 right-2 transform -translate-y-1/2" color="disabled" />
                    </div>
                    <div>
                        <button className="border-2 p-1">Login</button>
                    </div>
                </div>
            </nav>
        </main>
    )
}
