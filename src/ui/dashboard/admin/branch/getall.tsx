import { useDisclosure } from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import ConfirmationModal from "../../../../components/confirmationModal";
import DualRing from "../../../../components/loader";
import { BranchController } from "../../../../controller/admin/branch.controller";
import { PastorController } from "../../../../controller/admin/pastor.controller";
import { BranchDTO } from "../../../../dto/Branch.dto";
import PastorDTO from "../../../../dto/Pastor.dto";
import AdminLayout from "../admin.layout";
import { LoaderWrapper } from "../blog/getall";

export default function GetAllBranches() {
  const _tmp: BranchDTO[] = [];
  const _tmpPastors: PastorDTO[] = [];
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [deleteId, setDeleteId] = useState(0);
  const [isLoading, setIsLoading] = useState(false)

  const [items, setItems] = useState(_tmp);
  const [pastors, setPastors] = useState(_tmpPastors);

  useEffect(() => {
    branchController.list(setItems, setIsLoading);
    pastorController.list(setPastors, setIsLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenModal = (id: number) => {
    setDeleteId(id);
    onOpen();
  }

  const branchController: BranchController = new BranchController();
  const pastorController: PastorController = new PastorController();

  return (
    <>
      <AdminLayout
        externalStyles={[]}
        navbar={""}
        title={"Branhes"}
        withFooter={false}
        withSideBar={true}
      >
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header card-header-primary">
                <div className="nav-tabs-navigation">
                  <div className="nav-tabs-wrapper">
                    <span className="nav-tabs-title">Branch</span>
                    <ul className="nav nav-tabs" data-tabs="tabs">
                      <Link href={"/admin/branches/addbranch"} passHref>
                        <li className="nav-item">
                          <a className="nav-link active" data-toggle="tab">
                            Register New Branch
                          </a>
                        </li>
                      </Link>
                      <Link
                        href={"/admin/branches/branch-assign-admin"}
                        passHref
                      >
                        <li className="nav-item">
                          <a className="nav-link active" data-toggle="tab">
                            Assign Admin to Branch
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
                        <th>Title</th>
                        <th>State</th>
                        <th>Pastor</th>
                        <th>Is HQ</th>
                        <th>Date Created</th>
                        <th></th>
                        <th></th>
                      </thead>
                      <tbody id="tbody">
                        {items?.length > 0
                          ? items.map((x, index) => {
                            return (
                              <tr key={index}>
                                <td>{x.name}</td>
                                <td> {x.state}</td>
                                <td>
                                  {branchController.renderPastor(pastors, x.id)}
                                </td>
                                <td> {x.isBranchHq ? "Yes" : "No"}</td>
                                <td>
                                  {" "}
                                  {moment(x.dateCreated).format("DD/MMM/yyyy")}
                                </td>

                                <td className="text-primary">
                                  <a
                                    onClick={() => {
                                      router.push(
                                        `/admin/branches/edit-branch?id=${x.id}`
                                      );
                                    }}
                                    className="btn btn-primary pull-right text-white"
                                  >
                                    Edit
                                  </a>
                                </td>
                                <td className="text-primary">
                                  <a
                                    onClick={() => handleOpenModal(x.id)}
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
                    </table>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
      <ConfirmationModal title={"Delete Item"} description="Are you sure you want to delete this item?" action={() => {
        branchController.delete(
          deleteId,
          setItems,
          items
        )
      }} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
