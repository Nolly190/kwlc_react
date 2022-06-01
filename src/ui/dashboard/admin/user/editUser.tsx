import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import DualRing from "../../../../components/loader";
import { UserController } from "../../../../controller/admin/users.controller";
import UserDTO from "../../../../dto/User.dto";
import { getParam } from "../../../../utils";
import AdminLayout from "../admin.layout";
import { LoaderWrapper } from "../events/getAll";

export interface ISetUser {
  setFirstName: Function;
  setLastName: Function;
  setEmail: Function;
  setUsername: Function;
  setIsLoading: Function;
  setError: Function;
}

export default function EditUser() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [id, setId] = useState(0);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>()

  useEffect(() => {
    //alert(md);
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = useRouter();

  let userController: UserController = new UserController();

  const onClick = (e) => {
    e.preventDefault();
    userController.update(
      new UserDTO({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
      }),
      id
    );
  };

  useEffect(() => {
    error && toast.error(error);
    setTimeout(() => {
      router.push("/admin/users")
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])


  const getUser = () => {
    const idParam = getParam("id");
    if (!idParam) {
      router.push("/admin/");
    } else {
      setId(parseInt(idParam));
      userController.read(
        {
          setUsername: setUsername,
          setEmail: setEmail,
          setFirstName: setFirstName,
          setLastName: setLastName,
          setIsLoading: setIsLoading,
          setError: setError
        },
        parseInt(idParam)
      );
    }
  };

  return (
    <AdminLayout
      externalStyles={[]}
      navbar={""}
      title={"Edit User"}
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
              {isLoading ?
                <LoaderWrapper>
                  <DualRing width="40px" height="40px" color="#0b0146" />
                </LoaderWrapper> :
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
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
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
                          value={lastName}
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
                          value={email}
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
                  <div className="clearfix"></div>
                  <div className="row mt-5">
                    <div className="col-md-12">
                      <button
                        type="submit"
                        id="submitBtn"
                        className="btn btn-primary pull-right"
                        onClick={(e) => onClick(e)}
                      >
                        Update
                      </button>
                      <div className="clearfix"></div>
                    </div>
                  </div>
                </form>
              }
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
