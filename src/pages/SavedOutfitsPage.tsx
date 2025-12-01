import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Empty, Modal, message, Popconfirm } from 'antd';
import { HomeOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getSavedOutfits, deleteOutfit } from '../utils/storage';
import { SavedOutfit } from '../types';
import './SavedOutfitsPage.css';

export default function SavedOutfitsPage() {
  const navigate = useNavigate();
  const [outfits, setOutfits] = useState<SavedOutfit[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewOutfit, setPreviewOutfit] = useState<SavedOutfit | null>(null);

  useEffect(() => {
    loadOutfits();
  }, []);

  const loadOutfits = () => {
    const savedOutfits = getSavedOutfits();
    setOutfits(savedOutfits);
  };

  const handleDelete = (outfitId: string) => {
    deleteOutfit(outfitId);
    message.success('删除成功');
    loadOutfits();
  };

  const handlePreview = (outfit: SavedOutfit) => {
    setPreviewOutfit(outfit);
    setPreviewVisible(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN');
  };

  return (
    <div className="SavedOutfitsPage">
      <div className="SavedOutfitsHeader">
        <Button 
          icon={<HomeOutlined />} 
          onClick={() => navigate('/')}
          className="BackButton"
        >
          返回首页
        </Button>
        <h1 className="SavedOutfitsTitle">我的穿搭</h1>
        <div style={{ width: 100 }}></div>
      </div>

      <div className="SavedOutfitsContent">
        {outfits.length === 0 ? (
          <Empty 
            description="还没有保存的穿搭"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button type="primary" onClick={() => navigate('/edit')}>
              去创建穿搭
            </Button>
          </Empty>
        ) : (
          <Row gutter={[16, 16]}>
            {outfits.map((outfit) => (
              <Col xs={24} sm={12} lg={8} key={outfit.id}>
                <Card
                  hoverable
                  className="OutfitCard"
                  actions={[
                    <Button
                      type="text"
                      icon={<EyeOutlined />}
                      onClick={() => handlePreview(outfit)}
                    >
                      查看
                    </Button>,
                    <Popconfirm
                      title="确定要删除这个穿搭吗？"
                      onConfirm={() => handleDelete(outfit.id)}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                      >
                        删除
                      </Button>
                    </Popconfirm>
                  ]}
                >
                  <div className="OutfitCardContent">
                    <h3>{outfit.name}</h3>
                    <p className="OutfitDate">创建时间: {formatDate(outfit.createdAt)}</p>
                    {outfit.placedImages && outfit.placedImages.length > 0 && (
                      <p className="OutfitItems">包含 {outfit.placedImages.length} 个服饰</p>
                    )}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>

      <Modal
        title={previewOutfit?.name}
        open={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        footer={[
          <Button key="close" onClick={() => setPreviewVisible(false)}>
            关闭
          </Button>
        ]}
        width={800}
      >
        {previewOutfit && (
          <div className="OutfitPreview">
            <p><strong>创建时间:</strong> {formatDate(previewOutfit.createdAt)}</p>
            <p><strong>更新时间:</strong> {formatDate(previewOutfit.updatedAt)}</p>
            {previewOutfit.placedImages && previewOutfit.placedImages.length > 0 && (
              <div className="PreviewImages">
                <h4>包含的服饰:</h4>
                <div className="PreviewImagesList">
                  {previewOutfit.placedImages.map((img, index) => (
                    <div key={index} className="PreviewImageItem">
                      <img src={img.src} alt={`服饰 ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

