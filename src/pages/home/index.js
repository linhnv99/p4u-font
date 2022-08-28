import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Toaster from "../../utils/toaster";
import { useAxios } from "../../hooks/useAxios";
import API from "../../api";
import Spinner from "../../components/Spinner";
import StackGrid from "react-stack-grid";
import { SizeMe } from "react-sizeme";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Router from "../../routes/router";
import services from "../../api/services";

import "./index.css";

function Home() {
  const history = useHistory();
  const { loading, error, data } = useAxios(API.getAllNewPosts());
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  if (error) {
    Toaster.error(getErrorMessage(error.data.code));
    return;
  }

  useEffect(() => {
    if (data?.data) {
      setPosts(data?.data || []);
    }
  }, [data]);

  useEffect(() => {
    handleScroll();
    return () => {
      handleScroll();
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const response = await services.getAllNewPosts({
        page,
      });
      const data = response.data ? response.data.data : [];
      setPosts([...posts, ...data]);
    } catch (error) {
      Toaster.error(getErrorMessage(error.data.code));
    }
  };

  const handleScroll = () => {
    document.addEventListener("scroll", () => {
      let scrollTop = document.documentElement.scrollTop;
      let windowHeight = window.innerHeight;
      let height = document.body.scrollHeight - windowHeight;
      let scrollPercentage = scrollTop / height;
      if (scrollPercentage >= 1) {
        setPage(page + 1);
      }
    });
  };

  console.log(page);
  if (loading) {
    return <Spinner />;
  }

  const gridColumnResponsive = (width) => {
    if (width < 576) {
      return 50;
    } else if (width < 768) {
      return 33.33;
    } else if (width < 992) {
      return 33.33;
    } else {
      return 20;
    }
  };

  return (
    <SizeMe
      monitorHeight
      monitorWidth
      refreshRate={16}
      render={({ size: { width, height } }) => (
        <div className="container max-width-1260 mt-3" id="lstPost">
          <StackGrid
            className="stack-grid"
            columnWidth={`${gridColumnResponsive(width)}%`}
            component="div"
            itemComponent="div"
            easing="cubeOut"
            gutterWidth={16}
            gutterHeight={16}
            appearDelay={50}
            monitorImagesLoaded
            duration={1200}
          >
            {posts.length != 0 &&
              posts.map((post, index) => {
                return (
                  <div key={index} className="post-item">
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
                      <div
                        href="#"
                        className="image"
                        onClick={() => console.log("ahah")}
                      >
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
                      {post.title && (
                        <span className="title">{post.title}</span>
                      )}
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
                  </div>
                );
              })}
          </StackGrid>
        </div>
      )}
    />
  );
}

export default Home;
