import React, { Component } from 'react'
import { DatePicker, Button } from 'antd';
import axios from "axios"
const { RangePicker } = DatePicker;

function onChange(date, dateString, value) {
    console.log(date, dateString);
}

export default class order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            con: 0,
            datas: [],
            data: [
                {
                    name: "全部",
                },
                {
                    name: "新订单"
                },
                {
                    name: "未审核"
                },
                {
                    name: "已接单"
                },
                {
                    name: "已完成"
                },
                {
                    name: "暂无状态"
                }
            ],
            type:""
        }

    }

    clickItem(item, index) {
        this.setState({
            con: index
        })
        axios.get("http://localhost:3000/api/list?order=1").then(({ data }) => {
            this.setState({
              datas: data.data.filter(item=>item.handleState===2)
          })
          console.log(this.state.datas)
        })

    }

    render() {
        return (
            <div className='right1'>
                <div className='count'>
                    <p className='p0'>
                        <span>处理时间:<RangePicker onChange={onChange} /></span>
                        <span>金额范围:
                        <select onChange={(e)=>{
          
                        }}>
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>
                                <option>13</option>
                            </select>
                            -
                        <select>
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>
                                <option>13</option>
                            </select>
                        </span>
                    </p>
                    <p className='pp'>
                        处理状态:
                 {
                            this.state.data.map((item, index) => {
                                return <Button onClick={this.clickItem.bind(this, item, index)} className={index === this.state.con ? "mm" : ""} key={index}>{item.name}</Button>
                            })
                        }
                        转单类型: <select>
                            <option>请选择类型</option>
                            <option>车乐贷</option>
                            <option>信用贷</option>
                            <option>押房贷</option>
                            <option>房乐贷</option>
                        </select>
                        客服名称: <select>
                            <option>请选择客服</option>
                            <option>李大维</option>
                            <option>李小冉</option>
                            <option>李莉</option>
                            <option>张玲</option>
                            <option>李家豪</option>
                        </select>
                        <Button type="primary" style={{ marginLeft: "20px" }}>查询</Button>
                    </p>
                </div>
            </div>
        )
    }
}
