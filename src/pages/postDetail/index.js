import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import Carousel from "nuka-carousel";
import Toaster from "../../utils/toaster";
import { useAxios } from "../../hooks/useAxios";
import API from "../../api";
import Router from "../../routes/router";
import Spinner from "../../components/Spinner";
import services from "../../api/services";
import { getErrorMessage } from "../../errors";
import Comment from "../../components/Comment";
import NotFound from "../../components/NotFound";
import Avatar from "../../components/Avatar";

import "./index.css";

function PostDetail({
  match: {
    params: { id },
  },
}) {
  const DEFAULT_SIZE = 2;
  const history = useHistory();
  const { loading, error, data: post } = useAxios(API.getPost(id));
  const [replyCommentId, setReplyCommentId] = useState();
  const [pageComment, setPageComment] = useState(1);
  const [comments, setComments] = useState({
    totalPage: 0,
    totalRecord: 0,
    data: [],
  });
  const [subComments, setSubComments] = useState({
    totalPage: 0,
    totalRecord: 0,
    data: [],
    openedSubComment: [],
  });

  useEffect(() => {
    fetchComments(DEFAULT_SIZE);
  }, [pageComment]);

  const fetchComments = async (size) => {
    try {
      const response = await services.getAllComments({
        size,
        page: pageComment,
        postId: id,
      });
      setComments({
        totalPage: response.data.totalPage,
        totalRecord: response.data.totalRecord,
        data: [...comments.data, ...response.data.data],
      });
    } catch (error) {
      Toaster.error(getErrorMessage(error.data.code));
    }
  };

  const fetchSubComments = async (commentId, size) => {
    try {
      const response = await services.getAllSubComments({
        size,
        commentId,
      });
      setSubComments({
        totalPage: response.data.totalPage,
        totalRecord: response.data.totalRecord,
        data: [...subComments.data, ...response.data.data],
        openedSubComment: [...subComments.openedSubComment, commentId],
      });
    } catch (error) {
      Toaster.error(getErrorMessage(error.data.code));
    }
  };

  const handleSubmitComment = (e, content, resetText) => {
    e.preventDefault();
    if (!content.trim()) return;
    const createComment = async () => {
      try {
        const response = await services.createComment({
          postId: id,
          content: content,
        });
        setComments({
          ...comments,
          data: [response.data, ...comments.data],
          totalRecord: comments.totalRecord + 1,
        });
        console.log(response.data);
        resetText("");
      } catch (error) {
        Toaster.error(getErrorMessage(error.data.code ?? error.status));
      }
    };
    createComment();
  };

  const handleSubmitSubComment = (e, content, resetText, commentId) => {
    e.preventDefault();
    if (!content.trim()) return;
    const createSubComment = async () => {
      try {
        const response = await services.createSubComment({
          commentId,
          content,
        });
        setSubComments((prevState) => ({
          ...prevState,
          data: [response.data, ...prevState.data],
        }));
        resetText("");
      } catch (error) {
        Toaster.error(getErrorMessage(error.data.code ?? error.status));
      }
    };
    createSubComment();
  };

  if (error) {
    if (error.data.code === 412 || error.status == 401) {
      return <NotFound />;
    }
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="main-content px-2">
      <span
        style={{ cursor: "pointer" }}
        className="float-start d-none d-md-block ms-4 mt-2"
        onClick={() => history.push(Router.home)}
      >
        <i className="fas fa-arrow-left"></i>
      </span>
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
                Tải lên bởi
                <a href="#"> {post.user.name ?? post.user.username}</a>
              </p>
              <p className="title">{post.title}</p>
              <p className="content">{post.content}</p>
              {/* user post */}
              <div className="box-user">
                <div className="user">
                  <a href="#">
                    <Avatar
                      avatarPath={post.user.avatar}
                      height={50}
                      width={50}
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
              {/* end user post */}
              <div className="box-comment">
                <div>
                  {comments.totalRecord} nhận xét{" "}
                  <i className="fas fa-chevron-down"></i>
                </div>
                {pageComment < comments.totalPage && (
                  <span
                    className="load-more mt-2 d-block"
                    onClick={() => setPageComment(pageComment + 1)}
                  >
                    Xem bình luận trước
                  </span>
                )}
                {comments.data.length > 0 &&
                  comments.data
                    .slice(0)
                    .reverse()
                    .map((comment, key) => {
                      return (
                        <div className="comment" key={key}>
                          <Avatar
                            avatarPath={comment.userAvatarPath}
                            height={35}
                            width={35}
                            className="rounded-circle avt me-2"
                          />
                          <div className="w-100">
                            <div className="cmt-content">
                              <p className="user-comment">
                                {comment.name ?? comment.username}
                              </p>
                              <p>{comment.content}</p>
                            </div>
                            <div className="box-reply ms-2">
                              <span
                                className="reply"
                                onClick={() => setReplyCommentId(comment.id)}
                              >
                                Trả lời
                              </span>
                              <span className="like">Thích</span>
                              <span className="timestamp">
                                {moment(comment.createdAt).fromNow()}
                              </span>
                            </div>
                            {comment.totalSubComment > 0 &&
                              !subComments.openedSubComment.includes(
                                comment.id
                              ) && (
                                <small className="ms-3 reply-number">
                                  <i className="fas fa-level-up-alt"></i>
                                  <b
                                    onClick={() =>
                                      fetchSubComments(
                                        comment.id,
                                        comment.totalSubComment
                                      )
                                    }
                                  >
                                    {comment.totalSubComment} phản hồi
                                  </b>
                                </small>
                              )}
                            {/* subComment */}
                            <ul className="sub-comment">
                              {subComments.data.length > 0 &&
                                subComments.data
                                  .slice(0)
                                  .reverse()
                                  .map((subComment, key) => {
                                    if (comment.id === subComment.commentId) {
                                      return (
                                        <li key={key}>
                                          <div className="content">
                                            <Avatar
                                              avatarPath={
                                                subComment.userAvatarPath
                                              }
                                              height={35}
                                              width={35}
                                              className="rounded-circle avt me-2"
                                            />
                                            <div className="">
                                              <div className="cmt-content">
                                                <p className="user-comment">
                                                  {subComment.name ??
                                                    subComment.username}
                                                </p>
                                                <p>{subComment.content}</p>
                                              </div>
                                              <div className="box-reply">
                                                <span
                                                  className="reply"
                                                  onClick={() =>
                                                    setReplyCommentId(
                                                      comment.id
                                                    )
                                                  }
                                                >
                                                  Trả lời
                                                </span>
                                                <span className="like">
                                                  Thích
                                                </span>
                                                <span className="timestamp">
                                                  {moment(
                                                    subComment.createdAt
                                                  ).fromNow()}
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                      );
                                    }
                                  })}
                            </ul>
                            {/* end subComment */}
                            {replyCommentId === comment.id && (
                              <Comment
                                commentId={comment.id}
                                onSubmit={handleSubmitSubComment}
                                onHideReplySubComment={() =>
                                  setReplyCommentId(null)
                                }
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
              </div>
              <Comment onSubmit={handleSubmitComment} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
