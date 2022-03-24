import Home from '../containers/Home/index';
import About from '../containers/About/index';
import ShopInfo from '../containers/ShopInfo/index';
import MemberInfo from '../containers/MemberInfo/index';

const MenusConfig = [
    {
        name: '首页',
        path: '/',
        component: <Home />
    },
    {
        name: '关于',
        path: '/about',
        component: <About />
    },
    {
        name: '店铺信息',
        path: '/shop',
        component: <ShopInfo />
    },
    {
        name: '会员信息',
        path: '/member',
        component: <MemberInfo />
    }
]

export default MenusConfig;