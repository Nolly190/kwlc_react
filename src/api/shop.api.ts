import { urls } from "../urls";
import { ResponseDTO } from "../dto/response.dto";
import { statusEnum } from "../enums/util.enum";
import { ShopDTO } from "../dto/ShopItem.dto";
import request from "../request";
import { PaymentDTO } from "../dto/PaymentDTO";

export async function getShopItemsApi(): Promise<ResponseDTO> {
   const response = new ResponseDTO();

   try {
      let res = await request.get(`${urls.baseUrl}${urls.product}`);
      
      let data: ShopDTO[];
      if (res.status) {

         data = res.data.data.data;
         response.data = data;
         response.code = statusEnum.ok;
      }
   }
   catch (e) {
      response.message = e.toString();
   }
   

   return response.getResponse();
}

export async function getSingleShopItemApi(id: number): Promise<ResponseDTO> {
   const response = new ResponseDTO();

   try {
      let res = await request.get(`${urls.baseUrl}${urls.product}/${id}`);

      let data: ShopDTO;
      if (res.status) {
         data = res.data.data;

         response.data = data;
      }
      response.code = statusEnum.ok;
   }
   catch (e) {
      response.message = e.toString();
   }

   return response.getResponse();
}

export async function createShopItemApi(requestData: ShopDTO): Promise<ResponseDTO> {
   const response = new ResponseDTO();

   try {
      let res = await request.post(`${urls.baseUrl}${urls.product}`, requestData);
      let data: ShopDTO[];
      if (res.status) {

         data = res.data.data;

         response.data = data;
      }

      response.code = statusEnum.ok;
   }
   catch (e) {
      response.message = e.toString();
   }

   return response.getResponse();
}

export async function editShopItemApi(id: number, requestData: ShopDTO): Promise<ResponseDTO> {
   const response = new ResponseDTO();

   try {
      let res = await request.put(`${urls.baseUrl}${urls.product}/${id}`, requestData);
      let data: ShopDTO[];
      if (res.status) {

         data = res.data.data;

         response.data = data;
      }

      response.code = statusEnum.ok;
   }
   catch (e) {
      response.message = e.toString();
   }

   return response.getResponse();
}

export async function deleteShopItemApi(id: number): Promise<ResponseDTO> {
   const response = new ResponseDTO();

   try {
      let res = await request.delete(`${urls.baseUrl}${urls.product}/${id}`);
      if (res.status) {
         response.data = res.data.data;
         response.code = statusEnum.ok;
      }
   }
   catch (e) {
      response.message = e.toString();
   }
   return response.getResponse();
}

export async function initShopItemPurchaseApi(paymentDto: PaymentDTO): Promise<ResponseDTO> {
   const response = new ResponseDTO();

   try {
      let res = await request.post(`${urls.baseUrl}${urls.Payment}`, paymentDto);
      if (res.status) {
         response.data = res.data.data;
         response.code = statusEnum.ok;
      }
   }
   catch (e) {
      response.message = e.toString();
   }
   return response.getResponse();
}