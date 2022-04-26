import { ResponseDTO } from "../dto/response.dto";
import { statusEnum } from "../enums/util.enum";
import request from "../request";
import { EditPublishersPayload, KingdomPublishersResponse, PublishersHistoryResponse, RegisterPublishersPayload, SendMessagePublishersPayload, SendSMSPublishersPayload } from "../types/appTypes";
import { urls } from "../urls";

export async function getPublishersApi(): Promise<ResponseDTO> {
    const response = new ResponseDTO();

    try {
        let res = await request.get(`${urls.baseUrl}${urls.getAllPublishers}`);

        let data: KingdomPublishersResponse[];
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

export async function getPublishersHistoryApi(id: number): Promise<ResponseDTO> {
    const response = new ResponseDTO();

    try {
        let res = await request.get(`${urls.baseUrl}${urls.publishersHistory}?id=${id}`);

        let data: PublishersHistoryResponse;
        if (res.status) {
            data = res.data;
            response.data = data;
            response.code = statusEnum.ok;
        }
    }
    catch (e) {
        response.message = e?.toString();
    }

    return response.getResponse();
}

export async function confirmPublishersPaymentApi(reference: string): Promise<ResponseDTO> {
    const response = new ResponseDTO();

    try {
        let res = await request.post(`${urls.baseUrl}${urls.confirmPayment}?paymentReference=${reference}`);

        let data: boolean;
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

export async function ValidatePaymentRefApi(reference: string): Promise<ResponseDTO> {
    const response = new ResponseDTO();

    try {
        let res = await request.get(`${urls.baseUrl}${urls.paymentRef}?paymentReference=${reference}`);

        let data: boolean;
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

export async function editPublishersDetailsApi(payload: EditPublishersPayload, id: number): Promise<ResponseDTO> {
    const response = new ResponseDTO();

    try {
        let res = await request.post(`${urls.baseUrl}${urls.editPublishers}?userId=${id}`, payload);

        let data: boolean;
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

export async function registerPublisherApi(payload: RegisterPublishersPayload): Promise<ResponseDTO> {
    const response = new ResponseDTO();

    try {
        let res = await request.post(`${urls.baseUrl}${urls.registerPublishers}`, payload);

        let data: any;
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

export async function blockPublisherApi(userId: number): Promise<ResponseDTO> {
    const response = new ResponseDTO();

    try {
        let res = await request.post(`${urls.baseUrl}${urls.blockPublishers}?userId=${userId}`);

        let data: boolean;
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

export async function sendMessagePublisherApi(payload: SendMessagePublishersPayload): Promise<ResponseDTO> {
    const response = new ResponseDTO();

    try {
        let res = await request.post(`${urls.baseUrl}${urls.sendMessagePublishers}`, payload);

        let data: string;
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

export async function sendSMSPublisherApi(payload: SendSMSPublishersPayload): Promise<ResponseDTO> {
    const response = new ResponseDTO();

    try {
        let res = await request.post(`${urls.baseUrl}${urls.sendSms}`, payload);

        let data: string;
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



