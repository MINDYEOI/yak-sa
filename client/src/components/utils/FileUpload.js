import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Icon } from "antd";
import Axios from "axios";
import "./FileUpload.css";
import { PRODUCT_SERVER } from '../Config'
function FileUpload(props) {
  const [Images, setImages] = useState([]);

  const onDrop = files => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    Axios.post(`${PRODUCT_SERVER}/uploadImage`, formData, config).then(response => {
      if (response.data.success) {
        setImages([...Images, response.data.image]);
        props.refreshFunction([...Images, response.data.image]);
      } else {
        alert("이미지 서버 업로드에 실패했습니다.");
      }
    });
  };

  const onDelete = image => {
    const currentIndex = Images.indexOf(image);

    let newImages = [...Images];
    newImages.splice(currentIndex, 1);

    setImages(newImages);
    props.refreshFunction(newImages);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: "300px",
              height: "240px",
              border: "1px solid lightgray",
              borderRadius: '15px',
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            {...getRootProps()}
          >
            {console.log("getRootProps", { ...getRootProps() })}
            {console.log("getInputProps", { ...getInputProps() })}
            <input {...getInputProps()} />
            <Icon type="plus" style={{ fontSize: "3rem" }} />
          </div>
        )}
      </Dropzone>

      <div style={{ display: "flex", width: "350px", height: "240px", overflowX: "scroll" }}>
        {Images.map((image, index) => (
          <div onClick={() => onDelete(image)}>
            <img id="test" src={`http://3.209.242.35/${image}`} />
            <div id="alert">클릭하면 삭제돼요!</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
