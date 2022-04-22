import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../../../../controller/admin/login.controller";
import AdminLayout from "../admin.layout";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onLogin = async (e) => {
    e.preventDefault();
    const response = await loginUser(username, password);
    console.log("response", response);
    if (response?.data?.status) {
      router.push("/admin");
    } else {
      toast.error(response.responseMessage);
    }
  };

  return (
    <AdminLayout
      externalStyles={[]}
      navbar={""}
      title={"Login"}
      withFooter={false}
      withSideBar={false}
    >
      <div className="row ">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header card-header-primary">
              <h4 className="card-title">KWLC: Login</h4>
            </div>
            <div className="card-body">
              <form id="loginForm" method="post" action="">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="bmd-label-floating">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="bmd-label-floating">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary pull-right"
                  onClick={(e) => onLogin(e)}
                >
                  Submit
                </button>
                <div className="clearfix"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
