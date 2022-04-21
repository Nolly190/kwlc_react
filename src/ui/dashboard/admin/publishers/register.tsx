import React, { useState } from "react";
import { toast } from "react-toastify";
import { registerPublisherApi } from "../../../../api/publishers.api";
import { statusEnum } from "../../../../enums/util.enum";
import { RegisterPublishersPayload } from "../../../../types/appTypes";
import AdminLayout from "../admin.layout";

export default function RegisterPublisher() {
    const [formData, setformData] = useState<RegisterPublishersPayload>({})

    const handleInputChange = (e: any) => {
        setformData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        if (!formData?.address || !formData?.firstName || !formData?.lastName || !formData?.emailAddress || !formData?.phone) {
            toast.error("Please fill all fields");
            return;
        }

        const response = await registerPublisherApi(formData);
        if (response.code >= statusEnum.ok) {
            toast.success("Publisher registered successfully");
        } else {
            toast.error(response.message);
        }
    }

    return (
        <AdminLayout
            externalStyles={[]}
            navbar={""}
            title={"Register Publishers"}
            withFooter={false}
            withSideBar={true}
        >
            <div className="row">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header card-header-primary">
                            <h4 className="card-title">Register Publisher</h4>
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
                                                onChange={(e) => handleInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group" style={{ marginTop: 37 }}>
                                            <label className="bmd-label-floating">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="emailAddress"
                                                name="emailAddress"
                                                element-data="emailAddress"
                                                value={formData?.emailAddress}
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
                                                onChange={(e) => handleInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="row mt-5">
                                    <div className="col-md-12">
                                        <button
                                            type="submit"
                                            id="submitBtn"
                                            className="btn btn-primary pull-right"
                                            onClick={(e) => handleSubmit(e)}
                                        >
                                            Register
                                        </button>
                                        <div className="clearfix"></div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
