import {useEffect, useState} from "react";

function DemoStateFunc() {
    const [num, setNum] = useState(0);
    const [student, setStudent] = useState({})

    useEffect(() => {
        console.log("1")
    }, [num])

    // Đăặt clean up bên trong useEffect chỉ sử dụng didMount
    useEffect(() => {
        return () => {
            console.log("clean up")
        }
    }, [])

    const increment = () => {
        setNum(prevState => prevState + 1);
        setNum(prevState => prevState + 1);
        setNum(prevState => prevState + 1);
        // setNum(num + 1);
        // setNum(num + 1);
    }
    return (
        <>
            <button onClick={increment}>Increment</button>
            <h1>{num}</h1>
        </>
    )
}

export default DemoStateFunc;