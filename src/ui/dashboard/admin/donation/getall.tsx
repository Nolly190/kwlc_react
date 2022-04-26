import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { BranchController } from "../../../../controller/admin/branch.controller";
import { DonationController } from "../../../../controller/admin/donation.controller";
import { BranchDTO } from "../../../../dto/Branch.dto";
import DonateItemDTO from "../../../../dto/Donate.dto";
import UserDTO from "../../../../dto/User.dto";
import AdminLayout from "../admin.layout";

export default function GetAllDonations() {
  const _tmp: DonateItemDTO[] = [];
  const [items, setItems] = useState(_tmp);
  const router = useRouter();

  useEffect(() => {
    controller.list(setItems);
  }, []);

  console.log("items", items);

  const controller: DonationController = new DonationController();

  return (
    <>
      <AdminLayout
        externalStyles={[]}
        navbar={""}
        title={"Donations"}
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
                      <Link href="/admin/donations/adddonation" passHref>
                        <li className="nav-item">
                          <a className="nav-link active" data-toggle="tab">
                            Create New Donation
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
                  <table className="table">
                    <thead className=" text-primary">
                      <th>Title</th>
                      <th>Description</th>
                      <th></th>
                    </thead>
                    <tbody id="tbody">
                      {items?.length > 0
                        ? items?.map((x, index) => {
                          return (
                            <tr key={index}>
                              <td>{x.title}</td>
                              <td> {x.description || ""}</td>

                              <td className="text-primary">
                                <a
                                  onClick={() => {
                                    router.push(
                                      `/admin/donations/edit-donation?id=${x.id}`
                                    );
                                  }}
                                  className="btn btn-primary pull-right text-white"
                                >
                                  Edit
                                </a>
                              </td>
                              <td className="text-primary">
                                <a
                                  onClick={() => {
                                    controller.delete(x.id, setItems, items);
                                  }}
                                  className="btn btn-primary pull-right text-white"
                                >
                                  Close
                                </a>
                              </td>
                            </tr>
                          );
                        })
                        : undefined}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
