import React, { Component } from 'react'
import { Link } from "react-router-dom"
import Cookie from "js-cookie";
import axios from "axios"
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            f: "获取验证码",
            userName: "",
            pass: "",
            yan: "",
            timer: null
        }
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    render() {
        return (
            <div className='da'>
                <div className='container'>
                    <div className='login-left'>
                        <p className='font'>
                            Welcome
                        </p>
                        <p className='money'>
                            赚赚金融 开创信贷“1＋N”模式的综合互联网金融服务共享平台
                        </p>
                    </div>
                    <div className='login-right'>
                        <div className='login'>
                            <dl>
                                <dt><i className="icon iconfont icon-douban"></i></dt>
                                <dd>赚赚金融渠道管理系统</dd>
                            </dl>
                            <p>
                                <input type='text' placeholder="手机号" onChange={(e) => {
                                    this.setState({
                                        userName: e.target.value
                                    })
                                }} />
                            </p>
                            <p>
                                <input type='password' placeholder="登录密码" onChange={(e) => {
                                    this.setState({
                                        pass: e.target.value
                                    })
                                }} />
                            </p>
                            <p>
                                <input type='text' placeholder="验证码" onChange={(e) => {
                                    this.setState({
                                        yan: e.target.value
                                    })
                                }} />

                                <span className='checkcodebtn'><button onClick={() => {

                                    let num = 6;
                                    if (num <= 0) {
                                        num = 0
                                        clearInterval(this.state.timer)
                                    }
                                    this.state.timer = setInterval(() => {
                                        this.setState({
                                            f: --num < 0 ? this.state.f : num
                                        })
                                    }, 1000)
                                    setTimeout(() => {
                                        axios.get("http://localhost:3000/api/checkCode").then(({ data }) => {
                                            console.log(data)
                                            this.setState({
                                                f: data.Verification
                                            })
                                        })
                                    }, 6000)

                                }}>{this.state.f}</button></span>
                            </p>
                            <button onClick={() => {
                                 axios.defaults.headers.common["authorization"] =Cookie.get("userName") 
                                axios.post("http://localhost:3000/api/login", { phone: this.state.userName, password: this.state.pass, checkcode: this.state.yan }).then(({ data }) => {
                                    console.log(data)
                                    if (data.code === 1) {
                                        alert(data.message)
                                    }
                                    if (data.code === 0) {
                                        Cookie.set("userName", data.sessionId,{expires:7})
                                        this.props.history.push("/Home/Index")
                                    }
                                })
                            }}>登陆</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
