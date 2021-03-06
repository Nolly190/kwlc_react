import moment from "moment";
import { toast } from "react-toastify";
import {
  branchAssignAdminApi,
  createBranchApi,
  deleteBranchApi,
  editBranchApi,
  getBranchesApi,
  getSingleBranchApi,
} from "../../api/branch.api";
import { getAllUsersApi, registerUser } from "../../api/user.api";
import {
  BranchAssignAdminDTO,
  BranchDTO,
  BranchServiceDTO,
} from "../../dto/Branch.dto";
import PastorDTO from "../../dto/Pastor.dto";
import UserDTO from "../../dto/User.dto";
import { statusEnum } from "../../enums/util.enum";
import { CRUDBL } from "../../interfaces/CRUDBL.interface";
import { ISetBranch } from "../../ui/dashboard/admin/branch/edit";
import {
  fakeModel,
  showAdminMessage,
  log,
  showConfirmDialog,
} from "../../utils";

export class BranchController implements CRUDBL {
  async create(data: BranchDTO, setIsLoading: Function) {
    if (
      !data.name ||
      !data.address ||
      !data.contactNumber ||
      !data.state ||
      !data.location ||
      data.services.length == 0
    ) {
      toast.error("Please fill all fields and provide a service time.");
      return;
    }

    if (fakeModel) {
      toast.success("Branch Created");
    } else {
      setIsLoading(true);
      const response = await createBranchApi(data);
      if (response.code >= statusEnum.ok) {
        toast.success("Branch Creation was successful");
      } else {
        toast.error("Branch Creation failed");
      }
      setIsLoading(false);
    }
  }
  async read(setState: ISetBranch, id: number) {
    setState.setIsLoading && setState.setIsLoading(true);
    const response = await getSingleBranchApi(id);
    if (response.code < statusEnum.ok) {
      setState.setError(response.message.toString());
    }

    const data: BranchDTO = response?.data?.data;
    setState.setItem(data);
    setState.setTitle(data?.name);
    setState.setLocation(data?.location);
    setState.setAddress(data?.address);
    setState.setIsBranchHq(data?.isBranchHq);
    setState.setServices(data?.services);
    setState.setState(data?.state);
    setState.setContactNumber(data?.contactNumber);
    setState.setIsLoading && setState.setIsLoading(false);
  }
  async update(data: BranchDTO, id: number, setIsLoading: Function) {
    data.services.forEach((x) => delete x.id);
    setIsLoading(true);
    const response = await editBranchApi(id, data);
    if (response.code >= statusEnum.ok) {
      toast.success("Branch update was successful");
    } else {
      toast.error(response?.message);
    }
    setIsLoading(false);
  }
  async delete(id: number, setItems: Function, items: BranchDTO[]) {
    const response = await deleteBranchApi(id);

    if (response.code >= statusEnum.ok) {
      toast.success("Branch deleted successfully");
      setItems(items.filter((x) => x.id != id));
    } else {
      toast.error(response.message.toString());
    }
  }
  async bulk() {}

  async list(setItems: Function, setIsLoading?: Function) {
    setIsLoading && setIsLoading(true);
    const response = await getBranchesApi();
    if (response.code < statusEnum.ok) {
      toast.error(response.message.toString());
    }

    const data: BranchDTO[] = response?.data?.data;
    setItems(data);
    setIsLoading && setIsLoading(false);
  }

  addService(
    setServices: Function,
    services: BranchServiceDTO[],
    day: string,
    time: string
  ) {
    setServices(
      services.concat([
        new BranchServiceDTO({
          day: day,
          time: time,
          id: parseInt(moment(new Date()).format("yyyyMMDDHHmmss")),
        }),
      ])
    );
  }

  removeService(
    setServices: Function,
    services: BranchServiceDTO[],
    id: number
  ) {
    const result = showConfirmDialog("Remove this item?");
    if (result) {
      setServices(services.filter((x, i) => x.id != id));
    }
  }
  async assignAdminToBranch(data: BranchAssignAdminDTO) {
    delete data.id;
    branchAssignAdminApi(data).then((response) => {
      if (response.code >= statusEnum.ok) {
        toast.success("Assign to Branch was successful");
      } else {
        toast.error("Assign to Branch update failed");
      }
    });
    // toast.success("Assign to Branch request Sent");
  }

  renderPastor(pastors: PastorDTO[], branchId: number): string {
    let _pastor = "n/a";

    pastors &&
      pastors.length > 0 &&
      pastors.map((pastor) => {
        if (pastor.branches && pastor.branches.length > 0) {
          for (let i = 0; i < pastor.branches.length; i++) {
            const branch = pastor.branches[i];
            if (branch.branchId == branchId) {
              _pastor = `${pastor.fullName}`;
            }
          }
        }
      });
    return _pastor;
  }
}
