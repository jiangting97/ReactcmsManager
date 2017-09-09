/**
 * Created by lijian on 2017/8/19.
 */
import React from 'react';
import  {Editor, EditorState, RichUtils, AtomicBlockUtils, convertToRaw, Modifier} from 'draft-js';
import {Modal, Button} from 'antd';
import {ColorControls} from './toolbar/colorStyleControls';
import '../../../css/rich_editor.css';
export default class RichEditorExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            showEditorState: EditorState.createEmpty(),
            showURLInput: false,
            url: '/file-upload',
            urlType: '',
            loading: false,
            visible: false,
            files: [],
            multiple: true,
            urlValue: '',
        };
        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => this.setState({editorState});
        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.onTab = (e) => this._onTab(e);
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
        this.logState = () => {
            const content = this.state.editorState.getCurrentContent();
            console.log(convertToRaw(content));
        };
        this.onURLChange = (e) => this.setState({urlValue: e.target.value});
        this.onURLInputKeyDown = this._onURLInputKeyDown.bind(this);
        this.confirmMedia = this._confirmMedia.bind(this);

        //添加图片
        this.handleUpload = this.handleUpload.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleColor = (toggleColor) =>this._toggleColor(toggleColor);
    }

    _toggleColor(toggleColor) {
        const {editorState} = this.state;
        const selection = editorState.getSelection();
        const nextContentState = Object.keys(colorStyleMap).reduce((contentState, color) => {
                return Modifier.removeInlineStyle(contentState, selection, color)
            }, editorState.getCurrentContent()
        );
        let nextEditorState = EditorState.push(
            editorState,
            nextContentState,
            'change-inline-style'
        );

        const currentStyle = editorState.getCurrentInlineStyle();
        if (selection.isCollapsed()) {
            nextEditorState = currentStyle.reduce((state, color) => {
                return RichUtils.toggleInlineStyle(state, color);
            }, nextEditorState);
        }

        if (!currentStyle.has(toggleColor)) {
            nextEditorState = RichUtils.toggleInlineStyle(
                nextEditorState,
                toggleColor
            );
        }
        this.onChange(nextEditorState);

    }

    handleChange(e) {
        e.preventDefault();
        let target = e.target;
        let uploadfiles = target.files;
        console.log("uploadfiles" + uploadfiles);
        let count = this.state.multiple ? uploadfiles.length : 1;
        for (let i = 0; i < count; i++) {
            uploadfiles[i].thumb = URL.createObjectURL(uploadfiles[i]);
        }
        uploadfiles = Array.prototype.slice.call(uploadfiles, 0);
        uploadfiles = uploadfiles.filter(function (file) {
            return /image/i.test(file.type);
        });
        this.setState({files: uploadfiles})
        console.log(files);
    }

    handleUpload(e) {
        let xhr = new XMLHttpRequest();
        if (xhr) {
            xhr.onreadystatechange = (e) => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        let responseText = xhr.responseText;
                        let jsonObj = JSON.parse(responseText);
                        console.log("jsonobj" + jsonObj.imageUrl);
                        this.setState({urlValue: jsonObj.imageUrl});
                        this._confirmMedia(e, jsonObj.imageUrl);
                    } else {
                    }
                }
            }
            xhr.open('POST', this.state.url, true);
            let oMyForm = new FormData();
            oMyForm.append('file', this.state.files[0]);
            xhr.send(oMyForm);
        }
    }

    _handleKeyCommand(command) {
        const {editorState} = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _onTab(e) {
        const maxDepth = 4;
        this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
    }

    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    _confirmMedia(e, urlValue) {
        this._promptForMedia('image');
        console.log("confirm =========> ");
        e.preventDefault();
        const {editorState, urlType} = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            urlType,
            'IMMUTABLE',
            {src: urlValue}
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(
            editorState,
            {currentContent: contentStateWithEntity}
        );
        this.setState({
            editorState: AtomicBlockUtils.insertAtomicBlock(
                newEditorState,
                entityKey,
                ' '
            ),
            showURLInput: false,
            urlValue: '',
        }, () => {

        });


    }

    _onURLInputKeyDown(e) {
        if (e.which === 13) {
            this._confirmMedia(e);
        }
    }

    _promptForMedia(type) {
        const {editorState} = this.state;
        this.setState({
            showURLInput: true,
            urlValue: '',
            urlType: 'image',
        }, () => {
            setTimeout(() => this.refs.url.focus(), 0);
        });
    }

    _addAudio() {
        this._promptForMedia('audio');
    }

    _addImage() {
        this.setState({
            visible: true,
        });
    }

    _addVideo() {
        this._promptForMedia('video');
    }

    render() {
        const {visible, loading, editorState} = this.state;
        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = 'RichEditor-editor';
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }
        let urlInput;
        if (this.state.showURLInput) {
            urlInput =
                <div style={styles.urlInputContainer}>
                    <input
                        onChange={this.onURLChange}
                        ref="url"
                        style={styles.urlInput}
                        type="text"
                        value={this.state.urlValue}
                        onKeyDown={this.onURLInputKeyDown}
                    />
                    <button onMouseDown={this.confirmMedia}>
                        Confirm
                    </button>
                </div>;
        }

        return (
            <div>
                <div>添加新闻</div>
                <div>标题</div>
                <input type="input"></input>
                <article>
                    <p>内容</p>

                    <div className="RichEditor-root">
                        <BlockStyleControls
                            editorState={editorState}
                            onToggle={this.toggleBlockType}
                        />
                        <ColorControls
                        editorState={editorState}
                        onToggle={this.toggleColor}
                        />
                        <InlineStyleControls
                            editorState={editorState}
                            onToggle={this.toggleInlineStyle}
                        />
                        <div style={styles.buttons}>
                            <input type="file" id="file" name="file" onChange={(v) => this.handleChange(v)}
                                   multiple={this.state.multiple}/>
                        </div>
                        <div>
                            <button type="button" onClick={(e) => this.handleUpload(e, this)}>
                                确认上传图片
                            </button>
                        </div>


                        <Modal
                            visible={visible}
                            title="Title"
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            footer={[
                                <Button key="back" size="large" onClick={this.handleCancel}>Return</Button>,
                                <Button key="submit" type="primary" size="large" loading={loading}
                                        onClick={this.handleOk}>
                                    Submit
                                </Button>,
                            ]}> </Modal>

                        {urlInput}


                        <div className={className} onClick={this.focus}>
                            <Editor
                                blockRendererFn={mediaBlockRenderer}
                                blockStyleFn={getBlockStyle}
                                customStyleMap={styleMap}
                                customStyleMap={colorStyleMap}
                                editorState={editorState}
                                handleKeyCommand={this.handleKeyCommand}
                                onChange={this.onChange}
                                onTab={this.onTab}
                                placeholder="Tell a story..."
                                ref="editor"
                                spellCheck={true}
                            />
                        </div>


                        {/*<div className={className} onClick={this.focus}>*/}
                        {/*<Editor*/}
                        {/*blockRendererFn={mediaBlockRenderer}*/}
                        {/*blockStyleFn={getBlockStyle}*/}
                        {/*customStyleMap={styleMap}*/}
                        {/*editorState={showEditorState}*/}
                        {/*onChange={this.onChange}*/}
                        {/*/>*/}
                        {/*</div>*/}
                    </div>
                    <button>
                        发布
                    </button>
                    <button>
                        保存为草稿
                    </button>
                    <button>取消</button>
                </article>
            </div>
        );
    }
}
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};
function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote':
            return 'RichEditor-blockquote';
        default:
            return null;
    }
}
class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }
        return (
            <span className={className} onMouseDown={this.onToggle}>
              {this.props.label}
            </span>
        );
    }
}
const BLOCK_TYPES = [
    {label: 'h1', style: 'header-one'},
    {label: 'h2', style: 'header-two'},
    {label: 'h3', style: 'header-three'},
    {label: 'h4', style: 'header-four'},
    {label: 'h5', style: 'header-five'},
    {label: 'h6', style: 'header-six'},
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    {label: 'Code Block', style: 'code-block'},
];
const BlockStyleControls = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};
var INLINE_STYLES = [
    {label: 'B', style: 'BOLD'},
    {label: 'I', style: 'ITALIC'},
    {label: '下划线', style: 'UNDERLINE'},
    {label: 'Monospace', style: 'CODE'},
];
const InlineStyleControls = (props) => {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map(type =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};


const styles = {
    root: {
        margin: 10,
        fontFamily: '\'Georgia\', serif',
        padding: 20,
        width: 600,
    },
    buttons: {
        marginBottom: 10,
    },
    urlInputContainer: {
        marginBottom: 10,
    },
    urlInput: {
        fontFamily: '\'Georgia\', serif',
        marginRight: 10,
        padding: 3,
    },
    editor: {
        border: '1px solid #ccc',
        cursor: 'text',
        minHeight: 80,
        padding: 10,
    },
    button: {
        marginTop: 10,
        textAlign: 'center',
    },
    media: {
        width: '50%',
    },

};


function mediaBlockRenderer(block) {
    if (block.getType() === 'atomic') {
        return {
            component: Media,
            editable: false,
        };
    }
    return null;
}
const Audio = (props) => {
    return <audio controls src={props.src} style={styles.media}/>;
};
const Image = (props) => {
    return <img src={props.src} style={styles.media}/>;
};
const Video = (props) => {
    return <video controls src={props.src} style={styles.media}/>;
};
const Media = (props) => {
    console.log("media  ===>   start");
    const entity = props.contentState.getEntity(
        props.block.getEntityAt(0)
    );
    const {src} = entity.getData();
    const type = entity.getType();
    let media;
    if (type === 'audio') {
        media = <Audio src={src}/>;
    } else if (type === 'image') {
        console.log("type  =  " + type);
        media = <Image src={src}/>;
    } else if (type === 'video') {
        media = <Video src={src}/>;
    }
    return media;
};
const colorStyleMap = {
    red: {
        color: 'rgba(255, 0, 0, 1.0)',
    },
    orange: {
        color: 'rgba(255, 127, 0, 1.0)',
    },
    yellow: {
        color: 'rgba(180, 180, 0, 1.0)',
    },
    green: {
        color: 'rgba(0, 180, 0, 1.0)',
    },
    blue: {
        color: 'rgba(0, 0, 255, 1.0)',
    },
    indigo: {
        color: 'rgba(75, 0, 130, 1.0)',
    },
    violet: {
        color: 'rgba(127, 0, 255, 1.0)',
    },
};
