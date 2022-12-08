import {Button, Card, Checkbox, Form, Input} from "antd";
import logo from '@/assets/logo.png'
import './index.scss'

function Login() {

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="login">
            <Card className="login-container">
                {/*极客圆logo*/}
                <img className="login-logo" src={logo} alt=""/>
                {/* 登录表单 */}
                <Form
                    name="basic"
                    initialValues={{remember: false}}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="username"
                        rules={[{required: true, message: '请输入您的用户名！'}]}
                    >
                        <Input size='large'/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{required: true, message: '请输入密码！'}]}
                    >
                        <Input.Password size='large'/>
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>我已阅读并同意「用户协议」和「隐私条款」</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" size='large' block htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default Login;
