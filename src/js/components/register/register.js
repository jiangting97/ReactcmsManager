import React from 'react';
import Header from '../header';
import {Link, Route, Router, BrowserRouter} from "react-router-dom";
import Captcha from './captcha';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }],
    }],
}];



 class RegistrationForm extends React.Component {
    constructor() {
        super();
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
        };
        this.handleChange = this.handleChange.bind(this);
    };

    componentWillMount() {
        console.log(this.props);
        // form.getFieldValue('password')
        console.log("email" + this.props.form.getFieldValue('email'));
    };

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    handleConfirmBlur(e) {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }

    handleChange() {


        console.log("email" + this.props.form.getFieldValue('email'));

    };

    checkPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    checkConfirm(rule, value, callback) {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }

    handleWebsiteChange(value) {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({autoCompleteResult});
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{width: 60}}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));

        return (
            <div className="main">
                <Header></Header>
                <div className="register">
                    <div className="register-title">用户注册</div>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            {...formItemLayout}
                            label="邮箱"
                            hasFeedback
                        >
                            {getFieldDecorator('email', {
                                rules: [{
                                    type: 'email', message: 'The input is not valid E-mail!',
                                }, {
                                    required: true, message: 'Please input your E-mail!',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="密码"
                            hasFeedback
                        >
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: 'Please input your password!',
                                }, {
                                    validator: this.checkConfirm,
                                }],
                            })(
                                <Input type="password" />
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="确认密码"
                            hasFeedback
                        >
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: 'Please confirm your password!',
                                }, {
                                    validator: this.checkPassword,
                                }],
                            })(
                                <Input type="password" onBlur={this.handleConfirmBlur} />
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label={(
                                <span>用户名
                                    <Tooltip title="What do you want other to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
                            )}
                            hasFeedback
                        >
                            {getFieldDecorator('nickname', {
                                rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                            })(
                                <Input />
                            )}
                        </FormItem>


                        <FormItem
                            {...formItemLayout}
                            label="电话号码"
                        >
                            {getFieldDecorator('phone', {
                                rules: [{ required: true, message: 'Please input your phone number!' }],
                            })(
                                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                            )}
                        </FormItem>

                        <FormItem {...tailFormItemLayout}>
                            <Captcha color="red"  captchaType="Calculation" size="4"/>

                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">注册</Button>
                        </FormItem>
                    </Form>
                </div>

            </div>
        );
    }
}

export const WrappedRegistrationForm = Form.create()(RegistrationForm);

