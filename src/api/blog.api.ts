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
import { BlogItemDTO } from "../dto/Blog.dto";

export async function getBlogApi(): Promise<ResponseDTO> {
   const response = new ResponseDTO();
   
   try {
      let res = await getRequest(urls.baseUrl, urls.blogs);      
      let data:BlogItemDTO[];
      if (res.status) {

         //save user profile info
         data = res.data.data;
                  
         response.data = data;
      }
      // showMessage(getMessage(res), res.status, localStorage);
      
      response.code = statusEnum.ok;
   }
   catch(e) {
      response.message = e.toString();
   }
   
   return response.getResponse();
}

export async function getSingleBlogApi(id: number): Promise<ResponseDTO> {
   const response = new ResponseDTO();
   
   try {
      let res = await getRequest(urls.baseUrl, urls.getblog + id);
      
      let data: BlogItemDTO;
      if (res.status) {
         data = res.data;
         response.data = data;
      }
      
      response.code = statusEnum.ok;
   }
   catch(e) {
      response.message = e.toString();
   }
   
   return response.getResponse();
}

export async function createBlogApi(reqeustData: BlogItemDTO): Promise<ResponseDTO> {
   const response = new ResponseDTO();
   
   try {
      let res = await Request(urls.baseUrl, urls.getblog, reqeustData, false);
      let data: BlogItemDTO;
      if (res.status) {
         data = res.data;
         response.data = data;
      }
      response.code = statusEnum.ok;
   }
   catch(e) {
      response.message = e.toString();
   }
   
   return response.getResponse();
}