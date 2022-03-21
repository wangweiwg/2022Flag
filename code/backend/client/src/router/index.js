import ShopInfo from '../containers/ShopInfo/index';
import MemberInfo from '../containers/MemberInfo/index';

const RouterMenus = [
    {
        name: '店铺信息',
        path: 'shop',
        component: ShopInfo
    },
    {
        name: '会员信息',
        path: 'member',
        component: MemberInfo
    }
]

export default RouterMenus;