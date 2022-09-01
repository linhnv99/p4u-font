import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Toaster from "../../utils/toaster";
import { useAxios } from "../../hooks/useAxios";
import API from "../../api";
import Spinner from "../../components/Spinner";
import Router from "../../routes/router";
import Carousel from "nuka-carousel";
import "./index.css";

function PostDetail({
  match: {
    params: { id },
  },
}) {
  const history = useHistory();
  const textAreaRef = useRef(null);
  const [content, setContent] = useState(null);
  const { loading, error, data: post } = useAxios(API.getPost(id));

  if (error) {
    if (error.data.code === 412) {
      return <p className="text-center fs-3 mt-3">Không tìm thấy bài viết</p>;
    }
  }

  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  };

  useEffect(resizeTextArea, [content]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="main-content px-2">
      <div className="post-detail p-0">
        <div className="row">
          <div className="col-md-6">
            <div className="post-images">
              <Carousel
                defaultControlsConfig={{
                  zoomScale: 2,
                  nextButtonText: " ",
                  prevButtonText: " ",
                  nextButtonClassName: "next-btn fa-1x fas fa-angle-right",
                  prevButtonClassName: "prev-btn fa-1x fas fa-angle-left",
                  pagingDotsStyle: {
                    fill: "#fff",
                  },
                  pagingDotsClassName: "paging-dot",
                }}
              >
                {post.fileUrls.map((url, key) => {
                  return <img key={key} className="img-fluid" src={url} />;
                })}
              </Carousel>
            </div>
          </div>
          <div className="col-md-6">
            <div className="box-content">
              <p className="uploader">
                Tải lên bởi{" "}
                <a href="#">{post.user.name ?? post.user.username}</a>
              </p>
              <p className="title">{post.title}</p>
              <p className="content">{post.content}</p>
              <div className="box-user">
                <div className="user">
                  <a href="#">
                    <img
                      src={`${
                        post.user.avatar
                          ? post.user.avatar
                          : "/assets/img/avt-default.jpeg"
                      }`}
                      height="50"
                      width="50"
                      className="rounded-circle avt"
                    />
                  </a>
                  <div className="mx-2">
                    <a className="username" href="#">
                      {post.user.name ?? post.user.username}
                    </a>
                    <p className="follower">90tr người theo dõi</p>
                  </div>
                </div>
                <button>Theo dõi</button>
              </div>
              <div className="box-comment">
                <div>3 nhận xét</div>
                <div className="comment">
                  <img
                    src="/assets/img/avt-default.jpeg"
                    height="35"
                    width="35"
                    className="rounded-circle avt me-2"
                  />
                  <div>
                    <p className="user-comment">LinhNguyen</p>
                    <p>
                      Jadi ini isinya cuma ulzzang - ulzzang. Cocok buat yg mau
                      bikin cerita.
                    </p>
                    <div className="box-reply">
                      <span className="timestamp">3w</span>
                      <span className="reply">Trả lời</span>
                      <span className="like">Like</span>
                    </div>
                    <ul className="sub-comment">
                      <li>
                        <div className="content">
                          <img
                            src="/assets/img/avt-default.jpeg"
                            height="35"
                            width="35"
                            className="rounded-circle avt me-2"
                          />
                          <div className="">
                            <p className="user-comment">LinhNguyen</p>
                            <p>
                              Jadi ini isinya cuma ulzzang - ulzzang. Cocok buat
                              yg mau bikin cerita.
                            </p>
                            <div className="box-reply">
                              <span className="timestamp">3w</span>
                              <span className="reply">Trả lời</span>
                              <span className="like">Like</span>
                            </div>
                          </div>
                        </div>
                        {/* form input sub-comment */}
                        <form className="box-input-comment">
                          <img
                            src="/assets/img/avt-default.jpeg"
                            height="50"
                            width="50"
                            className="rounded-circle avt me-2"
                          />
                          <div className="input-comment">
                            <textarea
                              className=""
                              placeholder="Nhận xét đi nào"
                            ></textarea>

                            <button className="mt-2 float-end">Gửi</button>
                          </div>
                        </form>
                        {/* form input sub-comment */}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* form input comment */}
              <form className="box-input-comment">
                <img
                  src="/assets/img/avt-default.jpeg"
                  height="50"
                  width="50"
                  className="rounded-circle avt me-2"
                />
                <div className="input-comment">
                  <textarea
                    type="text"
                    placeholder="Nhận xét đi nào"
                    ref={textAreaRef}
                    defaultValue={content}
                    onChange={(e) => setContent(e.target.value.trim())}
                  />

                  <button className="mt-2 float-end">Gửi</button>
                </div>
              </form>
              {/* form input comment */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
