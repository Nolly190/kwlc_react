import moment from "moment";
import { toast } from "react-toastify";
import { getBranchesApi, getSingleBranchApi } from "../api/branch.api";
import { BranchDTO, BranchItemDTO, BranchMediaDTO } from "../dto/Branch.dto";
import { ResponseDTO } from "../dto/response.dto";
import { statusEnum } from "../enums/util.enum";
import { BranchesModel, DonationsModel } from "../testModel";
import { fakeModel, log } from "../utils";
import { BlogDTO } from "./../dto/Blog.dto";

export async function loadBranchData(setList: Function, items: BranchItemDTO[]) {
    try {
        if (fakeModel) {
            const data: BranchItemDTO[] = BranchesModel;
            const branchData = [];
            setList(data);
        }
        else {
            const response: ResponseDTO = await getBranchesApi();

            if (response.code < statusEnum.ok) {
                toast.error(response.message);
            }
            const data: BranchDTO[] = response.data?.data;
            const branchData: BranchItemDTO[] = [];
            data && data.length > 0 && data.forEach(async (i) => {

                const innerResponse: ResponseDTO = await getSingleBranchApi((i.id));
                // if (innerResponse.code < statusEnum.ok) {
                //     return;
                // }
                const innerData: BranchDTO = innerResponse.data;

                const record = new BranchItemDTO({
                    title: i.name,
                    timers: innerData?.services ?? [],
                    description: i.location,
                    favVerse: "",
                    id: i.id,
                    image: innerData?.mediaVm?.length > 0 ? innerData?.mediaVm[0] : new BranchMediaDTO(),
                    leadPastor: "Pastor Ken",
                    location: i.location,
                    phoneNo: [],
                });

                branchData.push(record);
                items = items.concat([record]);
                setList(items);

            });
            // console.log("branchData", branchData);
            // setList(branchData);
        }
    }
    catch (e) {
        log("earlydev", e);
    }
}

export const loadSingleBranch = async (setItem: Function, id: string) => {
    if (fakeModel) {
        const item = BranchesModel.filter(x => x.id.toString() == id);
        if (item.length > 0) {
            setItem(item[0]);
        }
        else { }
    }
    else {
        const response: ResponseDTO = await getSingleBranchApi(parseInt(id));
        if (response.code < statusEnum.ok) {
            toast.error(response.message)
        }
        const i: BranchDTO = response.data;

        setItem(new BranchItemDTO({
            description: i.location,
            id: i.id,
            image: i.mediaVm?.length > 0 ? i.mediaVm[0] : new BranchMediaDTO(),
            images: i.mediaVm?.length > 0 ? i.mediaVm : [],
            raised: 0,
            target: 0,
            title: i.name,
            phoneNo: [],
            timers: i.services,
            favVerse: "",
            leadPastor: "Pastor Ken",
            location: i.location,
        }));
    }

}