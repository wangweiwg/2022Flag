import { Form, Input, Button, Checkbox } from 'antd';
import style from './index.module.scss';

const Login = () => {
    const onFinish = (values) => {
      console.log('Success:', values);
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
  
    return (
        <div className={style.loginPage}>
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className={style.loginForm}
            >
                <div className={style.title}>后台登录系统</div>
                <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
                    <Input />
                </Form.Item>
        
                <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码!' }]}>
                    <Input.Password />
                </Form.Item>
        
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
  };

export default Login;