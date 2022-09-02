import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import Toaster from "../../utils/toaster";
import { useAxios } from "../../hooks/useAxios";
import API from "../../api";
import Spinner from "../../components/Spinner";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Router from "../../routes/router";
import services from "../../api/services";
import Masonry from "react-masonry-component";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../components/Loader";

import "./index.css";

function Home() {
  const history = useHistory();
  const DEFAULT_SIZE = 20;
  const { loading, error, data } = useAxios(API.getAllNewPosts());
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);

  if (error) {
    Toaster.error(getErrorMessage(error.data.code));
    return;
  }

  useEffect(() => {
    if (data?.data) {
      setPosts(data?.data || []);
    }
  }, [data]);

  const fetchData = async () => {
    try {
      const response = await services.getAllNewPosts({
        page,
        size: DEFAULT_SIZE,
      });
      const data = response.data ? response.data.data : [];

      setPosts([...posts, ...data]);
      console.log(data);
      if (data.length == 0 || data.length < DEFAULT_SIZE) {
        setHasMore(false);
        return;
      }
      setPage(page + 1);
    } catch (error) {
      Toaster.error(getErrorMessage(error.data.code));
    }
  };

  if (loading) {
    return <Spinner />;
  }

  const masonryOptions = {
    percentPosition: true,
    // horizontalOrder: boolean;
    resize: false,
    initLayout: false,
    transitionDuration: 0,
  };

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<Loader />}
      className="pt-2 pb-5 grid-center overflow-hidden"
    >
      <Masonry elementType={"ul"} options={masonryOptions}>
        {posts.length != 0 &&
          posts.map((post, index) => {
            return (
              <li
                key={index}
                className="post-item"
              >
                <a
                  className="post-content"
                  href={Router.get(Router.postDetail, {
                    id: post.id,
                  })}
                  onClick={(e) => {
                    e.preventDefault();
                    history.push(
                      Router.get(Router.postDetail, {
                        id: post.id,
                      })
                    );
                  }}
                >
                  <div className="image">
                    <div className="overlay"></div>
                    {post.fileUrls.length > 1 && (
                      <span className="image-number bg-danger">
                        {JSON.stringify(post.fileUrls.length)}
                      </span>
                    )}

                    <LazyLoadImage
                      style={{ minHeight: "120px" }}
                      className="img-fluid"
                      alt="p4u-image"
                      effect="blur"
                      src={post.avatarUrl ?? post.fileUrls[0]}
                    />
                  </div>
                  {post.title && <span className="title">{post.title}</span>}
                </a>

                <a className="user-info" href="#">
                  <div className="detail">
                    <img
                      className={`rounded-circle ${
                        post.user.avatar ? "" : "avt"
                      }`}
                      height="35"
                      width="35"
                      src={
                        post.user.avatar
                          ? post.user.avatar
                          : "/assets/img/avt-default.jpeg"
                      }
                    />
                    <p>{post.user.name ?? post.user.username}</p>
                  </div>
                </a>
              </li>
            );
          })}
      </Masonry>
    </InfiniteScroll>
  );
}

export default Home;
