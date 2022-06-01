import { useEffect, useState } from "react";
import DonationImageItem from "../../../../components/donation-image";
import Select, { ActionMeta } from 'react-select'
import { BranchController } from "../../../../controller/admin/branch.controller";
import { DonationController } from "../../../../controller/admin/donation.controller";
import { BranchDTO } from "../../../../dto/Branch.dto";
import DonateItemDTO, {
  DonationImageDTO,
  DonationItemDTO,
} from "../../../../dto/Donate.dto";
import AdminLayout from "../admin.layout";
import { ImageWrapper } from "../events/add";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const dropDownOptions = () => {
    const arr = [];
    branches.map((x, i) => {
      if (!x.isBranchHq) return;
      arr.push({ value: x?.id, label: x?.name });
    })

    return arr
  }

  const onTypeChange = (newValue: any, actionMeta: ActionMeta<any>) => {
    setBranch(newValue.value);
  }

  const handleDelete = (index: number) => {
    const newArray = [...donationImgs];
    newArray.splice(index, 1);
    setDonationImgs(newArray);
  }

  const onAddImageURL = (e) => {
    e.preventDefault();
    controller.addDonationImage(
      setDonationImgs,
      donationImgs,
      donationImg,
      isMainImage
    );
    setDonationImg("");
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
                        Select Branch
                      </label>
                      <Select options={dropDownOptions()} onChange={onTypeChange} />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8">
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
                  <div className="col-md-8">
                    <div className="form-group">
                      <label className="bmd-label-floating">
                        Donation Description{" "}
                      </label>
                      <textarea
                        className="form-control"
                        id="code"
                        name="code"
                        element-data="code"
                        cols={3}
                        rows={3}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="bmd-label-floating">Enter Image URL</label>
                      <form>
                        <div className="row pt-3">
                          <div className="col-md-6">
                            <input
                              type="text"
                              className="form-control"
                              id="location"
                              name="location"
                              element-data="description"
                              value={donationImg}
                              onChange={(e) => setDonationImg(e.target.value)}
                            />
                          </div>
                          <div className="col-md-4">
                            <button
                              className="btn btn-primary pull-right"
                              onClick={(e) => onAddImageURL(e)}
                            >
                              Add URL
                            </button>
                          </div>
                        </div>
                      </form>
                      <ImageWrapper>
                        {donationImgs?.map((x, i) => (
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
                            index={i}
                            handleDelete={handleDelete}
                          />
                        ))}
                      </ImageWrapper>
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
                      Update Donations
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
