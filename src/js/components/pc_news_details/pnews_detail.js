/**
 * Created by lijian on 2017/7/30.
 */
import React from 'react';
import 'antd/dist/antd.less';
import NewsDetailHeader from '../pnews_header';
import PNewsDetailLeft from './pnews_detail_left';
import PNewsDetailContent from './pnews_detail_middle';
import PNewsDetailRight from './pnews_detail_right';
import {Row, Col} from 'antd';
import '../../../css/main.css';
import '../../../css/news_detail.css';
import '../../../css/rightcontent.css';
import '../../../css/register.css';
export default class NewsDetail extends React.Component {

    render() {
        return (
            <div>
                <NewsDetailHeader/>
                <div className="content">
                    <Row>
                        <Col span={3} > <PNewsDetailLeft/></Col>
                        <Col span={14}> <PNewsDetailContent/> </Col>
                        <Col span={7}> <PNewsDetailRight/> </Col>
                    </Row>

                </div>


            </div>
        );
    }
}
