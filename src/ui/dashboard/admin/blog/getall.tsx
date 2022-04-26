import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { BlogController } from "../../../../controller/admin/blog.controller";
import { BranchController } from "../../../../controller/admin/branch.controller";
import { PastorController } from "../../../../controller/admin/pastor.controller";
import { BlogDTO } from "../../../../dto/Blog.dto";
import { BranchDTO } from "../../../../dto/Branch.dto";
import PastorDTO from "../../../../dto/Pastor.dto";
import AdminLayout from "../admin.layout";
import CategoryModal from "./categoryModal";

export default function GetAllBlogs() {
  const _tmp: BlogDTO[] = [];
  const router = useRouter();

  const [items, setItems] = useState(_tmp);
  const [openCategoryModal, setOpenCategoryModal] = useState(false)

  useEffect(() => {
    blogController.list(setItems);
  }, []);

  const blogController: BlogController = new BlogController();

  const truncateText = (text: string, length: number = 30) => {
    if (text.length > length) {
      return text.substring(0, length) + "...";
    }
    return text;
  };

  const handleOpenCategoryModal = () => {
    setOpenCategoryModal(true);
  }

  const handleCloseCategoryModal = () => {
    setOpenCategoryModal(false);
  }

  return (
    <>
      <AdminLayout
        externalStyles={[]}
        navbar={""}
        title={"Blogs"}
        withFooter={false}
        withSideBar={true}
      >
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header card-header-primary">
                <div className="nav-tabs-navigation">
                  <div className="nav-tabs-wrapper">
                    <span className="nav-tabs-title">Blogs</span>
                    <ul className="nav nav-tabs" data-tabs="tabs">
                      <li className="nav-item">
                        <Link href={"/admin/blogs/addblog"}>
                          <a className="nav-link active" data-toggle="tab">
                            Add New Blog
                          </a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          data-toggle="tab"
                          onClick={handleOpenCategoryModal}
                        >
                          Manage Categories
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="col-xl-8 col-md-6" id="spinner_loader"></div>
                <div className="table-responsive" id="table_div">
                  <table className="table">
                    <thead className=" text-primary">
                      <th>Title</th>
                      <th>Author Name</th>
                      <th>Category</th>
                      <th>Date Created</th>
                      <th></th>
                      <th></th>
                    </thead>
                    <tbody id="tbody">
                      {items?.length > 0
                        ? items.map((x, index) => {
                          return (
                            <tr key={index}>
                              <td>{truncateText(x.title, 30)}</td>
                              <td>{x.authorName}</td>
                              <td> {x.blogCategory}</td>
                              <td> {moment(x.date).format("DD/MMM/yyyy")}</td>
                              <td className="text-primary">
                                <a
                                  onClick={() => {
                                    router.push(
                                      `/admin/blogs/edit-blog?id=${x.id}`
                                    );
                                  }}
                                  className="btn btn-primary pull-right text-white"
                                >
                                  Edit
                                </a>
                              </td>
                              <td className="text-primary">
                                <a
                                  onClick={() => {
                                    blogController.delete(
                                      x.id,
                                      setItems,
                                      items
                                    );
                                  }}
                                  className="btn btn-primary pull-right text-white"
                                >
                                  Delete
                                </a>
                              </td>
                            </tr>
                          );
                        })
                        : undefined}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
      <CategoryModal isOpen={openCategoryModal} closeModal={handleCloseCategoryModal} />
    </>
  );
}
