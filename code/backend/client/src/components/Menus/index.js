import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import styles from './index.module.scss';

// const { SubMenu } = Menu;

const Menus = () => {
  const navigate = useNavigate();

  return (
    <Menu className={styles.menu} defaultSelectedKeys={['1']} mode="inline">
      <Menu.Item key="1" icon={<PieChartOutlined />} onClick={() => navigate('/')}>
        首页
      </Menu.Item>
      <Menu.Item key="2" icon={<PieChartOutlined />} onClick={() => navigate('/shop')}>
        店铺信息
      </Menu.Item>
      <Menu.Item key="3" icon={<DesktopOutlined />} onClick={() => navigate('/member')}>
        会员信息
      </Menu.Item>
      <Menu.Item key="4" icon={<DesktopOutlined />} onClick={() => navigate('/about')}>
        关于
      </Menu.Item>
      {/* <SubMenu key="sub1" icon={<UserOutlined />} title="User">
        <Menu.Item key="3">Tom</Menu.Item>
        <Menu.Item key="4">Bill</Menu.Item>
        <Menu.Item key="5">Alex</Menu.Item>
      </SubMenu> */}
    </Menu>
  );
  
}

export default Menus;

