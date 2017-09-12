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
                        <a href="/" className="logo">
                        <img className="logo-img" src="/images/logo_201f80d.png"></img> </a>
                    </Col>
                </Row>
                <Row><Col> <a className="channel-item channel-item-selected"> 推荐 </a> </Col></Row>
                <Row><Col> <a className="channel-item"> 视频 </a> </Col> </Row>
                <Row><Col> <a className="channel-item"> 图片 </a> </Col></Row>
                <Row><Col> <a className="channel-item"> 段子 </a> </Col></Row>
                <Row><Col> <a className="channel-item"> 社会 </a> </Col></Row>
                <Row><Col> <a className="channel-item"> 娱乐 </a> </Col></Row>
                <Row><Col> <a className="channel-item"> 科技 </a> </Col></Row>
                <Row><Col> <a className="channel-item"> 体育 </a> </Col></Row>
                <Row><Col> <a className="channel-item"> 汽车 </a> </Col></Row>
                <Row><Col> <a className="channel-item"> 财经 </a> </Col></Row>
                <Row><Col> <a className="channel-item"> 搞笑 </a> </Col></Row>
                <Row><Col> <a className="channel-item"> 更多 </a> </Col></Row>
            </div>
        );
    }
}