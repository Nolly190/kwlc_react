import { EventDTO } from "../dto/Event.dto";
import { ResponseDTO } from "../dto/response.dto";
import { statusEnum } from "../enums/util.enum";
import request from "../request";
import {
  CreateEventPayload,
  CreateEventTypePayload,
  EventsResponse,
  EventTypeResponse,
} from "../types/appTypes";
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
    response.message = e?.toString();
  }

  return response.getResponse();
}

export async function getEventsApi(pageNo: number = 1): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    const url = `${urls.baseUrl}${urls.GetAllEvents}`;
    let res = await request.get(url, {
      params: { pageNumber: pageNo, pageSize: 3 },
    });
    let data: EventsResponse[];
    if (res.status) {
      data = res.data.data;
      response.data = data;
    }

    response.code = statusEnum.ok;
  } catch (e) {
    response.message = e.toString();
  }

  return response.getResponse();
}

export async function getEventTypesApi(): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    let res = await request.get(`${urls.baseUrl}${urls.GetEventType}`);
    let data: EventTypeResponse[];
    if (res.status) {
      data = res.data.data;
      response.data = data;
    }

    response.code = statusEnum.ok;
  } catch (e) {
    response.message = e.toString();
  }

  return response.getResponse();
}

export async function getSingleEventApi(id: number): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    let res = await request.get(`${urls.baseUrl}${urls.GetBranchEvent}${id}`);

    let data: EventsResponse;
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

export async function createEventApi(
  requestData: CreateEventPayload
): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    let res = await request.post(
      `${urls.baseUrl}${urls.AddEvent}`,
      requestData
    );
    let data: CreateEventPayload;
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

export async function updateEventApi(
  requestData: CreateEventPayload,
  id: number
): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    let res = await request.put(
      `${urls.baseUrl}${urls.UpdateEvent}/${id}`,
      requestData
    );
    let data: CreateEventPayload;
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

export async function deleteEventApi(id: number): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    let res = await request.delete(`${urls.baseUrl}${urls.deleteBlog}${id}`);
    let data: EventTypeResponse;
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

export async function createEventTypeApi(
  requestData: CreateEventTypePayload
): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    let res = await request.post(
      `${urls.baseUrl}${urls.AddEventType}`,
      requestData
    );
    if (res.status) {
      response.data = res.data;
    }
    response.code = statusEnum.ok;
  } catch (e) {
    response.message = e.toString();
  }

  return response.getResponse();
}

export async function getEventsByTypeApi(filter: string): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    let res = await request.get(
      `${urls.baseUrl}${urls.GetEventsByType}?filter=${filter}`
    );

    let data: EventsResponse;
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

export async function endEventApi(id: number): Promise<ResponseDTO> {
  const response = new ResponseDTO();

  try {
    let res = await request.post(`${urls.baseUrl}${urls.EndEvent}${id}`);
    let data: EventsResponse;
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
