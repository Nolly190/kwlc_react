import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BranchServiceTimerItem } from "../../../../components/service-timer-item";
import { BranchController } from "../../../../controller/admin/branch.controller";
import { BranchDTO, BranchServiceDTO } from "../../../../dto/Branch.dto";
import { getParam, showConfirmDialog } from "../../../../utils";
import AdminLayout from "../admin.layout";

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

export default function EditBranch() {
  const _tmp: BranchDTO = new BranchDTO();
  const _tmpServices: BranchServiceDTO[] = [];
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [state, setState] = useState("");
  const [street, setStreet] = useState("");
  const [isBranchHq, setIsBranchHq] = useState(false);
  const [serviceDay, setServiceDay] = useState("");
  const [serviceTime, setServiceTime] = useState("");
  const [serviceAMPM, setServiceTimeAMPM] = useState("");

  const [item, setItem] = useState(_tmp);
  const [services, setServices] = useState(_tmpServices);
  const [id, setId] = useState(0);

  useEffect(() => {
    getBranch();
  }, []);

  let controller: BranchController = new BranchController();

  const getBranch = () => {
    const idParam = getParam("id");
    if (!idParam) {
      router.push("/admin/");
    } else {
      setId(parseInt(idParam));
      controller.read(
        {
          setItem,
          setTitle,
          setCity,
          setLocation,
          setState,
          setStreet,
          setIsBranchHq,
          setServices,
        },
        parseInt(idParam)
      );
    }
  };

  return (
    <AdminLayout
      externalStyles={[]}
      navbar={""}
      title={"Branch"}
      withFooter={false}
      withSideBar={true}
    >
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header card-header-primary">
              <h4 className="card-title">KWLC Branch</h4>
            </div>
            <div className="card-body">
              <form id="form">
                <input type="hidden" element-data="key" value="category" />
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Branch Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        element-data="name"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Branch State</label>
                      <input
                        type="text"
                        className="form-control"
                        id="location"
                        name="location"
                        element-data="description"
                        onChange={(e) => setState(e.target.value)}
                        value={state}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Branch City</label>
                      <input
                        type="text"
                        className="form-control"
                        id="code"
                        name="code"
                        element-data="code"
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">
                        Branch location
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="code"
                        name="code"
                        element-data="code"
                        onChange={(e) => setLocation(e.target.value)}
                        value={location}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">
                        Branch street
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="code"
                        name="code"
                        element-data="code"
                        onChange={(e) => setStreet(e.target.value)}
                        value={street}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="bmd-label-floating">Type</label>
                    <div className="row ml-1">
                      <label className="bmd-label-floating">HQ</label>
                      <input
                        type="radio"
                        value="No"
                        className="col-md-3 form-control  "
                        id="code"
                        name="code"
                        element-data="code"
                        onChange={(e) => setIsBranchHq(true)}
                        style={{ height: 15, width: 15 }}
                        checked={isBranchHq}
                      />

                      <label className="bmd-label-floating">Branch</label>
                      <input
                        type="radio"
                        value="Yes"
                        className="col-md-3  form-control"
                        name="code"
                        onChange={(e) => setIsBranchHq(false)}
                        checked={!isBranchHq}
                        style={{ height: 15, width: 15 }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row ml-1" style={{ maxWidth: "95%" }}>
                  {services.length > 0 ? (
                    <BranchServiceTimerItem
                      timers={services}
                      showDeleteIcon={true}
                      onDelete={(i) => {
                        controller.removeService(setServices, services, i);
                      }}
                    />
                  ) : (
                    "No Services Added"
                  )}
                </div>
                <div className="clearfix"></div>
                <div className="row mt-5">
                  <div className="col-md-12">
                    <button
                      type="submit"
                      id="submitBtn"
                      className="btn btn-primary pull-right"
                      onClick={(e) => {}}
                    >
                      Update Branch
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
