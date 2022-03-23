import {
   Request,
   showMessage,
   getMessage,
   saltConst,
} from "../utils"
import { urls } from "../urls";
import { LoginAccessDTO, LoginDTO } from "../dto/login.dto";
import { apiStringStatus } from "./apiStatus.enum";
import { ResponseDTO } from "../dto/response.dto";
import { statusEnum } from "../enums/util.enum";
import { DonationItemDTO } from "../dto/Donate.dto";
import { BranchDTO, BranchItemDTO } from "../dto/Branch.dto";
import { BlogItemDTO } from "../dto/Blog.dto";
import request from "../request";

export async function getBlogApi(): Promise<ResponseDTO> {
   const response = new ResponseDTO();

   try {
      let res = await request.get(`${urls.baseUrl}${urls.blogs}`);
      // const hashlidEncoDecode: HashlidEncoDecode = new HashlidEncoDecode(saltConst);
      let data: BlogItemDTO[];
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

export async function getSingleBlogApi(id: number): Promise<ResponseDTO> {
   const response = new ResponseDTO();

   try {
      let res = await request.get(`${urls.baseUrl}${urls.getblog}${id}`);

      let data: BlogItemDTO;
      if (res.status) {
         data = res.data;
         response.data = data;
      }

      response.code = statusEnum.ok;
   }
   catch (e) {
      response.message = e.toString();
   }

   return response.getResponse();
}

export async function createBlogApi(reqeustData: BlogItemDTO): Promise<ResponseDTO> {
   const response = new ResponseDTO();

   try {
      let res = await request.post(`${urls.baseUrl}${urls.getblog}`, reqeustData);
      let data: BlogItemDTO;
      if (res.status) {
         data = res.data;
         response.data = data;
      }
      response.code = statusEnum.ok;
   }
   catch (e) {
      response.message = e.toString();
   }

   return response.getResponse();
}