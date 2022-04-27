import { useEffect, useState } from "react";
import DonationImageItem from "../../../../components/donation-image";
import { BranchServiceTimerItem } from "../../../../components/service-timer-item";
import { BranchController } from "../../../../controller/admin/branch.controller";
import { DonationController } from "../../../../controller/admin/donation.controller";
import { BranchDTO, BranchServiceDTO } from "../../../../dto/Branch.dto";
import DonateItemDTO, {
  DonationImageDTO,
  DonationItemDTO,
} from "../../../../dto/Donate.dto";
import { showConfirmDialog } from "../../../../utils";
import AdminLayout from "../admin.layout";

export default function AddDonation() {
  const _tmp: DonateItemDTO[] = [];
  const _tmpImages: DonationImageDTO[] = [];
  const _tmpBranches: BranchDTO[] = [];

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [isMainImage, setIsMainImage] = useState(false);
  const [donationImg, setDonationImg] = useState("");
  const [item, setItem] = useState(_tmp);
  const [donationImgs, setDonationImgs] = useState(_tmpImages);
  const [branches, setBranches] = useState(_tmpBranches);
  const [branch, setBranch] = useState("");

  useEffect(() => {
    branchController.list(setBranches);
  }, []);

  let controller: DonationController = new DonationController();
  const branchController: BranchController = new BranchController();

  const onClick = (e) => {
    e.preventDefault();
    controller.create(
      new DonationItemDTO({
        description: description,
        donationImages: donationImgs,
        isActive: true,
        summary: summary,
        title: title,
      })
    );
  };

  const onAddImageURL = (e) => {
    e.preventDefault();
    controller.addDonationImage(
      setDonationImgs,
      donationImgs,
      donationImg,
      isMainImage
    );
  };

  return (
    <AdminLayout
      externalStyles={[]}
      navbar={""}
      title={"Add Donation"}
      withFooter={false}
      withSideBar={true}
    >
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header card-header-primary">
              <h4 className="card-title">Create New Donation</h4>
            </div>
            <div className="card-body">
              <form id="form">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="bmd-label-floating">
                        Select Branch
                      </label>
                      <select
                        className="form-control"
                        onChange={(e) => setBranch(e.target.value)}
                      >
                        <option>Select Branch</option>
                        {branches.length > 0
                          ? branches.map((x, i) => {
                            if (!x.isBranchHq) return;
                            return (
                              <option key={i} value={x.id}>
                                {x.name}
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
                      <label className="bmd-label-floating">
                        Donation Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        element-data="name"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">
                        Donation Summary
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="location"
                        name="location"
                        element-data="description"
                        onChange={(e) => setSummary(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="bmd-label-floating">
                        Donation Description{" "}
                      </label>
                      <textarea
                        className="form-control"
                        id="code"
                        name="code"
                        element-data="code"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">
                        Enter Image URL
                      </label>
                      <div className="row">
                        <input
                          type="text"
                          className="form-control"
                          id="location"
                          name="location"
                          element-data="description"
                          onChange={(e) => setDonationImg(e.target.value)}
                        />
                        <button
                          className="btn btn-primary pull-right"
                          onClick={(e) => onClick(e)}
                        >
                          Create Donation
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mt-4">
                    <button
                      type="submit"
                      id="submitBtn"
                      className="btn btn-primary "
                      onClick={(e) => onAddImageURL(e)}
                    >
                      Add URL
                    </button>
                  </div>
                </div>
                <div className="row ml-1" style={{ maxWidth: "95%" }}>
                  {donationImgs.length > 0
                    ? donationImgs.map((x, i) => {
                      return (
                        <DonationImageItem
                          key={i}
                          id={x.id}
                          url={x.imageUrl}
                          isMainImage={x.isMainImage}
                          onCheck={(x) =>
                            controller.makeMainImage(
                              setDonationImgs,
                              donationImgs,
                              x
                            )
                          }
                        />
                      );
                    })
                    : "No Donation images Added"}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
