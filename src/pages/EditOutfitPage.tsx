import React, { useState, useEffect } from 'react';
import { Button, Input, Modal, message } from 'antd';
import { SaveOutlined, HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ShowWindow from '../ui/ShowWindow';
import Menubar from '../ui/Menubar';
import ErrorBoundary from '../components/ErrorBoundary';
import { DEFAULT_CLOTH_TYPE } from '../utils/constants';
import { preloadImages } from '../data/clothesData';
import { saveOutfit } from '../utils/storage';
import { ClothType, PlacedImage } from '../types';
import './EditOutfitPage.css';

export default function EditOutfitPage() {
  const navigate = useNavigate();
  const [currentCloth, setCurrentCloth] = useState<ClothType>(DEFAULT_CLOTH_TYPE);
  const [placedImages, setPlacedImages] = useState<PlacedImage[]>([]);
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [outfitName, setOutfitName] = useState('');

  const handleClothChange = (clothType: ClothType) => {
    setCurrentCloth(clothType);
  };

  const handleSaveOutfit = () => {
    if (!outfitName.trim()) {
      message.warning('请输入穿搭名称');
      return;
    }

    const newOutfit = {
      id: `outfit_${Date.now()}`,
      name: outfitName,
      items: [],
      placedImages: placedImages,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    saveOutfit(newOutfit);
    message.success('穿搭保存成功！');
    setSaveModalVisible(false);
    setOutfitName('');
  };

  useEffect(() => {
    document.title = '编辑穿搭 - 小猫猫的衣橱';
    
    preloadImages()
      .then(() => {
        // 图片预加载完成
      })
      .catch((error) => {
        console.warn('图片预加载失败:', error);
      });
  }, []);

  // 从 ShowWindow 获取放置的图片
  const handlePlacedImagesChange = (images: PlacedImage[]) => {
    setPlacedImages(images);
  };

  return (
    <ErrorBoundary>
      <div className="EditOutfitPage">
        <div className="EditOutfitHeader">
          <Button 
            icon={<HomeOutlined />} 
            onClick={() => navigate('/')}
            className="BackButton"
          >
            返回首页
          </Button>
          <span className="EditOutfitTitle">编辑穿搭</span>
          <Button 
            type="primary"
            icon={<SaveOutlined />}
            onClick={() => setSaveModalVisible(true)}
            className="SaveButton"
          >
            保存穿搭
          </Button>
        </div>
        <Menubar onClothChange={handleClothChange} defaultCloth={currentCloth} />
        <ShowWindow 
          clothType={currentCloth} 
          onPlacedImagesChange={handlePlacedImagesChange}
        />
        
        <Modal
          title="保存穿搭"
          open={saveModalVisible}
          onOk={handleSaveOutfit}
          onCancel={() => {
            setSaveModalVisible(false);
            setOutfitName('');
          }}
          okText="保存"
          cancelText="取消"
        >
          <Input
            placeholder="请输入穿搭名称"
            value={outfitName}
            onChange={(e) => setOutfitName(e.target.value)}
            onPressEnter={handleSaveOutfit}
          />
        </Modal>
      </div>
    </ErrorBoundary>
  );
}
