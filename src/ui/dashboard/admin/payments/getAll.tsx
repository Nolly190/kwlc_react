import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import DualRing from '../../../../components/loader';
import { statusEnum } from '../../../../enums/util.enum';
import { PaymentMode, PaymentStatus, PaymentType, PaymentTypePayload } from '../../../../types/appTypes';
import AdminLayout from '../admin.layout';
import { LoaderWrapper } from '../blog/getall';
import Select, { ActionMeta } from 'react-select'
import PaymentRadioButtons from './components/radioButtons';
import styled from 'styled-components';
import { getAllPaymentHistoryApi } from '../../../../api/paymentHistory.apt';

const GetAllPayments: React.FC = () => {
    const [payments, setPayments] = useState<PaymentTypePayload[]>([]);
    const [isLoading, setIsLoading] = useState(false)
    const [filterData, setFilterData] = useState<string>("all")
    const [dropdownOptions, setDropdownOptions] = useState<{ value: string, label: string }[]>([])

    useEffect(() => {
        getAllpayment()
    }, []);

    async function getAllpayment(keyword?: string, filter?: string) {
        setIsLoading(true)
        const response = keyword && filter ? await getAllPaymentHistoryApi(keyword, filter) : await getAllPaymentHistoryApi()
        if (response.code >= statusEnum.ok) {
            setPayments(response?.data?.data)
        } else {
            toast.error(response.message);
        }
        setIsLoading(false)
    }

    const onTypeChange = (newValue: any, actionMeta: ActionMeta<any>) => {
        getAllpayment(newValue.value, filterData);
    }

    const handleRadioChange = (value: string) => {
        if (value.toLowerCase() === 'all') {
            setFilterData(value.toLowerCase())
            getAllpayment()
            return
        }

        const formattedFilter = handleFormatRadioType(value)
        setFilterData(formattedFilter)
        handleSetDropdownOptions(formattedFilter)
    }

    const handleFormatRadioType = (value: string) => {
        switch (value.toLowerCase()) {
            case "email":
                return "emailAddress"
            case "type":
                return "paymenttype"
            case "mode":
                return "paymentmode"
            case "status":
                return "paymentstatus"
            default:
                return "";
        }
    }

    const handleSetDropdownOptions = (value: string) => {
        switch (value) {
            case "emailAddress":
                setDropdownOptions(formatEmailToOptions(payments))
                break;
            case "paymenttype":
                setDropdownOptions(formatEnumToOptions(PaymentType))
                break;
            case "paymentmode":
                setDropdownOptions(formatEnumToOptions(PaymentMode))
                break;
            case "paymentstatus":
                setDropdownOptions(formatStatusToOptions(PaymentStatus))
                break;
            default:
                setDropdownOptions([])
        }
    }

    const formatEnumToOptions = (enumObj: any) => {
        const arr = [];
        Object.keys(enumObj).map((x, i) => {
            arr.push({ value: x.toString(), label: enumObj[x] });
        })

        return arr.filter((x) => !isNaN(parseInt(x.value)));
    }

    const formatEmailToOptions = (payments: PaymentTypePayload[]) => {
        const arr = [];
        payments.map(x => {
            arr.push({ value: x.emailAddress, label: x.emailAddress });
        })

        return arr;
    }

    const formatStatusToOptions = (enumObj: any) => {
        const arr = [];
        Object.keys(enumObj).map((x) => {
            arr.push({ value: enumObj[x].toString().toLowerCase(), label: enumObj[x] });
        })

        return arr.filter((x) => isNaN(parseInt(x.value)));
    }

    return (
        <>
            <AdminLayout
                externalStyles={[]}
                navbar={""}
                title={"Payment History"}
                withFooter={false}
                withSideBar={true}
            >
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-primary">
                                <div className="nav-tabs-navigation">
                                    <div className="nav-tabs-wrapper">
                                        <span className="nav-tabs-title">Payment History</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="col-xl-8 col-md-6" id="spinner_loader"></div>
                                <FilterWrapper className="form-group">
                                    <p>Filter By:</p>
                                    <PaymentRadioButtons onChange={handleRadioChange} />
                                    <label className="bmd-label-floating">
                                        <Select options={dropdownOptions} onChange={onTypeChange} isDisabled={filterData === "all"} />
                                    </label>
                                </FilterWrapper>
                                <div className="table-responsive" id="table_div">
                                    {isLoading ?
                                        <LoaderWrapper>
                                            <DualRing width="40px" height="40px" color="#0b0146" />
                                        </LoaderWrapper> :
                                        <table className="table">
                                            <thead className=" text-primary">
                                                <th>Email</th>
                                                <th>Amount</th>
                                                <th>Payment Type</th>
                                                <th>Payment Mode</th>
                                                <th>Date</th>
                                                <th>Status</th>
                                                <th></th>
                                            </thead>
                                            <tbody id="tbody">
                                                {payments?.length > 0
                                                    ? payments.map((x, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{x.emailAddress}</td>
                                                                <td> {x.amount}</td>
                                                                <td> {PaymentType[x.paymentType]}</td>
                                                                <td> {PaymentMode[x.paymentMode]}</td>
                                                                <td> {new Date(x.dateCreated).toDateString()}</td>
                                                                <td> {x.paymentStatus}</td>
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
    )
}

export default GetAllPayments

const FilterWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    gap: 30px;
    width: 100%;
    margin-bottom: 7px !important;

    & > p {
        color: #999;
        font-size: 18px;
    }

    & > label {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 18px;
        
        & > div {
            width: 300px;
        }
    }
`;