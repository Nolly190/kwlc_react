import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import DualRing from "../../../../components/loader";
import { UserController } from "../../../../controller/admin/users.controller";
import UserDTO from "../../../../dto/User.dto";
import AdminLayout from "../admin.layout";
import { LoaderWrapper } from "../blog/getall";
export default function GetAllUsers() {
  const tmpUsers: UserDTO[] = [];
  const router = useRouter();
  const [users, setUsers] = useState(tmpUsers);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // getAllUsers(setUsers);
    userController.list(setUsers, setIsLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userController: UserController = new UserController();

  return (
    <>
      <AdminLayout
        externalStyles={[]}
        navbar={""}
        title={"Users"}
        withFooter={false}
        withSideBar={true}
      >
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header card-header-primary">
                <div className="nav-tabs-navigation">
                  <div className="nav-tabs-wrapper">
                    <span className="nav-tabs-title">Users</span>
                    <ul className="nav nav-tabs" data-tabs="tabs">
                      <Link href={"/admin/users/adduser"} passHref>
                        <li className="nav-item">
                          <a className="nav-link active" data-toggle="tab">
                            Register New User
                          </a>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="col-xl-8 col-md-6" id="spinner_loader"></div>
                <div className="table-responsive" id="table_div">
                  {isLoading ?
                    <LoaderWrapper>
                      <DualRing width="40px" height="40px" color="#0b0146" />
                    </LoaderWrapper> :
                    <table className="table">
                      <thead className=" text-primary">
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>User Name</th>
                        <th>Email</th>
                        {/* <th></th> */}
                        {/* <th></th> */}
                      </thead>
                      <tbody id="tbody">
                        {users?.length > 0
                          ? users.map((x, index) => {
                            return (
                              <tr key={index}>
                                <td>{x.firstName}</td>
                                <td> {x.lastName}</td>
                                <td> {x.username}</td>
                                <td> {x.email}</td>
                                {/* <td className="text-primary">
                                  <a
                                    onClick={() => {
                                      router.push(
                                        `/admin/users/edit-user?id=${x.id}`
                                      );
                                    }}
                                    className="btn btn-primary pull-right text-white"
                                  >
                                    Edit
                                  </a>
                                </td> */}
                                {/* <td className="text-primary">
                                  <a
                                    onClick={() => {
                                      alert("delete");
                                      return;
                                      const result = prompt("Confirm Delete");
                                      if (result) {
                                        //"/questionnaire/delete/[id]"
                                      } else {
                                      }
                                    }}
                                    className="btn btn-primary pull-right text-white"
                                  >
                                    Delete
                                  </a>
                                </td> */}
                              </tr>
                            );
                          })
                          : undefined}
                      </tbody>
                    </table>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
