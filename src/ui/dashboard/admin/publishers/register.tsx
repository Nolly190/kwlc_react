import React, { useState } from "react";
import { toast } from "react-toastify";
import { registerPublisherApi } from "../../../../api/publishers.api";
import { statusEnum } from "../../../../enums/util.enum";
import { RegisterPublishersPayload } from "../../../../types/appTypes";
import { isValid } from "../../../../utils";
import AdminLayout from "../admin.layout";
import Select, { ActionMeta } from 'react-select'

export default function RegisterPublisher() {
    const [formData, setformData] = useState<RegisterPublishersPayload>()

    const handleInputChange = (e: any) => {
        setformData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        if (!isValid(formData) || !formData.dateOfBirth) {
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
                                            <label className="bmd-label-floating">Full Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fullname"
                                                name="fullname"
                                                element-data="fullname"
                                                value={formData?.fullname}
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
                                                onChange={(e) => handleInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group" style={{ marginTop: 37 }}>
                                            <label className="bmd-label-floating">Currency</label>
                                            <Select options={currencyDropDownOptions} onChange={onCurrencyChange}
                                                value={currencyDropDownOptions.find(x => x.value === formData?.currency)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group" style={{ marginTop: 37 }}>
                                            <label className="bmd-label-floating">Marital Status</label>
                                            <Select options={maritalStatusDropDownOptions} onChange={onStatusChange}
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
                                                onChange={(e) => handleInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group" style={{ marginTop: 37 }}>
                                            <label className="bmd-label-floating">State</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="state"
                                                name="state"
                                                element-data="state"
                                                value={formData?.state}
                                                onChange={(e) => handleInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group" style={{ marginTop: 37 }}>
                                            <label className="bmd-label-floating">Resident Country</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="residentCountry"
                                                name="residentCountry"
                                                element-data="residentCountry"
                                                value={formData?.residentCountry}
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
