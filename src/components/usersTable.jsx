import React, { Component } from "react";
import Table from "./table";
import userService from "../services/userService";

class UsersTable extends Component {
  state = {
    users: []
  };

  async componentDidMount() {
    const users = await userService.getUsers();
    this.setState({ users: users.data });
  }

  columns = [
    { path: "name", label: "Name" },
    { path: "email", label: "Email" },
    { path: "phone", label: "Phone" }
  ];

  render() {
    const { length: count } = this.state.users;

    if (count === 0) return <p>There are no users in the database.</p>;

    return <Table columns={this.columns} data={this.state.users} />;
  }
}

export default UsersTable;
