/**
 * Created by lijian on 2017/8/19.
 */
import React from 'react';
import {AtomicBlockUtils, Editor, EditorState, RichUtils, convertToRaw,} from 'draft-js';
import {Modal, Button} from 'antd';
export class MediaEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            showURLInput: false,
            url: '',
            urlType: '',
            loading: false,
            visible: false,
            files: [],
            multiple: true,
        };
        this.focus = () => this.refs.editor.focus();
        this.logState = () => {
            const content = this.state.editorState.getCurrentContent();
            console.log(convertToRaw(content));
        };
        this.onChange = (editorState) => this.setState({editorState});
        this.onURLChange = (e) => this.setState({urlValue: e.target.value});
        this.addAudio = this._addAudio.bind(this);
        this.addImage = this._addImage.bind(this);
        this.addVideo = this._addVideo.bind(this);

        this.confirmMedia = this._confirmMedia.bind(this);
        this.handleKeyCommand = this._handleKeyCommand.bind(this);
        this.onURLInputKeyDown = this._onURLInputKeyDown.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleChange(evt) {
        console.log("change");

        evt.preventDefault();
        alert("aa");
        let target = event.target;
        let files = target.files;
        // let count = this.state.multiple ? files.length : 1;
        for (let i = 0; i < count; i++) {
            files[i].thumb = URL.createObjectURL(files[i]);
        }
        files = Array.prototype.slice.call(files, 0);
        files = files.filter(function (file) {
            return /image/i.test(file.type);
        })
        this.setState({files: this.state.files.concat(files)});
        console.log(files);
    }


    handleUpload(e) {
        alert("aa");
        console.log("files"+this.state.files[0]);
        console.log("upload==================");
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = (e) => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    console.log("aaaaaa================")
                    console.log("xhr = " + xhr);
                }
            }
        }
        xhr.open("POST", "/file-upload", true);
        alert("bbb");
        let form = new FormData();
        form.append("file", this.state.files[0]);
        xhr.send(form)


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

    _confirmMedia(e) {
        e.preventDefault();
        const {editorState, urlValue, urlType} = this.state;
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
            visible: true,
            urlValue: '',
        }, () => {
            setTimeout(() => this.focus(), 0);
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
            urlType: type,
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

    showModal() {

        this.setState({
            visible: true,
        });
    }

    handleOk() {


        setTimeout(() => {
            this.setState({loading: false, visible: false});
        }, 2000);
    }

    handleCancel() {
        this.setState({visible: false});
    }

    render() {
        const {visible, loading} = this.state;
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
            <div style={styles.root}>
                <div style={{marginBottom: 10}}>
                    Use the buttons to add audio, image, or video.
                </div>

                <div style={styles.buttons}>
                    <button onMouseDown={this.addAudio} style={{marginRight: 10}}>
                        Add Audio
                    </button>
                    <button onMouseDown={this.addImage} style={{marginRight: 10}}>
                        Add Image
                    </button>
{/*添加图片*/}
                    <div className="upload-box">
                        <input
                            onChange={(v) => this.handleChange(v)}
                            type="file"
                            size={this.state.size}
                            name="file"
                            id="file"
                            accept="image/*"
                            multiple={this.state.multiple}/>
                    </div>
                    <Button type="primary" onMouseDown={this.showModal} style={{marginRight: 10}}>
                        图片
                    </Button>
                    <Modal
                        visible={visible}
                        title="Title"
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" size="large" onClick={this.handleCancel}>Return</Button>,
                            <Button key="submit" type="primary" size="large" loading={loading} onClick={this.handleOk}>
                                Submit
                            </Button>,
                        ]}
                    >
                        <form method="post" encType='multipart/form-data' action="/upload">
                            <input
                                onChange={(v) => this.handleChange(v)}
                                type="file"
                                size={this.state.size}
                                name="file"
                                id="file"
                                accept="image/*"
                                multiple={this.state.multiple}/>
                            <button type="button" onClick={(e) => this.handleUpload(e)}>
                                确认上传图片
                            </button>
                        </form>
                    </Modal>
                </div>
                {urlInput}
                <div style={styles.editor} onClick={this.focus}>
                    <Editor
                        blockRendererFn={mediaBlockRenderer}
                        editorState={this.state.editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.onChange}
                        placeholder="Enter some text..."
                        ref="editor"
                    />
                </div>
                <input
                    onClick={this.logState}
                    style={styles.button}
                    type="button"
                    value="Log State"
                />
            </div>
        );
    }
}
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
    const entity = props.contentState.getEntity(
        props.block.getEntityAt(0)
    );
    const {src} = entity.getData();
    const type = entity.getType();
    let media;
    if (type === 'audio') {
        media = <Audio src={src}/>;
    } else if (type === 'image') {
        media = <Image src={src}/>;
    } else if (type === 'video') {
        media = <Video src={src}/>;
    }
    return media;
};
const styles = {
    root: {
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
        width: '100%',
    },
};