import { useState, useEffect } from "react";

function Timer() {
    const [timer, setTimer] = useState(10)
    const [timesUp, setTimesUp] = useState(false)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimer(prevTimer => prevTimer - 1);
        }, 1000);

        if (timer === 0) {
            clearInterval(intervalId);
            setTimesUp(true);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [timer]);

    useEffect(() => {
        if (!timesUp) return;
        alert("Time's up");
    }, [timesUp]);

    return (
        <div>
            <h1>Countdown from 10</h1>
            <p>Remaining time: {timer}s</p>
        </div>
    );
}
export default Timer;