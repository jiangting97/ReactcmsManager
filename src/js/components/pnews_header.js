import React from 'react';
import {Col, Row, Button, Input} from "antd";
import '../../css/main.css';
export default class NewsDetailHeader extends React.Component {

    render() {
        return (
            <div>
                <div>

                        <div className="news-detail-header">
                            <Col span={1}> <a className="header-bar"> 推荐 </a> </Col>
                            <Col span={1}> <a className="header-bar"> 热点 </a> </Col>
                            <Col span={1}> <a className="header-bar"> 视频 </a></Col>
                            <Col span={1}> <a className="header-bar"> 图片 </a> </Col>
                            <Col span={1}> <a className="header-bar"> 段子 </a> </Col>
                            <Col span={1}> <a className="header-bar"> 社会 </a> </Col>
                            <Col span={1}> <a className="header-bar"> 娱乐 </a> </Col>
                            <Col span={1}> <a className="header-bar"> 科技 </a> </Col>
                            <Col span={1}> <a className="header-bar"> 汽车 </a> </Col>
                            <Col span={1}> <a className="header-bar"> 体育 </a> </Col>
                            <Col span={1}> <a className="header-bar"> 财经 </a> </Col>
                            <Col span={1}> <a className="header-bar"> 军事 </a> </Col>
                            <Col span={1}> <a className="header-bar"> 国际 </a> </Col>
                            <Col span={1}> <a className="header-bar"> 时尚 </a> </Col>
                            <Col span={1}> <a className="header-bar"> 旅游 </a> </Col>
                            <Col span={1}> <a className="header-bar"> 更多 </a> </Col>

                            <Col span={4}> </Col>
                            <Col span={1}> <a className="header-bar"> 登录 </a> </Col>
                            <Col span={1}> <a className="header-bar"> 反馈</a> </Col>
                            <Col span={1}> <a className="header-bar"> 侵权投诉</a> </Col>
                            <Col span={1}> <a className="header-bar"> 头条产品</a></Col>
                        </div>
                </div>
            </div>
        );
    }
}
