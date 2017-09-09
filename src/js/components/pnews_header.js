/**
 * Created by lijian on 2017/7/30.
 */
import React from 'react';
import {Col, Row, Button, Input} from "antd";

import '../../css/news_detail.css';
import '../../css/main.css';
import '../../css/img_list.css';
export default class NewsDetailHeader extends React.Component {

    render() {
        return (
            <div>
                <div>
                    <Row >
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
                    </Row>
                </div>
                {/*<Row className="middlebar">*/}
                    {/*<div className="detail-header-bar">*/}
                        {/*<Col span={3} className="bui-left index-content">*/}
                            {/*<a href="/" className="logo">*/}
                                {/*<img className="logo-img" src="/images/logo_201f80d.png"></img> </a>*/}
                        {/*</Col>*/}
                        {/*<Col span={4} className="detail-header-link"><a className="detail-header-link">首页</a> /*/}
                            {/*<a className="detail-header-link">问答</a> / <a className="detail-header-link">正文</a></Col>*/}
                        {/*<Col span={10}></Col>*/}
                        {/*<Col span={7}>*/}
                            {/*<div className="right-content">*/}
                                {/*<Row className=" right-box  index-search-box">*/}
                                    {/*<Col span={18}> <Input placeholder="大家都在搜：玻璃成靶子被击穿"/></Col>*/}
                                    {/*<Col span={6}><Button type="primary">搜素</Button></Col>*/}
                                {/*</Row>*/}
                            {/*</div>*/}
                        {/*</Col>*/}
                    {/*</div>*/}
                {/*</Row>*/}
            </div>
        );
    }
}
