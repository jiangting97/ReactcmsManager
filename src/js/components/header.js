/**
 * Created by lijian on 2017/7/16.
 */
import React from 'react';
import {Row, Col} from 'antd';
import {Link, Route, Router, BrowserRouter} from "react-router-dom";

import '../../css/main.css';
export default class Header extends React.Component {
    render() {
        //内联样式
        const styleImage = {
            header: {
                backgroundColor: "#333333",
                color: "#FFFFFF"
            }
        };
        return (
            <div>
                <Row className="header">
                    <Col span={1} style={{color: 'red'}}> <a className="header-bar">首页</a> </Col>
                    <Col span={2}> <a className="header-bar"> 北京 </a> </Col>
                    <Col span={13}> </Col>
                    <Col span={1}> <Link to={`/register`} className="header-bar">登录</Link> </Col>
                    <Col span={1}> <Link to={`/editor`} className="header-bar"> 编辑</Link>   </Col>
                    <Col span={1}> <Link to={`/manager`} className="header-bar"> 后台管理</Link>   </Col>
                    <Col span={2}> <a className="header-bar"> 侵权投诉</a> </Col>
                    <Col span={2}> <a className="header-bar"> 头条产品</a>
                    </Col>
                </Row>
            </div>
        );
    }
}