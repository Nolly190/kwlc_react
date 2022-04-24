import { useState } from "react";
import AdminLayout from "../../../src/ui/dashboard/admin/admin.layout";
import AssignRole from "../../../src/ui/dashboard/admin/roles/components/assignRole";
import ViewRoles from "../../../src/ui/dashboard/admin/roles/components/viewRoles";
import CreateRoles from "../../../src/ui/dashboard/admin/roles/components/createRoles";

export default function AssignAdminToBranch() {
    const [currentPage, setCurrentPage] = useState(1)

    return (
        <AdminLayout
            externalStyles={[]}
            navbar={""}
            title={"Roles"}
            withFooter={false}
            withSideBar={true}
        >
            <div className="row">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header card-header-primary">
                            <div className="nav-tabs-navigation">
                                <div className="nav-tabs-wrapper">
                                    <span className="nav-tabs-title">Roles</span>
                                    <ul className="nav nav-tabs" data-tabs="tabs">
                                        <li className="nav-item" onClick={() => setCurrentPage(1)}>
                                            <a className="nav-link active" data-toggle="tab">
                                                Create
                                            </a>
                                        </li>
                                        <li className="nav-item" onClick={() => setCurrentPage(2)}>
                                            <a className="nav-link active" data-toggle="tab">
                                                View Roles
                                            </a>
                                        </li>
                                        <li className="nav-item" onClick={() => setCurrentPage(3)}>
                                            <a className="nav-link active" data-toggle="tab">
                                                Assign Roles
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            {currentPage === 1 && <CreateRoles setCurrentPage={setCurrentPage} currentPage={currentPage} />}
                            {currentPage === 2 && <ViewRoles />}
                            {currentPage === 3 && <AssignRole />}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
