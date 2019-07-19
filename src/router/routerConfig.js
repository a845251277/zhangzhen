import Login from "../views/Login.js"
import Home from "../views/home.js"
import Index from "../views/child/Index.js"
import Settings from "../views/child/settings.js"
import Dk from "../views/child/childs/dk.js"
import Zd from "../views/child/childs/zd.js"
import Bx from "../views/child/childs/bx.js"
export const routes=[
    {path:"/Login",component:Login},
    {path:"/Home",component:Home,children:[
        {path:"/Home/Index",component:Index},
        {path:"/Home/Settings",component:Settings},
        {path:"/Home/Order/Dk",component:Dk},
        {path:"/Home/Order/Zd",component:Zd},
        {path:"/Home/Order/Bx",component:Bx}
    ]
}
]