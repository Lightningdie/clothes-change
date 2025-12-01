import React, { Component } from "react";
import MenuButton from "./button/MenuButton";
import { MenubarProps, MenubarState } from "../types";
import "./Menubar.css";

export default class Menubar extends Component<MenubarProps, MenubarState> {
  constructor(props: MenubarProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Menubar">
        <div className="MenubarContent">
          <MenuButton onClothChange={this.props.onClothChange} defaultCloth={this.props.defaultCloth} />
        </div>
      </div>
    );
  }
}

