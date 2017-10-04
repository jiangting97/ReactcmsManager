import React, {Component} from 'react';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import {EditorState, convertToRaw, ContentState, convertFromRaw} from 'draft-js';
import '../../../css/editor.css'
import {Input, Button} from 'antd';

import {EditorState, convertToRaw, ContentState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';


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
        // const editorState = convertFromRaw(content);
        this.state = {
            editorState: EditorState.createEmpty(),
            title: '',
            uploadedImages: [],
        }
        this.onEditorStateChange = (editorState) => this.setState({editorState});
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

    handlePublish(e) {


        const {editorState} = this.state;
        console.log("tittle" + this.state.title);
        console.log("content" + this.state.editorState);
        const content = this.state.editorState.getCurrentContent();
        console.log(JSON.stringify(convertToRaw(content)));


        let  tempArticle = JSON.stringify(convertToRaw(content));

        let blog = {
            title: this.state.title,
            content: JSON.stringify(convertToRaw(content)),
            type:1,
            category:1,
            summary:'摘要',
            permission: 7,
            pub_user:'lijian',
            edit_user:'jiangting',
            audit_user:'shidaming',
            stick:0
        }


        console.log("blog" + JSON.stringify(blog));

        var xhr
        if(window.XMLHttpRequest) {
            xhr  = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microft.XMLHttp');
        }

        xhr.open('POST', '/save-artitle');
        xhr.setRequestHeader("Content-type","application/json");
        // xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        // xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        console.log(JSON.parse(JSON.stringify(blog)));
        xhr.send(JSON.stringify(blog));

console.log(JSON.stringify(aa));

        xhr.addEventListener('load', () => {
            console.log('publish');
            if(xhr.readyState == 4) {
                if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    console.log("publish success")
                } else {
                    console.log("publish error !!!")
                }
            }
        });
        xhr.addEventListener('error', () => {
            console.log("publish error ====");
        });




    }

    uploadImageCallBack(file) {
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
                            console.log("xhr.responseText = " + xhr.responseText);
                            // resolve(xhr.responseText);
                            let imageurl = JSON.parse(xhr.responseText).imageUrl;
                            console.log("imageurl = " + imageurl);

                            resolve({data: {link: imageurl}});
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
                <Button type="primary" onClick={this.handlePublish}>发布</Button>


                <div>
                    <div>
                        文章标题
                    </div>
                    <Input type="text" ref="title" onBlur={this.handleChange}>
                    </Input>
                    <div> 文章内容</div>

                    <Editor
                        editorState={editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={this.onEditorStateChange}
                        toolbar={{
                            image: {uploadCallback: this.uploadImageCallBack},
                        }}
                    />
                    <Button type="primary" onClick={this.handlePublish}>发布</Button>
                    <Button type="primary">取消</Button>
                    <textarea
                        disabled
                        value={JSON.stringify(convertToRaw(editorState.getCurrentContent()))}
                    />
                </div>
            </div>

        );
    }
}
