import React from 'react';
import ReactDOM from 'react-dom';
import {Menu, Icon, Button, Col, Row} from 'antd';

import '../../../css/main.css';
import '../../../css/news_detail.css';
import '../../../css/rightcontent.css';
import '../../../css/register.css';
export default class SideBar extends React.Component {

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }
    handleScroll(e) {
        console.log('浏览器滚动事件');
        var  channel = document.getElementById('channel').offsetTop;
        console.log(channel);
        console.log(this.refs.myTextInput)
        this.refs.myTextInput.focus();
    }
    render() {
        return (
            <div className="left-channel channel-fixed" id="channel"  ref="myTextInput" >
                <Row>
                    <Col >
                        <a href="/" className="logotext">准提心脉</a>
                        {/*<img className="logo-img" src="/images/logo_201f80d.png"></img> </a>*/}
                    </Col>
                </Row>
                <Row><Col> <a className="channel-item channel-item-selected"> 传承 </a> </Col></Row>
                <Row><Col> <a className="channel-item"> 网站公告 </a> </Col> </Row>
                <Row><Col> <a className="channel-item"> 新闻资讯 </a> </Col></Row>
                <Row><Col> <a className="channel-item"> 菩提心路 </a> </Col></Row>
                <Row><Col> <a className="channel-item"> 学习资料 </a> </Col></Row>
                <Row><Col> <a className="channel-item"> 大乘讲堂 </a> </Col></Row>
                <Row><Col> <a className="channel-item"> 法会报名 </a> </Col></Row>
                <Row><Col> <a className="channel-item"> 联系我们 </a> </Col></Row>
                <Row><Col> <a className="channel-item"> 苏悉地 </a> </Col></Row>
                <Row><Col> <a className="channel-item"> 吉祥金刚文集 </a> </Col></Row>
                <Row><Col> <a className="channel-item"> 密海寻珍 </a> </Col></Row>
                <Row><Col> <a className="channel-item"> 法物流通 </a> </Col></Row>
            </div>
        );
    }
}