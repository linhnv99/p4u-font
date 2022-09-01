import React, { useEffect, useRef, useState } from "react";
import "./index.css";

function Comment({ avatar, onSubmit, onHideReplySubComment, commentId }) {
  const [content, setContent] = useState("");
  const [isFocusing, setIsFocusing] = useState(false);

  const textAreaRef = useRef(null);

  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  };

  useEffect(resizeTextArea, [content]);

  return (
    <form
      className="box-input-comment"
      onSubmit={(e) => onSubmit(e, content, setContent, commentId)}
    >
      <img
        src={avatar ? avatar : "/assets/img/avt-default.jpeg"}
        height="50"
        width="50"
        className="rounded-circle avt me-2"
      />
      <div className="input-comment">
        <textarea
          className="input-text"
          type="text"
          placeholder="Nhận xét đi nào"
          ref={textAreaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={() => setIsFocusing(true)}
        />
        {isFocusing && (
          <div className="float-end mt-2 box-button">
            <button
              className="me-2 cancel"
              onClick={() => {
                setIsFocusing(false), setContent("");
                if (onHideReplySubComment) {
                  onHideReplySubComment();
                }
              }}
            >
              Hủy
            </button>
            <button className="send">Gửi</button>
          </div>
        )}
      </div>
    </form>
  );
}

export default Comment;
