import {
   Request,
   showMessage,
   getMessage,
   getRequest,
   saltConst,
} from "./../utils"
import { urls } from "./../urls";
import { LoginAccessDTO, LoginDTO } from "../dto/login.dto";
import { apiStringStatus } from "./apiStatus.enum";
import { HashlidEncoDecode } from "../encodeDecode";
import { ResponseDTO } from "../dto/response.dto";
import { statusEnum } from "../enums/util.enum";
import { DonationItemDTO } from "../dto/Donate.dto";
import request from "../request";

export async function loginApi(data): Promise<ResponseDTO> {
   const response = new ResponseDTO();

   try {

      let res: LoginDTO = await request.post(`${urls.baseUrl}${urls.v1}${urls.login}`, data);
      // const hashlidEncoDecode: HashlidEncoDecode = new HashlidEncoDecode(saltConst);
      let userData: LoginAccessDTO;
      if (res.status) {


         //save user profile info
         userData = res.data;

         // localStorage.setItem("userData", hashlidEncoDecode.encode(JSON.stringify(userData)));
         response.data = userData;
      }
      showMessage(getMessage(res), res.status, localStorage);

      response.data = userData;
      response.code = statusEnum.ok;
   }
   catch (e) {
      console.error(e);
      response.message = e.toString();
   }

   return response.getResponse();
}