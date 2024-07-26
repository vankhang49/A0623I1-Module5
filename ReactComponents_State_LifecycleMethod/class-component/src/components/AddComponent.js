import { Component } from 'react';

class AddComponent extends Component {
    render() {
        return <h1>Total: {this.props.firstNumber + this.props.secondNumber}</h1>
    }
}

export default AddComponent;