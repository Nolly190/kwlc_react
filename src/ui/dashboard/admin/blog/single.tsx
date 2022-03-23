import { useEffect, useState } from "react";
import { BlogController } from "../../../../controller/admin/blog.controller";
import { BlogDTO } from "../../../../dto/Blog.dto";
import { getParam, showConfirmDialog } from "../../../../utils";
import AdminLayout from "../admin.layout";
import { Editor } from '@tinymce/tinymce-react';

export interface ISetBlog {
    setItem: Function,
    setTitle: Function,
    setCity: Function,
    setLocation: Function,
    setState: Function,
    setStreet: Function,
    setIsBlogHq: Function,
    setServices: Function
}


export default function EditBlog() {
    const _tmp: BlogDTO = new BlogDTO();
    
    const [title, setTitle] = useState("");
    const [city, setCity] = useState("");
    const [location, setLocation] = useState("");
    const [state, setState] = useState("");
    const [street, setStreet] = useState("");
    const [isBlogHq, setIsBlogHq] = useState(false);
    const [serviceDay, setServiceDay] = useState("");
    const [serviceTime, setServiceTime] = useState("");
    const [serviceAMPM, setServiceTimeAMPM] = useState("");
    
    const [item, setItem] = useState(_tmp);
    const [id, setId] = useState(0);

    useEffect(() => {
        getBlog();
    }, []);

    let controller: BlogController = new BlogController();

    const getBlog = ()  => {
        const idParam = getParam("id");
        if (!idParam) {
            router.push("/admin/";
        }
        else {
            setId(parseInt(idParam));
            // controller.read({
            //     setItem,
            //     setTitle,
            //     setCity,
            //     setLocation,
            //     setState,
            //     setStreet,
            // }, parseInt(idParam));
        }
    }
    
    return(
        <AdminLayout
            externalStyles={[]}
            navbar={""}
            title={"Add User"}
            withFooter={false}
            withSideBar={true}
        >
            <div className="row">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header card-header-primary">
                            <h4 className="card-title">KWLC Blog</h4>
                        </div>
                        <div className="card-body">
                            <form id="form">
                                <input type="hidden" element-data="key" value="category" />
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="bmd-label-floating">Blog Title</label>
                                            <input type="text" className="form-control" id="title" name="title" element-data="name"  onChange={(e) => setTitle(e.target.value)} value={title} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="bmd-label-floating">Blog State</label>
                                            <input type="text" className="form-control" id="location" name="location" element-data="description" onChange={(e) => setState(e.target.value)} value={state} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="bmd-label-floating">Blog City</label>
                                            <input type="text" className="form-control" id="code" name="code" element-data="code"  onChange={(e) => setCity(e.target.value)} value={city} /> 
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="bmd-label-floating">Blog location</label>
                                            <input type="text" className="form-control" id="code" name="code" element-data="code"  onChange={(e) => setLocation(e.target.value)} value={location} /> 
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="bmd-label-floating">Blog street</label>
                                            <input type="text" className="form-control" id="code" name="code" element-data="code"  onChange={(e) => setStreet(e.target.value)} value={street} /> 
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="bmd-label-floating">Type</label>
                                        <div className="row ml-1">
                                            
                                            <label className="bmd-label-floating">HQ</label>
                                            <input type="radio" value="No" className="col-md-3 form-control" id="code" name="code" element-data="code" onChange={() => setIsBlogHq(true)} style={{height: 15, width: 15}} checked={isBlogHq} /> 
                                            
                                            <label className="bmd-label-floating">Blog</label>
                                            <input type="radio" value="Yes" className="col-md-3  form-control" name="code" onChange={() => setIsBlogHq(false)} checked={!isBlogHq} style={{height: 15, width: 15}}  /> 
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
                                            onClick={() => {}}
                                            >
                                                Update Blog
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