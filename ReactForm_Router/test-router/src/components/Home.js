import {Link} from "react-router-dom";
import React from "react";

export default function Home() {
    return (
        <>
            <main>
                <h2>Welcome to the homepage!</h2>
            </main>
            <nav>
                <Link to="/about">About</Link>
            </nav>
        </>
    );
}