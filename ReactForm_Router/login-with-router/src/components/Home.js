import { useLocation } from "react-router-dom";

function Home() {
    const {state} = useLocation();
    return (
        <div>
            {state && state.email ? (
                <>
                    <h3>Sign in successfully!!!</h3>
                    <h2>Hello {state.email}</h2>
                </>
            ) : (
                <>
                    <h2>You are not logged in, please login!</h2>
                    <a href="/login">Login</a>
                </>
            )}
        </div>
    );
}

export default Home;