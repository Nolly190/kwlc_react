import {
   Request,
   showMessage,
   getMessage,
   getRequest,
   saltConst,
} from "./../utils"
import { urls } from "./../urls";
import { LoginAccessDTO, LoginDTO } from "../dto/login.dto";
import { ResponseDTO } from "../dto/response.dto";
import { statusEnum } from "../enums/util.enum";
import { DonationItemDTO } from "../dto/Donate.dto";
import request from "../request";

export async function loginApi(data): Promise<ResponseDTO> {
   const response = new ResponseDTO();

   try {
      let res: LoginDTO = await request.post(`${urls.baseUrl}${urls.v1}${urls.login}`, data);
      console.log("res", res);
      // const hashlidEncoDecode: HashlidEncoDecode = new HashlidEncoDecode(saltConst);
      let userData: LoginAccessDTO;
      if (res.status) {
         //save user profile info
         userData = res.data;
         response.data = userData;
      }
      response.data = userData;
      response.code = statusEnum.ok;
      response.status = true;
   }
   catch (e) {
      response.responseMessage = e.toString();
   }
   return response
}