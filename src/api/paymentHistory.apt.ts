import { ResponseDTO } from "../dto/response.dto";
import { statusEnum } from "../enums/util.enum";
import request from "../request";
import { PaymentTypePayload } from "../types/appTypes";
import { urls } from "../urls";

export async function getAllPaymentHistoryApi(
  keyword?: string,
  filter?: string
): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    let res =
      keyword && filter
        ? await request.get(
            `${urls.baseUrl}${urls.getAllPaymentHistory}?keyword=${keyword}&filter=${filter}`
          )
        : await request.get(`${urls.baseUrl}${urls.getAllPaymentHistory}`);

    let data: PaymentTypePayload;
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
