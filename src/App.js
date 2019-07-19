import React from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Redirect,Route} from "react-router-dom"
import store from "./store/store.js"
import {Provider} from "react-redux"
import {routes} from "./router/routerConfig.js"
import "./fonts/iconfont.css"
class App extends React.Component{
  constructor(props) {
    super(props);
    this.state={

    }
  }
  render(){
    return (
      <Router>
        <Provider store={store}>
        <div className='he'>
          <Switch>
            {
              routes.map((item,index)=>{
                return <Route key={index} path={item.path} component={item.component}/>
              })
            }
            <Redirect from='/' to='/Home/Index'/>
          </Switch>
        </div>
        </Provider>
      </Router>
    )
  }
  
}

export default App;