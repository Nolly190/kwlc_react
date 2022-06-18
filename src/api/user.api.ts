import { urls } from "../urls";
import { ResponseDTO } from "../dto/response.dto";
import { statusEnum } from "../enums/util.enum";
import UserDTO from "../dto/User.dto";
import request from "../request";
import {
  AddUserToRolePayload,
  CreateRolePayload,
  EditRolePayload,
} from "../types/appTypes";

export async function getAllUsersApi(): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    let res = await request.get(`${urls.baseUrl}${urls.v1}${urls.allUsers}`);
    let data: UserDTO[];
    if (res.status) {
      data = res.data.data;

      response.data = data;
      response.code = statusEnum.ok;
    }
  } catch (e) {
    response.message = e.toString();
    response.code = statusEnum.error;
  }

  return response.getResponse();
}

export async function registerUser(requestData: UserDTO): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    let res = await request.post(
      `${urls.baseUrl}${urls.v1}${urls.registerUser}`,
      JSON.stringify(requestData)
    );

    let data: UserDTO;
    if (res.status) {
      data = res.data;

      response.data = data;
      response.code = statusEnum.successful;
    }
  } catch (e) {
    response.message = e.toString();
    response.code = statusEnum.error;
  }

  return response.getResponse();
}

export async function editUser(requestData: UserDTO): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    let res = await request.put(
      `${urls.baseUrl}${urls.v1}${urls.registerUser}`,
      requestData
    );

    let data: UserDTO;
    if (res.status) {
      data = res.data;

      response.data = data;
      response.code = statusEnum.ok;
    }
  } catch (e) {
    response.message = e.toString();
    response.code = statusEnum.error;
  }

  return response.getResponse();
}

export async function getUserApi(id: number): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    let res = await request.get(
      `${urls.baseUrl}${urls.v1}${urls.getUser}${id}`
    );
    let data: UserDTO[];
    if (res.status) {
      data = res.data.data;

      response.data = data;
      response.code = statusEnum.ok;
    }
  } catch (e) {
    response.message = e.toString();
    response.code = statusEnum.error;
  }

  return response.getResponse();
}

export async function createRoleApi(
  payload: CreateRolePayload
): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    let res = await request.post(
      `${urls.baseUrl}${urls.v1}${urls.createRole}`,
      payload
    );

    let data: boolean;
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

export async function editPermissionApi(
  payload: EditRolePayload
): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    let res = await request.post(
      `${urls.baseUrl}${urls.v1}${urls.editPermission}`,
      payload
    );

    let data: boolean;
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

export async function addUserToRoleApi(
  payload: AddUserToRolePayload
): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    let res = await request.post(
      `${urls.baseUrl}${urls.v1}${urls.addUserToRole}`,
      payload
    );

    let data: boolean;
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

export async function getRolePermissionApi(id: number): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    let res = await request.post(
      `${urls.baseUrl}${urls.v1}${urls.rolePermission}?roleId=${id}`
    );

    let data: boolean;
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

export async function getAllRolesApi(): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    let res = await request.post(`${urls.baseUrl}${urls.v1}${urls.roles}`);

    let data: boolean;
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
