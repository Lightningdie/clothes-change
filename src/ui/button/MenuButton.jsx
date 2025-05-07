import React, { Component } from "react";
import { useState } from "react";
import { Button, Flex } from "antd";

const clothesStyle = ["秋衣", "外套", "裤子", "鞋子", "帽子", "袜子"];

export default class MenuButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clothStyle: "秋衣",
    };
    // 不需要绑定changeShowWindow，改用箭头函数
  }

  changeShowWindow = (style) => {
    this.setState({ clothStyle: style });
    this.props.onClothChange?.(style);
  };

  render() {
    const { clothStyle } = this.state;
    return (
      <>
        <Flex wrap gap="small">
          {clothesStyle.map((style, i) => (
            <Button
              key={i}
              type="primary"
              style={{
                verticalAlign: "center",
                background: clothStyle === style ? "red" : "",
              }}
              onClick={() => this.changeShowWindow(style)} // 改为箭头函数
            >
              {style}
            </Button>
          ))}
        </Flex>
      </>
    );
  }
}
