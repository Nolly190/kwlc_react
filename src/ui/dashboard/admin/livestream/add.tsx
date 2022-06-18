import { useState } from "react";
import { BranchController } from "../../../../controller/admin/branch.controller";
import { LiveStreamController } from "../../../../controller/admin/livestream.controller";
import { BranchDTO } from "../../../../dto/Branch.dto";
import { LiveStreamDTO } from "../../../../dto/LiveStream.dto";
import AdminLayout from "../admin.layout";
import Select, { ActionMeta } from 'react-select'
import DualRing from "../../../../components/loader";

export default function AddLiveStream() {
    const _tmpBranches: BranchDTO[] = [];

    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [streamDate, setStreamDate] = useState("");
    const [branch, setBranch] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    // useEffect(() => {
    //     branchController.list(setBranches);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    let controller: LiveStreamController = new LiveStreamController();
    const branchController: BranchController = new BranchController();

    // const dropDownOptions = () => {
    //     const arr = [];
    //     branches.map((x, i) => {
    //         arr.push({ value: x?.id, label: x?.name });
    //     })

    //     return arr
    // }

    const onTypeChange = (newValue: any, actionMeta: ActionMeta<any>) => {
        setBranch(newValue.value);
    }

    const onClick = (e: any) => {
        e.preventDefault();
        controller.create(new LiveStreamDTO({
            dateOfStream: streamDate,
            description: description,
            isActive: true,
            liveStreamUrl: url,
            title: title,
        }), setIsSaving);
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
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="bmd-label-floating">Description </label>
                                            <textarea className="form-control" cols={3} rows={3} id="code" name="code" element-data="code" onChange={(e) => setDescription(e.target.value)} />
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
                                    <div className="col-md-12 mt-4">
                                        <button
                                            type="submit"
                                            id="submitBtn"
                                            className="btn btn-primary pull-right"
                                            onClick={(e) => onClick(e)}
                                        >
                                            {isSaving ? <DualRing width="15px" height="15px" color="#fff" /> : "Save Stream"}
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