import React, { Component } from 'react'
import { Menu, Icon, Modal, Button,Tabs } from 'antd';
import { NavLink } from "react-router-dom"
import { Switch, Route } from "react-router-dom"
import { routes } from "../router/routerConfig.js"
import Cookie from "js-cookie"
import axios from "axios"
import {connect} from "react-redux"
const { SubMenu } = Menu;
const { TabPane } = Tabs;
class home extends Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const panes = [];
        this.state = {
            activeKey: "1",
            panes,
            loading: false,
            visible: false,
            obj: {},
            con:0,
        }
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
            this.props.history.push("/Login")
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };
    componentDidMount() {
        axios.defaults.headers.common["authorization"] = Cookie.get("userName")
        axios.get("http://localhost:3000/api/islogin").then(({ data }) => {
            console.log(data)
            this.setState({
                obj: data.info
            })
        }).catch((err) => {
            console.log(err)
        })
        if (Cookie.get("userName")) {

        } else {
            this.props.history.push("/Login")
        }
    }
    onChange = activeKey => {
        this.setState({ activeKey });
      };
    
      onEdit = (targetKey, action) => {
        this[action](targetKey);
      };
    
    
      add = (title,key) => {
        const { panes } = this.state;
        for(var i=0;i<panes.length;i++){
            if(panes[i].key===key){
                this.props.history.push(key)
                return
            }
        }
        const activeKey = `${++this.newTabIndex}`;
        panes.push({ title, content:"", key });
        this.setState({ panes, activeKey });
      };
    
      remove = (targetKey,key) => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
          if (lastIndex >= 0) {
            activeKey = panes[lastIndex].key;
          } else {
            activeKey = panes[0].key;
          }
        }
        this.setState({ panes, activeKey:key });
      };
    clickItem(item,index){
        this.setState({
            con:index
        })
    }
    addOne(e){
        this.add(e.item.props.children[1].props.children.props.children,e.key)
        // console.log(e)
        if(e.key==='1'){
            console.log(e.key)
            this.props.history.push("/Home/Index")
        }
    }
    addTwo(e){
        this.add(e.item.props.children[1].props.children.props.children,e.key)
        if(e.key==='2'){
            this.props.history.push("/Home/Settings")
        }
    }
    addThree(e){
        this.add(e.item.props.children.props.children,e.key)
        if(e.key==='3'){
            this.props.history.push("/Home/Order/Dk")
        }
    }
    addFour(e){
        this.add(e.item.props.children.props.children,e.key)
        if(e.key==='4'){
            this.props.history.push("/Home/Order/Zd")
        }
    }
    addFive(e){
        this.add(e.item.props.children.props.children,e.key)
        if(e.key==='5'){
            this.props.history.push("/Home/Order/Bx")
        }
    }
    render() {
        // console.log(this.props.list)
        const { visible, loading } = this.state;
        return (
            <div className='quan'>
                <div style={{ width: 256, height: "100%" }}>
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme="dark"
                        inlineCollapsed={this.state.collapsed}
                    >
                        <div className='wei'>
                            <dl>
                                <dt><img src={'http://localhost:3000' + this.state.obj.facePhoto} alt='' /></dt>
                                <dd>{this.state.obj.phone}</dd>
                            </dl>
                        </div>
                 
                        <Menu.Item key="1" onClick={this.addOne.bind(this)}>
                            <Icon type="pie-chart" />
                            <span className='span'><NavLink activeClassName="active" to='/Home/Index'>首页</NavLink></span>
                        </Menu.Item>
                        <Menu.Item key="2" onClick={this.addTwo.bind(this)}>
                            <Icon type="desktop" />
                            <span className='span'><NavLink to='/Home/Settings'>设置</NavLink></span>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <Icon type="mail" />
                                    <span>订单管理</span>
                                </span>
                            }
                        >
                            <Menu.Item key="3" onClick={this.addThree.bind(this)}><NavLink to='/Home/Order/Dk'>贷款订单</NavLink></Menu.Item>
                            <Menu.Item key="4" onClick={this.addFour.bind(this)}><NavLink to='/Home/Order/Zd'>转单订单</NavLink></Menu.Item>
                            <Menu.Item key="5" onClick={this.addFive.bind(this)}><NavLink to='/Home/Order/Bx'>保险订单</NavLink></Menu.Item>
                        </SubMenu>
                        {/* <span className='spans'>退出</span> */}
                        <div style={{width:"100%",justifyContent: "space-around",display: "flex",alignItems: "center"}}>
                            <Button type="primary" onClick={this.showModal}>
                                退出
                            </Button>
                            <Button type="primary" onClick={()=>{
                                
                            }}>
                                <NavLink to='/Home/Settings'>设置</NavLink>
                            </Button>
                            <Modal
                                visible={visible}
                                title="Title"
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                                footer={[
                                    <Button key="back" onClick={this.handleCancel}>
                                        Return
                                     </Button>,
                                    <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                                        OK
                                      </Button>,
                                ]}
                            >
                                <p>退出登陆之后。。。。</p>
                            </Modal>
                        </div>
                    </Menu>
                </div>
                <div className='right'>
                    <div  className='guo'>
            
                     <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="editable-card"
          onEdit={this.onEdit}
        >
          {this.state.panes.map(pane => (
            <TabPane tab={pane.title} key={pane.key}>
              {pane.content}
            </TabPane>
          ))}
        </Tabs>
                    </div>
                    <Switch>
                        {
                            routes[1].children.map((item, index) => {
                                return <Route path={item.path} key={index} component={item.component} />
                            })
                        }
                    </Switch>
                </div>
            </div>
        )
    }
}
let initMapStateTo=(state)=>{
    return {
      data:state.reader,
      list:state.reader2
    }
  }
  let initMapDispatchTo=(dispatch)=>{
    return {
      save:(data)=>{
        dispatch({type:"XX",data:data})
      },
   
      dd:(list)=>{
          dispatch({type:"DD",list:list})
      }
    }
  }
  export default connect(initMapStateTo,initMapDispatchTo)(home)