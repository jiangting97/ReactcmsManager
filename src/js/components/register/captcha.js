import  React from 'react';
import PropTypes from 'prop-types';
import {Input, Button} from 'antd';


export default class Captcha extends React.Component {
    constructor() {
        super();
        this.state = {
            expression: '',
            validate: '',
            validateInput: ''
        }
        this.validate = this.validate.bind(this);
        this.generateCode = this.generateCode.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    componentDidMount() {
        this.generateCode();
        // this.handleChange();
    }

    handleChange(event) {

        let inputEl = this.refs.field;
        console.log(inputEl);
        console.log(inputE1.value);
        console.log(event);
        console.log(event.target.value);
        // console.log(this.refs.field.Input.value);
        // this.setState({
        //     validateInput: this.refs.field.value
        // });

        this.setState({value: event.target.value});
    };



    validate( ) {
        // var thisInput = this.state.validateInput;
        console.log(this.state.value);
        var validateCode = this.state.validate;
        var thisInput = this.state.values;
        console.log(thisInput);
        if (thisInput.toLowerCase() == validateCode.toString().toLowerCase()) {
            return 'success';
        } else if (thisInput != '') {
            return 'error';
        }
    };
    generateCode() {
        console.log("generateCode");
        console.log(this);
        //定义expression和result，expression是字符串，result可能是字符串也可能是数字
        var expression = '', result;
        //判断验证码类型
        if (this.props.captchaType == 'Calculation') {
            result = 0;//计算类型则result为数字，初始化为0
            //获取随机的两个两位数
            var Calpre = Math.round(Math.random() * 100);
            var Calafter = Math.round(Math.random() * 100);

            var codeCal = ['-', '+', 'x'];//运算符
            var i = Math.round(Math.random() * 2);//获得随机运算符

            switch (codeCal[i]) {//判断运算符并计算
                case '-':
                    expression = Calpre + '-' + Calafter;
                    result = Calpre - Calafter;
                    break;
                case '+':
                    expression = Calpre + '+' + Calafter;
                    result = Calpre + Calafter;
                    break;
                case 'x':
                    expression = Calpre + 'x' + Calafter;
                    result = Calpre * Calafter;
                    break;
            }
        } else if (this.props.captchaType == 'Normal') {
            result = '';
            var codeNormal = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';//字母库
            for (var i = 0; i < this.porps.size; i++) {
                result = result + codeNormal[Math.round(Math.random() * (codeNormal.length - 1))];
            }//随机获取字母四个

            expression = result.toLowerCase();//忽略大小写
        }

        this.setState({//设置更新状态
            expression: expression,
            validate: result
        });
    }

    render() {
        var inlineStyle = {
            color: this.props.color,
            backgroundImage: 'url(' + this.props.bgImage + ')'
        };
        return (
            <div>
                <input
                     // value={this.state.validateInput}
                    placeholder="请输入验证码"
                    // validation={this.validate()}
                    value={this.state.value}
                    ref="field"
                    onChange={this.handleChange}/>
                <Button style={inlineStyle}
                       className="am-btn"
                       type="button"
                        value={this.state.expression}
                       // onClick={this.renderCode}
                >
                    {this.state.expression}
                </Button>
            </div>
        );
    }
};

Captcha.propTypes = {
    // bgImage: PropTypes.String,
    // size: PropTypes.Number,
    // captchaType: PropTypes.oneOf(['Calculation', 'Normal']),
    // color: PropTypes.String,
};


Captcha.defaultProps = {
    size: 4,
    capchaType: 'Normal'
};