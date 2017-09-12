import React, {Component} from 'react';
import {convertFromRaw} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button } from 'antd';
const content = {
    "entityMap": {},
    "blocks": [{
        "key": "637gr",
        "text": "Initialized from content state.",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
    }]
};

export  class DraftEditor extends Component {
    constructor(props) {
        super(props);
        const contentState = convertFromRaw(content);
        this.state = {
            contentState,
        }
        this.onContentStateChange = (contentState) => this.setState({contentState});
        this.handlePublish = this.handlePublish.bind(this);
    }

    render() {
        const {contentState} = this.state;
        return (
            <div className="addArticle">
                <div>
                    文章标题
                </div>
                <input type="text"    ref="title">
                </input>
                <div> 文章内容</div>
                <Editor
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onContentStateChange={this.onContentStateChange}
                />
                <Button type="primary" onClick={this.handlePublish}>发布</Button>
                <Button type="primary">取消</Button>
                {/*<textarea*/}
                    {/*disabled*/}
                    {/*value={JSON.stringify(contentState, null, 4)}*/}
                {/*/>*/}
            </div>
        );
    }
}