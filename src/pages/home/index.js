import React from "react";
import { useHistory } from "react-router-dom";
import Toaster from "../../utils/toaster";
import { useAxios } from "../../hooks/useAxios";
import API from "../../api";
import Spinner from "../../components/Spinner";
import StackGrid from "react-stack-grid";
import { SizeMe } from "react-sizeme";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import "./index.css";

function Home() {
  const history = useHistory();
  const { loading, error, data } = useAxios(API.getAllPostNew());

  if (error) {
    Toaster.error(error.data);
    return;
  }

  if (loading) {
    return <Spinner />;
  }

  const posts = data?.data || [];

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
        <div className="container">
          <StackGrid
            columnWidth={`${gridColumnResponsive(width)}%`}
            itemComponent="div"
            duration={400}
            gutterWidth={15}
            gutterHeight={15}
            easing={"cubicOut"}
            appearDelay={50}
            monitorImagesLoaded
          >
            {posts.length != 0 &&
              posts.map((post, index) => {
                return (
                  <div key={index} className="grid-item w-100 h-100">
                    <LazyLoadImage
                      className="img-fluid"
                      alt="p4u-image"
                      effect="blur"
                      src={post.fileUrls[0]}
                    />
                    {/* <img className="img-fluid" src={post.fileUrls[0]} /> */}
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
