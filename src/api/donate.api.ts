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
import request from "../request";

export async function getDonationApi(): Promise<ResponseDTO> {
   const response = new ResponseDTO();

   try {
      let res = await request.get(`${urls.baseUrl}${urls.donation}`);
      let data: DonationItemDTO[];
      if (res.status) {
         
         data = res.data.data['data'];
         console.log("data", data);

         response.data = data;
         response.code = statusEnum.ok;
      }

   }
   catch (e) {
      response.message = e.toString();
   }

   return response.getResponse();
}

export async function getSingleDonationApi(id: number): Promise<ResponseDTO> {
   const response = new ResponseDTO();

   try {
      let res = await request.get(`${urls.baseUrl}${urls.donation}/${id}`);
      let data: DonationItemDTO;
      if (res.status) {
         data = res.data['data'];

         response.data = data;
         response.code = statusEnum.ok;
      }

   }
   catch (e) {
      response.message = e.toString();
   }

   return response.getResponse();
}

export async function createDonationApi(requestData: DonationItemDTO): Promise<ResponseDTO> {
   const response = new ResponseDTO();

   try {
      let res = await request.post(`${urls.baseUrl}${urls.donation}`, requestData);
      //alert(JSON.stringify(res));
      // const hashlidEncoDecode: HashlidEncoDecode = new HashlidEncoDecode(saltConst);
      let data: DonationItemDTO;
      if (res.status) {
         //save user profile info
         data = res.data;

         // localStorage.setItem("userData", hashlidEncoDecode.encode(JSON.stringify(userData)));
         response.data = data;
         response.code = statusEnum.ok;
      }

   }
   catch (e) {
      response.message = e.toString();
   }

   return response.getResponse();
}

export async function editDonationApi(id: number, requetData: DonationItemDTO): Promise<ResponseDTO> {
   const response = new ResponseDTO();

   try {
      let res = await request.put(`${urls.baseUrl}${urls.updateDonation}/${id}`, requetData);
      let data: DonationItemDTO;
      if (res.status) {
         data = res.data;

         response.data = data;
         response.code = statusEnum.ok;
      }
   }
   catch (e) {
      response.message = e.toString();
   }
   return response.getResponse();
}

export async function closeDonationApi(id: number): Promise<ResponseDTO> {
   const response = new ResponseDTO();

   try {
      let res = await request.put(`${urls.baseUrl}${urls.donation}/${id}`);
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