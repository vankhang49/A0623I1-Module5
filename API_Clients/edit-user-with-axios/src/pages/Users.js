import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        axios
            .get("http://localhost:3001/api/users")
            .then(res => {
                this.setState({ users: res.data });
            })
            .catch(err => {
                throw err;
            });
    }

    handleCreate = () => {
        window.location.href = "/user/add";
    };

    render() {
        const { users } = this.state;
        return (
            <div>
                <h1>Users</h1>
                {users.map(user => (
                    <div key={user.id}>
                        <a href={`/user/${user.id}`}> {user.name} </a>
                    </div>
                ))}
                <button type="button" onClick={this.handleCreate}>
                    Create
                </button>
            </div>
        );
    }
}

export default Users;