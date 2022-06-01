import { ContactDto } from "../dto/contact.dto";
import { ResponseDTO } from "../dto/response.dto";
import { statusEnum } from "../enums/util.enum";
import request from "../request";
import { urls } from "../urls";

export async function submitContactForm(
  payload: ContactDto
): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    let res = await request.post(`${urls.baseUrl}${urls.contact}`, payload);

    if (res.status) {
      response.data = res.data.data;
    }

    response.code = statusEnum.ok;
  } catch (e) {
    response.message = e.toString();
  }

  return response.getResponse();
}

export async function getAllMailsApi(): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    let res = await request.get(`${urls.baseUrl}${urls.getAllMails}`);

    if (res.status) {
      response.data = res.data.data;
    }

    response.code = statusEnum.ok;
  } catch (e) {
    response.message = e.toString();
  }

  return response.getResponse();
}
