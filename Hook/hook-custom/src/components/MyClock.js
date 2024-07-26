import useClock from "../hooks/useClock";
import "./time.css";

function MyClock() {
    //Gọi custom hook để sử dụng
    const [time, ampm] = useClock();
    return (
        <div id="clock">
            <p className="time">{time}<span> {ampm}</span></p>
        </div>
    );
}
export default MyClock;