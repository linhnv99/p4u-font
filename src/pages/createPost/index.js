import React, { useState, useRef, useEffect } from "react";
import services from "../../api/services";
import Progress from "../../components/Progress";
import Router from "../../routes/router";
import Toaster from "../../utils/toaster";
import { getErrorMessage } from "../../errors";
import { resizeFile } from "../../utils/imageUtils";

function CreatePost() {
  const textAreaRef = useRef(null);
  const uploadRef = useRef(null);
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState(null);
  const [scope, setScope] = useState("PUBLIC");
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fileUploads, setFileUploads] = useState({
    no_image: "/assets/img/no-image.png",
    files: [],
    avatar: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!validateTitle(title) || !validateContent(content)) {
    //   return;
    // }
    if (!fileUploads.files.length) {
      setError("Vui lòng chọn ảnh tải lên.");
      return;
    }
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const formData = new FormData();
        if (title) {
          formData.append("title", title);
        }
        if (content) {
          formData.append("content", content);
        }
        formData.append("scope", scope);
        if (fileUploads.avatar) {
          formData.append("avatar", fileUploads.avatar);
        }
        fileUploads.files.forEach((file) =>
          formData.append("files", file.file)
        );
        const response = await services.createPost(formData);
        if (response.code === 200) {
          setIsSuccess(true);
        }
      } catch (error) {
        setIsLoading(false);
        setIsSuccess(false);
        Toaster.error(getErrorMessage(error.data.code));
      }
    };
    fetchData();
  };

  // const validateTitle = (title) => {
  //   if (!title) {
  //     setError({ ...error, title: "Tiêu đề không được để trống." });
  //     return false;
  //   }
  //   setError({ ...error, title: "" });
  //   setTitle(title);
  //   return true;
  // };

  // const validateContent = (content) => {
  //   if (!content) {
  //     setError({ ...error, content: "Nội dung không được để trống." });
  //     return false;
  //   }
  //   setError({ ...error, content: "" });
  //   setContent(content);
  //   return true;
  // };

  const uploadItem = async (e) => {
    try {
      let files = e.target.files;
      const fileResult = [];
      for (const element of files) {
        let fileResized = await resizeFile(element);
        const file = {
          id: element.size,
          file: fileResized,
          imagePreviewUrl: URL.createObjectURL(fileResized),
        };
        fileResult.push(file);
      }
      setFileUploads({
        ...fileUploads,
        files: [...fileUploads.files, ...fileResult],
        avatar: fileResult[0].file.name,
      });
      setError(null);
    } catch (e) {
      Toaster.error(e);
    }
  };

  const removeItem = (e) => {
    const id = Number(e.target.id);
    setFileUploads({
      ...fileUploads,
      files: [
        ...fileUploads.files.filter((fileUpload) => fileUpload.id !== id),
      ],
      avatar: null,
    });
    // uploadRef.current.value = "";
  };

  const chooseAvatar = (e, name) => {
    e.preventDefault();
    setFileUploads({
      ...fileUploads,
      avatar: name,
    });
  };

  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  };

  useEffect(resizeTextArea, [content]);

  return (
    <>
      {isLoading && (
        <Progress
          isLoading={isLoading}
          isSuccess={isSuccess}
          urlRedirect={Router.home}
        />
      )}
      <div className="main-content bg-gray px-2">
        <div className="post p-4 p-md-5">
          <form onSubmit={handleSubmit}>
            <div className="header">
              <button className="btn btn-primary  float-end">Lưu</button>
            </div>
            <div className="clearfix mb-4"></div>
            <div className="row">
              <div className="col-12 col-md-6 px-2 mb-3 mb-md-0">
                <div className="img-uploader px-0 px-md-4">
                  {fileUploads.files.length == 0 && (
                    <>
                      <label className="input-file text-center mb-3">
                        <i className="fas fa-upload"></i> Upload
                        <input
                          type="file"
                          onChange={(e) => uploadItem(e)}
                          ref={uploadRef}
                          className="fileInput"
                          multiple
                        />
                      </label>
                    </>
                  )}

                  <ul className="d-flex justify-content-center flex-column">
                    {!fileUploads.files.length ? (
                      <li className="text-center">
                        <img
                          className="img-fluid"
                          src={fileUploads.no_image}
                          alt="No Image"
                        />
                        {error && (
                          <small className="d-block mt-1 text-danger text-center">
                            {error}
                          </small>
                        )}
                      </li>
                    ) : (
                      fileUploads.files.map((fileUpload, key) => (
                        <li key={key} className="mb-2">
                          <img
                            className="img-fluid"
                            style={{ minHeight: "200px" }}
                            src={fileUpload.imagePreviewUrl}
                            alt={fileUpload.id}
                          />
                          <button
                            type="button"
                            id={fileUpload.id}
                            onClick={(e) => removeItem(e)}
                            className="far fa-trash-alt"
                          ></button>
                          <button
                            type="button"
                            className={`fas fa-check mt-5  fs-6 ${
                              fileUpload.file.name === fileUploads.avatar
                                ? "text-danger"
                                : ""
                            }`}
                            onClick={(e) =>
                              chooseAvatar(e, fileUpload.file.name)
                            }
                          ></button>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>

              <div className="col-12 col-md-6 px-2">
                <div className="body">
                  <div className="form mb-4">
                    <input
                      type="text"
                      placeholder="Tiêu đề"
                      className="form-control"
                      defaultValue={title}
                      onChange={(e) => setTitle(e.target.value.trim())}
                    />
                    {/* {error && error.title && (
                        <small className="d-block mt-1 text-danger">
                          {error.title}
                        </small>
                      )} */}
                  </div>
                  <div className="form mb-4">
                    <textarea
                      type="text"
                      rows="1"
                      placeholder="Cảm nghĩ của bạn?"
                      className="form-control"
                      ref={textAreaRef}
                      defaultValue={content}
                      onChange={(e) => setContent(e.target.value.trim())}
                    />
                    {/* {error && error.content && (
                        <small className="d-block mt-1 text-danger">
                          {error.content}
                        </small>
                      )} */}
                  </div>
                  <div className="form mb-4">
                    <select
                      className="form form-select"
                      onChange={(e) => setScope(e.target.value)}
                    >
                      {/* <option value={scope} selected>Đối tượng</option> */}
                      <option value="PUBLIC">Công khai</option>
                      <option value="FRIEND">Bạn bè</option>
                      <option value="PRIVATE">Chỉ mình tôi</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
