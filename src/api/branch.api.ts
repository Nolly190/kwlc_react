import {
   Request,
   showMessage,
   getMessage,
   getRequest,
   saltConst,
   log,
} from "../utils"
import { urls } from "../urls";
import { LoginAccessDTO, LoginDTO } from "../dto/login.dto";
import { apiStringStatus } from "./apiStatus.enum";
import { ResponseDTO } from "../dto/response.dto";
import { statusEnum } from "../enums/util.enum";
import { DonationItemDTO } from "../dto/Donate.dto";
import { BranchAssignAdminDTO, BranchDTO, BranchItemDTO } from "../dto/Branch.dto";

export async function getBranchesApi(): Promise<ResponseDTO> {
   const response = new ResponseDTO();
   
   try {
      let res = await getRequest(urls.baseUrl, urls.getAllBranch);      
      let data:BranchDTO[];
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

export async function getSingleBranchApi(id: number): Promise<ResponseDTO> {
   const response = new ResponseDTO();
   
   try {
      let res = await getRequest(urls.baseUrl, urls.getBranch + "/" + id);
      //alert(JSON.stringify(res));     
      let data: BranchDTO;
      if (res.status) {

         
         //save user profile info
         data = res.data;
                  
         response.data = data;
         // showMessage(getMessage(res), res.status, localStorage);
         response.code = statusEnum.ok;
      }      
   }
   catch(e) {
      response.message = e.toString();
   }
   
   return response.getResponse();
}

export async function createBranchApi(requetData: BranchDTO): Promise<ResponseDTO> {
   const response = new ResponseDTO();
   
   try {
      let res = await Request(urls.baseUrl, urls.createBranch, requetData, false);
      //alert(JSON.stringify(res));      
      let data: BranchDTO;
      if (res.status) {
         //save user profile info
         data = res.data;
                  
         response.data = data;
         // showMessage(getMessage(res), res.status, localStorage);
         response.code = statusEnum.ok;
      }
   }
   catch(e) {
      response.message = e.toString();
   }
   log("earlydev", response);
   return response.getResponse();
}

export async function editBranchApi(id:number, requetData: BranchDTO): Promise<ResponseDTO> {
   const response = new ResponseDTO();
   
   try {
      let res = await Request(urls.baseUrl, urls.updateBranch +"/"+ id, requetData, false, "PUT");
      let data: BranchDTO;
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

export async function deleteBranchApi(id:number): Promise<ResponseDTO> {
   const response = new ResponseDTO();
   
   try {
      let res = await getRequest(urls.baseUrl, urls.deleteBranch + id, undefined, "DELETE");
      let data: BranchDTO;
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

export async function branchAssignAdminApi(requetData: BranchAssignAdminDTO): Promise<ResponseDTO> {
   const response = new ResponseDTO();
   
   try {
      let res = await Request(urls.baseUrl, urls.branchAssignAdmin , requetData, false, "PUT");
      let data: BranchDTO;
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