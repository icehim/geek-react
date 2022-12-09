import {Button, Card, Checkbox, Form, Input, message} from "antd";
import logo from '@/assets/logo.png'
import './index.scss'
import {useDispatch} from "react-redux";
import {loginAction} from "@/store/actions/login";
import {useHistory, useLocation} from "react-router-dom";

//Input函数组件，通过静态属性，存储了另外一个函数组件Password
const {Password} = Input

function Login() {
    const dispatch = useDispatch()
    const history = useHistory()
    //获取参数
    const location = useLocation()
    /**
     *
     * @param values 表的所有项的值
     */
    const onFinish = async (values) => {
        //表单校验通过之后会执行
        //发请求登录
        try {
            await dispatch(loginAction(values))
            message.success('登录成功')
            //跳转首页
            history.push(location.state?.from || '/home')
        } catch (error) {
            message.error(error.response.data.message)
        }
    };

    //函数校验
    /**
     *
     * @param rule  当前表单项的校验规则
     * @param value 当前表单项的值=》checkbox的值:ture 选中 / false 未选中
     * @return Promise
     * 1.校验通过返回 Promise.resolve() 2.校验没通过Promise.reject(new Error('错误提示信息'))
     */
    const validateAgree = (rule, value) => {
        // value ? Promise.resolve() : Promise.reject(new Error('请勾选用户协议'))
        // console.log(rule, value)
        if (!value) {
            //没有勾选协议=>校验不通过该
            return Promise.reject(new Error('请勾选协议'))
        }
        //校验通过
        return Promise.resolve()
    }

    return (
        <div className="login">
            <Card className="login-container">
                {/*极客圆logo*/}
                <img className="login-logo" src={logo} alt=""/>
                {/* 登录表单 initialValues指定表单项目的默认值*/}
                <Form
                    initialValues={{mobile: '', code: '', agree: false}}
                    validateTrigger={['onBlur', 'onChange']}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    {/*
                        表单校验总结:
                        1，Form.Item组件上必须加name属性,name属性和后台接口需要的参数名保持一直
                        2.Form.Item组件上加rules属性，添加校验规则
                        3.通过validateTrigger指定校验规则出发的时机:['onBlur','onChange']
                        说明:在Form组件上加validateTrigger作用域所有表单项，在自表单项的规则单独加的validateTrigger会覆盖Form组件的出发实际
                    */}
                    <Form.Item
                        name="mobile"
                        rules={[{required: true, message: '请输入您的登录手机号！'},
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: '手机号码格式不对',
                                // 优先级最高
                                validateTrigger: 'onBlur'
                            },
                        ]}
                    >
                        <Input size='large' placeholder='请输入手机号'/>
                    </Form.Item>

                    <Form.Item
                        name="code"
                        rules={[{required: true, message: '请输入验证码！'}, {len: 6, message: '请输入6位验证码'}]}
                    >
                        {/*<Input.Password size='large'/>*/}
                        <Password size='large'/>
                    </Form.Item>
                    <Form.Item name="agree" valuePropName="checked" rules={[{
                        validator: validateAgree
                    }]}>
                        {/*非输入框，需要加valuePropName="checked"*/}
                        <Checkbox>我已阅读并同意「用户协议」和「隐私条款」</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        {/*注意:表单的button组件上一定要添加htmlType="submit" */}
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
