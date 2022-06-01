import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { getAllMailsApi } from '../../../../api/contact.api';
import DualRing from '../../../../components/loader';
import { statusEnum } from '../../../../enums/util.enum';
import { MailPayload } from '../../../../types/appTypes';
import AdminLayout from '../admin.layout';
import { LoaderWrapper } from '../blog/getall';
import MailModal from './components/mailModal';

const GetAllContactUs: React.FC = () => {
    const [mails, setMails] = useState<MailPayload[]>([]);
    const [isMailModalOpen, setIsMailModalOpen] = useState(false)
    const [selectedMail, setSelectedMail] = useState<MailPayload>()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function getAllMails() {
            setIsLoading(true)
            const response = await getAllMailsApi()
            if (response.code >= statusEnum.ok) {
                setMails(response?.data)
            } else {
                toast.error(response.message);
            }
            setIsLoading(false)
        }

        getAllMails()
    }, []);

    const handleOpenMailModal = (mail: MailPayload) => {
        setSelectedMail(mail)
        setIsMailModalOpen(true)
    }

    return (
        <>
            <AdminLayout
                externalStyles={[]}
                navbar={""}
                title={"Mails"}
                withFooter={false}
                withSideBar={true}
            >
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-primary">
                                <div className="nav-tabs-navigation">
                                    <div className="nav-tabs-wrapper">
                                        <span className="nav-tabs-title">Mails</span>
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
                                                <th>Subject</th>
                                                <th>Email</th>
                                                <th>Date</th>
                                                <th></th>
                                            </thead>
                                            <tbody id="tbody">
                                                {mails?.length > 0
                                                    ? mails.map((x, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{x.fullName}</td>
                                                                <td> {x.subject}</td>
                                                                <td> {x.emailAddress}</td>
                                                                <td> {new Date(x.dateSent).toDateString()}</td>
                                                                <td className="text-primary">
                                                                    <a
                                                                        onClick={() => handleOpenMailModal(x)}
                                                                        className="btn btn-primary pull-right text-white"
                                                                    >
                                                                        View
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
            {isMailModalOpen && <MailModal mail={selectedMail} isOpen={isMailModalOpen} closeModal={() => setIsMailModalOpen(false)} />}
        </>
    )
}

export default GetAllContactUs