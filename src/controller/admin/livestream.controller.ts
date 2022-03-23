import moment from "moment";
import { toast } from "react-toastify";
import { editBranchApi, getSingleBranchApi } from "../../api/branch.api";
import { createDonationApi, editDonationApi, getDonationApi, getSingleDonationApi } from "../../api/donate.api";
import { createStreamApi, editStreamApi, getLiveStreamApi, getLiveStreamsApi, stopLivestreamApi } from "../../api/livestream";
import { BranchDTO } from "../../dto/Branch.dto";
import DonateItemDTO, { DonationImageDTO, DonationItemDTO } from "../../dto/Donate.dto";
import { LiveStreamDTO } from "../../dto/LiveStream.dto";
import { statusEnum } from "../../enums/util.enum";
import { CRUDBL } from "../../interfaces/CRUDBL.interface";
import { BranchesModel, DonationsModel, LiveStreamData } from "../../testModel";
import { ISetDonation } from "../../ui/dashboard/admin/donation/edit";
import { ISetLivestream } from "../../ui/dashboard/admin/livestream/edit";
import { fakeModel, showAdminMessage, log, youtubeParser, showConfirmDialog } from "../../utils";

export class LiveStreamController implements CRUDBL {
    async create(data: LiveStreamDTO, branchId: string) {
        try {
            if (!data.title || !data.description) {
                toast.error("Please fill all fields.");
                return;
            }

            if (fakeModel) {
                // console.log(UserData);
                // setItems(UserData);
                toast.success("Stream Created");
            }
            else {
                let _url = youtubeParser(data.liveStreamUrl);
                if (_url == '') {
                    toast.error("Youtube video link expected.");
                }
                else {
                    data.liveStreamUrl = _url;
                    createStreamApi(data, parseInt(branchId)).then((response) => {
                        log("earlydev", response);
                        if (response.code >= statusEnum.ok) {
                            toast.success("Stream Creation was successful");

                        }
                        else {
                            toast.error("Stream Creation failed");
                        }
                    });
                    // toast.success("Stream Creation request Sent");
                }
            }
        }
        catch (e) {
            log("earlydev", e);
        }
    }
    async read(set: ISetLivestream, id: number) {
        if (fakeModel) {
            const data = LiveStreamData[id];
            set.setDescription(data.description);
            set.setTitle(data.title);
            set.setUrl(data.liveStreamUrl);
            set.setBranch(BranchesModel[0].id);
            set.setStreamDate(moment(data.dateOfStream).format("yyyy-MM-DD"));
        }
        else {
            const response = await getLiveStreamApi(id);
            if (response.code < statusEnum.ok) {
                toast.error(response.message.toString());
            }

            const data: LiveStreamDTO = response?.data?.data;

            set.setDescription(data.description);
            set.setUrl(data.liveStreamUrl);
            set.setTitle(data.title);
            set.setStreamDate(moment(data.dateOfStream).format("yyyy-MM-DD"));
            // set.setBranch(data);
        }
    }
    async update(data: LiveStreamDTO, id: number) {
        if (fakeModel) {
            toast.success("Stream update was successful");
        }
        else {
            // data.donationImages.forEach(x => delete x.id)
            let _url = youtubeParser(data.liveStreamUrl);
            if (_url == '') {
                toast.error("Youtube video link expected.");
            }
            else {
                data.liveStreamUrl = _url;
                editStreamApi(data, id).then((response) => {
                    log("earlydev", "1", response);
                    if (response.code >= statusEnum.ok) {
                        toast.success("Stream update was successful");

                    }
                    else {
                        toast.error("Stream update failed");
                    }
                });
                // toast.success("Stream update request Sent");
            }
        }
    }

    async delete(id: number, setItems: Function, items: LiveStreamDTO[]) {
        const result = showConfirmDialog('Confirm Delete');
        if (result) {
            stopLivestreamApi(id).then((response) => {
                if (response.code >= statusEnum.ok) {
                    toast.success("Livestream stopped successfully");
                    setItems(items.filter(x => x.id != id));
                }
                else {
                    toast.error(response.message.toString());
                }
            })
        }
    }

    async bulk() {

    }
    async list(setItems: Function) {
        if (fakeModel) {
            setItems(LiveStreamData);
        }
        else {
            const response = await getLiveStreamsApi();
            if (response.code < statusEnum.ok) {
                toast.error(response.message.toString());
            }

            const data: LiveStreamDTO[] = response?.data?.data;
            setItems(data);
        }
    }

    addDonationImage(setImages: Function, images: DonationImageDTO[], image: string, isMainImage: boolean) {
        setImages(images.concat([{
            imageUrl: image,
            isMainImage: isMainImage,
            id: parseInt(moment(new Date()).format('yyyyMMDDHHmmss')),
        }]));
    }
    makeMainImage(setImages: Function, images: DonationImageDTO[], id: number) {
        images.forEach(x => {
            if (x.id == id) {
                x.isMainImage = true;
            }
            else {
                x.isMainImage = false;
            }
        });
        setImages(Array.from(images));
    }
}