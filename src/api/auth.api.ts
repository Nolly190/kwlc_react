import { BehaviorSubject } from 'rxjs';
import { urls } from "./../urls";
import { LoginAccessDTO, LoginDTO } from "../dto/login.dto";
import { ResponseDTO } from "../dto/response.dto";
import { statusEnum } from "../enums/util.enum";
import request from "../request";
import Router from 'next/router'
import { writeToLocalStorage } from '../utils';

export async function loginApi(data): Promise<ResponseDTO> {
   const response = new ResponseDTO();

   try {
      let res: LoginDTO = await request.post(`${urls.baseUrl}${urls.v1}${urls.login}`, data);
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

// const userSubject = new BehaviorSubject(typeof window !== "undefined" && window?.localStorage?.getItem('userData'));

// export const userService = {
//    user: userSubject.asObservable(),
//    get userValue() { return userSubject.value },
//    login,
//    logout,
// };

// async function login(username: string, password: string) {
//    const response = new ResponseDTO();
//    try {
//       if (!username || !password) {
//          response.responseMessage = "Please enter username and password";
//          return response;
//       }
//       const result = await loginApi({ username, password });
//       console.log("result", result);
//       if (result.status) {
//          writeToLocalStorage("userData", (JSON.stringify(result.data?.data)));
//       }
//       return result
//    }
//    catch (e) {
//       console.log(e);
//       response.responseMessage = e.toString();
//    }
// }

// function logout() {
//    // remove user from local storage, publish null to user subscribers and redirect to login page
//    localStorage.removeItem('userData');
//    userSubject.next(null);
//    Router.push('/admin/login');
// }