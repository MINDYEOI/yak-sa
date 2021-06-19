import React, { useEffect, useState } from "react";
import { Button, Descriptions } from "antd";
import { Container } from "react-bootstrap";

function ProductInfo(props) {
  const [Product, setProduct] = useState({});

  useEffect(() => {
    setProduct(props.detail);
  }, [props.detail]);

  const addToCarthandler = () => {
    props.addToCart(props.detail._id);
  };

  return (

    <Container style={{ paddingTop: "100px" }}>
      <Container style={{ textAlign: "center" }}>
        {/* <h7>{Product.description}</h7><br/> */}
        <h3>가격 : {Product.price}000 원</h3>
      </Container>

      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button size="large" shape="round" type="danger" onClick={addToCarthandler}>
          <a href="/user/cart">
          장바구니에 담기
          </a>
        </Button>
      </div>
    </Container>
  );
}

export default ProductInfo;
