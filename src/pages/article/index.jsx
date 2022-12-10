import {Link} from 'react-router-dom'
import {Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Space, Table, Tag} from 'antd'
// import 'moment/locale/zh-cn'
// import dayjs from 'dayjs'
// import locale from "antd/es/date-picker/locale/zh_CN";
// dayjs.locale('zh-cn');

const {Option} = Select
const {RangePicker} = DatePicker

function Article() {

    //table列表每列数据定义
    const columns = [
        {
            title: '姓名',//列的标题
            dataIndex: 'name',//对应data数据源中的属性名（唯一）
            // 自定义列的内容
            /**
             *
             * @param col   当前列的值
             * @param row   当前行的数据
             * @param i 行的索引
             */
            render: (col, row, i) => {
                // console.log(col, row, i)
                return <span style={{color: 'red'}}>{col}</span>
            }
        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            render: (_, {tags}) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];
    // table列表数据源(从后台获取)
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

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
                <Form initialValues={{status: -1}}>
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
                            defaultValue="lucy"
                            style={{width: 120}}
                        >
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
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
            <Card title={`根据筛选条件获取到0条数据：`}>
                <Table columns={columns} dataSource={data}/>
            </Card>
        </>
    );
}

export default Article;
