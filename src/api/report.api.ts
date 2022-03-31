import { ResponseDTO } from "../dto/response.dto";
import { statusEnum } from "../enums/util.enum";
import request from "../request";
import { ChurchInfoType, PastorsDetailsType, SliderType } from "../types/appTypes";
import { urls } from "../urls";

export async function createReportApi(requestData: ChurchInfoType): Promise<ResponseDTO> {
    const response = new ResponseDTO();

    try {
        let res = await request.post(`${urls.baseUrl}${urls.createReport}`, requestData);

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

export async function uploadPastorDetailsApi(requestData: PastorsDetailsType): Promise<ResponseDTO> {
    const response = new ResponseDTO();

    try {
        let res = await request.post(`${urls.baseUrl}${urls.uploadPastorDetails}`, requestData);

        let data: PastorsDetailsType;
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

export async function getPastorDetailsApi(): Promise<ResponseDTO> {
    const response = new ResponseDTO();

    try {
        let res = await request.get(`${urls.baseUrl}${urls.getPastorDetails}`);

        let data: PastorsDetailsType;
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

export async function uploadSliderDetailsApi(requestData: SliderType): Promise<ResponseDTO> {
    const response = new ResponseDTO();

    try {
        let res = await request.put(`${urls.baseUrl}${urls.uploadSliderDetails}`, requestData);

        let data: SliderType;
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

export async function getSliderDetailsApi(): Promise<ResponseDTO> {
    const response = new ResponseDTO();

    try {
        let res = await request.get(`${urls.baseUrl}${urls.getById}`);

        let data: SliderType;
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