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
import { ShopDTO } from "../dto/ShopItem.dto";
import UserDTO from "../dto/User.dto";

export async function getAllPastorsApi(): Promise<ResponseDTO> {
   const response = new ResponseDTO();
   
   try {
      let res = await getRequest(urls.baseUrl, urls.allPastor);      
      let data:UserDTO[];
      if (res.status) {

         //save user profile info
         data = res.data.data;
                  
         response.data = data;
         response.code = statusEnum.ok;
      }
      // showMessage(getMessage(res), res.status, localStorage);
   }
   catch(e) {
      response.message = e.toString();
      response.code = statusEnum.error;
   }
   
   return response.getResponse();
}

export async function registerUser(requestData: UserDTO): Promise<ResponseDTO> {
   const response = new ResponseDTO();
   
   try {
      let res = await getRequest(urls.baseUrl, urls.v1 + urls.registerUser, undefined, "get", JSON.stringify(requestData), true);
      //alert(JSON.stringify(res));      
      let data: UserDTO;
      if (res.status) {

         
         //save user profile info
         data = res.data;
         
         // localStorage.setItem("userData", hashlidEncoDecode.encode(JSON.stringify(userData)));
         response.data = data;
         response.code = statusEnum.successful;
      }
      // showMessage(getMessage(res), res.status, localStorage);
      
   }
   catch(e) {
      response.message = e.toString();
      response.code = statusEnum.error;
   }
   
   return response.getResponse();
}

export async function editUser(requestData: UserDTO): Promise<ResponseDTO> {
   const response = new ResponseDTO();
   
   try {
      let res = await Request(urls.baseUrl, urls.v1 + urls.registerUser, requestData, false,"put");
      //alert(JSON.stringify(res));
      // const hashlidEncoDecode: HashlidEncoDecode = new HashlidEncoDecode(saltConst);
      let data: UserDTO;
      if (res.status) {

         
         //save user profile info
         data = res.data;
         
         // localStorage.setItem("userData", hashlidEncoDecode.encode(JSON.stringify(userData)));
         response.data = data;
         response.code = statusEnum.ok;
      }
      // showMessage(getMessage(res), res.status, localStorage);
      
   }
   catch(e) {
      response.message = e.toString();
      response.code = statusEnum.error;
   }
   
   return response.getResponse();
}

export async function getUserApi(id: number): Promise<ResponseDTO> {
   const response = new ResponseDTO();
   
   try {
      let res = await getRequest(urls.baseUrl, urls.v1 + urls.getUser + id);
      // const hashlidEncoDecode: HashlidEncoDecode = new HashlidEncoDecode(saltConst);
      let data:UserDTO[];
      if (res.status) {

         //save user profile info
         data = res.data.data;
         
         // localStorage.setItem("userData", hashlidEncoDecode.encode(JSON.stringify(userData)));
         response.data = data;
         response.code = statusEnum.ok;
      }
      // showMessage(getMessage(res), res.status, localStorage);
   }
   catch(e) {
      response.message = e.toString();
      response.code = statusEnum.error;
   }
   
   return response.getResponse();
}