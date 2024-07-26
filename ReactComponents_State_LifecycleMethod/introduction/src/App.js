import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpand: false,
            contentButton: 'Xem giới thiệu',
            displayStyle: 'none'
        }
    }

    handler = () => {
        this.setState(prevState => ({
            isExpand: !prevState.isExpand,
            contentButton: prevState.isExpand ? 'Xem giới thiệu' : 'Đóng giới thiệu',
            displayStyle: prevState.isExpand ? 'none' : 'block'
        }));
    }

    render() {
        return (
            <div>
                <h1 style={{backgroundColor: 'green', color: 'white'}}>Conditional Rendering</h1>
                <button onClick={this.handler}>{this.state.contentButton}</button>
                <div style={{display: this.state.displayStyle}}>
                    <strong>Giới thiệu</strong>
                    <p>Trong ReactJs, đôi khi bạn có một số component và tuỳ thuộc vào từng điều kiện ví dụ như trạng
                        thái của
                        state, props,... mà bạn muốn hiển thị một hoặc một số component nào đó. Khi đó bạn có thể sử
                        dụng
                        Conditional
                        rendering để render ra component mà bạn mong muốn.</p>
                </div>
            </div>
        )
    }
}

export default App;
