import { Request, showMessage, getMessage, saltConst } from "../utils";
import { urls } from "../urls";
import { LoginAccessDTO, LoginDTO } from "../dto/login.dto";
import { apiStringStatus } from "./apiStatus.enum";
import { ResponseDTO } from "../dto/response.dto";
import { statusEnum } from "../enums/util.enum";
import { DonationItemDTO } from "../dto/Donate.dto";
import { BranchDTO, BranchItemDTO } from "../dto/Branch.dto";
import { LiveStreamDTO } from "../dto/LiveStream.dto";
import request from "../request";

export async function getLiveStreamsApi(): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    let res = await request.get(`${urls.baseUrl}${urls.liveStream}`);
    // const hashlidEncoDecode: HashlidEncoDecode = new HashlidEncoDecode(saltConst);
    let data: LiveStreamDTO[];
    if (res.status) {
      //save user profile info
      data = res.data.data;

      // localStorage.setItem("userData", hashlidEncoDecode.encode(JSON.stringify(userData)));
      response.data = data;
      response.code = statusEnum.ok;
    }
  } catch (e) {
    response.message = e.toString();
  }

  return response.getResponse();
}

export async function createStreamApi(
  requestData: LiveStreamDTO
): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    let res = await request.post(
      `${urls.baseUrl}${urls.liveStream}`,
      requestData
    );
    //alert(JSON.stringify(res));
    // const hashlidEncoDecode: HashlidEncoDecode = new HashlidEncoDecode(saltConst);
    let data: LiveStreamDTO;
    if (res.status) {
      //save user profile info
      data = res.data;

      // localStorage.setItem("userData", hashlidEncoDecode.encode(JSON.stringify(userData)));
      response.data = data;
      response.code = statusEnum.ok;
    }
  } catch (e) {
    response.message = e.toString();
  }

  return response.getResponse();
}

export async function editStreamApi(
  requestData: LiveStreamDTO,
  id: number
): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    let res = await request.put(
      `${urls.baseUrl}${urls.liveStream}/${urls.updateLiveStream}${id}`,
      requestData
    );
    let data: LiveStreamDTO;
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

export async function getLiveStreamApi(id: number): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    let res = await request.get(`${urls.baseUrl}${urls.liveStream}/${id}`);

    let data: LiveStreamDTO;
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

export async function stopLivestreamApi(id: number): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    let res = await request.put(`${urls.baseUrl}${urls.liveStream}/${id}`);
    if (res.status) {
      response.data = res.data;
      response.code = statusEnum.ok;
    }
  } catch (e) {
    response.message = e.toString();
  }
  return response.getResponse();
}
