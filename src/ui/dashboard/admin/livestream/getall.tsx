import { useDisclosure } from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import ConfirmationModal from "../../../../components/confirmationModal";
import DualRing from "../../../../components/loader";
import { LiveStreamController } from "../../../../controller/admin/livestream.controller";
import { LiveStreamDTO } from "../../../../dto/LiveStream.dto";
import { truncateText } from "../../../../utils";
import AdminLayout from "../admin.layout";
import { LoaderWrapper } from "../blog/getall";

export default function GetAllLivestream() {
  const _tmp: LiveStreamDTO[] = [];
  const [items, setItems] = useState(_tmp);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [deleteId, setDeleteId] = useState(0);

  useEffect(() => {
    controller.list(setItems, setIsLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const controller: LiveStreamController = new LiveStreamController();

  const handleOpenModal = (id: number) => {
    setDeleteId(id);
    onOpen();
  }

  return (
    <>
      <AdminLayout
        externalStyles={[]}
        navbar={""}
        title={"Livestreams"}
        withFooter={false}
        withSideBar={true}
      >
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header card-header-primary">
                <div className="nav-tabs-navigation">
                  <div className="nav-tabs-wrapper">
                    <span className="nav-tabs-title">Streams</span>
                    <ul className="nav nav-tabs" data-tabs="tabs">
                      <Link href="/admin/livestream/addlivestream" passHref>
                        <li className="nav-item">
                          <a className="nav-link active" data-toggle="tab">
                            Create New Stream
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
                        <th>Active</th>
                        <th>Date</th>
                        <th></th>
                      </thead>
                      <tbody id="tbody">
                        {items?.length > 0
                          ? items.map((x, index) => {
                            return (
                              <tr key={index}>
                                <td
                                  onClick={() =>
                                    (window.location.href = `/get-livestream?id=${x.id}`)
                                  }
                                >
                                  {x.title}
                                </td>
                                <td> {truncateText(x.description) || ""}</td>
                                <td> {x.isActive ? "Yes" : "No"}</td>
                                <td>
                                  {" "}
                                  {moment(x.dateOfStream).format("yyyy/MM/DD")}
                                </td>

                                <td className="text-primary">
                                  <a
                                    onClick={() => {
                                      router.push(
                                        `/admin/livestream/edit-livestream?id=${x.id}`
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
                                    Stop
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
      <ConfirmationModal title={"Stop Livestream"} description="Are you sure you want to stop this stream?" action={() => {
        controller.delete(
          deleteId,
          setItems,
          items
        )
      }} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
