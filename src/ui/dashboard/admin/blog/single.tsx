import { useEffect, useRef, useState } from "react";
import { BlogController } from "../../../../controller/admin/blog.controller";
import { BlogItemDTO, CategoryItem, tagItem } from "../../../../dto/Blog.dto";
import AdminLayout from "../admin.layout";
import { Editor } from "@tinymce/tinymce-react";
import { getCategoriesApi, getSingleBlogApi } from "../../../../api/blog.api";
import styled from "styled-components";
import { getParam } from "../../../../utils";
import { useRouter } from "next/router";
import { LoaderWrapper } from "./getall";
import DualRing from "../../../../components/loader";
import { statusEnum } from "../../../../enums/util.enum";
import { toast } from "react-toastify";

export default function EditBlog() {
  const [isLoading, setIsLoading] = useState(false)
  const [tag, setTag] = useState<tagItem>({ name: "" });
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [blogData, setBlogData] = useState<BlogItemDTO>();
  const editorRef = useRef(null);
  const router = useRouter();
  const idParam = getParam("id");

  useEffect(() => {
    async function fetchData() {
      if (!idParam) {
        router.push("/admin/");
      } else {
        setIsLoading(true);
        const categories = await getCategoriesApi();
        const blog = await getSingleBlogApi(parseInt(idParam));
        if (blog.code >= statusEnum.ok) {
          setBlogData(blog?.data?.data);
        } else {
          toast.error("Error fetching blog data");
          setTimeout(() => {
            router.push("/admin/blogs");
          }, 2000);
        }
        setCategories(categories.data);
        setIsLoading(false);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let controller: BlogController = new BlogController();

  const handleMessageChange = (e: any) => {
    const name = "message";
    setBlogData({ ...blogData, [name]: e.target.getContent() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    controller.update(blogData, parseInt(idParam));
  };

  const handleChange = (name: string, value: string) => {
    if (name === "imageUrl") {
      const newArray = [{ [name]: value }];
      blogData.blogImages = newArray;
      setBlogData({ ...blogData, blogImages: blogData.blogImages });
      return;
    }

    setBlogData({ ...blogData, [name]: value });
  };

  const onClickAddTag = (e) => {
    e.preventDefault();
    if (blogData?.tags) {
      setBlogData({ ...blogData, tags: [...blogData.tags, tag] });
    } else {
      blogData.tags = [];
      setBlogData({ ...blogData, tags: [...blogData.tags, tag] });
    }
    setTag({ name: "" });
  };

  return (
    <AdminLayout
      externalStyles={[]}
      navbar={""}
      title={"Edit Blog"}
      withFooter={false}
      withSideBar={true}
    >
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header card-header-primary">
              <h4 className="card-title">Edit Blog</h4>
            </div>
            <div className="card-body">
              {isLoading ?
                <LoaderWrapper>
                  <DualRing width="40px" height="40px" color="#0b0146" />
                </LoaderWrapper> :
                <form id="form">
                  <input type="hidden" element-data="key" value="category" />
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="bmd-label-floating">Blog Title</label>
                        <input
                          type="text"
                          className="form-control"
                          id="title"
                          name="title"
                          element-data="title"
                          value={blogData?.title}
                          onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="bmd-label-floating">
                          Blog Image Url
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="imageUrl"
                          name="imageUrl"
                          element-data="imageUrl"
                          defaultValue={blogData?.blogImages ? blogData.blogImages[0]?.imageUrl : ""}
                          onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="bmd-label-floating">Category</label>
                        <select
                          className="form-control"
                          id="categoryId"
                          name="categoryId"
                          element-data="categoryId"
                          value={blogData?.categoryId}
                          onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                          }
                        >
                          <option value="">Select Category</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="bmd-label-floating">Author Name</label>
                        <input
                          type="text"
                          className="form-control mt-1"
                          id="authorName"
                          name="authorName"
                          element-data="authorName"
                          value={blogData?.authorName}
                          onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="bmd-label-floating">About Author</label>
                        <textarea
                          className="form-control"
                          id="aboutAuthor"
                          name="aboutAuthor"
                          element-data="aboutAuthor"
                          value={blogData?.aboutAuthor}
                          cols={5}
                          rows={5}
                          onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mt-2 mb-3">
                      <label>Message</label>
                      <Editor
                        apiKey={
                          "xp4d02qcjritg0ucudzbasrhjribhh7wy9ck49nlxl78l8n0"
                        }
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue={blogData?.message}
                        init={{
                          height: 500,
                          menubar: false,
                          plugins: [
                            "advlist autolink lists link image charmap print preview anchor",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime media table paste code help wordcount",
                          ],
                          toolbar:
                            "undo redo | formatselect | " +
                            "bold italic backcolor | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | " +
                            "removeformat | help",
                          content_style:
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                        onChange={(e) => handleMessageChange(e)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="bmd-label-floating">Blog Tags</label>
                        <form>
                          <div className="row pt-3">
                            <div className="col-md-6">
                              <input
                                type="text"
                                className="form-control"
                                value={tag.name}
                                onChange={(e) => {
                                  setTag({ name: e.target.value });
                                }}
                              />
                            </div>
                            <div className="col-md-6">
                              <button
                                className="btn btn-primary pull-right"
                                onClick={(e) => onClickAddTag(e)}
                              >
                                Add Tags
                              </button>
                            </div>
                          </div>
                        </form>
                        <TagWrapper>
                          {blogData?.tags?.map((tag, index) => (
                            <TagItem key={index}>{tag.name}</TagItem>
                          ))}
                        </TagWrapper>
                      </div>
                    </div>
                  </div>
                  <div className="clearfix"></div>
                  <div className="row mt-5">
                    <div className="col-md-12">
                      <button
                        type="submit"
                        id="submitBtn"
                        className="btn btn-primary pull-right"
                        onClick={(e) => handleSubmit(e)}
                      >
                        Update Blog
                      </button>
                      <div className="clearfix"></div>
                    </div>
                  </div>
                </form>
              }
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TagItem = styled.div`
  background: #073375;
  padding: 4px 12px;
  border-radius: 5px;
  color: white;
`;
