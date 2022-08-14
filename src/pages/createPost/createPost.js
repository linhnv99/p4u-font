import React, { useState, useRef, useEffect } from "react";

function CreatePost() {
  const textAreaRef = useRef(null);
  const uploadRef = useRef(null);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [fileUploads, setFileUploads] = useState({
    no_image: "https://www.freeiconspng.com/uploads/no-image-icon-6.png",
    files: [],
  });

  const uploadItem = (e) => {
    let files = e.target.files;
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

  const onChange = (e) => {
    setTextAreaValue(e.target.value);
  };

  useEffect(resizeTextArea, [textAreaValue]);

  return (
    <div className="main-content bg-gray">
      <div className="create-post ">
        <div className="post">
          <form>
            <div className="header">
              <button className="btn btn-primary  float-end">Saved</button>
            </div>
            <div className="clearfix mb-4"></div>
            <div className="row">
              <div className="col-12 col-md-6 px-2 mb-3 mb-md-0">
                <div className="img-uploader container-fluid">
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

                  <ul>
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
                    />
                  </div>
                  <div className="form mb-4">
                    <textarea
                      type="text"
                      rows="1"
                      placeholder="Cảm nghĩ của bạn"
                      className="form-control"
                      ref={textAreaRef}
                      value={textAreaValue}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
