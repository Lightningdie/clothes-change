import React, { Component } from "react";
import MenuButton from "./button/MenuButton";
import "./Menubar.css";

export default class Menubar extends Component {
  constructor(props) {
    super(props); // 添加props参数
    this.state = {
    };
  }
  render() {
    return (
      <>
        <div className="Menubar">
          <div style={{ top: "1vh", position: "absolute" }}>
            <MenuButton onClothChange={this.props.onClothChange} />
          </div>
        </div>
      </>
    );
  }
}
