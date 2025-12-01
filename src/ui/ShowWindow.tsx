import React, { Component } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getClothConfig, getAllCategories } from "../data/clothesData";
import { getUploadedCloths } from "../utils/storage";
import { IMAGE_DISPLAY_COUNT } from "../utils/constants";
import { getCachedImage } from "../utils/imageLoader";
import LazyImage from "../components/LazyImage";
import { ShowWindowProps, ShowWindowState, ClothType } from "../types";
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
      placedImages: [],
      selectedCloth: null
    };
  }

  componentDidMount() {
    this.loadImages();
  }

  componentDidUpdate(prevProps: ShowWindowProps) {
    if (prevProps.clothType !== this.props.clothType) {
      this.loadImages();
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
  };

  handleClick = (e: React.MouseEvent | React.TouchEvent, clothType: ClothType) => {
    e.stopPropagation();
    this.setState({ selectedCloth: clothType });
    if (this.props.onClothSelect) {
      this.props.onClothSelect(clothType);
    }
  };

  getDisplayImages = (): Array<{ type: 'default' | 'uploaded', clothType: ClothType, imagePath: string, name: string }> => {
    const { clothType } = this.props;
    const config = getClothConfig(clothType);
    const uploadedCloths = getUploadedCloths();
    
    // 获取当前分类下的上传图片
    const categories = getAllCategories();
    const currentCategory = categories.find(cat => 
      cat.items.some(item => item.id === clothType)
    );
    
    const categoryCloths = uploadedCloths.filter(cloth => {
      if (currentCategory) {
        return currentCategory.items.some(item => item.id === cloth.clothType);
      }
      return cloth.clothType === clothType;
    });

    // 默认图片
    const defaultImages = Array.from({ length: IMAGE_DISPLAY_COUNT }).map(() => ({
      type: 'default' as const,
      clothType: clothType,
      imagePath: config.imagePath,
      name: config.name
    }));

    // 上传的图片
    const uploadedImages = categoryCloths.map(cloth => ({
      type: 'uploaded' as const,
      clothType: cloth.clothType,
      imagePath: cloth.imagePath,
      name: cloth.name
    }));

    return [...defaultImages, ...uploadedImages];
  };

  renderImageItem = (item: { type: 'default' | 'uploaded', clothType: ClothType, imagePath: string, name: string }, index: number) => {
    const isSelected = this.state.selectedCloth === item.clothType && item.type === 'default';
    
    return (
      <div 
        key={`${item.type}-${index}`} 
        className={`ClothPic ${isSelected ? 'ClothPicSelected' : ''}`}
        onClick={(e) => this.handleClick(e, item.clothType)}
      >
        <LazyImage
          src={item.imagePath}
          alt={item.name}
          className="ClothPicContainer"
        />
      </div>
    );
  };

  render() {
    const images = this.getDisplayImages();

    return (
      <>
        <div className="ShowWindow">
          {images.map((item, index) => this.renderImageItem(item, index))}
          {this.props.showUploadButton && (
            <div className="ClothPic UploadButtonContainer">
              <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                size="large"
                className="UploadButton"
                onClick={this.props.onUploadClick}
              />
            </div>
          )}
        </div>
      </>
    );
  }
}
