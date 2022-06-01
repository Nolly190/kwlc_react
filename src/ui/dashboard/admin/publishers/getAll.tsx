import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { blockPublisherApi, getPublishersApi, getPublishersHistoryApi } from "../../../../api/publishers.api";
import DualRing from "../../../../components/loader";
import { statusEnum } from "../../../../enums/util.enum";
import { ContributionType, PublishersHistoryResponse } from "../../../../types/appTypes";
import AdminLayout from "../admin.layout";
import { LoaderWrapper } from "../blog/getall";
import ConfirmPaymentModal from "./components/confirmPaymentModal";
import DonationsModal from "./components/donationsModal";
import MessageModal from "./components/messageModal";
import SmsModal from "./components/smsModal";

export default function GetAllPublishers() {
    const [publishers, setPublishers] = useState<PublishersHistoryResponse[]>([]);
    const [paymentModalIsOpen, setPaymentModalIsOpen] = useState(false)
    const [messageModalIsOpen, setMessageModalIsOpen] = useState(false)
    const [smsModalIsOpen, setSmsModalIsOpen] = useState(false)
    const [donationModalIsOpen, setDonationModalIsOpen] = useState(false)
    const [donationDetails, setDonationDetails] = useState<ContributionType[]>()
    const [publisherName, setPublisherName] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        async function getAllPublishers() {
            setIsLoading(true)
            const response = await getPublishersApi()
            if (response.code >= statusEnum.ok) {
                setPublishers(response?.data?.data?.data)
            } else {
                toast.error(response.message);
            }
            setIsLoading(false)
        }

        getAllPublishers()
    }, []);

    const getHistory = async (id: string) => {
        const response = await getPublishersHistoryApi(id)
        if (response.code >= statusEnum.ok) {
            setDonationDetails(response?.data?.data?.contributions)
            setPublisherName(response?.data?.data?.user.fullName)
            setDonationModalIsOpen(true)
        } else {
            toast.error("Failed to fetch publisher history");
        }
    }

    return (
        <>
            <AdminLayout
                externalStyles={[]}
                navbar={""}
                title={"Publishers"}
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
                                                <li className="nav-item">
                                                    <a className="nav-link active" data-toggle="tab">
                                                        Register New Publisher
                                                    </a>
                                                </li>
                                            </Link>
                                            <li className="nav-item" onClick={() => setPaymentModalIsOpen(true)}>
                                                <a className="nav-link active" data-toggle="tab">
                                                    Confirm Payment
                                                </a>
                                            </li>
                                            <li className="nav-item" onClick={() => setMessageModalIsOpen(true)}>
                                                <a className="nav-link active" data-toggle="tab">
                                                    Send Message
                                                </a>
                                            </li>
                                            <li className="nav-item" onClick={() => setSmsModalIsOpen(true)}>
                                                <a className="nav-link active" data-toggle="tab">
                                                    Send SMS
                                                </a>
                                            </li>
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
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Date Of Birth</th>
                                                <th>Phone No</th>
                                                <th>isBlocked</th>
                                                <th></th>
                                                <th></th>
                                            </thead>
                                            <tbody id="tbody">
                                                {publishers?.length > 0
                                                    ? publishers.map((x, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{x.fullName}</td>
                                                                <td> {x.emailAddress}</td>
                                                                <td> {new Date(x.dateOfBirth).toLocaleDateString()}</td>
                                                                <td> {x.phone}</td>
                                                                <td> {x.isBlocked.toString()}</td>
                                                                <td className="text-primary">
                                                                    <a
                                                                        onClick={() => {
                                                                            router.push(
                                                                                `/admin/publishers/edit?id=${x.uniqueId}`
                                                                            );
                                                                        }}
                                                                        className="btn btn-primary pull-right text-white"
                                                                    >
                                                                        Edit
                                                                    </a>
                                                                </td>
                                                                <td className="text-primary">
                                                                    <a
                                                                        onClick={() => getHistory(x.uniqueId)}
                                                                        className="btn btn-primary pull-right text-white"
                                                                    >
                                                                        Donations
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
            <ConfirmPaymentModal isOpen={paymentModalIsOpen} closeModal={() => setPaymentModalIsOpen(false)} />
            <MessageModal isOpen={messageModalIsOpen} closeModal={() => setMessageModalIsOpen(false)} />
            <SmsModal isOpen={smsModalIsOpen} closeModal={() => setSmsModalIsOpen(false)} />
            {donationModalIsOpen && <DonationsModal publisherName={publisherName} donationDetails={donationDetails} isOpen={donationModalIsOpen} closeModal={() => setDonationModalIsOpen(false)} />}
        </>
    );
}
