import React from "react";

const Footer = () => {
    const year = new Date().getFullYear()
    return(
        <footer className="flex flex-rows items-center fixed justify-center bg-indigo-500 h-20 bottom-0 w-full">
            <div className="font-bold text-center p-4 text-white">
                © {year} Copyright: BaseCamp
            </div>
        </footer>
    )
}

export default Footer