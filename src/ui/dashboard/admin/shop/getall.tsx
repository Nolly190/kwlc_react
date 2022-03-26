import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { BranchController } from "../../../../controller/admin/branch.controller";
import { DonationController } from "../../../../controller/admin/donation.controller";
import { ShopController } from "../../../../controller/admin/shop.controller";
import { BranchDTO } from "../../../../dto/Branch.dto";
import DonateItemDTO from "../../../../dto/Donate.dto";
import { ShopDTO } from "../../../../dto/ShopItem.dto";
import UserDTO from "../../../../dto/User.dto";
import AdminLayout from "../admin.layout";

export default function GetAllShopItems() {
  const _tmp: ShopDTO[] = [];
  const [items, setItems] = useState(_tmp);
  const router = useRouter();
  console.log("items", items);

  useEffect(() => {
    controller.list(setItems);
  }, []);

  const controller: ShopController = new ShopController();

  return (
    <>
      <AdminLayout
        externalStyles={[]}
        navbar={""}
        title={"Products"}
        withFooter={false}
        withSideBar={true}
      >
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header card-header-primary">
                <div className="nav-tabs-navigation">
                  <div className="nav-tabs-wrapper">
                    <span className="nav-tabs-title">Dashboard</span>
                    <ul className="nav nav-tabs" data-tabs="tabs">
                      <Link href={"/admin/marketplace/addproduct"} passHref>
                        <li className="nav-item">
                          <a className="nav-link active" data-toggle="tab">
                            Create New Product
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
                      <th>Amount</th>
                      <th>Quantity</th>
                      <th>Date Created</th>
                      <th></th>
                      <th></th>
                    </thead>
                    <tbody id="tbody">
                      {items?.length > 0
                        ? items.map((x, index) => {
                            return (
                              <tr key={index}>
                                <td
                                  onClick={() =>
                                    (window.location.href = `/get-donation?id=${x.id}`)
                                  }
                                >
                                  {x.title}
                                </td>
                                <td>{x.price}</td>
                                <td>{x.quantity}</td>
                                <td>
                                  {moment(x.dateCreated).format("yyyy/MM/DD")}
                                </td>

                                <td className="text-primary">
                                  <a
                                    onClick={() => {
                                      router.push(
                                        `/admin/marketplace/edit-shopitem?id=${x.id}`
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
                                    Delete
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
