import React, { useState } from 'react';
import { Form, Input, Upload, Button, Card, Select, message } from 'antd';
import { HomeOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { saveUploadedCloth } from '../utils/storage';
import { CategoryType, ClothType } from '../types';
import { getAllCategories } from '../data/clothesData';
import type { UploadProps } from 'antd';
import './UploadClothPage.css';

const { Option } = Select;

export default function UploadClothPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  const categories = getAllCategories();
  const allClothTypes: ClothType[] = [];
  categories.forEach(cat => {
    cat.items.forEach(item => {
      allClothTypes.push(item.id);
    });
  });

  const uploadProps: UploadProps = {
    name: 'cloth',
    listType: 'picture-card',
    showUploadList: false,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('只能上传图片文件！');
        return false;
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error('图片大小不能超过 5MB！');
        return false;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImageUrl(result);
      };
      reader.readAsDataURL(file);
      
      return false;
    },
  };

  const handleSubmit = (values: any) => {
    if (!imageUrl) {
      message.warning('请上传服饰图片');
      return;
    }

    setUploading(true);

    // 获取分类
    const selectedType = values.clothType as ClothType;
    const category = categories.find(cat => 
      cat.items.some(item => item.id === selectedType)
    );

    const newCloth = {
      id: `cloth_${Date.now()}`,
      name: values.name,
      imagePath: imageUrl,
      category: category?.category || '配饰' as CategoryType,
      clothType: selectedType,
      uploadedAt: new Date().toISOString()
    };

    saveUploadedCloth(newCloth);
    message.success('服饰上传成功！');
    form.resetFields();
    setImageUrl('');
    setUploading(false);
  };

  return (
    <div className="UploadClothPage">
      <div className="UploadClothHeader">
        <Button 
          icon={<HomeOutlined />} 
          onClick={() => navigate('/')}
          className="BackButton"
        >
          返回首页
        </Button>
        <h1 className="UploadClothTitle">上传服饰</h1>
        <div style={{ width: 100 }}></div>
      </div>

      <div className="UploadClothContent">
        <Card className="UploadClothCard">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="UploadClothForm"
          >
            <Form.Item
              label="服饰图片"
              required
            >
              <Upload {...uploadProps}>
                {imageUrl ? (
                  <div className="UploadPreview">
                    <img src={imageUrl} alt="preview" />
                  </div>
                ) : (
                  <div>
                    <UploadOutlined style={{ fontSize: 32 }} />
                    <div style={{ marginTop: 8 }}>点击上传</div>
                  </div>
                )}
              </Upload>
            </Form.Item>

            <Form.Item
              label="服饰名称"
              name="name"
              rules={[{ required: true, message: '请输入服饰名称' }]}
            >
              <Input placeholder="请输入服饰名称" />
            </Form.Item>

            <Form.Item
              label="服饰类型"
              name="clothType"
              rules={[{ required: true, message: '请选择服饰类型' }]}
            >
              <Select placeholder="请选择服饰类型" showSearch>
                {categories.map(category => (
                  <Select.OptGroup key={category.category} label={category.name}>
                    {category.items.map(item => (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </Select.OptGroup>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                block 
                size="large"
                loading={uploading}
              >
                上传服饰
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}

