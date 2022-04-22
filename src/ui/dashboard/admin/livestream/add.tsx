import { useEffect, useState } from "react";
import { BranchController } from "../../../../controller/admin/branch.controller";
import { LiveStreamController } from "../../../../controller/admin/livestream.controller";
import { BranchDTO } from "../../../../dto/Branch.dto";
import { LiveStreamDTO } from "../../../../dto/LiveStream.dto";
import AdminLayout from "../admin.layout";

export default function AddLiveStream() {
    const _tmpBranches: BranchDTO[] = [];


    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [streamDate, setStreamDate] = useState("");
    const [branches, setBranches] = useState(_tmpBranches);
    const [branch, setBranch] = useState("");

    useEffect(() => {
        branchController.list(setBranches);
    }, []);

    let controller: LiveStreamController = new LiveStreamController();
    const branchController: BranchController = new BranchController();

    const onClick = (e) => {
        e.preventDefault();
        controller.create(new LiveStreamDTO({
            dateOfStream: streamDate,
            description: description,
            isActive: true,
            liveStreamUrl: url,
            title: title,
            views: 0,
            id: 0,
            preacher: ""
        }), branch);
    }

    return (
        <AdminLayout
            externalStyles={[]}
            navbar={""}
            title={"Add stream"}
            withFooter={false}
            withSideBar={true}
        >
            <div className="row">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header card-header-primary">
                            <h4 className="card-title">Create New Stream</h4>
                        </div>
                        <div className="card-body">
                            <form id="form">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="bmd-label-floating">Select Branch</label>
                                            <select className="form-control" onChange={(e) => setBranch(e.target.value)}>
                                                <option>
                                                    Select Branch
                                                </option>
                                                {
                                                    branches.length > 0 ? branches.map((x, i) => {
                                                        return (<option key={i} value={x.id}>{x.name}</option>);
                                                    }) : undefined
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="bmd-label-floating">Select Date</label>
                                            <input type="date" className="form-control" id="date" name="date" onChange={(e) => setStreamDate(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="bmd-label-floating">Title</label>
                                            <input type="text" className="form-control" id="title" name="title" element-data="name" onChange={(e) => setTitle(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="bmd-label-floating">URL</label>
                                            <input type="text" className="form-control" id="location" name="location" element-data="description" onChange={(e) => setUrl(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="bmd-label-floating">Description </label>
                                            <textarea className="form-control" id="code" name="code" element-data="code" onChange={(e) => setDescription(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 mt-4">
                                        <button
                                            type="submit"
                                            id="submitBtn"
                                            className="btn btn-primary pull-right"
                                            onClick={(e) => onClick(e)}
                                        >
                                            Save Stream
                                        </button>
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