/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Menu, Icon, Badge } from "antd";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector(state => state.user);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert("로그아웃에 실패했습니다.");
      }
    });
  };


  if (user.userData && !user.userData.isAuth) {

    return (
      <Menu style={{ paddingTop: "10px" }} mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login"><h6>로그인</h6></a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register"><h6>회원가입</h6></a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode} style={{ paddingTop: "5px" }}>
        <Menu.Item key="history">
          <a href="/history">
            <h6>구매내역</h6>
            </a>
        </Menu.Item>

        <Menu.Item key="upload">
          <a href="/product/upload">
            <h6>등록하기</h6>
          </a>
        </Menu.Item>

        <Menu.Item key="cart" style={{ paddingBottom: -4 }}>
          
            <a href="/user/cart" style={{ marginRight: -22, paddingbottom: "30px", color: "#667777" }}>
              <Icon type="shopping-cart" style={{ fontSize: 30, marginBottom: 3 }} />
            </a>
          
        </Menu.Item>

        <Menu.Item key="logout">
          <a onClick={logoutHandler}><h6>로그아웃</h6></a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
