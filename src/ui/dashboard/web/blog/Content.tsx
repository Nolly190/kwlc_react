import React, { useEffect, useState } from "react";
import BlogAudioItem from "../../../../components/blog-audio-item";
import BlogTextItem from "../../../../components/blog-text-item";
import { loadBlogData } from "../../../../controller/blog.controller";
import { BlogAudioDTO, BlogDTO } from "../../../../dto/Blog.dto";
import { fakeModel } from "../../../../utils";
import ReactPaginate from "react-paginate";

export default function BlogContent({ searchTerm }) {
  const blogData: BlogAudioDTO[] = [];

  const [list, setList] = useState(blogData);
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    loadBlogData(setList);
  }, []);

  const blogsPerPage = 9;
  const pagesVisited = pageNumber * blogsPerPage;
  const pageCount = Math.ceil(list.length / blogsPerPage);
  const changeBlog = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      <section className="blog_posts">
        {list.length > 0
          ? list
              .filter((list) => {
                if (searchTerm === "") {
                  return list;
                } else if (
                  list.title.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return list;
                }
              })
              .slice(pagesVisited, pagesVisited + blogsPerPage)
              .map((x, index) => {
                if (x.itemType == "audio") {
                  return (
                    <BlogAudioItem
                      by={x.by}
                      date={x.date}
                      description={x.description}
                      id={x.id}
                      image={x.image}
                      itemType={x.itemType}
                      timerCurrent={x.timerCurrent}
                      timerEnd={x.timerEnd}
                      timerStart={x.timerStart}
                      title={x.title}
                      key={index}
                      href={`/web/blog-post?id=${x.id}`}
                      aboutAuthor={x.aboutAuthor}
                      blogCategory={x.blogCategory}
                      blogImages={x.blogImages}
                      tags={x.tags}
                      message={x.message}
                      authorName={x.authorName}
                    />
                  );
                } else {
                  return (
                    <BlogTextItem
                      by={x.by}
                      date={x.date}
                      description={x.description}
                      id={x.id}
                      image={x.image}
                      itemType={x.itemType}
                      title={x.title}
                      key={index}
                      href={`/web/blog-post?id=${x.id}`}
                      aboutAuthor={x.aboutAuthor}
                      blogCategory={x.blogCategory}
                      blogImages={x.blogImages}
                      tags={x.tags}
                      message={x.message}
                      authorName={x.authorName}
                    />
                  );
                }
              })
          : undefined}
      </section>
      <div className="pagination-header">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changeBlog}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
    </div>
  );
}
