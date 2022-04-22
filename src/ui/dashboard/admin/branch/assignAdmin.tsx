import { useEffect, useState } from "react";
import { BranchServiceTimerItem } from "../../../../components/service-timer-item";
import { BranchController } from "../../../../controller/admin/branch.controller";
import { PastorController } from "../../../../controller/admin/pastor.controller";
import { UserController } from "../../../../controller/admin/users.controller";
import {
  BranchAssignAdminDTO,
  BranchDTO,
  BranchServiceDTO,
} from "../../../../dto/Branch.dto";
import UserDTO from "../../../../dto/User.dto";
import { getParam, showConfirmDialog, uuidv4 } from "../../../../utils";
import AdminLayout from "../admin.layout";
import Select from 'react-select'

export interface ISetBranch {
  setItem: Function;
  setTitle: Function;
  setCity: Function;
  setLocation: Function;
  setState: Function;
  setStreet: Function;
  setIsBranchHq: Function;
  setServices: Function;
}

export default function AssignAdminToBranch() {
  const _tmp: BranchDTO[] = [];
  const _userTmp: UserDTO[] = [];

  const _tmpServices: BranchServiceDTO[] = [];

  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [state, setState] = useState("");
  const [street, setStreet] = useState("");
  const [isResidential, setIsResidential] = useState(false);
  const [serviceDay, setServiceDay] = useState("");
  const [serviceTime, setServiceTime] = useState("");
  const [serviceAMPM, setServiceTimeAMPM] = useState("");

  const [services, setServices] = useState(_tmpServices);
  const [id, setId] = useState(0);

  const [items, setItems] = useState(_tmp);
  const [branch, setBranch] = useState("");
  const [users, setUsers] = useState(_userTmp);
  const [user, setUser] = useState("");
  const [userType, setUserType] = useState("");

  useEffect(() => {
    init();
  }, []);

  let branchController: BranchController = new BranchController();
  let userController: UserController = new UserController();

  const init = () => {
    //get admins
    //get branches
    // post to endpoint

    branchController.list(setItems);
    userController.list(setUsers);
  };

  const onClick = (e) => {
    e.preventDefault();
    branchController.assignAdminToBranch(
      new BranchAssignAdminDTO({
        id: parseInt(uuidv4()),
        branchId: parseInt(branch),
        isResidential: isResidential,
        userId: parseInt(user),
        userType: userType,
      })
    );
  };

  const dropDownOptions = () => {
    const arr = [];
    users.map((x, i) => {
      arr.push({ value: x?.id, label: `${x?.firstName} ${x?.lastName} (${x?.username})` });
    })

    return arr
  }

  return (
    <AdminLayout
      externalStyles={[]}
      navbar={""}
      title={"Assign Admin"}
      withFooter={false}
      withSideBar={true}
    >
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header card-header-primary">
              <h4 className="card-title">Assign Admin</h4>
            </div>
            <div className="card-body">
              <form id="form">
                <input type="hidden" element-data="key" value="category" />
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Branch</label>
                      <select
                        className="form-control"
                        value={branch}
                        onChange={(e) => {
                          setBranch(e.target.value);
                        }}
                      >
                        <option value="">Select Branch</option>
                        {items.length > 0
                          ? items.map((x, i) => {
                            return (
                              <option key={i} value={x.id}>
                                {x.name}-{x.state}
                              </option>
                            );
                          })
                          : undefined}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Select User</label>
                      <select
                        className="form-control"
                        value={user}
                        onChange={(e) => {
                          setUser(e.target.value);
                        }}
                      >
                        <option value="">Select User</option>
                        {users.length > 0
                          ? users.map((x, i) => {
                            return (
                              <option key={i} value={x.id}>
                                {x.firstName} {x.lastName} ({x.username})
                              </option>
                            );
                          })
                          : undefined}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">User Type</label>
                      <select
                        className="form-control"
                        value={userType}
                        onChange={(e) => {
                          setUserType(e.target.value);
                        }}
                      >
                        <option value="">Select User Type</option>
                        <option value="Pastor">Pastor</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Residential</label>
                      <div className="row ml-1">
                        <label className="bmd-label-floating">Yes</label>
                        <input
                          type="radio"
                          value="No"
                          className="col-md-3 form-control"
                          id="code"
                          name="code"
                          element-data="code"
                          onChange={(e) => setIsResidential(true)}
                          style={{ height: 15, width: 15 }}
                        />

                        <label className="bmd-label-floating">No</label>
                        <input
                          type="radio"
                          value="Yes"
                          className="col-md-3  form-control"
                          name="code"
                          onChange={(e) => setIsResidential(false)}
                          checked
                          style={{ height: 15, width: 15 }}
                        />
                      </div>
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
                      onClick={(e) => onClick(e)}
                    >
                      Assign
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
