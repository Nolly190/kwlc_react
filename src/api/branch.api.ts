import {
  Request,
  showMessage,
  getMessage,
  getRequest,
  saltConst,
  log,
} from "../utils";
import { urls } from "../urls";
import { LoginAccessDTO, LoginDTO } from "../dto/login.dto";
import { apiStringStatus } from "./apiStatus.enum";
import { ResponseDTO } from "../dto/response.dto";
import { statusEnum } from "../enums/util.enum";
import { DonationItemDTO } from "../dto/Donate.dto";
import {
  BranchAssignAdminDTO,
  BranchDTO,
  BranchItemDTO,
} from "../dto/Branch.dto";
import request from "../request";
import { toast } from "react-toastify";

export async function getBranchesApi(): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    const url = `${urls.baseUrl}${urls.getAllBranch}`;
    let res = await request.get(url);
    // const hashlidEncoDecode: HashlidEncoDecode = new HashlidEncoDecode(saltConst);
    let data: BranchDTO[];
    if (res.status) {
      //save user profile info
      data = res.data.data;
      response.data = data;
      response.code = statusEnum.ok;
    }

    return response;
  } catch (e) {
    console.log("catch", e);

    response.message = e.toString();
  }
  return response.getResponse();
}

export async function getSocialLinks(): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    const url = `${urls.baseUrl}${urls.socialMedia}`;
    let res = await request.get(url);
    // const hashlidEncoDecode: HashlidEncoDecode = new HashlidEncoDecode(saltConst);
    let data: BranchDTO[];
    if (res.status) {
      //save user profile info
      data = res.data.data;
      response.data = data;
      response.code = statusEnum.ok;
    }

    return response;
  } catch (e) {
    console.log("catch", e);

    response.message = e.toString();
  }
  return response.getResponse();
}

export async function getSingleBranchApi(id: number): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    let res = await request.get(`${urls.baseUrl}${urls.getBranch}/${id}`);
    //alert(JSON.stringify(res));
    // const hashlidEncoDecode: HashlidEncoDecode = new HashlidEncoDecode(saltConst);
    let data: BranchDTO;
    if (res.status) {
      //save user profile info
      data = res.data;

      // localStorage.setItem("userData", hashlidEncoDecode.encode(JSON.stringify(userData)));
      response.data = data;
      // showMessage(getMessage(res), res.status, localStorage);
      response.code = statusEnum.ok;
    }
  } catch (e) {
    response.message = e.toString();
  }

  return response.getResponse();
}

export async function createBranchApi(
  requetData: BranchDTO
): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    let res = await request.post(
      `${urls.baseUrl}${urls.createBranch}`,
      requetData
    );
    //alert(JSON.stringify(res));
    // const hashlidEncoDecode: HashlidEncoDecode = new HashlidEncoDecode(saltConst);
    let data: BranchDTO;
    if (res.status) {
      //save user profile info
      data = res.data;

      // localStorage.setItem("userData", hashlidEncoDecode.encode(JSON.stringify(userData)));
      response.data = data;
      // showMessage(getMessage(res), res.status, localStorage);
      response.code = statusEnum.ok;
    }
  } catch (e) {
    response.message = e.toString();
  }
  log("earlydev", response);
  return response.getResponse();
}

export async function editBranchApi(
  id: number,
  requetData: BranchDTO
): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    let res = await request.put(
      `${urls.baseUrl}${urls.updateBranch}/${id}`,
      requetData
    );
    let data: BranchDTO;
    if (res.status) {
      data = res.data;

      response.data = data;
      response.code = statusEnum.ok;
    }
  } catch (e) {
    response.message = e.toString();
  }
  return response.getResponse();
}

export async function deleteBranchApi(id: number): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    let res = await request.delete(`${urls.baseUrl}${urls.deleteBranch}${id}`);
    let data: BranchDTO;
    if (res.status) {
      data = res.data;

      response.data = data;
      response.code = statusEnum.ok;
    }
  } catch (e) {
    response.message = e.toString();
  }
  return response.getResponse();
}

export async function branchAssignAdminApi(
  requetData: BranchAssignAdminDTO
): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    let res = await request.put(
      `${urls.baseUrl}${urls.branchAssignAdmin}`,
      requetData
    );
    let data: BranchDTO;
    if (res.status) {
      data = res.data;

      response.data = data;
      response.code = statusEnum.ok;
    }
  } catch (e) {
    response.message = e.toString();
  }
  return response.getResponse();
}
