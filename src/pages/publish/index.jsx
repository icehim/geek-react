import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import styles from './index.module.scss'
//导入富文本编辑器组件和样式
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
import {useRef, useState} from "react";
import Channel from "@/components/channel";


const Publish = () => {

    //1.上传文章封面的实现
    //已上传图片的列表:[{url:'',},{url:''},...]
    const [fileList, setFileList] = useState([])
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
                            <Button size="large">存入草稿</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish
