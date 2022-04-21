import { toast } from "react-toastify";
import { getDonationApi, getSingleDonationApi } from "../api/donate.api";
import DonateItemDTO, { DonationItemDTO } from "../dto/Donate.dto";
import { ResponseDTO } from "../dto/response.dto";
import { statusEnum } from "../enums/util.enum";
import { fakeModel } from "../utils";

export const loadDonations = async (setItem: Function, items: DonateItemDTO[]) => {
    try {

        const response: ResponseDTO = await getDonationApi();

        if (!response.status) {
            toast.error(response.message);
            return;
        }

        else {
            const response: ResponseDTO = await getDonationApi();
            
            if (!response.status) {
                toast.error(response.message);
                return;
            }

            const data: DonationItemDTO[] = response.data;
            const donationData: DonateItemDTO[] = [];
            // make api call to get individual donation details
            data.map(async (i, index) => {
                const singleResponse = await getSingleDonationApi(i.id);

                if (singleResponse.status) {
                    //singleResponse.data
                    const _donationData = new DonateItemDTO({
                        description: singleResponse?.data?.description,
                        id: singleResponse?.data?.id,
                        // donationImages: singleResponse.data.donationImages.map(x => x.imageUrl),
                        image: singleResponse?.data?.donationImages?.filter(x => x.isMainImage)[0]?.imageUrl,
                        images: singleResponse?.data?.donationImages.map(x => x.imageUrl),
                        raised: 0,
                        target: 0,
                        title: i.title
                    });
                    donationData.push();
                    items = items.concat([_donationData])
                    setItem(items);
                }
            });
            // if (donationData.length > 0) {
            //     console.log("setting data", donationData);
            //     setItem(donationData);
            // }

    } catch (error) {
        console.error(error);
    }


}

export const loadSingleDonation = async (setItem: Function, id: string) => {
    try {

        const response: ResponseDTO = await getSingleDonationApi(parseInt(id));
        if (response.code < statusEnum.ok) {
            toast.error(response.message);
            return;
        }
        const i: DonationItemDTO = response.data?.data;
        if (!i) throw new Error();

        setItem(new DonateItemDTO({
            description: i.description,
            id: i.id,
            image: i.donationImages?.length > 0 ? i.donationImages?.filter(x => x.isMainImage)[0].imageUrl : "",
            images: i.donationImages?.length > 0 ? i.donationImages?.map(x => x.imageUrl) : [],
            raised: 0,
            target: 0,
            title: i.title
        }));

    } catch (error) {
        console.log(error);
    }

}