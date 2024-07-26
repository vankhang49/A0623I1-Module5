import { useState } from "react";

export default function useIncrement(addAmount) {
    const [counter, setCounter] = useState(0);

    function inCrease(){
        setCounter(prevCount => prevCount + addAmount);
    }

    return [counter, inCrease];
}