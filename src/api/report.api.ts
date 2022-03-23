import { ResponseDTO } from "../dto/response.dto";
import { statusEnum } from "../enums/util.enum";
import request from "../request";
import { ChurchInfoType } from "../types/appTypes";
import { urls } from "../urls";

export async function createReportApi(requestData: ChurchInfoType): Promise<ResponseDTO> {
    const response = new ResponseDTO();

    try {
        let res = await request.post(`${urls.baseUrl}${urls.createReport}`, requestData);
        console.log("report", res);

        let data: ChurchInfoType;
        if (res.status) {
            data = res.data;
            response.data = data;
            response.code = statusEnum.ok;
        }
    }
    catch (e) {
        response.message = e.toString();
    }

    return response.getResponse();
}