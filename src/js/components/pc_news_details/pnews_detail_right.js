/**
 * Created by lijian on 2017/8/5.
 */
/**
 * Created by lijian on 2017/7/23.
 */
import React from 'react';
import {Row, Col, Input, Button} from 'antd';
import data from '../../../config/news24.json';
import '../../../css/main.css';
import '../../../css/news_detail.css';
import '../../../css/rightcontent.css';
import '../../../css/register.css';
export default class PNewsDetailRight extends React.Component {
    constructor() {
        super();
        this.state = {
            news: data
        };
    };

    componentWillMount() {
    };

    render() {
        const {news24} = data;
        console.log(news24);
        const newsList = news24.length ? news24.map((newsItem, index) => (

            <li key={index}>
                {console.log(newsItem.imageName)}
                <Row>
                    <Col span={6}>
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


                <Row className=" right-box r_content_author">
                    <div>
                        <Row>
                            <Col span={5}>
                                <img />
                            </Col>
                            <Col span={19}> 影视娱乐小丸子 </Col>
                        </Row>
                        <Row className="artle-list">
                            <li>
                                17岁患癌症，落魄时娇妻伴其左右，如今终成男神，把妻子宠上天
                            </li>
                            <li>
                                默默捐助近百所学校，他宁做配角，不来内地发展捞金，理由让人心悦诚服
                            </li>
                            w className="artle-list">
                            <li>
                                荧屏影视作品穿帮很多，最服女演员被鞭刑后很开心，导演真是很疏忽
                            </li>
                            w className="artle-list">
                            <li>
                                不吹不黑，引用雷军所说：刘强东还是很让人崇拜的
                            </li>

                        </Row>
                    </div>
                </Row>



            </div>
        );
    }
}