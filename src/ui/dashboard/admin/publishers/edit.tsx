import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { blockPublisherApi, editPublishersDetailsApi, getPublishersHistoryApi } from "../../../../api/publishers.api";
import { statusEnum } from "../../../../enums/util.enum";
import { EditPublishersPayload, PublishersHistoryResponse } from "../../../../types/appTypes";
import { getParam, isValid } from "../../../../utils";
import AdminLayout from "../admin.layout";
import Select, { ActionMeta } from 'react-select'
import { LoaderWrapper } from "../blog/getall";
import DualRing from "../../../../components/loader";
import ConfirmationModal from "../../../../components/confirmationModal";
import { useDisclosure } from "@chakra-ui/react";

export default function EditPublisher() {
    const [formData, setformData] = useState<PublishersHistoryResponse>()
    const [fieldsBlocked, setFieldsBlocked] = useState(false)
    const [id, setId] = useState<string>("");
    const [date, setDate] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        const idParam = getParam("id");
        if (!idParam) {
            router.push("/admin/");
        } else {
            setId(idParam);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        id !== "" && getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    async function getUser() {
        setIsLoading(true)
        const response = await getPublishersHistoryApi(id);
        if (response.code >= statusEnum.ok) {
            setformData(response?.data?.data?.user)
        } else {
            toast.error(response.message)
            setTimeout(() => {
                router.push("/admin/publishers")
            }, 2000);
        }
        setIsLoading(false)
    }

    async function getUserWithoutLoading() {
        const response = await getPublishersHistoryApi(id);
        if (response.code >= statusEnum.ok) {
            setformData(response?.data?.data?.user)
        } else {
            toast.error(response.message)
            setTimeout(() => {
                router.push("/admin/publishers")
            }, 2000);
        }
    }

    useEffect(() => {
        formData?.dateOfBirth && setDate(new Date(formData?.dateOfBirth)?.toISOString().substring(0, 10))
    }, [formData])

    const currencyDropDownOptions = [
        { value: "ngn", label: "Naira" },
        { value: "usd", label: "Dollar" },
        { value: "eur", label: "Euro" },
        { value: "gbp", label: "Pounds" },
    ]

    const maritalStatusDropDownOptions = [
        { value: "single", label: "Single" },
        { value: "married", label: "Married" },
    ]

    const onStatusChange = (newValue: any, actionMeta: ActionMeta<any>) => {
        setformData({ ...formData, maritalStatus: newValue.value })
    }

    const onCurrencyChange = (newValue: any, actionMeta: ActionMeta<any>) => {
        setformData({ ...formData, currency: newValue.value })
    }

    useEffect(() => {
        setFieldsBlocked(formData?.isBlocked)
    }, [formData?.isBlocked])

    const handleInputChange = (e: any) => {
        setformData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleOpen = (e: any) => {
        e.preventDefault()
        onOpen()
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        if (!isValid(formData) || !formData?.dateOfBirth) {
            toast.error("Please fill all fields");
            return;
        }

        const dataToSubmit: EditPublishersPayload = {
            fullName: formData.fullName,
            emailAddress: formData.emailAddress,
            amount: formData.amount,
            phone: formData.phone,
            currency: formData.currency,
            maritalStatus: formData.maritalStatus,
            dateOfBirth: formData.dateOfBirth,
            occupation: formData.occupation,
        }

        const response = await editPublishersDetailsApi(dataToSubmit, id);
        if (response.code >= statusEnum.ok) {
            toast.success("Publisher updated successfully");
        } else {
            toast.error(response.message);
        }
    }

    const handleBlock = async () => {
        setIsSubmitting(true)
        const response = await blockPublisherApi(id)
        if (response.code >= statusEnum.ok) {
            formData?.isBlocked
                ? toast.success("Publisher unblocked successfully")
                : toast.success("Publisher blocked successfully");
            getUserWithoutLoading()
        } else {
            toast.error(response.message);
        }
        setIsSubmitting(false)
    }

    return (
        <>
            <AdminLayout
                externalStyles={[]}
                navbar={""}
                title={"Edit Publisher"}
                withFooter={false}
                withSideBar={true}
            >
                <div className="row">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header card-header-primary">
                                <h4 className="card-title">Edit Publisher</h4>
                            </div>
                            <div className="card-body">
                                {isLoading ?
                                    <LoaderWrapper>
                                        <DualRing width="40px" height="40px" color="#0b0146" />
                                    </LoaderWrapper> :
                                    <form id="form">
                                        <input type="hidden" element-data="key" value="category" />
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="bmd-label-floating">Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="fullName"
                                                        name="fullName"
                                                        element-data="fullName"
                                                        value={formData?.fullName}
                                                        disabled={fieldsBlocked}
                                                        onChange={(e) => handleInputChange(e)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="bmd-label-floating">Email Address</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        id="emailAddress"
                                                        name="emailAddress"
                                                        element-data="emailAddress"
                                                        value={formData?.emailAddress}
                                                        disabled={fieldsBlocked}
                                                        onChange={(e) => handleInputChange(e)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group" style={{ marginTop: 37 }}>
                                                    <label className="bmd-label-floating">Phone Number</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="phone"
                                                        name="phone"
                                                        element-data="phone"
                                                        value={formData?.phone}
                                                        disabled={fieldsBlocked}
                                                        onChange={(e) => handleInputChange(e)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group" style={{ marginTop: 37 }}>
                                                    <label className="bmd-label-floating">Amount</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="amount"
                                                        name="amount"
                                                        element-data="amount"
                                                        value={formData?.amount}
                                                        disabled={fieldsBlocked}
                                                        onChange={(e) => handleInputChange(e)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group" style={{ marginTop: 37 }}>
                                                    <label className="bmd-label-floating">Currency</label>
                                                    <Select options={currencyDropDownOptions} onChange={onCurrencyChange} isDisabled={fieldsBlocked}
                                                        value={currencyDropDownOptions.find(x => x.value === formData?.currency)} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group" style={{ marginTop: 37 }}>
                                                    <label className="bmd-label-floating">Marital Status</label>
                                                    <Select options={maritalStatusDropDownOptions} onChange={onStatusChange} isDisabled={fieldsBlocked}
                                                        value={maritalStatusDropDownOptions.find(x => x.value === formData?.maritalStatus)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group" style={{ marginTop: 37 }}>
                                                    <label className="bmd-label-floating">Occupation</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="occupation"
                                                        name="occupation"
                                                        element-data="occupation"
                                                        value={formData?.occupation}
                                                        disabled={fieldsBlocked}
                                                        onChange={(e) => handleInputChange(e)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group" style={{ marginTop: 37 }}>
                                                    <label className="bmd-label-floating">Date of Birth</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        id="dateOfBirth"
                                                        name="dateOfBirth"
                                                        element-data="dateOfBirth"
                                                        defaultValue={date || ""}
                                                        disabled={fieldsBlocked}
                                                        onChange={(e) => handleInputChange(e)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <ButtonWrapper className="row mt-5">
                                            <ErrorButton
                                                id="submitBtn"
                                                className="btn pull-right"
                                                onClick={(e) => handleOpen(e)}
                                            >
                                                {isSubmitting ? <DualRing width="20px" height="20px" color="#fff" /> : formData?.isBlocked ? "Unblock" : "Block"}
                                            </ErrorButton>
                                            <button
                                                id="submitBtn"
                                                className="btn btn-primary pull-right"
                                                disabled={fieldsBlocked}
                                                onClick={(e) => handleSubmit(e)}
                                            >
                                                Update
                                            </button>
                                        </ButtonWrapper>
                                    </form>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
            <ConfirmationModal title={formData?.isBlocked ? "Unblock User" : "Block User"} description={formData?.isBlocked ? "Are you sure you want to unblock this user?" : "Are you sure you want to block this user?"} action={() => handleBlock()} isOpen={isOpen} onClose={onClose} />
        </>
    );
}

export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-right: 10px;
`;

export const ErrorButton = styled.button`
    background-color: #8c271f;
`;