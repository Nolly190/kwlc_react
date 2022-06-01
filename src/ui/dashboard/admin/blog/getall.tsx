import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { BlogController } from "../../../../controller/admin/blog.controller";
import { BlogDTO } from "../../../../dto/Blog.dto";
import AdminLayout from "../admin.layout";
import CategoryModal from "./categoryModal";
import ConfirmationModal from "../../../../components/confirmationModal";
import { useDisclosure } from "@chakra-ui/react";
import DualRing from "../../../../components/loader";
import styled from "styled-components";
import { useAuthSession } from "../../../../hooks/user";

export default function GetAllBlogs() {
  const _tmp: BlogDTO[] = [];
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [deleteId, setDeleteId] = useState(0);
  const [isLoading, setIsLoading] = useState(false)

  const [items, setItems] = useState<BlogDTO[]>();
  const [openCategoryModal, setOpenCategoryModal] = useState(false)

  useEffect(() => {
    blogController.list(setItems, setIsLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenModal = (id: number) => {
    setDeleteId(id);
    onOpen();
  }

  const user = useAuthSession();

  if (!user) {
    console.log("no user")
  } else {
    console.log("user found")
  }

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
                  {isLoading ?
                    <LoaderWrapper>
                      <DualRing width="40px" height="40px" color="#0b0146" />
                    </LoaderWrapper> :
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
                        {
                          items?.length > 0
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
                                      onClick={() => handleOpenModal(x.id)}
                                      className="btn btn-primary pull-right text-white"
                                    >
                                      Delete
                                    </a>
                                  </td>
                                </tr>
                              );
                            })
                            : <p>No content</p>}
                      </tbody>
                    </table>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
      <CategoryModal isOpen={openCategoryModal} closeModal={handleCloseCategoryModal} />
      <ConfirmationModal title={"Delete Item"} description="Are you sure you want to delete this item?" action={() => {
        blogController.delete(
          deleteId,
          setItems,
          items
        )
      }} isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 100%;
`;
