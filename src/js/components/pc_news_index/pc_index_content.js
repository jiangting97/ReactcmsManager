import React from "react";
import {Carousel, Col, Row} from "antd"
import data from "../../../config/news.json";
import {Link, Route, Router, BrowserRouter} from "react-router-dom";
import '../../../css/main.css';
import '../../../css/news_detail.css';
import '../../../css/rightcontent.css';
import '../../../css/register.css';

export default class IndexContent extends React.Component {
    constructor() {
        super();
        this.state = {
            news: data
        };
    };

    componentWillMount() {
        console.log(this.state.news.news[0].title)
    };

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 200,
            slidesToShow: 1,
            autoplay: true,
            vertical: true,
            arrows: true
        };
        const {news} = this.state.news;

        const newsList = news.length
            ? news.map((newsItem, index) => (
                <li key={index} className="single-mode">
                    <Row>
                        <Col span={7} className="single-mode-lbox">
                            <img src={newsItem.imageName} className="img-wrap"/>
                        </Col>
                        <Col span={17} className="single-mode-rbox">
                            <Row className="single-mode-rbox-inner">
                                <a className="title-box">
                                    <Link to={`/detail/${newsItem.index}`} className="link">{newsItem.title}</Link>
                                </a>
                            </Row>
                            <Row className="newsInfo footer-bar" align="middle">
                                <Col className="newsType" span={2}><a className="footer-bar-action"> {newsItem.type}</a></Col>
                                <Col span={1}><img className="media-avatar" src={newsItem.comeImg}></img></Col>
                                <Col className="comefrom" span={20}>
                                    <a className="footer-bar-action-source">&nbsp; {newsItem.comefrom}</a>
                                    <a className="footer-bar-action-source">&nbsp;{newsItem.comment}</a>
                                    <a className="footer-bar-action-source"> &nbsp;{newsItem.publishTime}</a>
                                </Col>

                            </Row>
                        </Col>
                    </Row>
                </li>
            ))
            : '没有加载任何新闻';
        return (
            <div className="bui-left index-content">
                <Row>
                    <div  className="carousel">
                        <Carousel {...settings} >
                            <div>
                                <Link to={`/imgList/aa`} className="link"><img
                                    src="/images/carousel_1.jpg"/></Link>
                            </div>
                            <div>
                                <Link to={`/imgList/ab`} className="link"><img
                                    src="/images/carousel_2.jpg"/></Link>
                            </div>
                            <div>
                                <Link to={`/imgList/ac`} className="link"><img
                                    src="/images/carousel_3.jpg"/></Link>
                            </div>
                            <div><Link to={`/imgList/ad`} className="link">
                                <img src="/images/carousel_4.jpg"/></Link>
                            </div>
                        </Carousel>
                    </div>
                </Row>

                <ul className="feed-infinite-wrapper">
                    {newsList}
                </ul>

            </div>
        );
    }
}