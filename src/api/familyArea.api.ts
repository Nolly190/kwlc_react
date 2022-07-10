import React from "react";
import {
  KingdomPublisherConfirmPaymentDto,
  KingdomPublisherLoginDto,
  KingdomPublisherRegisterDto,
} from "../dto/familyArea.dto";
import { ResponseDTO } from "../dto/response.dto";
import { statusEnum } from "../enums/util.enum";
import request from "../request";
import { urls } from "../urls";

export const KingdomPublisherLogin = async (
  payload: KingdomPublisherLoginDto
): Promise<ResponseDTO> => {
  const response = new ResponseDTO();

  try {
    let res = await request.post(
      `${urls.baseUrl}${urls.KingdomPublisherLogin}`,
      payload
    );

    if (res.status) {
      response.data = res.data.data;
    }

    response.code = statusEnum.ok;
  } catch (e) {
    response.message = e.toString();
  }

  return response.getResponse();
};

export const KingdomPublisherRegister = async (
  payload: KingdomPublisherRegisterDto
): Promise<ResponseDTO> => {
  const response = new ResponseDTO();

  try {
    let res = await request.post(
      `${urls.baseUrl}${urls.KingdomPublisherRegister}`,
      payload
    );

    if (res.status) {
      response.data = res.data.data;
    }

    response.code = statusEnum.ok;
  } catch (e) {
    response.message = e.toString();
  }

  return response.getResponse();
};

export async function getUserHistory(): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    let res = await request.get(`${urls.baseUrl}${urls.GetUserHistory}`);
    let data;
    if (res.status) {
      data = res.data;
      response.data = data;
    }

    response.code = statusEnum.ok;
  } catch (e) {
    response.message = e.toString();
  }

  return response.getResponse();
}

export async function ConfirmPayment(
  payload: KingdomPublisherConfirmPaymentDto
): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    let res = await request.post(
      `${urls.baseUrl}${urls.ConfirmPayment}`,
      payload
    );

    if (res.status) {
      response.data = res.data.data;
    }

    response.code = statusEnum.ok;
  } catch (e) {
    response.message = e.toString();
  }

  return response.getResponse();
}
