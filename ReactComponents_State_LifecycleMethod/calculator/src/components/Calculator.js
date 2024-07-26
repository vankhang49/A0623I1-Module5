import React, { Component } from 'react';


class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            operand1: 0,
            operand2: 0,
            result: ""
        };

    }
    handleChangeOperand1 = (event) => {
        this.setState({ operand1: event.target.value });
    }

    handleChangeOperand2 = (event) => {
        this.setState({ operand2: event.target.value });
    }
    addition = () => {
        const result = parseInt(this.state.operand1) + parseInt(this.state.operand2);
        this.setState({result: result});
    }
    subtraction = () => {
        const result = parseInt(this.state.operand1) - parseInt(this.state.operand2);
        this.setState({result: result});
    }
    multiplication = () => {
        const result = parseInt(this.state.operand1) * parseInt(this.state.operand2);
        this.setState({result: this.state.operand1 * this.state.operand2});
    }
    division = () => {
        if (this.state.operand2 === 0) {
            this.setState({result: "∞, Bạn đang chia cho số 0, vui lòng nhập lại cho toán hạng 2!"});
        } else {
            const result = parseInt(this.state.operand1) / parseInt(this.state.operand2);
            this.setState({result: result});
        }

    }
    render = () => {
        return (
            <div>
                <input type="number" id={"operand1"} value={this.state.operand1} onChange={this.handleChangeOperand1}/>
                <input type="number" id={"operand2"} value={this.state.operand2} onChange={this.handleChangeOperand2}/>
                <p>Result: <span>{this.state.result}</span></p>
                <button type={"button"} onClick={this.addition}>Addition</button>
                <button type={"button"} onClick={this.subtraction}>Subtraction</button>
                <button type={"button"} onClick={this.multiplication}>Multiplication</button>
                <button type={"button"} onClick={this.division}>Division</button>
            </div>
        )
    }
}
export default Calculator;