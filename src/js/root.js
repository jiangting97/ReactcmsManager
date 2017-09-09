import React from 'react';
import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';
import {BrowserRouter, Route, Routeouter, Link, HashRouter} from 'react-router-dom'
import PCIndex from './components/pc_news_index/pc_index';
import NewsDetail from './components/pc_news_details/pnews_detail';
import ImageList from './components/pc_news_img_list/pc_img_list';
import {WrappedRegistrationForm} from './components/register/register';
import RichEditorExample from './components/editor/rich_editor';
import Manager from './components/manager/manager';
import {MediaEditor} from './components/editor/media';


export default class Root extends React.Component {
    render() {
        return (
            <HashRouter>
                <div >
                    <Route exact path="/" component={PCIndex}/>
                    <Route path="/detail/:id" component={NewsDetail}/>
                    <Route path="/rich" component={RichEditorExample}/>
                    <Route path="/register" component={WrappedRegistrationForm}/>
                    <Route path="/editor" component={RichEditorExample}/>
                    <Route path="/imgLIst/:id" component={ImageList}/>
                    <Route path="/manager" component={Manager}/>
                </div>
            </HashRouter>
        );
    };
}
ReactDOM.render(
    <Root/>,
    document.getElementById('app')
);




