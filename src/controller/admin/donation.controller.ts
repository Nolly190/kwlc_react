import moment from "moment";
import { toast } from "react-toastify";
import { editBranchApi, getSingleBranchApi } from "../../api/branch.api";
import { closeDonationApi, createDonationApi, editDonationApi, getDonationApi, getSingleDonationApi } from "../../api/donate.api";
import { BranchDTO } from "../../dto/Branch.dto";
import DonateItemDTO, { DonationImageDTO, DonationItemDTO } from "../../dto/Donate.dto";
import { statusEnum } from "../../enums/util.enum";
import { CRUDBL } from "../../interfaces/CRUDBL.interface";
import { ISetDonation } from "../../ui/dashboard/admin/donation/edit";
import { fakeModel, showAdminMessage, log, showConfirmDialog } from "../../utils";

export class DonationController implements CRUDBL {
    async create(data: DonationItemDTO) {
        try {
            if (!data.title || data.donationImages.length < 1) {
                toast.error("Please fill all fields and provide a service time.");
                return;
            }

            if (fakeModel) {
                // console.log(UserData);
                // setItems(UserData);
                toast.success("Donation Created");
            }
            else {
                data.donationImages.forEach(x => delete x.id);
                createDonationApi(data).then((response) => {
                    log("earlydev", response);
                    if (response.code >= statusEnum.ok) {
                        toast.success("Donation Creation was successful");

                    }
                    else {
                        toast.error("Donation Creation failed");
                    }
                });
                // toast.success("Donation Creation request Sent");
            }
        }
        catch (e) {
            log("earlydev", e);
        }
    }
    async read(set: ISetDonation, id: number) {

        const response = await getSingleDonationApi(id);
        if (response.code < statusEnum.ok) {
            toast.error(response.message.toString());
        }

        const data: DonationItemDTO = response?.data;

        set.setDescription(data.description);
        set.setDonationImgs(data.donationImages);
        set.setSummary(data.summary);
        set.setTitle(data.title);

    }
    async update(data: DonationItemDTO, id: number) {

        // data.donationImages.forEach(x => delete x.id)

        editDonationApi(id, data).then((response) => {
            log("earlydev", "1", response);
            if (response.code >= statusEnum.ok) {
                toast.success("Donation update was successful");

            }
            else {
                toast.error("Donation update failed");
            }
        });
        // toast.success("Donation update request Sent");

    }

    async delete(id: number, setItems: Function, items: DonateItemDTO[]) {
        const result = showConfirmDialog('Confirm Delete');
        if (result) {
            closeDonationApi(id).then((response) => {
                if (response.code >= statusEnum.ok) {
                    toast.success("Donation deleted successfully");
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

        const response = await getDonationApi();
        if (response.code < statusEnum.ok) {
            toast.error(response.message.toString());
        }

        const data: DonateItemDTO[] = response?.data?.data;
        setItems(data);

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