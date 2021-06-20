import React from "react";
import { Carousel } from "antd";

function ImageSlider(props) {
  return (
    <div>
      <Carousel autoplay>
        {props.images.map((image, index) => (
          <div key={index}>
            <img style={{ width: "100%", maxWidth: "300px", height: "300px" }} src={`http://3.209.242.35/${image}`} alt="productImage" />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageSlider;
