
import React from 'react';
import 'antd/dist/antd.less';
import NewsDetailHeader from '../pnews_header';
import {Row, Col, Link, Carousel} from 'antd';
import data from "../../../config/imageList.json";
import Imagess from './lunbo';
import Slider from 'react-slick';

import '../../../css/img_list.css';
import '../../../css/news_detail.css';
import '../../../css/rightcontent.css';
export default class ImageList extends React.Component {
    constructor() {
        super();
        this.state = {
            images: data,
            offsetLeft: 0,
            nowLocal:0
        };
        this.handleClick = this.handleClick.bind(this);
    };


    handleClick(n) {
        let length =  this.state.images.length;
        var _n = (this.state.nowLocal +n ) % length;
        if(_n < 0) {
            _n = _n + length;
        }
        if(_n >= length) {
            _n = _n + length;
        }
        let offset = -600*_n;

        // this.setState({
        //     nowLocal:_n,
        //     offsetLeft:offset,
        // });
        console.log(this.state.offsetLeft);


    }
    render() {

        const {imageList} = this.state.images;
        const images = imageList.map((imageItem, index) => (
            <img src={imageItem.imgName} className="images"/>
        ));

        var styles = {
            imagebox: {
                position:'absolute',
                zIndex: 1,
                width: 12000,
                height: 400,
                left: this.state.offsetLeft
            },

        };
        return (

            <div>
                <NewsDetailHeader/>
                <div className="gallery">
                    <Row>
                        <Col span={17}>
                            <div className="showbox">
                                <div style={styles.imagebox}>
                                    {images}
                                </div>
                                <button className="arrow prev" onClick={(e)=> this.handleClick(-1)}> &lt; </button>
                                <button className="arrow next" onClick={this.handleClick(this, 1)}> &gt; </button>
                            </div>
                        </Col>

                        <Col span={7}>
                            <div className="bui-right info-box">
                                <div className="info-box-inner">
                                    <h2>
                                        <span className="image-title">
                                               {this.state.images.title}
                                        </span>
                                    </h2>
                                    <div className="pgc">
                                        <a href="#" className="media-user">
                                            <img src={this.state.images.authorImage} className="media-user-img"></img>
                                            <span> 娱乐讲真</span>
                                        </a>
                                    </div>
                                    <div className="abstract">
                                        <span className="abstract-index"><em>1</em>/9
                                        </span>
                                        2017年8月2日，上海，众星出席《秦时丽人明月心》开播发布会。（图片署名： 东方IC）
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}