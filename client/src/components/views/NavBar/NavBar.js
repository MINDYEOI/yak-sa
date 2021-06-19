import React, { useState } from "react";
import RightMenu from "./Sections/RightMenu";
import { Drawer, Button, Icon } from "antd";
import "./Sections/Navbar.css";
import { Container, Navbar, Nav } from "react-bootstrap";

function NavBar() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Navbar bg="white" variant="light" style={{ position: "fixed", zIndex: 5, width: "100%", border: "1px solid lightgray" }}>
      <Container>
        <Navbar.Brand href="/">
          <img src={"/logo.png"} style={{ width: "120px", marginLeft:"50px"}} />
        </Navbar.Brand>
        <Nav className="mx-3" style={{ position: "relative", right: "0" }}>
          <div className="menu__container">
            <div className="menu_left"></div>
            <div className="menu_rigth">
              <RightMenu mode="horizontal" />
            </div>
            <Button className="menu__mobile-button" type="primary" onClick={showDrawer}>
              <Icon type="align-right" />
            </Button>
            <Drawer title="Basic Drawer" placement="right" className="menu_drawer" closable={false} onClose={onClose} visible={visible}>
              
              <RightMenu mode="inline" />
            </Drawer>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
