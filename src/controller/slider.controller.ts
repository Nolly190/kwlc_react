import { toast } from "react-toastify";
import { getSliderAPI } from "../api/slider.api";
import { ResponseDTO } from "../dto/response.dto";
import { SliderDTO, SliderItemDTO } from "../dto/slider.dto";
import { statusEnum } from "../enums/util.enum";
import { fakeModel } from "../utils";

export async function loadSlider(setList: Function) {
    try {
        if (fakeModel) {
            const data: SliderDTO[] = [];
            const branchData = [];
            setList(data);
        }
        else {

            const response: ResponseDTO = await getSliderAPI();
            if (response.code < statusEnum.ok) {
                toast.error(response.message);
            }
            const data: SliderDTO[] = response.data;
            const branchData: SliderDTO[] = [];

            data && data.length > 0 && data.map((i) => {
                const record = new SliderDTO({
                    dateCreated: i.dateCreated,
                    isDynamic: i.isDynamic,
                    sliderImages: i.sliderImages,
                    type: i.type,
                });

                branchData.push(record);
            });

            setList(branchData);
        }
    }
    catch (e) {
        console.error(e);
    }
}

