import React, { useEffect, useRef, useState } from "react";
import { UserController } from "../../../../controller/admin/users.controller";
import UserDTO from "../../../../dto/User.dto";
import AdminLayout from "../admin.layout";

export default function AdminAddUser() {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  let userController: UserController = new UserController();

  const onClick = (e) => {
    e.preventDefault();
    userController.create(
      new UserDTO({
        email: email,
        firstName: firstName,
        lastName: lastName,
        username: username,
        phone: phone,
      })
    );
  };

  return (
    <AdminLayout
      externalStyles={[]}
      navbar={""}
      title={"Add User"}
      withFooter={false}
      withSideBar={true}
    >
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header card-header-primary">
              <h4 className="card-title">Create New User</h4>
            </div>
            <div className="card-body">
              <form id="form">
                <input type="hidden" element-data="key" value="category" />
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        element-data="name"
                        onChange={(e) => setFirstname(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="location"
                        name="location"
                        element-data="description"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group" style={{ marginTop: 37 }}>
                      <label className="bmd-label-floating">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="code"
                        name="code"
                        element-data="code"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group" style={{ marginTop: 37 }}>
                      <label className="bmd-label-floating">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        element-data="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group" style={{ marginTop: 37 }}>
                      <label className="bmd-label-floating">Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        element-data="phone"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="clearfix"></div>
                <div className="row mt-5">
                  <div className="col-md-12">
                    <button
                      type="submit"
                      id="submitBtn"
                      className="btn btn-primary pull-right"
                      onClick={(e) => onClick(e)}
                    >
                      Create
                    </button>
                    <div className="clearfix"></div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
