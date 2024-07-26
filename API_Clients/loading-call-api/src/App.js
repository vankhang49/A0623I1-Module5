import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.getUsers()
        .then(res => {
          this.setState({ users: res.data });
        })
        .catch(err => {
          throw err;
        })
        .finally(() => {
          this.setState({ loading: false });
        });
  }

  // getUsers = () => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       axios
  //           .get("http://localhost:3001/api/users")
  //           .then(res => {
  //             resolve(res);
  //           })
  //           .catch(err => {
  //             reject(err);
  //           });
  //     }, 3000);
  //   });
  // };

  getUsers = async () => {
    await new Promise(resolve => {
      setTimeout(resolve, 3000);
    });
    return await axios.get("http://localhost:3001/api/users");
  };

  render() {
    const { loading, users } = this.state;
    if (loading) return <p>loading...</p>;
    return (
        <div>
          <h1>Users</h1>
          <ul>
            {users.map(user => (
                <li key={user.id}> {user.name} </li>
            ))}
          </ul>
        </div>
    );
  }
}

export default App;
