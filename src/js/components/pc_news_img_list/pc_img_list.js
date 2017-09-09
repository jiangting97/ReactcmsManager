/**
 * Created by lijian on 2017/8/5.
 */

import React from 'react';
import 'antd/dist/antd.css';
import NewsDetailHeader from '../pnews_header';
import { Link} from 'antd';
import data from "../../../config/imageList.json";

import '../../../css/img_list.css';
export default class ImageList extends React.Component {
    constructor() {
        super();
        this.state = {
            images: data,
            offsetLeft: 0,
            nowLocal: 0,
            imageNum: 0,

        };
        this.handleClick = this.handleClick.bind(this);
    };

    handleClick(n) {
        // let length = this.state.images.length;
        const {imageList} = this.state.images;
        let length = imageList.length;

         // length = 4;
        var _n = this.state.nowLocal + n ;
        if (_n < 0) {
            _n = _n + length;
        }
        if (_n >= length) {
            _n = _n - length;
        }
        console.log( "-n =  " + n);
        let offset =-800 * _n;
        console.log("offset = " + offset);
        this.setState({
            nowLocal:_n,
            offsetLeft: offset,
        });
        console.log("this.state.offset = " + this.state.offsetLeft);
    }

    render() {
        const {imageList} = this.state.images;
        const images = imageList.map((imageItem, index) => (
            <img src={imageItem.imgName} className="image"/>
        ));

        var styles = {
            imagebox: {
                position: 'absolute',
                width:100000,
                zIndex: 1,
                height: 500,
                left: this.state.offsetLeft,
            },

        };
        return (

            <div>
                <NewsDetailHeader/>
                <div className="gallery">
                    <div id="container">
                        <div style={styles.imagebox}>
                            {images}
                        </div>
                        <button id="prev" className="arrow" onClick={(e) => this.handleClick(-1)}> &lt; </button>
                        <button id="next" className="arrow" onClick={(e) => this.handleClick(1)}> &gt; </button>
                    </div>
                    <div className="message">
                        {imageList[lowLocl]}
                        {this.state.images.title}
                    </div>
                </div>
            </div>
        );
    }
}