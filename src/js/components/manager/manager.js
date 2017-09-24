import React from 'react';
import {Layout, Menu, Breadcrumb} from 'antd';
import {Table, Input, Icon, Button, Popconfirm} from 'antd';

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
        };
        this.handleModeChang = this.handleModeChang.bind(this);
        this.handlClick = this.handlClick.bind(this);

    }

    componentWillMount() {
        console.log("menu key = " + this.state.menuKey);
    }

    // toggle() {
    //     this.setState({
    //         collapsed: !this.state.collapsed,
    //     });
    // };

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
        let content;
        if (this.state.menuKey === '1') {
            content = <Table rowSelection={rowSelection} columns={columns} pagination={{pageSize: 5}}
                             dataSource={data}/>;
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
                        <Content >
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
    title: 'Name',
    dataIndex: 'name',
    render: text => <a href="#">{text}</a>,
}, {
    title: 'Age',
    dataIndex: 'age',
}, {
    title: 'Address',
    dataIndex: 'address',
}];

const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
}, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
}, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
}, {
    key: '4',
    name: 'Disabled User11',
    age: 919,
    address: 'Sidney No. 1 Lake Park',
}, {
    key: '5',
    name: 'Disabled User1',
    age: 9339,
    address: 'Sidney No. 1 Lake Park',
},
    {
        key: '6',
        name: 'Disabled User3',
        age: 299,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: '7',
        name: 'Disabled User4',
        age: 919,
        address: 'Sidney No. 1 Lake Park',
    }, {
        key: '8',
        name: 'Disabled User5',
        age: 33,
        address: 'Sidney No. 1 Lake Park',
    }
    , {
        key: '9',
        name: 'Disabled User7',
        age: 992,
        address: 'Sidney No. 1 Lake Park',
    }];
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
    }),
};