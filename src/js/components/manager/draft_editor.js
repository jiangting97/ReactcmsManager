import React, {Component} from 'react';
import {convertFromRaw} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import '../../../css/editor.css'
import {Button} from 'antd';
import {Input} from 'antd';

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


export class DraftEditor extends Component {
    constructor(props) {
        super(props);
        const editorState = convertFromRaw(content);
        this.state = {
            editorState,
            title: '',
            uploadedImages:[],
        }
        this.onContentStateChange = (contentState) => this.setState({contentState});
        this.handlePublish = this.handlePublish.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        console.log("handlechange");
        console.log(evt.target.value);
        console.log(evt);
        this.setState({
            title: evt.target.value,
        });

    }

    handlePublish() {
        console.log(this.state.title);
        console.log(this.state.contentState)
    }

    uploadImageCallBack(file) {
        // let  imageObject = {
        //     file : file,
        //     localSrc: URL.createObjectURL(file)
        // }
        // uploadedImages.push(imageObject);
        // this.setState({
        //    uploadedImages:uploadedImages
        // });
        return new Promise(
            (resolve, reject) => {
                file.thumb = URL.createObjectURL(file);
                console.log("upload");
                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/file-upload');
                xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
                const data = new FormData();
                data.append('file', file);
                console.log(file);
                xhr.send(data);
                console.log("finish upload");
                console.log("xhr.status" + xhr.status);
                xhr.addEventListener('load', () => {
                    console.log("load");
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200 || xhr.status == 304) {
                            console.log("aaaaaa================")
                            console.log("xhr.responseText = " + xhr.responseText);
                            // resolve(xhr.responseText);
                            console.log("resolev");
                            resolve({ data: { link: "https://p1.pstatp.com/origin/3b140000f83871dd3b04" } });
                            console.log("resolve. finish");
                        }
                    }
                    // const response = JSON.parse(xhr.responseText);

                });
                xhr.addEventListener('error', () => {
                    console.log("error");
                    const error = JSON.parse(xhr.responseText);
                    reject(error);
                });
            }
        );
    }

    render() {
        const {editorState} = this.state;
        return (
            <div className="add-articl">
                <div>
                    文章标题
                </div>
                <Input type="text" ref="title" onBlur={this.handleChange}>
                </Input>
                <div> 文章内容</div>
                <Editor
                    // editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onContentStateChange={this.onContentStateChange}
                    toolbar={{
                        image: {uploadCallback: this.uploadImageCallBack},
                    }}

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
