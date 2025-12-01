import React from 'react';
import { Card, Row, Col, Button, Avatar } from 'antd';
import { UserOutlined, EditOutlined, FolderOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../utils/storage';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();
  const userInfo = getUserInfo();

  return (
    <div className="HomePage">
      <div className="HomePageHeader">
        <h1 className="HomePageTitle">小猫猫的衣橱</h1>
      </div>

      <div className="HomePageContent">
        {/* 用户信息卡片 */}
        <Card className="UserInfoCard" title="个人信息" bordered={false}>
          <div className="UserInfoContent">
            <Avatar size={48} icon={<UserOutlined />} src={userInfo?.avatar} />
            <div className="UserInfoDetails">
              <h3>{userInfo?.name || '未设置'}</h3>
              <p>{userInfo?.email || '暂无邮箱'}</p>
            </div>
            <Button 
              type="primary" 
              size="small"
              onClick={() => navigate('/profile')}
            >
              编辑信息
            </Button>
          </div>
        </Card>

        {/* 功能卡片 */}
        <Row gutter={[16, 16]} className="FunctionCards">
          <Col xs={24} sm={12} lg={8}>
            <Card
              hoverable
              className="FunctionCard"
              onClick={() => navigate('/edit')}
            >
              <div className="FunctionCardContent">
                <EditOutlined className="FunctionIcon" />
                <h3>编辑穿搭</h3>
                <p>创建和编辑你的穿搭搭配</p>
              </div>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Card
              hoverable
              className="FunctionCard"
              onClick={() => navigate('/outfits')}
            >
              <div className="FunctionCardContent">
                <FolderOutlined className="FunctionIcon" />
                <h3>我的穿搭</h3>
                <p>查看已保存的穿搭搭配</p>
              </div>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Card
              hoverable
              className="FunctionCard"
              onClick={() => navigate('/upload')}
            >
              <div className="FunctionCardContent">
                <UploadOutlined className="FunctionIcon" />
                <h3>上传服饰</h3>
                <p>上传你的服饰图片</p>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}


