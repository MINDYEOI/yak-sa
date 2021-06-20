import React, { useState } from "react";
import {Button, Form, message, Input, Icon } from "antd";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";
import { PRODUCT_SERVER } from '../../Config'
const { TextArea } = Input;

const Medicines = [
  { key: 1, value: "진통제" },
  { key: 2, value: "소화제" },
  { key: 3, value: "감기약" },
  { key: 4, value: "해열제" },
  { key: 5, value: "파스류" },
  { key: 6, value: "상처치료" },
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
      return alert("모두 입력해주세요.");
    }

    const variables = {
      writer: props.user.userData._id,
      title: TitleValue,
      description: DescriptionValue,
      price: PriceValue,
      images: Images,
      medicines: MedicinesValue,
    };

    Axios.post(`${PRODUCT_SERVER}/uploadProduct`, variables).then(response => {
      if (response.data.success) {
        alert("성공적으로 업로드 되었습니다.");
        props.history.push("/");
      } else {
        alert("실패했습니다.");
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
