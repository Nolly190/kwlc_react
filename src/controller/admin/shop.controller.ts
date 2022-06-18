import moment from "moment";
import { toast } from "react-toastify";
import { getSingleDonationApi } from "../../api/donate.api";
import {
  createShopItemApi,
  deleteShopItemApi,
  editShopItemApi,
  getShopItemsApi,
  getSingleShopItemApi,
} from "../../api/shop.api";
import { DonationItemDTO } from "../../dto/Donate.dto";
import { ShopDTO } from "../../dto/ShopItem.dto";
import { statusEnum } from "../../enums/util.enum";
import { CRUDBL } from "../../interfaces/CRUDBL.interface";
import {
  CREATION_ERROR,
  CREATION_OK,
  CREATION_PENDING,
  DELETE_ERROR,
  DELETE_OK,
  DELETE_PENDING,
  UPDATE_ERROR,
  UPDATE_OK,
  UPDATE_PENDING,
} from "../../strings";
import {
  fakeModel,
  showAdminMessage,
  log,
  showConfirmDialog,
} from "../../utils";

export interface ISetShopItem {
  setPrice: Function;
  setTitle: Function;
  setDescription: Function;
  setQuantity: Function;
  setWeight: Function;
  setDimension: Function;
  setImgs: Function;
  setIsLoading: Function;
}

export class ShopController implements CRUDBL {
  keyTitle: string = "Product";

  async create(data: ShopDTO, setIsLoading: Function) {
    setIsLoading(true);
    try {
      if (!data.title || data.productImages.length < 1) {
        toast.error("Please fill all fields and provide a product image.");
        return;
      }

      data.productImages.forEach((x) => delete x.id);
      const response = await createShopItemApi(data);
      if (response.code >= statusEnum.ok) {
        toast.success(CREATION_OK(this.keyTitle));
      } else {
        toast.error(CREATION_ERROR(this.keyTitle));
      }
      toast.success(CREATION_PENDING(this.keyTitle));
    } catch (e) {
      log("earlydev", e);
    }
    setIsLoading(false);
  }
  async read(set: ISetShopItem, id: number) {
    set.setIsLoading && set.setIsLoading(true);
    const response = await getSingleShopItemApi(id);
    if (response.code < statusEnum.ok) {
      toast.error(response.message.toString());
    }

    const data: ShopDTO = response?.data;

    set.setDescription(data?.description ?? "n/a");
    set.setTitle(data?.title);
    set.setDimension(data?.dimension);
    set.setWeight(data?.weight);
    set.setImgs(data?.productImages);
    set.setPrice(data?.price);
    set.setQuantity(data?.quantity);
    set.setIsLoading && set.setIsLoading(false);
  }

  async update(data: ShopDTO, id: number, setIsLoading: Function) {
    // data.donationImages.forEach(x => delete x.id)
    setIsLoading(true);
    const response = await editShopItemApi(id, data);
    if (response.code >= statusEnum.ok) {
      toast.success(UPDATE_OK(this.keyTitle));
    } else {
      toast.error(UPDATE_ERROR(this.keyTitle));
    }
    setIsLoading(false);
  }

  async delete(id: number, setItems: Function, items: ShopDTO[]) {
    deleteShopItemApi(id).then((response) => {
      if (response.code >= statusEnum.ok) {
        toast.success("Item deleted successfully");
        setItems(items.filter((x) => x.id != id));
      } else {
        toast.error(response.message.toString());
      }
    });
  }

  async bulk() {}
  async list(setItems: Function, setIsLoading?: Function) {
    setIsLoading && setIsLoading(true);
    const response = await getShopItemsApi();
    if (response.code < statusEnum.ok) {
      toast.error(response.message.toString());
    }

    const data: ShopDTO[] = response?.data;
    setItems(data);
    setIsLoading && setIsLoading(false);
  }

  addImage(setImages: Function, images, image: string) {
    setImages(
      images.concat([
        {
          imageUrl: image,
          id: parseInt(moment(new Date()).format("yyyyMMDDHHmmss")),
        },
      ])
    );
  }
}
