import React, { Component } from "react";
import { Image } from "antd";
import "./ShowWindow.css";

export default class ShowWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      side: props.side || "left",
      clothPosition: props.clothPosition || 1,
      isDragging: false,
      startX: 0,
      scrollLeft: 0,
      clonedImage: null,
      mousePosition: { x: 0, y: 0 },
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseMoveGlobal = this.handleMouseMoveGlobal.bind(this);
  }

  handleMouseDown(e) {
    const showWindow = e.currentTarget.closest(".ShowWindow");
    this.setState({
      isDragging: true,
      startX: e.pageX - showWindow.offsetLeft,
      scrollLeft: showWindow.scrollLeft,
    });
  }

  handleMouseMove(e) {
    if (!this.state.isDragging) return;
    e.preventDefault();
    const showWindow = e.currentTarget.closest(".ShowWindow");
    const x = e.pageX - showWindow.offsetLeft;
    const walk = (x - this.state.startX) * 2;
    showWindow.scrollLeft = this.state.scrollLeft - walk;
  }

  handleMouseUp() {
    this.setState({ isDragging: false });
  }

  handleMouseLeave() {
    this.setState({ isDragging: false });
  }

  // 添加触摸事件处理
  handleTouchStart(e) {
    const touch = e.touches[0];
    const showWindow = e.currentTarget.closest(".ShowWindow");
    this.setState({
      isDragging: true,
      startX: touch.pageX - showWindow.offsetLeft,
      scrollLeft: showWindow.scrollLeft,
    });
  }

  handleTouchMove(e) {
    if (!this.state.isDragging) return;
    // e.preventDefault();
    const touch = e.touches[0];
    const showWindow = e.currentTarget.closest(".ShowWindow");
    const x = touch.pageX - showWindow.offsetLeft;
    const walk = (x - this.state.startX) * 2;
    showWindow.scrollLeft = this.state.scrollLeft - walk;
  }

  handleTouchEnd() {
    this.setState({ isDragging: false });
  }

  // 修改handleClick以支持触摸
  handleClick(e, clothType) {
    const clientX = e.clientX || e.touches?.[0]?.clientX;
    const clientY = e.clientY || e.touches?.[0]?.clientY;

    const imgSrc = `/img/${clothType}.jpg`;
    this.setState({
      clonedImage: {
        src: imgSrc,
        x: clientX,
        y: clientY,
        placing: false, // 添加放置状态
      },
    });
    document.addEventListener("mousemove", this.handleMouseMoveGlobal);
    document.addEventListener("touchmove", this.handleMouseMoveGlobal);
    document.addEventListener("mouseup", this.handleMouseUpGlobal);
    document.addEventListener("touchend", this.handleMouseUpGlobal);
  }

  // 修改handleMouseMoveGlobal以支持触摸
  handleMouseMoveGlobal(e) {
    const clientX = e.clientX || e.touches?.[0]?.clientX;
    const clientY = e.clientY || e.touches?.[0]?.clientY;

    if (this.state.clonedImage) {
      this.setState({
        mousePosition: { x: clientX, y: clientY },
      });
    }
  }

  handleMouseUpGlobal = () => {
    this.setState((prevState) => ({
      clonedImage: prevState.clonedImage
        ? {
            ...prevState.clonedImage,
            placing: true, // 准备放置
          }
        : null,
    }));
    document.removeEventListener("mousemove", this.handleMouseMoveGlobal);
    document.removeEventListener("mouseup", this.handleMouseUpGlobal);
  };

  handlePlaceImage = (e) => {
    if (this.state.clonedImage?.placing) {
      e.stopPropagation();
      this.setState({
        placedImages: [
          ...(this.state.placedImages || []),
          {
            src: this.state.clonedImage.src,
            x: e.clientX,
            y: e.clientY,
          },
        ],
        clonedImage: null,
      });
      document.removeEventListener("click", this.handlePlaceImage);
    }
  };

  // 在render方法中添加放置的图片渲染
  render() {
    const { clothType } = this.props;
    const { clonedImage, mousePosition, placedImages } = this.state;

    return (
      <>
        <div
          className="ShowWindow"
          style={{
            overflowX: "auto", // 添加水平滚动条
            whiteSpace: "nowrap", // 防止图片换行
          }}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="ClothPic">
              <Image
                width={100}
                preview={false}
                onClick={(e) => this.handleClick(e, clothType)}
                onMouseDown={this.handleMouseDown}
                onTouchStart={this.handleTouchStart.bind(this)}
                onMouseMove={this.handleMouseMove}
                onTouchMove={this.handleTouchMove.bind(this)}
                onMouseUp={this.handleMouseUp}
                onTouchEnd={this.handleTouchEnd.bind(this)}
                src={`/img/${clothType}.jpg`}
              />
            </div>
          ))}
        </div>

        {/* 放置的图片 */}
        {placedImages?.map((img, i) => (
          <div
            key={i}
            style={{
              position: "fixed",
              left: img.x - 50,
              top: img.y - 50,
              zIndex: 999,
            }}
          >
            <Image width={100} src={img.src} preview={false} />
          </div>
        ))}

        {/* 克隆的图片 */}
        {clonedImage && (
          <div
            style={{
              position: "fixed",
              left: mousePosition.x - 50,
              top: mousePosition.y - 50,
              pointerEvents: "none",
              zIndex: 1000,
            }}
          >
            <Image width={100} src={clonedImage.src} preview={false} />
          </div>
        )}
      </>
    );
  }
}
