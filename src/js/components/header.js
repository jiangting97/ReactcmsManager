/**
 * Created by lijian on 2017/7/16.
 */
import React from 'react';
import {Row, Col} from 'antd';
import {Link, Route, Router, BrowserRouter} from "react-router-dom";

import '../../css/main.css';

export default class Header extends React.Component {
    render() {
        return (
            <div>
                <div className="header">
                    <Col span={1}/>
                    <Col span={1}><a href="/" className="header-bar">首页</a></Col>
                    <Col span={18}> </Col>
                    <Col span={1}> <Link to={`/register`} className="header-bar">登录</Link> </Col>
                    <Col span={1}> <Link to={`/editor`} className="header-bar"> 编辑</Link> </Col>
                    <Col span={2}> <Link to={`/manager`} className="header-bar"> 后台管理</Link> </Col>
                </div>
            </div>
        );
    }
}