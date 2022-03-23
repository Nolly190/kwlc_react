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

export async function loginApi(data): Promise<ResponseDTO> {
   const response = new ResponseDTO();
   
   try {
      
      let res : LoginDTO = await Request(urls.baseUrl, urls.v1 + urls.login, data,false, "post",  "");      
      let userData: LoginAccessDTO;
      if (res.status) { 
         userData = res.data;
                  
         response.data = userData;
      }
      
      response.data = userData;
      response.code = statusEnum.ok;
   }
   catch(e) {
      console.error(e);
      response.message = e.toString();
   }
   
   return response.getResponse();
}