import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      item: ''
    }
  }
  handleChange = (event) => {
      this.setState({ item: event.target.value });
  }
  handleAddItem = () => {
      console.log(this.state.list);
      if (this.state.item !== '') {
          this.setState(prevState => ({
              list: [...prevState.list, prevState.item],
              item: ''
          }));
      }
  }
  render() {
    return(
        <div style={{textAlign:'center'}}>
          <h1>Todo List</h1>
          <input type="text" name='item'  onChange={this.handleChange} />
          <button type="button" onClick={this.handleAddItem}>Add</button>
          <div>
            {this.state.list.map((item) => (
              <p>{item}</p>
            ))}
          </div>
        </div>
    );
  }
}

export default App;
