import React, { Component } from 'react';

class Hello extends Component {

    componentWillUnmount() {
        alert('The component is going to be unmounted');
    }

    render() {
        return <h1>Hello Word!!!</h1>;
    }
}

export default Hello;