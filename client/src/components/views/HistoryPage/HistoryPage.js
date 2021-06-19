import React from "react";

function HistoryPage(props) {
  return (
    <div style={{ width: "80%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h1>구매내역</h1>
      </div>
      <br />

      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>구매 ID</th>
            <th style={{ textAlign: "center" }}>가격</th>
            <th style={{ textAlign: "center" }}>수량</th>
            <th style={{ textAlign: "center" }}>구매 날짜</th>
          </tr>
        </thead>

        <tbody>
          {props.user.userData &&
            props.user.userData.history &&
            props.user.userData.history.map(item => (
              <tr key={item.id}>
                <td style={{ textAlign: "center", margin: "auto" }}>{item.id}</td>
                <td style={{ textAlign: "center", margin: "auto" }}>{item.price}</td>
                <td style={{ textAlign: "center", margin: "auto" }}>{item.quantity}</td>
                <td style={{ textAlign: "center", margin: "auto" }}>{item.dateOfPurchase}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryPage;
