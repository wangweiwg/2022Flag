import React from 'react';
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

// const { SubMenu } = Menu;

class Menus extends React.Component {

  render() {
    return (
      <Layout>
          <Menu defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
             店铺信息
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              会员信息
            </Menu.Item>
            {/* <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu> */}
          </Menu>
      </Layout>
    );
  }
}

export default Menus;

