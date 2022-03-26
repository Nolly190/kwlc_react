import { useEffect, useRef, useState } from "react";
import { BlogController } from "../../../../controller/admin/blog.controller";
import { BlogItemDTO, BlogItemImageDTO } from "../../../../dto/Blog.dto";
import AdminLayout from "../admin.layout";
import { Editor } from "@tinymce/tinymce-react";

export default function AddBlog() {
  const _tmp: BlogItemDTO = new BlogItemDTO();

  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [location, setLocation] = useState("");
  const [state, setState] = useState("");
  const [tags, setTags] = useState([]);
  const [item, setItem] = useState(_tmp);
  const [isBranchHq, setIsBranchHq] = useState(false);
  const [blogCategory, setBlogCategory] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [aboutAuthor, setAboutAuthor] = useState("");

  useEffect(() => {}, []);

  let controller: BlogController = new BlogController();
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const onClick = (e) => {
    e.preventDefault();
    controller.create(
      new BlogItemDTO({
        aboutAuthor: aboutAuthor,
        authorName: authorName,
        blogCategory: blogCategory,
      })
    );
  };

  const onClickAddTag = (e) => {
    e.preventDefault();

    const _tags = tags;
    _tags.push(tag);
    setTags(_tags);
  };

  return (
    <AdminLayout
      externalStyles={[]}
      navbar={""}
      title={"Add Blog"}
      withFooter={false}
      withSideBar={true}
    >
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header card-header-primary">
              <h4 className="card-title">Create New Blog</h4>
            </div>
            <div className="card-body">
              <form id="form">
                <input type="hidden" element-data="key" value="category" />
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Branch Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        element-data="name"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Branch State</label>
                      <input
                        type="text"
                        className="form-control"
                        id="location"
                        name="location"
                        element-data="description"
                        onChange={(e) => setState(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Branch City</label>
                      {/* <input type="text" className="form-control" id="code" name="code" element-data="code"  onChange={(e) => setCity(e.target.value)} />  */}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">
                        Branch location
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="code"
                        name="code"
                        element-data="code"
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">
                        Branch street
                      </label>
                      {/* <input type="text" className="form-control" id="code" name="code" element-data="code"  onChange={(e) => setStreet(e.target.value)} />  */}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="bmd-label-floating">Type</label>
                    <div className="row ml-1">
                      <label className="bmd-label-floating">HQ</label>
                      <input
                        type="radio"
                        value="No"
                        className="col-md-3 form-control"
                        id="code"
                        name="code"
                        element-data="code"
                        onChange={() => setIsBranchHq(true)}
                        style={{ height: 15, width: 15 }}
                      />

                      <label className="bmd-label-floating">Branch</label>
                      <input
                        type="radio"
                        value="Yes"
                        className="col-md-3  form-control"
                        name="code"
                        onChange={() => setIsBranchHq(false)}
                        checked
                        style={{ height: 15, width: 15 }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <Editor
                      apiKey={
                        "xp4d02qcjritg0ucudzbasrhjribhh7wy9ck49nlxl78l8n0"
                      }
                      onInit={(evt, editor) => (editorRef.current = editor)}
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
                              onChange={(e) => {
                                setTag(e.target.value);
                              }}
                            />
                          </div>
                          <div className="col-md-6">
                            <button
                              className="btn btn-primary pull-right"
                              onClick={(e) => onClickAddTag(e)}
                            >
                              Add Service
                            </button>
                          </div>
                        </div>
                      </form>
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
                      onClick={(e) => onClick(e)}
                    >
                      Create Branch
                    </button>
                    <div className="clearfix"></div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
