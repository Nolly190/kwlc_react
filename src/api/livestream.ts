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
import { LiveStreamDTO } from "../dto/LiveStream.dto";

export async function getLiveStreamsApi(): Promise<ResponseDTO> {
   const response = new ResponseDTO();
   
   try {
      let res = await getRequest(urls.baseUrl, urls.liveStream);      
      let data:LiveStreamDTO[];
      if (res.status) {

         //save user profile info
         data = res.data.data;
                  
         response.data = data;
         response.code = statusEnum.ok;
      }
      
   }
   catch(e) {
      response.message = e.toString();
   }
   
   return response.getResponse();
}

export async function createStreamApi(requestData: LiveStreamDTO,id: number): Promise<ResponseDTO> {
   const response = new ResponseDTO();
   
   try {
      let res = await Request(urls.baseUrl, urls.liveStream + "/" + id, requestData, false);
      //alert(JSON.stringify(res));      
      let data: LiveStreamDTO;
      if (res.status) {

         
         //save user profile info
         data = res.data;
                  
         response.data = data;
         response.code = statusEnum.ok;
      }
      
      
   }
   catch(e) {
      response.message = e.toString();
   }
   
   return response.getResponse();
}

export async function editStreamApi(requestData: LiveStreamDTO,id: number): Promise<ResponseDTO> {
   const response = new ResponseDTO();
   
   try {
      let res = await Request(urls.baseUrl, urls.liveStream +"/"+ urls.updateLiveStream + id, requestData, false, 'put');
      let data: LiveStreamDTO;
      if (res.status) {
         data = res.data;
         response.data = data;
         response.code = statusEnum.ok;
      }
   }
   catch(e) {
      response.message = e.toString();
   }
   
   return response.getResponse();
}


export async function getLiveStreamApi(id: number): Promise<ResponseDTO> {
   const response = new ResponseDTO();
   
   try {
      let res = await getRequest(urls.baseUrl, urls.liveStream + "/" + id);
      
      let data:LiveStreamDTO;
      if (res.status) {

         data = res.data;
         
         
         response.data = data;
         response.code = statusEnum.ok;
      }
      
   }
   catch(e) {
      response.message = e.toString();
   }
   
   return response.getResponse();
}