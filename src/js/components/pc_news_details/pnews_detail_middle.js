import React from 'react';
import {Row} from 'antd';
import '../../../css/main.css';
import '../../../css/news_detail.css';
import '../../../css/rightcontent.css';
import '../../../css/register.css';
export default class PNewsDetailLContent extends React.Component{
    render() {
        return(
            <div className="left-content">

                <h1>
                    日本制造业最大破产案诞生，神秘中国商人拿下负债万亿日元企业
                </h1>
                <Row className="detail_news_content">
                    今年暑假，大家万众期待的《战狼2》就要上映了，1的精彩让大家对2的期待很大，也确实是中国近年来少有的硬片，并且《战狼2》从拍摄到结束一直都有较高的话题度，一直保持着较高的热度。
                    什么演员问题呀，一时间让大家对张翰群起而攻之，后来又传张翰换了彭于晏，女主演问题，片酬问题，又到后来中间宣传片段误用，又有官司纷争，达康书记宣传之事…………可谓是一波未平一波又起呀，但也被指过度炒作，也让很多网友对吴京职责颇多，利用别人炒作只为自己电影一直获得较高的关注度，更是一时间增加了很多黑粉
                    最近，又有一件事又成了热点，那就是《战狼2》不在国内首映，而是跑到美国去首映！！

                    于是很多网友不愿意了，很多人大加指责说“凭什么到美国首映，国产片到美国首映，崇洋媚外，还是中国人吗……”等等之类的。
                </Row>
            </div>
        );
    }
}