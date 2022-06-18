import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { getAllReportsApi } from '../../../../api/report.api';
import DualRing from '../../../../components/loader';
import { statusEnum } from '../../../../enums/util.enum';
import { GetReportResponse } from '../../../../types/appTypes';
import AdminLayout from '../admin.layout';
import { LoaderWrapper } from '../blog/getall';
import ReportModal from './components/reportModal';

const GetAllReports: React.FC = () => {
    const [reports, setReports] = useState<GetReportResponse[]>([]);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false)
    const [selectedReport, setSelectedReport] = useState<GetReportResponse>()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function getReports() {
            setIsLoading(true)
            const response = await getAllReportsApi()
            if (response.code >= statusEnum.ok) {
                setReports(response?.data?.data)
            } else {
                toast.error(response.message);
            }
            setIsLoading(false)
        }

        getReports()
    }, []);

    const handleOpenReportModal = (report: GetReportResponse) => {
        setSelectedReport(report)
        setIsReportModalOpen(true)
    }

    return (
        <>
            <AdminLayout
                externalStyles={[]}
                navbar={""}
                title={"Branch Reports"}
                withFooter={false}
                withSideBar={true}
            >
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-primary">
                                <div className="nav-tabs-navigation">
                                    <div className="nav-tabs-wrapper">
                                        <span className="nav-tabs-title">Reports</span>
                                        {/* <ul className="nav nav-tabs" data-tabs="tabs">
                                            <Link href={"/admin/publishers/register"} passHref>
                                                <li className="nav-item">
                                                    <a className="nav-link active" data-toggle="tab">
                                                        Register New Publisher
                                                    </a>
                                                </li>
                                            </Link>
                                        </ul> */}
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
                                                <th>Branch Name</th>
                                                <th>Date</th>
                                                <th>Total Offering</th>
                                                <th></th>
                                            </thead>
                                            <tbody id="tbody">
                                                {reports?.length > 0
                                                    ? reports.map((x, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{x.branchName}</td>
                                                                <td> {new Date(x.date).toDateString()}</td>
                                                                <td> {x.totalOffering}</td>
                                                                <td className="text-primary">
                                                                    <a
                                                                        onClick={() => handleOpenReportModal(x)}
                                                                        className="btn btn-primary pull-right text-white"
                                                                    >
                                                                        Service Report
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
            {isReportModalOpen && <ReportModal report={selectedReport} isOpen={isReportModalOpen} closeModal={() => setIsReportModalOpen(false)} />}
        </>
    )
}

export default GetAllReports