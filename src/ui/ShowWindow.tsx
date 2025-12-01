import React, { Component } from "react";
import { Image } from "antd";
import { getClothConfig } from "../data/clothesData";
import { IMAGE_DISPLAY_COUNT, IMAGE_SIZE } from "../utils/constants";
import { getCachedImage } from "../utils/imageLoader";
import LazyImage from "../components/LazyImage";
import { ShowWindowProps, ShowWindowState, ClothType, PlacedImage } from "../types";
import "./ShowWindow.css";

export default class ShowWindow extends Component<ShowWindowProps, ShowWindowState> {
  constructor(props: ShowWindowProps) {
    super(props);
    this.state = {
      side: props.side || "left",
      clothPosition: props.clothPosition || 1,
      isDragging: false,
      startX: 0,
      scrollLeft: 0,
      clonedImage: null,
      mousePosition: { x: 0, y: 0 },
      imageLoading: true,
      imageError: false,
      placedImages: []
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseMoveGlobal = this.handleMouseMoveGlobal.bind(this);
  }

  componentDidMount() {
    this.loadImages();
  }

  componentDidUpdate(prevProps: ShowWindowProps) {
    if (prevProps.clothType !== this.props.clothType) {
      this.loadImages();
    }
    // 同步状态到父组件
    if (this.props.onPlacedImagesChange && prevProps.onPlacedImagesChange !== this.props.onPlacedImagesChange) {
      this.props.onPlacedImagesChange(this.state.placedImages);
    }
  }

  loadImages = async () => {
    const { clothType } = this.props;
    const config = getClothConfig(clothType);
    
    this.setState({ imageLoading: true, imageError: false });
    
    try {
      await getCachedImage(config.imagePath);
      this.setState({ imageLoading: false });
    } catch (error) {
      console.error('图片加载失败:', error);
      this.setState({ imageLoading: false, imageError: true });
    }
  }

  handleMouseDown(e: React.MouseEvent) {
    const showWindow = e.currentTarget.closest(".ShowWindow") as HTMLElement;
    if (showWindow) {
      this.setState({
        isDragging: true,
        startX: e.pageX - showWindow.offsetLeft,
        scrollLeft: showWindow.scrollLeft,
      });
    }
  }

  handleMouseMove(e: React.MouseEvent) {
    if (!this.state.isDragging) return;
    e.preventDefault();
    const showWindow = e.currentTarget.closest(".ShowWindow") as HTMLElement;
    if (showWindow) {
      const x = e.pageX - showWindow.offsetLeft;
      const walk = (x - this.state.startX) * 2;
      showWindow.scrollLeft = this.state.scrollLeft - walk;
    }
  }

  handleMouseUp() {
    this.setState({ isDragging: false });
  }

  handleMouseLeave() {
    this.setState({ isDragging: false });
  }

  handleTouchStart(e: React.TouchEvent) {
    const touch = e.touches[0];
    const showWindow = e.currentTarget.closest(".ShowWindow") as HTMLElement;
    if (showWindow) {
      this.setState({
        isDragging: true,
        startX: touch.pageX - showWindow.offsetLeft,
        scrollLeft: showWindow.scrollLeft,
      });
    }
  }

  handleTouchMove(e: React.TouchEvent) {
    if (!this.state.isDragging) return;
    const touch = e.touches[0];
    const showWindow = e.currentTarget.closest(".ShowWindow") as HTMLElement;
    if (showWindow) {
      const x = touch.pageX - showWindow.offsetLeft;
      const walk = (x - this.state.startX) * 2;
      showWindow.scrollLeft = this.state.scrollLeft - walk;
    }
  }

  handleTouchEnd() {
    this.setState({ isDragging: false });
  }

  handleClick(e: React.MouseEvent | React.TouchEvent, clothType: ClothType) {
    const clientX = 'clientX' in e ? e.clientX : e.touches?.[0]?.clientX || 0;
    const clientY = 'clientY' in e ? e.clientY : e.touches?.[0]?.clientY || 0;

    const imgSrc = `/img/${clothType}.jpg`;
    this.setState({
      clonedImage: {
        src: imgSrc,
        x: clientX,
        y: clientY,
        placing: false,
      },
    });
    document.addEventListener("mousemove", this.handleMouseMoveGlobal);
    document.addEventListener("touchmove", this.handleMouseMoveGlobal);
    document.addEventListener("mouseup", this.handleMouseUpGlobal);
    document.addEventListener("touchend", this.handleMouseUpGlobal);
  }

  handleMouseMoveGlobal = (e: MouseEvent | TouchEvent) => {
    const clientX = 'clientX' in e ? e.clientX : e.touches?.[0]?.clientX || 0;
    const clientY = 'clientY' in e ? e.clientY : e.touches?.[0]?.clientY || 0;

    if (this.state.clonedImage) {
      this.setState({
        mousePosition: { x: clientX, y: clientY },
      });
    }
  };

  handleMouseUpGlobal = () => {
    this.setState((prevState: ShowWindowState) => ({
      clonedImage: prevState.clonedImage
        ? {
            ...prevState.clonedImage,
            placing: true,
          }
        : null,
    }));
    document.removeEventListener("mousemove", this.handleMouseMoveGlobal);
    document.removeEventListener("touchmove", this.handleMouseMoveGlobal);
    document.removeEventListener("mouseup", this.handleMouseUpGlobal);
    document.removeEventListener("touchend", this.handleMouseUpGlobal);
  };

  handlePlaceImage = (e: Event) => {
    if (this.state.clonedImage?.placing && e instanceof MouseEvent) {
      e.stopPropagation();
      const newPlacedImages = [
        ...this.state.placedImages,
        {
          src: this.state.clonedImage.src,
          x: e.clientX,
          y: e.clientY,
        },
      ];
      this.setState({
        placedImages: newPlacedImages,
        clonedImage: null,
      });
      // 通知父组件
      if (this.props.onPlacedImagesChange) {
        this.props.onPlacedImagesChange(newPlacedImages);
      }
      document.removeEventListener("click", this.handlePlaceImage);
    }
  };

  renderImageItem = (index: number) => {
    const { clothType } = this.props;
    const config = getClothConfig(clothType);

    return (
      <div key={index} className="ClothPic">
        <LazyImage
          src={config.imagePath}
          alt={config.name}
          onClick={(e) => this.handleClick(e, clothType)}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
          onTouchStart={this.handleTouchStart.bind(this)}
          onTouchMove={this.handleTouchMove.bind(this)}
          onTouchEnd={this.handleTouchEnd.bind(this)}
          className="ClothPicContainer"
        />
      </div>
    );
  };

  render() {
    const { clonedImage, mousePosition, placedImages } = this.state;

    return (
      <>
        <div
          className="ShowWindow"
          style={{
            overflowX: "auto",
            whiteSpace: "nowrap",
          }}
        >
          {Array.from({ length: IMAGE_DISPLAY_COUNT }).map((_, index) => 
            this.renderImageItem(index)
          )}
        </div>

        {/* 放置的图片 */}
        {placedImages.map((img: PlacedImage, i: number) => (
          <div
            key={i}
            style={{
              position: "fixed",
              left: img.x - 50,
              top: img.y - 50,
              zIndex: 999,
            }}
          >
            <Image width={100} src={img.src} preview={false} alt="已放置的图片" />
          </div>
        ))}

        {/* 克隆的图片 */}
        {clonedImage && (
          <div
            className="ClonedImage"
            style={{
              position: "fixed",
              left: mousePosition.x - 50,
              top: mousePosition.y - 50,
              pointerEvents: "none",
              zIndex: 1000,
            }}
          >
            <Image 
              width={IMAGE_SIZE.width} 
              height={IMAGE_SIZE.height}
              src={clonedImage.src} 
              preview={false}
              alt="拖拽中的图片"
            />
          </div>
        )}
      </>
    );
  }
}

