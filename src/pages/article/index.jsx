import {Link} from 'react-router-dom'
import {Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Space, Table, Tag} from 'antd'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getArticleAction, getChannelAction} from "@/store/actions/article";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import img404 from '@/assets/error.png'
// import 'moment/locale/zh-cn'
// import dayjs from 'dayjs'
// import locale from "antd/es/date-picker/locale/zh_CN";
// dayjs.locale('zh-cn');

const {Option} = Select
const {RangePicker} = DatePicker
// 优化文章状态的处理(不变的)=》映射关系
const articleStatus = {
    0: {color: 'yellow', text: '草稿'},
    1: {color: '#ccc', text: '待审核'},
    2: {color: 'green', text: '审核通过'},
    3: {color: 'red', text: '审核失败'}
}

function Article() {

    //1.获取文章频道列表数据
    const dispatch = useDispatch()
    const {channels, list, total} = useSelector(state => state.article)
    useEffect(() => {
        dispatch(getChannelAction())
        //2.获取文章列表数据=》默认第一次调用，不需要顾虑参数
        dispatch(getArticleAction({}))
    }, [dispatch])


    //table列表每列数据定义
    // const columns = [
    //     {
    //         title: '姓名',//列的标题
    //         dataIndex: 'name',//对应data数据源中的属性名（唯一）
    //         // 自定义列的内容
    //         /**
    //          *
    //          * @param col   当前列的值
    //          * @param row   当前行的数据
    //          * @param i 行的索引
    //          */
    //         render: (col, row, i) => {
    //             // console.log(col, row, i)
    //             return <span style={{color: 'red'}}>{col}</span>
    //         }
    //     },
    // ];
    // table列表数据源(从后台获取)

    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            render: cover => {
                return <img src={cover || img404} width={200} height={150} alt=""/>
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 220
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: status => {
                //根据status文章状态=》articleStatus[status]获取映射关系对应的状态
                return <Tag color={articleStatus[status].color}>{articleStatus[status].text}</Tag>
            }
        },
        {
            title: '发布时间',
            dataIndex: 'pubdate'
        },
        {
            title: '阅读数',
            dataIndex: 'read_count'
        },
        {
            title: '评论数',
            dataIndex: 'comment_count'
        },
        {
            title: '点赞数',
            dataIndex: 'like_count'
        },
        {
            title: '操作',
            render: data => {
                return (
                    <Space size="middle">
                        <Button type="primary" shape="circle" icon={<EditOutlined/>}/>
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined/>}
                        />
                    </Space>
                )
            }
        }
    ]
    //table列表数据源(从后台获取)
    // const data = [
    //     {
    //         id: '8218',
    //         comment_count: 0,
    //         cover: 'http://geek.itheima.net/resources/images/15.jpg',
    //         like_count: 0,
    //         pubdate: '2019-03-11 09:00:00',
    //         read_count: 2,
    //         status: 2,
    //         title: 'webview离线化加载h5资源解决方案'
    //     }
    // ]

    //3.根据表单选择的条件过滤文章列表

    /**
     *表单数据
     * @param status
     * @param channel_id
     * @param date
     */
    const onFilter = ({status, channel_id, date}) => {
        console.log(status, channel_id, date)
        //组装过滤列表需要的参数
        const params = {channel_id}
        //排除全部
        if (status !== -1) {
            params.status = status
        }
        //判断一个值是否是  '' null undefined
        if (!!date) {
            //开始时间
            params.begin_pubdate = date[0].format('YYYY-MM-DD HH:mm:ss')
            //结束时间
            params.end_pubdate = date[1].format('YYYY-MM-DD HH:mm:ss')
        }
        dispatch(getArticleAction(params))
    }

    return (
        <>
            {/*筛选表单*/}
            <Card
                title={
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <Link to="/home">首页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>内容管理</Breadcrumb.Item>
                    </Breadcrumb>
                }
                style={{marginBottom: 20}}
            >
                <Form onFinish={onFilter} initialValues={{status: -1}}>
                    <Form.Item label="状态" name="status">
                        <Radio.Group>
                            <Radio value={-1}>全部</Radio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={1}>待审核</Radio>
                            <Radio value={2}>审核通过</Radio>
                            <Radio value={3}>审核失败</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="频道" name="channel_id">
                        <Select
                            placeholder="请选择文章频道"
                            style={{width: 140}}
                        >
                            {/*value属性是选择的时候存到表单中的值*/}
                            {
                                channels.map(item => (
                                    <Option key={item.id} value={item.id}>{item.name}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item label="日期" name="date">
                        <RangePicker></RangePicker>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card title={`根据筛选条件获取到${total}条数据：`}>
                <Table rowKey='id' columns={columns} dataSource={list}/>
            </Card>
        </>
    );
}

export default Article;
