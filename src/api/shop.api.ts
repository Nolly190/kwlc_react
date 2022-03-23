import {
   Request,
   showMessage,
   getMessage,
   getRequest,
   saltConst,
} from "../utils"
import { urls } from "../urls";
import { LoginAccessDTO, LoginDTO } from "../dto/login.dto";
import { apiStringStatus } from "./apiStatus.enum";
import { ResponseDTO } from "../dto/response.dto";
import { statusEnum } from "../enums/util.enum";
import { DonationItemDTO } from "../dto/Donate.dto";
import { BranchDTO, BranchItemDTO } from "../dto/Branch.dto";
import ShopItemDTO, { ShopDTO } from "../dto/ShopItem.dto";
import request from "../request";

export async function getShopItemsApi(): Promise<ResponseDTO> {
   const response = new ResponseDTO();

   try {
      let res = await request.get(`${urls.baseUrl}${urls.product}`);
      // const hashlidEncoDecode: HashlidEncoDecode = new HashlidEncoDecode(saltConst);
      let data: ShopDTO[];
      if (res.status) {

         //save user profile info
         data = res.data.data;

         // localStorage.setItem("userData", hashlidEncoDecode.encode(JSON.stringify(userData)));
         response.data = data;
      }
      // showMessage(getMessage(res), res.status, localStorage);

      response.code = statusEnum.ok;
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
      //alert(JSON.stringify(res));
      // const hashlidEncoDecode: HashlidEncoDecode = new HashlidEncoDecode(saltConst);
      let data: ShopDTO;
      if (res.status) {


         //save user profile info

         data = res.data;
         data.description

         // localStorage.setItem("userData", hashlidEncoDecode.encode(JSON.stringify(userData)));
         response.data = data;
      }

      // showMessage(getMessage(res), res.status, localStorage);
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
      // const hashlidEncoDecode: HashlidEncoDecode = new HashlidEncoDecode(saltConst);
      let data: ShopDTO[];
      if (res.status) {

         //save user profile info
         data = res.data.data;

         // localStorage.setItem("userData", hashlidEncoDecode.encode(JSON.stringify(userData)));
         response.data = data;
      }
      // showMessage(getMessage(res), res.status, localStorage);

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
      // const hashlidEncoDecode: HashlidEncoDecode = new HashlidEncoDecode(saltConst);
      let data: ShopDTO[];
      if (res.status) {

         //save user profile info
         data = res.data.data;

         // localStorage.setItem("userData", hashlidEncoDecode.encode(JSON.stringify(userData)));
         response.data = data;
      }
      // showMessage(getMessage(res), res.status, localStorage);

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
         response.data = res.data;
         response.code = statusEnum.ok;
      }
   }
   catch (e) {
      response.message = e.toString();
   }
   return response.getResponse();
}