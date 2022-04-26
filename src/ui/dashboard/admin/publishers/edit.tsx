import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { blockPublisherApi, editPublishersDetailsApi, getPublishersHistoryApi } from "../../../../api/publishers.api";
import { statusEnum } from "../../../../enums/util.enum";
import { EditPublishersPayload, KingdomPublishersResponse } from "../../../../types/appTypes";
import { getParam } from "../../../../utils";
import AdminLayout from "../admin.layout";

export default function EditPublisher() {
    const [formData, setformData] = useState<KingdomPublishersResponse>({})
    const [fieldsBlocked, setFieldsBlocked] = useState(false)
    const [id, setId] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const idParam = getParam("id");
        if (!idParam) {
            router.push("/admin/");
        } else {
            setId(parseInt(idParam));
        }
    }, [])

    useEffect(() => {
        async function getUser() {
            const response = await getPublishersHistoryApi(id);
            setformData(response?.data?.data)
        }

        id > 0 && getUser();
    }, [id]);

    useEffect(() => {
        setFieldsBlocked(formData?.isAccountBlocked)
    }, [formData])

    const handleInputChange = (e: any) => {
        setformData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        if (!formData.address || !formData.firstName || !formData.lastName || !formData.phoneNumber) {
            toast.error("Please fill all fields");
            return;
        }

        const dataToSubmit: EditPublishersPayload = {
            address: formData.address,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phoneNumber,
        }

        const response = await editPublishersDetailsApi(dataToSubmit, id);
        if (response.code >= statusEnum.ok) {
            toast.success("Publisher updated successfully");
        } else {
            toast.error(response.message);
        }
    }

    const handleBlock = async (e: any) => {
        e.preventDefault()

        const response = await blockPublisherApi(id)
        if (response.code >= statusEnum.ok) {
            setFieldsBlocked(!fieldsBlocked)
            formData?.isAccountBlocked
                ? toast.success("Publisher unblocked successfully")
                : toast.success("Publisher blocked successfully");
            router.push("/admin/publishers");
        } else {
            toast.error(response.message);
        }
    }

    return (
        <AdminLayout
            externalStyles={[]}
            navbar={""}
            title={"Edit User"}
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
                            <form id="form">
                                <input type="hidden" element-data="key" value="category" />
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="bmd-label-floating">First Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="firstName"
                                                name="firstName"
                                                element-data="firstName"
                                                value={formData?.firstName}
                                                disabled={fieldsBlocked}
                                                onChange={(e) => handleInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="bmd-label-floating">Last Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="lastName"
                                                name="lastName"
                                                element-data="lastName"
                                                value={formData?.lastName}
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
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                element-data="phoneNumber"
                                                value={formData?.phoneNumber}
                                                disabled={fieldsBlocked}
                                                onChange={(e) => handleInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group" style={{ marginTop: 37 }}>
                                            <label className="bmd-label-floating">Address</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="address"
                                                name="address"
                                                element-data="address"
                                                value={formData?.address}
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
                                        onClick={(e) => handleBlock(e)}
                                    >
                                        {formData?.isAccountBlocked ? "Unblock" : "Block"}
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
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-right: 10px;
`;

export const ErrorButton = styled.button`
    background-color: #8c271f;
`;