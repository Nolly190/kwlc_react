import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Select, { ActionMeta } from 'react-select'
import DonationImageItem from "../../../../components/donation-image";
import DualRing from "../../../../components/loader";
import { BranchServiceTimerItem } from "../../../../components/service-timer-item";
import { BranchController } from "../../../../controller/admin/branch.controller";
import { DonationController } from "../../../../controller/admin/donation.controller";
import { LiveStreamController } from "../../../../controller/admin/livestream.controller";
import { BranchDTO, BranchServiceDTO } from "../../../../dto/Branch.dto";
import DonateItemDTO, {
  DonationImageDTO,
  DonationItemDTO,
} from "../../../../dto/Donate.dto";
import { LiveStreamDTO } from "../../../../dto/LiveStream.dto";
import { getParam, showConfirmDialog, youtubeParser } from "../../../../utils";
import AdminLayout from "../admin.layout";
import { LoaderWrapper } from "../events/getAll";

export interface ISetLivestream {
  setTitle: Function;
  setDescription: Function;
  setBranch: Function;
  setUrl: Function;
  setStreamDate: Function;
  setIsLoading: Function;
}

export default function EditLiveStream() {
  const _tmpBranches: BranchDTO[] = [];
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isMainImage, setIsMainImage] = useState(false);
  const [donationImg, setDonationImg] = useState("");
  const [branches, setBranches] = useState(_tmpBranches);
  const [branch, setBranch] = useState("");
  const [id, setId] = useState(0);
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [url, setUrl] = useState("");
  const [streamDate, setStreamDate] = useState("");

  useEffect(() => {
    branchController.list(setBranches);
    getBranch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let controller: LiveStreamController = new LiveStreamController();
  const branchController: BranchController = new BranchController();

  const getBranch = () => {
    const idParam = getParam("id");
    if (!idParam) {
      router.push("/admin/");
    } else {
      setId(parseInt(idParam));
      controller.read(
        {
          setDescription,
          setTitle,
          setBranch,
          setUrl,
          setStreamDate,
          setIsLoading
        },
        parseInt(idParam)
      );
    }
  };

  // const dropDownOptions = () => {
  //   const arr = [];
  //   branches.map((x, i) => {
  //     arr.push({ value: x?.id, label: x?.name });
  //   })

  //   return arr
  // }

  // const onTypeChange = (newValue: any, actionMeta: ActionMeta<any>) => {
  //   setBranch(newValue.value);
  // }

  const onClick = (e) => {
    e.preventDefault();
    controller.update(
      new LiveStreamDTO({
        dateOfStream: streamDate,
        description: description,
        liveStreamUrl: url,
        title: title,
        id: id,
        isActive: true,
      }),
      id, setIsSaving
    );
  };

  return (
    <AdminLayout
      externalStyles={[]}
      navbar={""}
      title={"Edit LiveStream"}
      withFooter={false}
      withSideBar={true}
    >
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header card-header-primary">
              <h4 className="card-title">Edit Stream</h4>
            </div>
            <div className="card-body">
              {isLoading ?
                <LoaderWrapper>
                  <DualRing width="40px" height="40px" color="#0b0146" />
                </LoaderWrapper> :
                <form id="form">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="bmd-label-floating">Title</label>
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
                        <label className="bmd-label-floating">URL</label>
                        <input
                          type="text"
                          className="form-control"
                          id="location"
                          name="location"
                          element-data="description"
                          onChange={(e) => setUrl(e.target.value)}
                          value={url}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="bmd-label-floating">Description </label>
                        <textarea
                          className="form-control"
                          id="code"
                          name="code"
                          element-data="code"
                          onChange={(e) => setDescription(e.target.value)}
                          value={description}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="bmd-label-floating">
                          Select Stream Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="date"
                          name="date"
                          onChange={(e) => setStreamDate(e.target.value)}
                          value={streamDate}
                        />
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
                        disabled={isSaving}
                      >
                        {isSaving ? <DualRing width="15px" height="15px" color="#fff" /> : "Update Stream"}
                      </button>
                    </div>
                  </div>
                </form>
              }
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
