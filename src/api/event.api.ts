import { EventDTO } from "../dto/Event.dto";
import { ResponseDTO } from "../dto/response.dto";
import { statusEnum } from "../enums/util.enum";
import request from "../request";
import { urls } from "../urls";

export async function getNextEvent(): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    let res = await request.get(`${urls.baseUrl}${urls.NextEvent}`);
    // const hashlidEncoDecode: HashlidEncoDecode = new HashlidEncoDecode(saltConst);
    let data: EventDTO[];
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
