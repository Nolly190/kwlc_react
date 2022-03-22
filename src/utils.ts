import moment from "moment";
import { loginApi } from "./api/auth.api";
import { LoginAccessDTO, LoginDTO, LoginModelDTO } from "./dto/login.dto";
import { CryptoEncodeDecode } from "./encodeDecode";
import { statusEnum } from "./enums/util.enum";
import { urls } from "./urls";

export const fakeModel = false;
export const saltConst = "saltConst-KWLC-saltConst-KWLC";

export function getParam(name: any): string {
    if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(window.location.search))
        return decodeURIComponent(name[1]);
}

export function mmFormat(datetime: string, format: string = "hh:mm a"): string{
    
    return moment(datetime).format(format);
}

export function youtubeParser(url){
   var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
   var match = url.match(regExp);
   return (match && match[1].length == 11) ? match[1] : '';
}

export async function checkUserLoggedIn(): Promise<Boolean> {
    const data: LoginAccessDTO = localStorage.getItem("userData");
    if (data === null) {
       //user is logged in
       const response = await WebLogin({username, password});
       return true;
    }
    else if (data != null) {
        // check expiry date

    }
    else {
        return false;
    }
}

export const log = (period="earlydev", message?: any, ...optionalParams: any[]) => {
   
   if (period == "earlydev") {
      //only log the stage/period you want
      console.log("earlydev",message, optionalParams);
   }
   
}

function PrepareData(Data, type = "json") {
    if (type == "json") {
       return JSON.stringify(Data)
    } else if (type == "multipart") {
       const formData = new FormData()
       Object.keys(Data).forEach((e) => {
          formData.append(e, Data[e])
       })
       return formData
    }
}

export function getMessage(result) {
    let message = ""
 
    if (Object.keys(result).indexOf("message") != -1) {
       message = result.message
    } else if (Object.keys(result).indexOf("Message") != -1) {
       message = result.Message
    } else {
       if (result.status != undefined && result.status) {
          //message = GENERIC_OK
          message = "Ok.";
       } else {
          //message = AN_ERROR_OCCURRED
          message = "An error occurred";
       }
    }
 
    return message
 }

export async function showMessage(param1, parm2, param3) {
}

export async function showAdminMessage(param1, parm2) {
   alert(`${param1}: ${parm2}`);
}

export function showConfirmDialog(title:string, description: string = "", options: string[]=[]) {
   return confirm(title);
}
export function showPrompt() {
   const result = prompt('Confirm Delete');
}

export function uuidv4() {
   return moment(new Date()).format('yyyyMMDDhhmmss');
}

export async function Request(
    Base,
    Url,
    Data,
    PreparedData = false,
    method = "POST",
    token = undefined
 ) {
    
 
    let headers = {}
    headers["Content-Type"] = "application/json"
    headers["Access-Control-Allow-Origin"] = "*"
    headers["Allow-header"] = "*";
    
    
    token = await getToken();
    
    if (token != "") {
        token = "Bearer " + token;
        headers["Authorization"] = token;
    }
    else {
      //  await Login({username, password});
    }

    log("earlydev","headers: ", headers);

 
    const fetchOptions =
         {
            method: method,
            headers: headers,
            body: !PreparedData ? PrepareData(Data) : Data,
         }
    return fetch(Base + Url, fetchOptions)
       .then((response) => {
          log("earlydev","1st", JSON.stringify(response), Base + Url)
          if (response.status == 401) {
            Logout({username, password});
         }
          return response.json()
       })
       .then((data) => {
          let keys = Object.keys(data);
          console.log("keys", data);
          if (
              keys.indexOf("statusCode") != -1 || 
              data.ResponseMessage == "An Error Occured, please try again" || 
              data.status == 400 || 
              data.status == 401
            ) {
             // error occured
             if (
                getMessage(data) ==
                "Unauthorized Access. You are using an expired token" ||
                data.status == 401
             ) {
                //log user out, token expired, re-login needed
                Logout({username: username, password: password});
             }
             data.status = false
          } else {
             data.status = true
          }
 
          return data
          //return PrepareResult(data, '');
       })
       .catch((error) => {
          return { status: false, message: error.message }
          // return PrepareResult({}, error, true);
       })
 }

 export async function getRequest(Base, Url, token = undefined, method="GET", data=undefined, PrepareData=false) {
    log("earlydev","base", Base, " url", Url)
    let headers = {
       Accept: "application/json",
       "Content-Type": "application/json",
       "Access-Control-Allow-Origin": "*",
    }
    
    token = await getToken();

   if (token != "") {
      token = "Bearer " + token;
      headers["Authorization"] = token;
   }
   else {
      // await Login({username, password});
   }

    log("earlydev","headers: ", headers);

    let url = Base + Url;
    if (data != undefined && !PrepareData) {
      url = new URL(Base + Url);
      let search = new URLSearchParams(data).toString();
      
      url = url+"?"+search;
      // convert json object to url params for get request
    }

    let options = {
      method: method,
      headers: headers,
   };
   if (PrepareData) {
      options['body'] = data;
   }
 
    return fetch(url, options)
       .then((response) => {
          log("earlydev","1st", JSON.stringify(response.status), Base + Url)
          if (response.status == 401) {
             Logout({username, password});
          }
          return response.json()
       })
       .then((data) => {
          log("earlydev","2nd", JSON.stringify(data), Base + Url)
 
          let keys = Object.keys(data)
          if (
              keys.indexOf("statusCode") != -1 || 
              data.ResponseMessage == "An Error Occured, please try again" || 
              data.status == 400 || 
              data.status == 401
             ) {
             // error occured
             if (
                getMessage(data) ==
                "Unauthorized Access. You are using an expired token"
                ||
                data.status == 401
             ) {
                //log user out, token expired, re-login needed
                Logout({username: username, password: password});
             }
             data.status = false
          } else {
             data.status = true
          }

          return data
       })
       .catch((error) => {
          log("earlydev","error",(error))
          return { status: false, message: error.message }
       })
}

