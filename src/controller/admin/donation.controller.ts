import moment from "moment";
import { toast } from "react-toastify";
import {
  closeDonationApi,
  createDonationApi,
  editDonationApi,
  getDonationApi,
  getSingleDonationApi,
} from "../../api/donate.api";
import DonateItemDTO, {
  DonationImageDTO,
  DonationItemDTO,
} from "../../dto/Donate.dto";
import { statusEnum } from "../../enums/util.enum";
import { CRUDBL } from "../../interfaces/CRUDBL.interface";
import { ISetDonation } from "../../ui/dashboard/admin/donation/edit";
import { fakeModel, log } from "../../utils";

export class DonationController implements CRUDBL {
  async create(data: DonationItemDTO, setIsLoading: Function) {
    try {
      if (!data.title || data.donationImages.length < 1) {
        toast.error("Please fill all fields and provide a service time.");
        return;
      }

      if (fakeModel) {
        // console.log(UserData);
        // setItems(UserData);
        toast.success("Donation Created");
      } else {
        setIsLoading(true);
        data.donationImages.forEach((x) => delete x.id);
        const response = await createDonationApi(data);
        if (response.code >= statusEnum.ok) {
          toast.success("Donation Creation was successful");
        } else {
          toast.error("Donation Creation failed");
        }
        setIsLoading(false);
      }
    } catch (e) {
      log("earlydev", e);
    }
  }
  async read(set: ISetDonation, id: number) {
    set.setIsLoading && set.setIsLoading(true);
    const response = await getSingleDonationApi(id);
    if (response.code < statusEnum.ok) {
      set.setError(response.message.toString());
    }

    const data: DonationItemDTO = response?.data;

    set.setDescription(data.description);
    set.setDonationImgs(data.donationImages);
    set.setSummary(data.summary);
    set.setTitle(data.title);
    set.setIsLoading && set.setIsLoading(false);
  }
  async update(data: DonationItemDTO, id: number, setIsLoading: Function) {
    setIsLoading(true);
    const response = await editDonationApi(id, data);
    if (response.code >= statusEnum.ok) {
      toast.success("Donation update was successful");
    } else {
      toast.error("Donation update failed");
    }
    setIsLoading(false);
  }

  async delete(id: number, setItems: Function, items: DonateItemDTO[]) {
    closeDonationApi(id).then((response) => {
      if (response.code >= statusEnum.ok) {
        toast.success("Donation deleted successfully");
        setItems(items.filter((x) => x.id != id));
      } else {
        toast.error(response.message.toString());
      }
    });
  }

  async bulk() {}

  async list(setItems: Function, setIsLoading?: Function) {
    setIsLoading && setIsLoading(true);
    const response = await getDonationApi();
    if (response.code < statusEnum.ok) {
      toast.error(response.message.toString());
    }
    const data: DonateItemDTO[] = response?.data;
    setItems(data);
    setIsLoading && setIsLoading(false);
  }

  addDonationImage(
    setImages: Function,
    images: DonationImageDTO[],
    image: string,
    isMainImage: boolean
  ) {
    setImages(
      images.concat([
        {
          imageUrl: image,
          isMainImage: isMainImage,
          id: parseInt(moment(new Date()).format("yyyyMMDDHHmmss")),
        },
      ])
    );
  }
  makeMainImage(setImages: Function, images: DonationImageDTO[], id: number) {
    images.forEach((x) => {
      if (x.id == id) {
        x.isMainImage = true;
      } else {
        x.isMainImage = false;
      }
    });
    setImages(Array.from(images));
  }
}
