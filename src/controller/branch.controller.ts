import moment from "moment";
import { toast } from "react-toastify";
import { getBranchesApi, getSingleBranchApi } from "../api/branch.api";
import { BranchDTO, BranchItemDTO, BranchMediaDTO } from "../dto/Branch.dto";
import { ResponseDTO } from "../dto/response.dto";
import { statusEnum } from "../enums/util.enum";
import { fakeModel, log } from "../utils";

export async function loadBranchData(setList: Function, items: BranchDTO[]) {
    try {
        const response: ResponseDTO = await getBranchesApi();

        if (response.code < statusEnum.ok) {
            toast.error(response.message);
        }
        const data: BranchDTO[] = response.data?.data;
        // data && data.length > 0 && data.forEach(async (i) => {

        //     const innerResponse: ResponseDTO = await getSingleBranchApi((i.id));
        //     // if (innerResponse.code < statusEnum.ok) {
        //     //     return;
        //     // }
        //     const innerData: BranchDTO = innerResponse.data;

        //     const record = new BranchItemDTO({
        //         title: i.name,
        //         timers: innerData?.services ?? [],
        //         description: i.location,
        //         favVerse: "",
        //         id: i.id,
        //         image: innerData?.mediaVm?.length > 0 ? innerData?.mediaVm[0] : new BranchMediaDTO(),
        //         leadPastor: "Pastor Ken",
        //         location: i.location,
        //         phoneNo: [],
        //     });

        //     branchData.push(innerData);
        //     items = items.concat([innerData]);
        //     setList(items);

        // });
        // console.log("branchData", branchData);
        setList(data);
    }
    catch (e) {
        log("earlydev", e);
    }
}

export const loadSingleBranch = async (setItem: Function, id: string) => {
    const response: ResponseDTO = await getSingleBranchApi(parseInt(id));
    if (response.code < statusEnum.ok) {
        toast.error(response.message)
    }
    const i: BranchDTO = response?.data?.data;

    setItem(i);


}