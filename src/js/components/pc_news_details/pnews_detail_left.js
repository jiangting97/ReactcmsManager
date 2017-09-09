/**
 * Created by lijian on 2017/7/31.
 */
import React from 'react';
import {Menu, Icon, Button, Row} from 'antd';

import '../../../css/main.css';
import '../../../css/news_detail.css';
import '../../../css/rightcontent.css';
import '../../../css/register.css';
export default class PNewsDetailSider extends React.Component {
    render() {
        return (
            <div className="bui-left index-left">
                <div className="share-box">
                    <a href="/" className="share-count">
                        <i className="y-icon">
                            <img className="icon-img" src="../../../src/images/icon_comments.png"/>
                        </i>
                        <span>322</span>
                    </a>
                    <div className="share-hr"></div>
                </div>
                <div className="share-box">
                        <i className="y-icon">
                            <img className="icon-img" src="/images/icon_sina.png"/>
                        </i>
                        <span>微博</span>
                </div>
                <div className="share-box">
                        <i className="y-icon">
                            <img className="icon-img" src="../../../src/images/icon_wechat.png"/>
                        </i>
                        <span>Qzone</span>
                </div>
                <div className="share-box">
                        <i className="y-icon">
                            <img className="icon-img" src="../../../src/images/icon_qq.png"/>
                        </i>
                        <span>微信</span>
                </div>


                {/*<div>*/}
                {/*<img alt="Scan me!"*/}
                {/*src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAEtklEQVR4Xu1c25abQAxL/v+jswc2kzVGlmXTs20a97GBATS2Lg7Z++12e9wK/x6P78Pv93t41nbM+lw5fi20jkUL2+uhNf252fHqI29P+WA3thbyD2wv4MFCANl1/AOi61+9HjqfrekBW8cOQEEpQYBQ2yi7zaoMtRpbs1I59tmiFrP/r7S9v7dDBQ1AO98cOLYNECJBxDOot5WqZBzi12Si8NcqaAB6bpOy29UqQaoXqQhTuF/nIOYNKiWP1rFAd7zRdv0KESPwfl3mmVlEPLEM5tsBpLrK7ThWCe/yWeV5dxWrnPAuIHRb+sSFUs5I3CbiBsUMdjYG5UAr8z7XIe6qXPc+AHG4DgBVrTgjW4WIWeVFsh9Je3TvLDjbaowUknJQlrIj2bRl3VG6aE/Z9TqqmbXmDiAj6QHoCVBEqKwSWMZBFZAN2BTiZA5cmQKgDbf50duYVwUNQD8T0naaV0iTVUE3U3UqKzO03grQiGVHrmweNAAlZhCphNL3ynlodKLwja2EiqJWZkS7D4oIlJGafXBlfGHJUBmhKNNNBNDVNj9x0AB0/PqqDFBUHaoFoAT4/G5NsQwqP6rHeXlHGW6X+ayCBiBANJbwKvlM4SU2GURGLcpePkddjSFRRcE0PwD9bMuhxSpWnFWLrQTFPyEOYmYOVYuixIra+mPguEO5uUxOWWtGoxAVKMV/sbUqzzcAuZ2GFVRxrcy9KjuLiBhVVLXdO06aWZUXaSOZV8szaqMsmLLpgRIkGQexKSW632zyCV9/QdkIcU5HWjNyR9nNSjoTAMaLfo21TrbJA5Bz8yfAmJPO+IKpkcpH3ggqVamGaFQ1vgIzIwxn0ko2Qq2SzbAjt4p4p8ozFemuHDsAVWSeyW3kVCNi7My5s5ZWdl5pv0qUglEDqdjHApS9vIB8RSS1zB4ggNlkkW1I5l0qVc3EZCf5Aeh7ohi1pjzuYCZM6XurYEpVovgTRSKl2lSj6JW2/HYHIjhPnjbjMAeOPquAjWyDEjUY2Q9AZleUQJy+/lIhUjXk+l2y16jYA0bWitlFad6vOQC5N+tPAKm/9vF8oSZ+VC0qqaI4g8ykPS4SAJXvTtlsADpCB9M844SKvDMHrhAiu5ZaJYjDlMlCVHnlmTTyM2xSx1pTKftKbkLttz04G4pl45UBCHz9bU3lpV8cRs42cq3r/5V2q5BtVDkZddjqQmZ3v1+VpNkACzlTFgveCqDs5YWIODtSjaJBRL7KeEVJ9cwwski0rp++3fHxAKEW6wZSRXGQqiBlRNXGpgCdpG+5K+Sr7m81svJUSLaS3NnArSsK2TPs6w5A+NdgLw7KJoqeg1hiVyoic9td9WMCwCYEmXtPR64DUPNvd2ScwHamYjCtx/pTRKwIwOuYrlH8SIDYQ0eBj0llFEbZWsiVZzxhP1fWju4LqWH7T1Ogm4pcsb+hyCVnHiniQyvX1Y2MhOWgYspsNxoLINRRVWWArnOy8QPahH8SoEyuI2dqAWVf0bDzUYswYDum9XIFfSRAijSjnkV9X0naLLkrxpRtlm13ZBMiznrdf1fmM+X4rwCqyKjyhVzGEdmuIZ5CwdKuo8h7RYwORnEAOv9proXJF3ORA1tuqZjgAAAAAElFTkSuQmCC"/>*/}
                {/*</div>*/}

            </div>
        );
    }

}
