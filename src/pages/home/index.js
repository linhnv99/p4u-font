import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Toaster from "../../utils/toaster";
import { useAxios } from "../../hooks/useAxios";
import API from "../../api";
import Spinner from "../../components/Spinner";
import StackGrid from "react-stack-grid";
import { SizeMe } from "react-sizeme";

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
            duration={100}
            gutterWidth={15}
            gutterHeight={15}
          >
            {posts.length != 0 &&
              posts.map((post, index) => {
                return (
                  <div key={index} className="grid-item">
                    <img src={post.fileUrls[0]} className="img-fluid" />
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
