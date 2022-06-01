import { useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import ConfirmationModal from "../../../../components/confirmationModal";
import DualRing from "../../../../components/loader";
import { DonationController } from "../../../../controller/admin/donation.controller";
import DonateItemDTO from "../../../../dto/Donate.dto";
import AdminLayout from "../admin.layout";
import { LoaderWrapper } from "../blog/getall";

export default function GetAllDonations() {
  const _tmp: DonateItemDTO[] = [];
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [items, setItems] = useState(_tmp);
  const [isLoading, setIsLoading] = useState(false)
  const [deleteId, setDeleteId] = useState(0);
  const router = useRouter();

  useEffect(() => {
    controller.list(setItems, setIsLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenModal = (id: number) => {
    setDeleteId(id);
    onOpen();
  }

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
                  {isLoading ?
                    <LoaderWrapper>
                      <DualRing width="40px" height="40px" color="#0b0146" />
                    </LoaderWrapper> :
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
                                    onClick={() => handleOpenModal(x.id)}
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
                    </table>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
      <ConfirmationModal title={"Close Donation"} description="Are you sure you want to close this donation?" action={() => {
        controller.delete(
          deleteId,
          setItems,
          items
        )
      }} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
