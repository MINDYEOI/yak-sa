import React, { useState } from "react";
import {Button, Form, message, Input, Icon } from "antd";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";

const { TextArea } = Input;

const Medicines = [
  { key: 1, value: "진통제" },
  { key: 2, value: "소화제" },
  { key: 3, value: "감기약" },
  { key: 4, value: "해열제" },
  { key: 5, value: "파스류" },
  { key: 6, value: "상처치료" },
  { key: 7, value: "기타" }
];

function UploadProductPage(props) {
  const [TitleValue, setTitleValue] = useState("");
  const [DescriptionValue, setDescriptionValue] = useState("");
  const [PriceValue, setPriceValue] = useState(0);
  const [MedicinesValue, setMedicinesValue] = useState(1);

  const [Images, setImages] = useState([]);

  const onTitleChange = event => {
    setTitleValue(event.currentTarget.value);
  };

  const onDescriptionChange = event => {
    setDescriptionValue(event.currentTarget.value);
  };

  const onPriceChange = event => {
    setPriceValue(event.currentTarget.value);
  };

  const onMedicinesSelectChange = event => {
    setMedicinesValue(event.currentTarget.value);
  };

  const updateImages = newImages => {
    setImages(newImages);
  };
  const onSubmit = event => {
    event.preventDefault();

    if (!TitleValue || !DescriptionValue || !PriceValue || !MedicinesValue || !Images) {
      return alert("fill all the fields first!");
    }

    const variables = {
      writer: props.user.userData._id,
      title: TitleValue,
      description: DescriptionValue,
      price: PriceValue,
      images: Images,
      medicines: MedicinesValue,
    };

    Axios.post("/api/product/uploadProduct", variables).then(response => {
      if (response.data.success) {
        alert("Product Successfully Uploaded");
        props.history.push("/");
      } else {
        alert("Failed to upload Product");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h3>약 등록하기</h3>
      </div>

      <Form onSubmit={onSubmit}>
        {/* DropZone */}
        <FileUpload refreshFunction={updateImages} />

        <br />
        <br />
        <label>약 이름</label>
        <Input onChange={onTitleChange} value={TitleValue} />
        <br />
        <br />
        <label>설명</label>
        <TextArea onChange={onDescriptionChange} value={DescriptionValue} />
        <br />
        <br />
        <label>가격($)</label>
        <Input onChange={onPriceChange} value={PriceValue} type="number" />
        <br />
        <br />
        <select onChange={onMedicinesSelectChange} value={MedicinesValue}>
                    {Medicines.map(item => (
                        <option key={item.key} value={item.key}>{item.value} </option>
                    ))}
                </select>
                <br />
                <br />
        <Button onClick={onSubmit}>등록</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
