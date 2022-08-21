import React, { useState, useRef, useEffect } from "react";
import services from "../../api/services";
import Progress from "../../components/Progress";
import Router from "../../routes/router";
import Toaster from "../../utils/toaster";
import { getErrorMessage } from "../../errors";

function CreatePost() {
  const textAreaRef = useRef(null);
  const uploadRef = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [scope, setScope] = useState("PUBLIC");
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fileUploads, setFileUploads] = useState({
    no_image: "https://www.freeiconspng.com/uploads/no-image-icon-6.png",
    files: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateTitle(title) || !validateContent(content)) {
      return;
    }
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("scope", scope);
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

  const validateTitle = (title) => {
    if (!title) {
      setError({ ...error, title: "Tiêu đề không được để trống." });
      return false;
    }
    setError({ ...error, title: "" });
    setTitle(title);
    return true;
  };

  const validateContent = (content) => {
    if (!content) {
      setError({ ...error, content: "Nội dung không được để trống." });
      return false;
    }
    setError({ ...error, content: "" });
    setContent(content);
    return true;
  };

  const uploadItem = (e) => {
    let files = e.target.files;
    console.log(files);
    const fileResults = [];
    for (const element of files) {
      const file = {
        id: element.size,
        file: element,
        imagePreviewUrl: URL.createObjectURL(element),
      };
      fileResults.push(file);
    }

    setFileUploads({
      no_image: fileUploads.no_image,
      files: [...fileUploads.files, ...fileResults],
    });
  };

  const removeItem = (e) => {
    const id = Number(e.target.id);
    setFileUploads({
      no_image: fileUploads.no_image,
      files: [...fileUploads.files.filter((obj) => obj.id !== id)],
    });
    uploadRef.current.value = "";
  };

  const resizeTextArea = () => {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
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
        <div className="create-post p-4 p-md-5">
          <div className="post">
            <form onSubmit={handleSubmit}>
              <div className="header">
                <button className="btn btn-primary  float-end">Lưu</button>
              </div>
              <div className="clearfix mb-4"></div>
              <div className="row">
                <div className="col-12 col-md-6 px-2 mb-3 mb-md-0">
                  <div className="img-uploader px-0 px-md-4">
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

                    <ul className="d-flex justify-content-center flex-column">
                      {!fileUploads.files.length ? (
                        <li>
                          <img
                            className="img-fluid"
                            src={fileUploads.no_image}
                            alt="No Image"
                          />
                        </li>
                      ) : (
                        fileUploads.files.map((obj, key) => (
                          <li key={key} className="mb-2">
                            <img
                              className="img-fluid"
                              src={obj.imagePreviewUrl}
                              alt={obj.id}
                            />
                            <button
                              type="button"
                              id={obj.id}
                              onClick={(e) => removeItem(e)}
                              className="far fa-trash-alt"
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
                        placeholder="Tạo tiêu đề"
                        className="form-control"
                        defaultValue={title}
                        onChange={(e) => validateTitle(e.target.value)}
                      />
                      {error && error.title && (
                        <small className="d-block mt-1 text-danger">
                          {error.title}
                        </small>
                      )}
                    </div>
                    <div className="form mb-4">
                      <textarea
                        type="text"
                        rows="1"
                        placeholder="Cảm nghĩ của bạn"
                        className="form-control"
                        ref={textAreaRef}
                        defaultValue={content}
                        onChange={(e) => validateContent(e.target.value)}
                      />
                      {error && error.content && (
                        <small className="d-block mt-1 text-danger">
                          {error.content}
                        </small>
                      )}
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
      </div>
    </>
  );
}

export default CreatePost;
