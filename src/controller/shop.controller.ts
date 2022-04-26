import { toast } from "react-toastify";
import {
  getShopItemsApi,
  getSingleShopItemApi,
  initShopItemPurchaseApi,
} from "../api/shop.api";
import { ResponseDTO } from "../dto/response.dto";
import ShopItemDTO, { ShopDTO } from "../dto/ShopItem.dto";
import ShopItemInformationDTO from "../dto/ShopItemInfo.dto";
import { statusEnum } from "../enums/util.enum";
import { fakeModel, log, showMessage } from "../utils";

export const initShopTopItems = (
  setTopItems: Function,
  setMaxPrice: Function
) => {
  initShopLeftItems(setTopItems, setMaxPrice);
};

export const filterShopTopItems = async (
  setItems: Function,
  filterPrice: number
) => {
  const response: ResponseDTO = await getShopItemsApi();
  if (!response.status) {
    showMessage(
      "error",
      "An error occurred",
      "Please try again to fetch product(s)"
    );
    return;
  }

  const data: ShopDTO[] = response.data;
  const _data: ShopItemDTO[] = [];

  data &&
    data.length > 0 &&
    data.map((x) => {
      if (x.price > filterPrice) return;
      _data.push(
        new ShopItemDTO({
          copies: x.quantity,
          description: x.description,
          id: x.id,
          price: x.price,
          title: x.title,
          img: x.productImages.length > 0 ? x.productImages[0].imageUrl : "",
          images:
            x.productImages.length > 0
              ? x.productImages.map((x) => x.imageUrl)
              : [],
          information: [
            {
              key: "weight",
              value: x.weight,
            },
            {
              key: "dimension",
              value: x.dimension,
            },
          ],
        })
      );
    });
  setItems(_data);
};

export const initShopLeftItems = async (
  setTopItems: Function,
  setMaxPrice?: Function
) => {
  const response: ResponseDTO = await getShopItemsApi();
  if (!response.status) {
    toast.error(response.message);
    return;
  }
  let maxPrice: number = 0;
  const data: ShopDTO[] = response.data;
  const _data: ShopItemDTO[] = [];
  data &&
    data.length > 0 &&
    data.map((x) => {
      if (x.price > maxPrice) maxPrice = x.price;
      _data.push(
        new ShopItemDTO({
          copies: x.quantity,
          description: x.description,
          id: x.id,
          price: x.price,
          title: x.title,
          img: x.productImages.length > 0 ? x.productImages[0].imageUrl : "",
          images:
            x.productImages.length > 0
              ? x.productImages.map((x) => x.imageUrl)
              : [],
          information: [
            {
              key: "weight",
              value: x.weight,
            },
            {
              key: "dimension",
              value: x.dimension,
            },
          ],
        })
      );
    });

  setTopItems(_data);
  if (setMaxPrice) setMaxPrice(maxPrice);
};

export const shopRelatedItems = async (
  setTopItems: Function,
  excludeItemId: string
) => {
  const response: ResponseDTO = await getShopItemsApi();
  if (!response.status) {
    showMessage(
      "error",
      "An error occurred",
      "Please try again to fetch product(s)"
    );
    return;
  }

  const data: ShopDTO[] = response.data;
  const _data: ShopItemDTO[] = [];
  data &&
    data.length > 0 &&
    data.map((x) => {
      if (x.id.toString() == excludeItemId) return;
      _data.push(
        new ShopItemDTO({
          copies: x.quantity,
          description: x.description,
          id: x.id,
          price: x.price,
          title: x.title,
          img: x.productImages.length > 0 ? x.productImages[0].imageUrl : "",
          images:
            x.productImages.length > 0
              ? x.productImages.map((x) => x.imageUrl)
              : [],
          information: [
            {
              key: "weight",
              value: x.weight,
            },
            {
              key: "dimension",
              value: x.dimension,
            },
          ],
        })
      );
    });

  setTopItems(_data);
};

export const shopLoadItem = async (setItem: Function, id: string) => {
  const response = await getSingleShopItemApi(parseInt(id));
  if (!response.status) {
    showMessage("error", "An error occurred", response.message.toString());
    return;
  }

  const data: ShopDTO = response.data;

  setItem(
    new ShopItemDTO({
      copies: data.price,
      description: data.description,
      images:
        data.productImages.length > 0
          ? data.productImages.map((x) => x.imageUrl)
          : [],
      img: data.productImages.length > 0 ? data.productImages[0].imageUrl : "",
      information: [
        new ShopItemInformationDTO({
          key: "weight",
          value: data.weight,
        }),
        new ShopItemInformationDTO({
          key: "dimension",
          value: data.dimension,
        }),
      ],
      price: data.price,
      title: data.title,
    })
  );
};

export const initPurchase = async (
  email: string,
  phone: string,
  shopItem: ShopItemDTO
) => {
  const response = await initShopItemPurchaseApi({
    amount: shopItem.price,
    emailAddress: email,
    name: shopItem.title,
    phoneNumber: phone,
    quantity: shopItem.copies,
    paymentType: 3,
    productId: shopItem.id,
  });

  if (!response.status) {
    showMessage("error", "An error occurred", response.message.toString());
    return;
  }
  // make api call
  // open new tab to complete payment
  if (response.data) {
    let newWindow = undefined;
    try {
      newWindow = window.open(response.data, "_blank");
    } catch (e) {
      //
    }
    if (newWindow) newWindow.focus();
  }
};

export function shopOpenTab(evt, tabName) {
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
