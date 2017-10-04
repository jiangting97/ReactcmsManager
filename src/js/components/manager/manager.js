import React from 'react';
import {Layout, Menu, Breadcrumb} from 'antd';
import {Table, Input, Icon, Button, Popconfirm} from 'antd';
import reqwest from 'reqwest';

const {Header, Footer, Sider, Content} = Layout;
import {Tabs, Radio} from 'antd';
import {Link, Route, Router, BrowserRouter} from "react-router-dom";


const TabPane = Tabs.TabPane;
import {DraftEditor} from './draft_editor';


export default class Manager extends React.Component {
    constructor() {
        super();
        this.state = {
            collapsed: false,
            mode: 'top',
            menuKey: '1',
            articles: [],
            loading: false,
        };
        this.handleModeChang = this.handleModeChang.bind(this);
        this.handlClick = this.handlClick.bind(this);
        this.loadData = this.handlClick.bind(this);

    }

    componentWillMount() {
        console.log("menu key = " + this.state.menuKey);
    }
    componentDidMount() {
        this.fetchArticle();
    }

    fetchArticle() {
        console.log(" fetchArticle");
        let xhr = '';
        if(window.XMLHttpRequest) {
            xhr =  new XMLHttpRequest();

        } else {
            xhr = new ActiveXObject('Microft.XMLHttp');
        }
        xhr.open('GET', '/getArticles?aa=1&bb=2');
        let data = {
            start:0,
            num: 5
        }
        xhr.send();

        xhr.addEventListener('load', ()=> {
            if((xhr.status >=200 && xhr.status < 300) || xhr.status == 304 ) {
                let data = xhr.responseText;
                console.log("xhr.response : " + JSON.parse(data).length);
                this.setState({
                    articles : JSON.parse(data)
                });
                console.log("articles = " + this.state.articles);
            }
        })

        xhr.addEventListener('error', ()=> {
            console.log(error)
        })

    }



    handleModeChang(e) {
        const mode = e.target.value;
        this.setState({mode});
    }

    handlClick(e) {
        const a = e;
        console.log("e" + e);
        console.log("e" + e.key);
        this.setState({
            menuKey: e.key
        });

    }

    render() {
        const {mode} = this.state;
        const pageSize = 10;
        let content;
        if (this.state.menuKey === '1') {
            content = <Table rowSelection={rowSelection} columns={columns} pagination={{pageSize: 10}} rowKey={"id"}
                             dataSource={this.state.articles}/>;
        } else if (this.state.menuKey === '2') {
            content = <DraftEditor/>
        } else if (this.state.menuKey === '3') {
            content = <div>three</div>
        }
        return (
            <div>
                <Layout>
                    <Header className="header">
                        <div className="logo">
                            后台管理系统
                        </div>


                    </Header>
                    <Layout className={{width: "80%"}}>
                        <Sider
                            trigger={null}
                            collapsed={this.state.collapsed}
                        >
                            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={this.handlClick}>
                                <Menu.Item key="1">
                                    <span>显示博文</span>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    {/*<Link to={`/editor`}>*/}
                                    <span>添加文章</span>
                                    {/*</Link>*/}
                                </Menu.Item>
                                <Menu.Item key="3">
                                    <span>图集管理</span>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Content>
                            {content}
                        </Content>
                    </Layout>


                    <Footer style={{textAlign: 'center'}}>
                        Ant Design ©2016 Created by Ant UED
                    </Footer>
                </Layout>

            </div>

        );
    }
}

const columns = [{
    title: '题目',
    dataIndex: 'title',
    render: text => <a href="#">{text}</a>,
}, {
    title: '摘要',
    dataIndex: 'summary',
}, {
    title: '分类',
    dataIndex: 'type',
}];

const data = [{
    id: '1',
    title: 'John Brown',
    summary: 32,
    type: 'New York No. 1 Lake Park',
}, {
    id: '2',
    title: 'Jim Green',
    summary: 42,
    type: 'London No. 1 Lake Park',
}, {
    id: '3',
    title: 'Joe Black',
    summary: 32,
    type: 'Sidney No. 1 Lake Park',
}, {
    id: '4',
    title: 'Disabled User11',
    summary: 919,
    type: 'Sidney No. 1 Lake Park',
}, {
    id: '5',
    title: 'Disabled User1',
    summary: 9339,
    type: 'Sidney No. 1 Lake Park',
},
    {
        id: '6',
        title: 'Disabled User3',
        summary: 299,
        type: 'Sidney No. 1 Lake Park',
    },
    {
        id: '7',
        title: 'Disabled User4',
        summary: 919,
        type: 'Sidney No. 1 Lake Park',
    }];
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
    }),
};