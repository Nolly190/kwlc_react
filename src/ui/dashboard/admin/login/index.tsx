import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
// import { userService } from "../../../../api/auth.api";
import DualRing from "../../../../components/loader";
import { loginUser } from "../../../../controller/admin/login.controller";
import AdminLayout from "../admin.layout";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   // redirect to home if already logged in
  //   if (userService.userValue) {
  //     router.push('/admin');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const onLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await loginUser(username, password);
    if (response?.data?.status) {
      router.push("/admin");
    } else {
      toast.error(response.responseMessage);
    }
    setIsLoading(false);
  };

  return (
    <AdminLayout
      externalStyles={[]}
      navbar={""}
      title={"Login"}
      withFooter={false}
      withSideBar={false}
    >
      <div>
        <div>
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
                  disabled={isLoading}
                >
                  {isLoading ? <DualRing width="20px" height="20px" color="#fff" /> : "Submit"}
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
