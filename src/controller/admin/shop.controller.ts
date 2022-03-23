import moment from "moment";
import { getSingleDonationApi } from "../../api/donate.api";
import { createShopItemApi, deleteShopItemApi, editShopItemApi, getShopItemsApi, getSingleShopItemApi } from "../../api/shop.api";
import { DonationItemDTO } from "../../dto/Donate.dto";
import { ShopDTO } from "../../dto/ShopItem.dto";
import { statusEnum } from "../../enums/util.enum";
import { CRUDBL } from "../../interfaces/CRUDBL.interface";
import { CREATION_ERROR, CREATION_OK, CREATION_PENDING, DELETE_ERROR, DELETE_OK, DELETE_PENDING, UPDATE_ERROR, UPDATE_OK, UPDATE_PENDING } from "../../strings";
import { DonationsModel, ShopItemsModel } from "../../testModel";
import { fakeModel, showAdminMessage,log, showConfirmDialog } from "../../utils";


export interface ISetShopItem {
    setPrice: Function,
    setTitle: Function,
    setImg: Function,
    setDescription: Function,
    setQuantity: Function,
    setWeight: Function,
    setDimension: Function,
    setImgs: Function,
}

export class ShopController implements CRUDBL {
    keyTitle:string = "Product";
    
    async create(data:ShopDTO) {
        try {
            if (!data.title || data.productImages.length < 1) {
                showAdminMessage("error", "Please fill all fields and provide a product image.");
                return;
            }
            
            if (fakeModel) {
                // console.log(UserData);
                // setItems(UserData);
                showAdminMessage("success", CREATION_OK(this.keyTitle));
            }
            else {
                data.productImages.forEach(x => delete x.id);
                
                createShopItemApi(data).then((response) => {
                    if (response.code >= statusEnum.ok) {
                        showAdminMessage("success", CREATION_OK(this.keyTitle));
                        
                    }
                    else {
                        showAdminMessage("error", CREATION_ERROR(this.keyTitle));
                    }
                });
                showAdminMessage("success", CREATION_PENDING(this.keyTitle));
            }
        }
        catch(e) {
            log("earlydev", e);
        }
    }
    async read(set: ISetShopItem, id: number) {
        if (fakeModel) {
            const data = ShopItemsModel[id];
            set.setDescription(data.description ?? "");
            set.setDimension("10cm");
            set.setWeight("10kg");
            set.setTitle(data.title);
            set.setImgs(data.images);
            set.setImg(data.img);
            set.setPrice(data.price);
            set.setQuantity(data.copies);
        }
        else {
            const response = await getSingleShopItemApi(id);
            if (response.code < statusEnum.ok) {
                showAdminMessage("error", response.message.toString());
            }
    
            const data:ShopDTO = response.data;
            
            set.setDescription(data?.description ?? "n/a");
            set.setTitle(data.title);
            set.setDimension(data.dimension);
            set.setWeight(data.weight);
            set.setImgs(data.productImages);
            set.setImg(data.productImages.length > 0 ? data.productImages[0]: undefined);
            set.setPrice(data.price);
            set.setQuantity(data.quantity);
        }
    }
    async update(data:ShopDTO, id: number) {
        if (fakeModel) {
            showAdminMessage("success", UPDATE_OK(this.keyTitle));
        }
        else {
            // data.donationImages.forEach(x => delete x.id)
            
            editShopItemApi(id, data).then((response) => {
                if (response.code >= statusEnum.ok) {
                    showAdminMessage("success", UPDATE_OK(this.keyTitle));
                    
                }
                else {
                    showAdminMessage("error", UPDATE_ERROR(this.keyTitle));
                }
            });
            showAdminMessage("success", UPDATE_PENDING(this.keyTitle));
        }
    }
    async delete(id: number) {
        const result = showConfirmDialog('Confirm Delete');
        if (result) {
            deleteShopItemApi(id).then((response) => {
                console.log("response", response);
                if (response.status) {
                    showAdminMessage("success", DELETE_OK(this.keyTitle));
                    
                }
                else {
                    showAdminMessage("error", DELETE_ERROR(this.keyTitle));
                }
            });
            showAdminMessage("success", DELETE_PENDING(this.keyTitle));
        }
        else {
            showAdminMessage("success", "Action cancelled");
        }
    }
    async bulk() {
        
    }
    async list(setItems: Function) {
        if (fakeModel) {
            setItems(ShopItemsModel);
        }
        else {
            const response = await getShopItemsApi();
            if (response.code < statusEnum.ok) {
                showAdminMessage("error", response.message.toString());
            }
    
            const data:ShopDTO[] = response.data;
            setItems(data);
        }
    }

    addImage(setImages: Function, images, image: string) {
        setImages(images.concat([{
            imageUrl: image, 
            id: parseInt(moment(new Date()).format('yyyyMMDDHHmmss')),
        }]));
    }
}