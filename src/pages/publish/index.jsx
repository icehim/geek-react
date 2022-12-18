import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space, message,
} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import {Link, useHistory} from 'react-router-dom'
import styles from './index.module.scss'
//导入富文本编辑器组件和样式
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
import {useRef, useState} from "react";
import Channel from "@/components/channel";
import {useDispatch} from "react-redux";
import {addArticleAction} from "@/store/actions/article";


const Publish = () => {

    //1.上传文章封面的实现
    //已上传图片的列表:[{url:'',},{url:''},...]
    const [fileList, setFileList] = useState([])
    const dispatch = useDispatch()
    const history = useHistory()
    //备份fileList=》动态切换单图或多图使用
    const fileListRef = useRef([])

    //处理上传文件列表
    const onUploadChange = (data) => {
        const _fileList = data.fileList.map(file => {
            //1.从本地选择新上传的图片
            //file.response 上传成功之后，后台返回的响应数据
            if (file.response) {
                return {
                    url: file.response.data.url
                }
            }
            //2.操作删除本地已上传图片
            return file
        })
        // 备份
        fileListRef.current = _fileList
        //存储上传图片文件列表
        setFileList(_fileList)
    }

    //2.控制图片封面上传的数量
    const [maxCount, setMaxCount] = useState(1)
    const changeType = (e) => {
        const count = e.target.value
        setMaxCount(count)
        //3.处理单图和多图的动态切换
        if (count === 1) {
            //从备份数据中获取第一张
            const firstImg = fileListRef.current[0]
            //1.可能一张图片都没有上传 2.可能上传1~3
            setFileList(!firstImg ? [] : [firstImg])
        } else if (count === 3) {
            setFileList(fileListRef.current)
        }
    }

    //4.发布文章=》获取表单数据
    //公共方法:发布文章(1.正式发布 2.存为草稿)
    /**
     *
     * @param formData  表单数据
     * @param isDraft   是否是草稿状态:true 草稿 | false 正式文章
     * @returns {MessageType}
     */
    const publishArticle = async (formData, isDraft) => {
        /*
        * 1.校验文章封面图片
        * 2.准备发布文章后台需要的数据
        *
        * */
        const {type, ...rest} = formData
        if (formData.type !== fileList.length) {
            return message.error('封面数量和上传图片数量不一致!')
        }
        //组装后台需要的数据
        const data = {
            ...rest,
            //文章封面图片=>images:['url1','url2',...]
            cover: {type, images: fileList.map(item => item.url)}
        }
        /*
        * 发布文章使用dispatch还是直接发请求?
        * 1.在页面直接发请求(后台请求封装到api目录)
        * 2.在页面使用dispatch(结合redux的方式)
        * */
        try {
            await dispatch(addArticleAction(data, isDraft))
            message.success(!isDraft ? '发布成功!' : '存储成功!')
            history.push('/home/article')

        } catch (error) {
            console.log(error)
        }
    }
    //5.存入草稿
    // 获取表单实例
    const [form] = Form.useForm()
    const saveDraft = async () => {
        console.log('表单控制实例', form)
        //通过form的validates校验表单
        try {
            const formData = await form.validateFields()
            //校验通过走到这里
            publishArticle(formData, true)

        } catch (e) {
            //校验不通过走到这里
            console.log(e)
        }
    }
    const onFinish = async (formData) => {
        console.log('校验通过', formData)
        //发布文章
        publishArticle(formData, false)
    }

    return (
        <div className={styles.root}>
            <Card
                title={
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <Link to="/home">首页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>发布文章</Breadcrumb.Item>
                    </Breadcrumb>
                }
            >
                <Form
                    form={form}
                    onFinish={onFinish}
                    // 表单左侧文字控制宽度
                    labelCol={{span: 4}}
                    //表单项宽度控制
                    wrapperCol={{span: 16}}
                    //表单化的默认值
                    initialValues={{type: 1}}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{required: true, message: '请输入文章标题'}]}
                    >
                        <Input placeholder="请输入文章标题" style={{width: 400}}/>
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{required: true, message: '请选择文章频道'}]}
                    >
                        {/*<Select placeholder="请选择文章频道" style={{width: 400}}>*/}
                        {/*    <Option value={0}>推荐</Option>*/}
                        {/*</Select>*/}
                        <Channel/>
                    </Form.Item>

                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={changeType}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                                {/* <Radio value={-1}>自动</Radio> */}
                            </Radio.Group>
                        </Form.Item>
                        {/* Upload 组件说明：*/}
                        {
                            maxCount > 0 && <Upload
                                maxCount={maxCount}// 控制上传图片的数量
                                multiple={maxCount > 1} // 多选
                                className="avatar-uploader"
                                // 发到后台的文件参数名
                                // 必须指定，根据接口文档的说明，需要设置为 image
                                name="image"
                                // 上传组件展示方式
                                listType="picture-card"
                                // 展示已上传图片列表
                                showUploadList
                                // 接口地址
                                // 注意：Upload 再上传图片时，默认不会执行 axios 的请求，所以，此处需要手动设置完整接口地址
                                action="http://geek.itheima.net/v1_0/upload"

                                // 已经上传的文件列表，设置该属性后组件变为 受控
                                fileList={fileList}
                                // 上传文件改变/本地已上传文件修改的时候的回调
                                onChange={onUploadChange}
                            >
                                <div style={{marginTop: 8}}>
                                    <PlusOutlined/>
                                </div>
                            </Upload>
                        }
                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{required: true, message: '请输入文章内容'}]}
                    >
                        {/*富文本呢编辑器=>需要给默认值*/}
                        <ReactQuill/>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 4}}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                发布文章
                            </Button>
                            <Button onClick={saveDraft} size="large">存入草稿</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish
