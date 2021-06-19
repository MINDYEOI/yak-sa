import React from "react";

function UserCardBlock(props) {
  const renderCartImage = images => {
    if (images.length > 0) {
      let image = images[0];
      return `http://localhost:5000/${image}`;
    }
  };

  const renderItems = () =>
    props.products &&
    props.products.map(product => (
      <tr key={product._id} style={{ margin: "auto", backgroundColor: "white" }}>
        <td style={{ margin: "auto", textAlign: "center" }}>
          <img style={{ width: "70px" }} alt="product" src={renderCartImage(product.images)} />
        </td>
        <td style={{ margin: "auto", textAlign: "center" }}>{product.title}</td>
        <td style={{ margin: "auto", textAlign: "center" }}>{product.quantity} EA</td>
        <td style={{ margin: "auto", textAlign: "center" }}>$ {product.price} </td>
        <td style={{ margin: "auto", textAlign: "center" }}>
          <button onClick={() => props.removeItem(product._id)}>❌</button>
        </td>
      </tr>
    ));

  return (
    <div>
      <table>
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th>상품 이미지</th>
            <th>상품명</th>
            <th>개수</th>
            <th>가격</th>
            <th>장바구니에서 삭제하기</th>
          </tr>
        </thead>
        <tbody>{renderItems()}</tbody>
      </table>
    </div>
  );
}

export default UserCardBlock;