export function prepareMedia(image) {
   // image crop picker
   return {
       uri: image.path,
       width: image.width,
       height: image.height, 
       mime: image.mime,
       name: image.fileName || image.modificationDate,
    };
 }
 export const removeFromLocalStorage = (key: string) => {
   localStorage.removeItem(key);
}

export const writeToLocalStorage = (key: string, data: string) => {
   removeFromLocalStorage(key);
   if (cryptoEncodeDecode != null ) {
      localStorage.setItem(key, cryptoEncodeDecode.encode((data)));
   }
}

export const getFromLocalStorage = (key: string) => {
   
   if (cryptoEncodeDecode != null) {
      const rawData = localStorage.getItem((key));
      if (rawData != null) {
         return cryptoEncodeDecode.decode(rawData);
      }
   }
}

export const Logout = async ({username, password}) => {
    localStorage.clear();
    if (window.location.href.includes("admin")) {
       window.location.href = "/admin/login";
    }
    else {
      await WebLogin({ username, password});
    }
    
}

export const WebLogin = async ({username, password}) => {
   const loginData:string = getFromLocalStorage("userData");
   let loginInfo;
   
   if (loginData != "" && (loginData != null || loginData != undefined)) {
      let loginObject = JSON.parse(loginData);
      if (typeof loginObject == 'string') {
         loginObject = JSON.parse(loginObject);
      }
      
      log("earlydev","isExpired", moment(new Date()).isAfter(moment(loginObject.expiryDate)), new Date(), loginObject.expiryDate, typeof loginObject);
      if (moment(new Date()).isAfter(moment(loginObject.expiryDate))) {
         // return;
      }
      log("earlydev","makeing api i");
      //expired make new call
   }
   log("earlydev","makeing api ii");
   
   //make api call
   loginInfo = await loginApi(new LoginModelDTO({ username, password}));
   if (loginInfo.code <= statusEnum.failed) {

   }
   else {
      writeToLocalStorage("userData", (JSON.stringify(loginInfo.data)));
   }
   return;
}

const getToken = async (): Promise<string> => {
   let token = "";
   // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJOb2xseSIsImp0aSI6IjA1ZWVhMjMxLTA2YzYtNDRmYS05NTkzLWZiMzZmM2E0ZTIxZSIsImVtYWlsIjoibm9sbHkxOTBAZ21haWwuY29tIiwiVXNlcklkIjoiMSIsInJvbGVzIjpbIkFkbWluIiwiU3VwZXJBZG1pbiJdLCJwZXJtaXNzaW9ucyI6WyJDYW5Bc3NpZ25BZG1pblRvQnJhbmNoIiwiQ2FuVmlld0Rhc2hib2FyZCIsIlN1cGVyQWRtaW4iXSwiZXhwIjoxNjQ0MTAzODM4LCJpc3MiOiJLd2xjIiwiYXVkIjoiU2VjdXJlQXBpVXNlciJ9.ckrRT3K51EKfmixAmCVYk-x0Lx0e-5L2ohPtUR7qPtQ";
   // return token;
    
    let rawData: string = getFromLocalStorage("userData");
    
    if (rawData) {
      
      const result:any = JSON.parse(JSON.parse(rawData));
        
      const markerSymbolInfo = result as LoginAccessDTO;
  
      token = markerSymbolInfo.token;
    }
   //  const result = eval(JSON.parse(rawData));
    return token;
}

export function toTitleCase(str) {
   return str.replace(
     /\w\S*/g,
     function(txt) {
       return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
     }
   );
 }

let username: string = "";
let password: string = "";
let cryptoEncodeDecode: CryptoEncodeDecode;
let localStorage;

export const initApp = (
    userData: LoginModelDTO, 
    localStorageObj: any,
    _cryptoEncodeDecode: CryptoEncodeDecode,
    ) => {
    if (!fakeModel)  {
       if (username) {
         username = userData.username;
         password = userData.password;
         WebLogin({username, password});
       }     
      if (localStorageObj) {
         localStorage = localStorageObj;
      }
      if (cryptoEncodeDecode) {
         cryptoEncodeDecode = _cryptoEncodeDecode;
      }
    }
    else {

    }
}