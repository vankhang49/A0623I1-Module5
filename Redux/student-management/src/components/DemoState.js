import {Component} from "react";

class DemoState extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
        // Call API
        this.setState({
            num: 0,
            ber: 1
        })
    }

    increment() {
        // Spread Operator
        // num = 1
        // this.setState({
        //     num: this.state.num + 1
        // })
        // num = 1
        // this.setState({
        //     num: this.state.num + 1
        // })
        // num = 1
        // this.setState({
        //     num: this.state.num + 1
        // })

        this.setState((temp) => {
            return {
                num: temp.num + 1
            }
        })
        this.setState((temp) => {
            return {
                num: temp.num + 1
            }
        })
        this.setState((temp) => {
            return {
                num: temp.num + 1
            }
        })
    }

    componentWillUnmount() {
        console.log("123")
    }

    render() {
        return (
            <>
                <h1>{this.state.num}</h1>
                <h1>{this.state.ber}</h1>
                <button onClick={() => this.increment()}>Increment</button>
            </>
        )
    }
}

export default DemoState;