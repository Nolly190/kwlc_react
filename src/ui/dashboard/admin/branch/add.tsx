import { useEffect, useState } from "react";
import DualRing from "../../../../components/loader";
import { BranchServiceTimerItem } from "../../../../components/service-timer-item";
import { BranchController } from "../../../../controller/admin/branch.controller";
import { BranchDTO, BranchServiceDTO } from "../../../../dto/Branch.dto";
import { showConfirmDialog } from "../../../../utils";
import AdminLayout from "../admin.layout";

export default function AddBranch() {
    const _tmpServices: BranchServiceDTO[] = [];

    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [location, setLocation] = useState("");
    const [state, setState] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [services, setServices] = useState(_tmpServices);
    const [isBranchHq, setIsBranchHq] = useState(false);
    const [serviceDay, setServiceDay] = useState("");
    const [serviceTime, setServiceTime] = useState("");
    const [serviceAMPM, setServiceTimeAMPM] = useState("");
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
    }, [services]);

    let controller: BranchController = new BranchController();

    const onClick = (e) => {
        e.preventDefault();
        controller.create(new BranchDTO({ name: title, address: address, location: location, state: state, contactNumber: contactNumber, services: services, isBranchHq: isBranchHq }), setIsSaving);
    }

    const onClickAddService = (e) => {
        e.preventDefault();
        //setServices(services.concat([{day: serviceDay, time: (serviceTime +" "+ serviceAMPM), id: 0}]));
        // setServices([{day: serviceDay, time: (serviceTime +" "+ serviceAMPM), id: 0}]);
        controller.addService(setServices, services, serviceDay, (serviceTime + " " + serviceAMPM));
    }

    return (
        <AdminLayout
            externalStyles={[]}
            navbar={""}
            title={"Add Branch"}
            withFooter={false}
            withSideBar={true}
        >
            <div className="row">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header card-header-primary">
                            <h4 className="card-title">Create New Branch</h4>
                        </div>
                        <div className="card-body">
                            <form id="form">
                                <input type="hidden" element-data="key" value="category" />
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="bmd-label-floating">Branch Title</label>
                                            <input type="text" className="form-control" id="title" name="title" element-data="name" onChange={(e) => setTitle(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="bmd-label-floating">Branch State</label>
                                            <input type="text" className="form-control" id="location" name="location" element-data="description" onChange={(e) => setState(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="bmd-label-floating">Branch Address</label>
                                            <input type="text" className="form-control" id="code" name="code" element-data="code" onChange={(e) => setAddress(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="bmd-label-floating">Branch location</label>
                                            <input type="text" className="form-control" id="code" name="code" element-data="code" onChange={(e) => setLocation(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="bmd-label-floating">Branch Contact Number</label>
                                            <input type="text" className="form-control" id="code" name="code" element-data="code" onChange={(e) => setContactNumber(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="bmd-label-floating">Type</label>
                                        <div className="row ml-1">

                                            <label className="bmd-label-floating">HQ</label>
                                            <input type="radio" value="No" className="col-md-3 form-control" id="code" name="code" element-data="code" onChange={(e) => setIsBranchHq(true)} style={{ height: 15, width: 15 }} />

                                            <label className="bmd-label-floating">Branch</label>
                                            <input type="radio" value="Yes" className="col-md-3  form-control" name="code" onChange={(e) => setIsBranchHq(false)} checked style={{ height: 15, width: 15 }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="bmd-label-floating">Branch Services</label>
                                            <form>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <select className="form-control" onChange={(e) => {
                                                            setServiceDay(e.target.value);
                                                        }}>
                                                            <option key={0} value={""}>Select Day of the Week</option>
                                                            {
                                                                ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"].map((item, i) => {
                                                                    return (
                                                                        <option key={i} value={item}>{item}</option>
                                                                    );
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <select className="form-control" onChange={(e) => {
                                                            setServiceTime(e.target.value);
                                                        }}>
                                                            <option key={0} value={""}>Select Time of the Day</option>
                                                            {
                                                                Array.from(Array(12).keys()).map((item, i) => {
                                                                    return (
                                                                        <option key={i} value={item}>{item}</option>
                                                                    );
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row pt-3">
                                                    <div className="col-md-6">
                                                        <select className="form-control" onChange={(e) => {
                                                            setServiceTimeAMPM(e.target.value)
                                                        }}>
                                                            <option key={0} value={""}>Select Time of the Day</option>
                                                            {
                                                                ["AM", "PM"].map((item, i) => {
                                                                    return (
                                                                        <option key={i} value={item}>{item}</option>
                                                                    );
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <button className="btn btn-primary pull-right" onClick={(e) => onClickAddService(e)}>Add Service</button>
                                                    </div>
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                                <div className="row ml-1" style={{ maxWidth: '95%' }}>
                                    {
                                        services.length > 0 ? <BranchServiceTimerItem
                                            timers={services}
                                            showDeleteIcon={true}
                                            onDelete={(i) => {
                                                controller.removeService(setServices, services, i);
                                            }}
                                        /> : "No Services Added"
                                    }
                                </div>
                                <div className="clearfix"></div>
                                <div className="row mt-5">
                                    <div className="col-md-12">

                                        <button
                                            type="submit"
                                            id="submitBtn"
                                            className="btn btn-primary pull-right"
                                            onClick={(e) => onClick(e)}
                                            disabled={isSaving}
                                        >
                                            {isSaving ? <DualRing width="15px" height="15px" color="#fff" /> : "Create Branch"}
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