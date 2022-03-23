import moment from "moment";
import { toast } from "react-toastify";
import { getBlogApi, getSingleBlogApi } from "../api/blog.api";
import { ResponseDTO } from "../dto/response.dto";
import { statusEnum } from "../enums/util.enum";
import { BlogData } from "../testModel";
import { fakeModel } from "../utils";
import { BlogDTO, BlogItemDTO } from "./../dto/Blog.dto";

export async function loadBlogData(setList: Function) {
    try {

        if (fakeModel) {
            setList(BlogData);
        }
        else {
            const response: ResponseDTO = await getBlogApi();
            if (response.code < statusEnum.ok) {
                toast.error(response.message);
            }

            const data: BlogItemDTO[] = response.data?.data;
            const branchData: BlogDTO[] = [];
            data && data.length > 0 && data.map(x => {
                branchData.push(new BlogDTO({
                    by: x.authorName,
                    date: new Date(x.dateCreated),
                    description: x.aboutAuthor,
                    title: x.title,
                    id: x.id,
                    image: (x.blogImages.length > 0 ? x.blogImages[0].imageUrl : ""),
                    itemType: "simple"

                }));

                // remove once dataset is sizable
                branchData.push(new BlogDTO({
                    by: x.authorName,
                    date: new Date(x.dateCreated),
                    description: x.aboutAuthor,
                    title: x.title,
                    id: x.id,
                    image: (x.blogImages.length > 0 ? x.blogImages[0].imageUrl : ""),
                    itemType: ""

                }));
            });

            setList(branchData);
        }
    }
    catch (e) {
        console.error(e);
    }

}

export async function loadBlog(setItem: Function, id: number) {
    try {

        if (fakeModel) {
            setItem(BlogData);
        }
        else {
            const response: ResponseDTO = await getSingleBlogApi(id);
            if (response.code < statusEnum.ok) {
                toast.error(response.message);
            }

            const data: BlogItemDTO = response.data?.data;
            const branchData: BlogDTO[] = [];

            setItem(new BlogDTO({
                by: data.authorName,
                date: new Date(data.dateCreated),
                description: data.message,
                href: "",
                id: data.id,
                image: data.blogImages.length > 0 ? data.blogImages[0].imageUrl : "",
                itemType: "text",
                title: data.title,
                tags: data.tags,
                aboutAuthor: data.aboutAuthor,
                blogCategory: data.blogCategory,
                blogImages: data.blogImages,

            }));
        }
    }
    catch (e) {
        console.error(e);
    }

}