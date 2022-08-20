import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Toaster from "../../utils/toaster";
import { useAxios } from "../../hooks/useAxios";
import API from "../../api";
import Spinner from "../../components/Spinner";
import StackGrid from "react-stack-grid";

function Home() {
  const history = useHistory();
  const { loading, error, data } = useAxios(API.getAllPostNew());


  if (error) {
    Toaster.error(error.data);
    return;
  }

  const posts = data?.data || [];

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container">
      <StackGrid columnWidth={"20%"}>
        {posts.length != 0 &&
          posts.map((post, index) => {
            return (
              <div key={index}>
                <img src={post.fileUrls[0]} className="img-fluid" />
              </div>
            );
          })}
      </StackGrid>
    </div>
  );
}

export default Home;
