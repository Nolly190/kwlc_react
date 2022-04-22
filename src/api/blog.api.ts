import {
   Request,
   showMessage,
   getMessage,
   saltConst,
   showConfirmDialog,
} from "../utils"
import { urls } from "../urls";
import { LoginAccessDTO, LoginDTO } from "../dto/login.dto";
import { apiStringStatus } from "./apiStatus.enum";
import { ResponseDTO } from "../dto/response.dto";
import { statusEnum } from "../enums/util.enum";
import { DonationItemDTO } from "../dto/Donate.dto";
import { BranchDTO, BranchItemDTO } from "../dto/Branch.dto";
import { BlogDTO, BlogItemDTO, CategoryItem, CreateCategoryItem } from "../dto/Blog.dto";
import request from "../request";

export async function getBlogApi(): Promise<ResponseDTO> {
   const response = new ResponseDTO();

   try {
      let res = await request.get(`${urls.baseUrl}${urls.blogs}`);
      let data: BlogItemDTO[];
      if (res.status) {
         data = res.data.data;
         response.data = data;
      }

      response.code = statusEnum.ok;
   }
   catch (e) {
      response.message = e.toString();
   }

   return response.getResponse();
}

export async function getCategoriesApi(): Promise<ResponseDTO> {
   const response = new ResponseDTO();

   try {
      let res = await request.get(`${urls.baseUrl}${urls.getCategories}`);
      let data: CategoryItem[];
      if (res.status) {
         data = res.data.data;
         response.data = data;
      }

      response.code = statusEnum.ok;
   }
   catch (e) {
      response.message = e.toString();
   }

   return response.getResponse();
}

export async function getSingleBlogApi(id: number): Promise<ResponseDTO> {
   const response = new ResponseDTO();

   try {
      let res = await request.get(`${urls.baseUrl}${urls.getblog}${id}`);

      let data: BlogItemDTO;
      if (res.status) {
         data = res.data;
         response.data = data;
      }

      response.code = statusEnum.ok;
   }
   catch (e) {
      response.message = e.toString();
   }

   return response.getResponse();
}

export async function createBlogApi(reqeustData: BlogItemDTO): Promise<ResponseDTO> {
   const response = new ResponseDTO();

   try {
      let res = await request.post(`${urls.baseUrl}${urls.createBlog}`, reqeustData);
      let data: BlogItemDTO;
      if (res.status) {
         data = res.data;
         response.data = data;
      }
      response.code = statusEnum.ok;
   }
   catch (e) {
      response.message = e.toString();
   }

   return response.getResponse();
}

export async function updateBlogApi(requestData: BlogItemDTO, id: number): Promise<ResponseDTO> {
   const response = new ResponseDTO();

   try {
      let res = await request.put(`${urls.baseUrl}${urls.updateBlog}/${id}`, requestData);
      let data: BlogItemDTO;
      if (res.status) {
         data = res.data;
         response.data = data;
      }
      response.code = statusEnum.ok;
   }
   catch (e) {
      response.message = e.toString();
   }

   return response.getResponse();
}

export async function deleteBlogApi(id: number): Promise<ResponseDTO> {
   const response = new ResponseDTO();

   try {
      let res = await request.delete(`${urls.baseUrl}${urls.deleteBlog}${id}`);
      let data: BlogDTO;
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

export async function createCategoryApi(requestData: CreateCategoryItem): Promise<ResponseDTO> {
   const response = new ResponseDTO();

   try {
      let res = await request.post(`${urls.baseUrl}${urls.createCategory}`, requestData);
      if (res.status) {
         response.data = res.data;
      }
      response.code = statusEnum.ok;
   }
   catch (e) {
      response.message = e.toString();
   }

   return response.getResponse();
}

export async function updateCategoryApi(requestData: CategoryItem): Promise<ResponseDTO> {
   const response = new ResponseDTO();

   try {
      let res = await request.put(`${urls.baseUrl}${urls.updateCategory}/${requestData.id}`, { name: requestData.name });
      if (res.status) {
         response.data = res.data;
      }
      response.code = statusEnum.ok;
   }
   catch (e) {
      response.message = e.toString();
   }

   return response.getResponse();
}

export async function deleteCategoryApi(id: number): Promise<ResponseDTO> {
   const response = new ResponseDTO();

   try {
      let res = await request.delete(`${urls.baseUrl}${urls.deleteCategory}${id}`);
      if (res.status) {
         response.data = res.data;
         response.code = statusEnum.ok;
      }
   }
   catch (e) {
      response.message = e.toString();
   }
   return response.getResponse();
}