import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { blockPublisherApi, getPublishersApi } from "../../../../api/publishers.api";
import { statusEnum } from "../../../../enums/util.enum";
import { PublishersHistoryResponse } from "../../../../types/appTypes";
import AdminLayout from "../admin.layout";
import ConfirmPaymentModal from "./components/confirmPaymentModal";
import DonationsModal from "./components/donationsModal";
import MessageModal from "./components/messageModal";

export default function GetAllPublishers() {
    const [publishers, setPublishers] = useState<PublishersHistoryResponse[]>([]);
    const [paymentModalIsOpen, setPaymentModalIsOpen] = useState(false)
    const [messageModalIsOpen, setMessageModalIsOpen] = useState(false)
    const [donationModalIsOpen, setDonationModalIsOpen] = useState(false)
    const [id, setId] = useState<number>()
    const router = useRouter()

    useEffect(() => {
        async function getAllPublishers() {
            const response = await getPublishersApi()
            if (response.code >= statusEnum.ok) {
                setPublishers(response?.data?.data?.data)
            } else {
                toast.error(response.message);
            }
        }

        getAllPublishers()
    }, []);

    const handleOpenDonations = async (id: number) => {
        setId(id)
        setDonationModalIsOpen(true)
    }

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
                                        <span className="nav-tabs-title">Publishers</span>
                                        <ul className="nav nav-tabs" data-tabs="tabs">
                                            <Link href={"/admin/publishers/register"} passHref>
                                                <li className="nav-item mr-2">
                                                    <a className="nav-link active" data-toggle="tab">
                                                        Register New Publisher
                                                    </a>
                                                </li>
                                            </Link>
                                            <li className="nav-item mr-2" onClick={() => setPaymentModalIsOpen(true)}>
                                                <a className="nav-link active" data-toggle="tab">
                                                    Confirm Payment
                                                </a>
                                            </li>
                                            <li className="nav-item" onClick={() => setMessageModalIsOpen(true)}>
                                                <a className="nav-link active" data-toggle="tab">
                                                    Send Message
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="col-xl-8 col-md-6" id="spinner_loader"></div>
                                <div className="table-responsive" id="table_div">
                                    <table className="table">
                                        <thead className=" text-primary">
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Email</th>
                                            <th>Phone No</th>
                                            <th>Account Blocked</th>
                                            <th></th>
                                            <th></th>
                                            {/* <th></th> */}
                                        </thead>
                                        <tbody id="tbody">
                                            {publishers?.length > 0
                                                ? publishers.map((x, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{x.firstName}</td>
                                                            <td> {x.lastName}</td>
                                                            <td> {x.email}</td>
                                                            <td> {x.phoneNumber}</td>
                                                            <td> {x.isAccountBlocked.toString()}</td>
                                                            <td className="text-primary">
                                                                <a
                                                                    onClick={() => {
                                                                        router.push(
                                                                            `/admin/publishers/edit?id=${x.id}`
                                                                        );
                                                                    }}
                                                                    className="btn btn-primary pull-right text-white"
                                                                >
                                                                    Edit
                                                                </a>
                                                            </td>
                                                            <td className="text-primary">
                                                                <a
                                                                    onClick={() => handleOpenDonations(x.id)}
                                                                    className="btn btn-primary pull-right text-white"
                                                                >
                                                                    Donations
                                                                </a>
                                                            </td>
                                                            {/* <td className="text-primary">
                                                                <a
                                                                    onClick={() => handleBlock(x.id, x.isAccountBlocked)}
                                                                    className="btn btn-primary pull-right text-white"
                                                                >
                                                                    {x.isAccountBlocked ? "Unblock" : "Block"}
                                                                </a>
                                                            </td> */}
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
            <ConfirmPaymentModal isOpen={paymentModalIsOpen} closeModal={() => setPaymentModalIsOpen(false)} />
            <MessageModal isOpen={messageModalIsOpen} closeModal={() => setMessageModalIsOpen(false)} />
            {donationModalIsOpen && <DonationsModal id={id} isOpen={donationModalIsOpen} closeModal={() => setDonationModalIsOpen(false)} />}
        </>
    );
}
