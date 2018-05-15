import {
    Platform,
    BackHandler,
    Alert
} from 'react-native';

import {StackNavigator} from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import Login from './src/Login';
import TabView from './src/TabView'
import ArticleDetail from './src/ArticleDetail';
import Test from './src/Test';
import Rank from './src/Rank';
import Favorite from './src/Favorite';
import ReadRecord from './src/ReadRecord';
import IntegralInfo from './src/IntegralInfo';
import ExchangeRecord from './src/ExchangeRecord';
import Set from './src/Set';
import MessageCenter from "./src/MessageCenter";
class Router {

    stackRouter = StackNavigator({
        Login:{screen:Login},
        TabView:{screen:TabView},
        ArticleDetail:{screen:ArticleDetail},
        Test:{screen:Test},
        Rank:{screen:Rank},
        Favorite:{screen:Favorite},
        ReadRecord:{screen:ReadRecord},
        IntegralInfo:{screen:IntegralInfo},
        ExchangeRecord:{screen:ExchangeRecord},
        Set:{screen:Set},
        MessageCenter:{screen:MessageCenter},
    },{
        headerMode: 'screen',
        transitionConfig: () => ({
            screenInterpolator: CardStackStyleInterpolator.forHorizontal,
        }),
        navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
            headerStyle:{backgroundColor:'#f7f7f7',borderBottomWidth:0},
            headerBackTitleStyle:{color:'#000'},
            headerTintColor:'#000',
            headerTitleStyle:{fontSize:17,color:'#000'},
            gesturesEnabled: false, //禁止右滑返回，右滑返回后导致界面不响应
        }
    });

    // 构造
    constructor() {
        // 初始状态
        if (Platform.OS === 'android') {
            this.hardwareBackPress = BackHandler.addEventListener('hardwareBackPress', this.androidBackAction);
        }
    }

    androidBackAction(){
        Alert.alert('提示', '是否退出软件',
            [
                {
                    text: '退出', onPress: () => {
                        BackHandler.exitApp();
                    }
                },
                {text: '否'}
            ]);
        return true;
    }


}
let router = new Router();
export default router;