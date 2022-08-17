import React, { useState, useEffect } from "react";
import Modal from "../../components/Layout/Modal";
import { useHistory } from "react-router-dom";
import Router from "../../routes/router";
import Toaster from "../../utils/toaster";
import services from "../../api/services";
import Auth from "../../api/auth";
import StackGrid from "react-stack-grid";

function Home() {
  const [images, setImages] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await services.randomImage();
        setImages(response.data.images)
      }catch (e) {
        console.log(e)
        Toaster.error("Đã xảy ra lỗi. Vui lòng thử lại sau.", 2000);
      }
    };

    fetchData();
  }, []);

  return (
    <StackGrid
      columnWidth={"20%"}
    >
      {images.length > 0 && images.map((image, index) => {
        return <div key={index}> <img src={image} className="img-fluid" /></div>
      })}
    </StackGrid>
  );
}

export default Home;
