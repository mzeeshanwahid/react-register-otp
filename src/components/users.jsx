import React, { Component } from "react";
import UsersTable from "./usersTable";

class Users extends Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          <UsersTable />
        </div>
      </div>
    );
  }
}

export default Users;
