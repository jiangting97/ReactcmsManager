import React from 'react';
import {Row, Col, Input, Button} from 'antd';
import data from '../../../config/news24.json'

import '../../../css/main.css';
import '../../../css/news_detail.css';
import '../../../css/rightcontent.css';
import '../../../css/register.css';
export default class RightContent extends React.Component {
    constructor() {
        super();
        this.state = {
            news : data
        };
    };
    componentWillMount() {
    };

    render() {
        const {news24} = data;
        console.log(news24);
        const newsList =  news24.length ? news24.map((newsItem, index) =>(

            <li key={index}>
                {console.log(newsItem.imageName)}
                <Row>
                    <Col span={6} >
                        <img src={newsItem.imageName} className="news24Img"/>
                    </Col>
                    <Col span={18}>
                        {newsItem.title}
                    </Col>
                </Row>
            </li>
        )) : '没有加载任何新闻';

        const videoList = {};
        return (
            <div className="right-content">
                <Row className=" right-box  index-search-box">
                    <Col span={18}> <Input placeholder="大家都在搜：玻璃成靶子被击穿"/></Col>
                    <Col span={6}><Button type="primary">搜素</Button></Col>
                </Row>

                <Row className=" right-box r_content_jubao">
                    <Col span={8}>
                        <img src="../../src/images/report_logo_15cc24e.png" className="report-logo-img"></img>
                    </Col>
                    <Col span={16}>
                        <Row>
                            网上有害信息举报专区
                        </Row>
                        <Row>
                            举报电话
                        </Row>
                    </Col>
                </Row>
                <Row className=" right-box right-ad1">
                    <img src="../../src/images/ad1.jpg" className="right-ad1-img"/>
                    输入股票代码，预测个股明日涨跌！限本地用户免费
                    指南针股大师 广告
                </Row>


                <Row className="right-box r_content_24news">
                    <Row className="title_24news">
                        <h1>
                            24小时新闻
                        </h1>

                    </Row>
                    <ul className="news24Block">
                        {newsList}
                    </ul>
                </Row>

                <Row className=" right-box right-ad1">
                    <img src="../../src/images/ad1.jpg" className="right-ad1-img"/>
                    输入股票代码，预测个股明日涨跌！限本地用户免费
                    指南针股大师 广告
                </Row>

                <Row className="right-box hot-vedio">
                    <h1>热门视频</h1>
                    <ul>

                    </ul>
                </Row>
            </div>
        );
    }
}