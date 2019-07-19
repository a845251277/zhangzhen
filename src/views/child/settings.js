import React, { Component } from 'react'
import axios from "axios"
import Cookie from "js-cookie"
export default class settings extends Component {
    constructor(props) {
        super(props)
        this.state={
            obj:{

            }
        }
    }
    
    componentDidMount() {
        axios.defaults.headers.common["authorization"] = Cookie.get("userName")
        axios.get("http://localhost:3000/api/islogin").then(({ data }) => {
            // console.log(data)
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
    render() {
        return (
            <div style={{display:"flex",flexDirection:"column"}}>
            <p>
                <img style={{borderRadius:"50%",width:"200px",height:"200px",marginLeft:"20px"}} src={'http://localhost:3000'+this.state.obj.facePhoto} alt=''/>
                <input type='file'/>
            </p>
                
                <button style={{width:"200px",marginTop:"20px",height:"30px",background:"skyblue",color:"#fff",marginLeft:"20px"}} onClick={()=>{
                
                }}>修改</button>
            </div>
        )
    }
}
