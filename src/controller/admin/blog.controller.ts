import { toast } from "react-toastify";
import {
  createBlogApi,
  deleteBlogApi,
  getBlogApi,
  updateBlogApi,
} from "../../api/blog.api";
import { branchAssignAdminApi, getSingleBranchApi } from "../../api/branch.api";
import { BlogDTO, BlogItemDTO } from "../../dto/Blog.dto";
import {
  BranchAssignAdminDTO,
  BranchDTO,
  BranchServiceDTO,
} from "../../dto/Branch.dto";
import PastorDTO from "../../dto/Pastor.dto";
import { statusEnum } from "../../enums/util.enum";
import { CRUDBL } from "../../interfaces/CRUDBL.interface";
import { CREATION_ERROR, CREATION_OK, CREATION_PENDING } from "../../strings";
import { ISetBranch } from "../../ui/dashboard/admin/branch/edit";
import { fakeModel, log, showConfirmDialog } from "../../utils";

export class BlogController implements CRUDBL {
  async create(data: BlogItemDTO, setIsLoading: Function) {
    if (!data.message || !data.title || data.tags.length == 0) {
      toast.error("Please fill all fields and provide a blog post tags.");
      return;
    }

    if (fakeModel) {
      toast.success("Blog Created");
    } else {
      setIsLoading(true);
      const response = await createBlogApi(data);
      log("earlydev", response);
      if (response.code >= statusEnum.ok) {
        toast.success(CREATION_OK("Blog post"));
      } else {
        toast.error(CREATION_ERROR("Blog post"));
      }
      setIsLoading(false);
    }
  }

  async read(setState: ISetBranch, id: number) {
    const response = await getSingleBranchApi(id);
    if (response.code < statusEnum.ok) {
      toast.error(response.message.toString());
    }

    const data: BranchDTO = response?.data?.data;
    setState.setItem(data);
    setState.setTitle(data.name);
    setState.setLocation(data.location);
    setState.setAddress(data.address);
    setState.setIsBranchHq(data.isBranchHq);
    setState.setServices(data.services);
    setState.setState(data.state);
    setState.setContactNumber(data.contactNumber);
  }

  async update(data: BlogItemDTO, id: number, setIsLoading: Function) {
    setIsLoading(true);
    const response = await updateBlogApi(data, id);
    if (response.code >= statusEnum.ok) {
      toast.success("Blog update was successful");
    } else {
      toast.error("Blog update failed");
    }
    setIsLoading(false);
  }

  async delete(id: number, setItems: Function, items: BlogDTO[]) {
    const response = await deleteBlogApi(id);
    if (response.code < statusEnum.ok) {
      toast.error(response.message.toString());
    }

    toast.success("Blog deleted successfully");
    setItems(items.filter((x) => x.id != id));
  }

  async bulk() {}

  async list(setItems: Function, setIsLoading?: Function) {
    setIsLoading && setIsLoading(true);
    const response = await getBlogApi();
    if (response.code < statusEnum.ok) {
      toast.error(response.message.toString());
    }

    const data: BranchDTO[] = response?.data?.data;
    setItems(data);
    setIsLoading && setIsLoading(false);
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
    toast.success("Assign to Branch request Sent");
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
