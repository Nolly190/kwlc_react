import moment from "moment";
import { toast } from "react-toastify";
import { createBlogApi, deleteBlogApi, getBlogApi, updateBlogApi } from "../../api/blog.api";
import { branchAssignAdminApi, createBranchApi, deleteBranchApi, editBranchApi, getBranchesApi, getSingleBranchApi } from "../../api/branch.api";
import { createEventApi, deleteEventApi, getEventsApi, getSingleEventApi, updateEventApi } from "../../api/event.api";
import { getAllUsersApi, registerUser } from "../../api/user.api";
import { BlogDTO, BlogItemDTO } from "../../dto/Blog.dto";
import { BranchAssignAdminDTO, BranchDTO, BranchServiceDTO } from "../../dto/Branch.dto";
import PastorDTO from "../../dto/Pastor.dto";
import UserDTO from "../../dto/User.dto";
import { statusEnum } from "../../enums/util.enum";
import { CRUDBL } from "../../interfaces/CRUDBL.interface";
import { CREATION_ERROR, CREATION_OK, CREATION_PENDING } from "../../strings";
import { CreateEventPayload, EventsResponse } from "../../types/appTypes";
import { ISetBranch } from "../../ui/dashboard/admin/branch/edit";
import { fakeModel, showAdminMessage, log, showConfirmDialog } from "../../utils";

export class EventsController implements CRUDBL {
    async create(data: CreateEventPayload, setIsLoading: Function) {
        if (!data.address || !data.date || !data.description || !data.eventType || !data.location || !data.name || !data.phone) {
            toast.error("Please fill all fields.");
            return;
        }

        if (data.event_Images.length === 0) {
            toast.error("Please add at least one image.");
            return;
        }
        setIsLoading(true)
        const response = await createEventApi(data);
        if (response.code >= statusEnum.ok) {
            toast.success(CREATION_OK("Event"));
        }
        else {
            toast.error(CREATION_ERROR("Event"));
        }
        setIsLoading(false)
    }

    async read(setState: ISetBranch, id: number) {
        const response = await getSingleEventApi(id);
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


    async update(data: CreateEventPayload, id: number, setIsLoading: Function) {
        setIsLoading(true)
        const response = await updateEventApi(data, id);
        if (response.code >= statusEnum.ok) {
            toast.success("Event update was successful");
        }
        else {
            toast.error("Event update failed");
        }
        setIsLoading(false)
    }

    async delete(id: number, setItems: Function, items: EventsResponse[]) {
        const response = await deleteEventApi(id);
        if (response.code >= statusEnum.ok) {
            toast.success("Event deleted successfully");
        } else {
            toast.error(response.message.toString());
        }

        setItems(items.filter(x => x.id != id));
    }

    async bulk() {

    }

    async list(setItems: Function, setIsLoading?: Function) {
        setIsLoading && setIsLoading(true);
        const response = await getEventsApi();
        if (response.code < statusEnum.ok) {
            toast.error(response.message.toString());
        }

        const data: EventsResponse[] = response?.data?.data;
        setItems(data);
        setIsLoading && setIsLoading(false);
    }
}