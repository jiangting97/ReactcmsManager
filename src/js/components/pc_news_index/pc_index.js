/**
 * Created by lijian on 2017/7/30.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import Header from '../header';
import SideBar from './pc_index_left_channel'
import LeftContent from './pc_index_content';
import RightContent from './pc_index_right_info';
import {Row, Col} from 'antd';

import '../../../css/main.css';
import '../../../css/news_detail.css';
import '../../../css/rightcontent.css';
import '../../../css/register.css';
export default class Root extends React.Component {
    render() {
        return (

            <div className="main">
                <Header></Header>
                <div className="content">
                    <Row>
                        <Col className="sidebar" span={3}> <SideBar/></Col>
                        <Col span={14}> <LeftContent/></Col>
                        <Col span={7}>  <RightContent/></Col>
                    </Row>
                </div>
            </div>
        );
    }
}

