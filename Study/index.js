import { AppRegistry,Dimensions,Platform } from 'react-native';
import App from './App';
let screenW = Dimensions.get('window').width;
let screenH = Dimensions.get('window').height;
// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;

/**
 * 判断是否为iphoneX
 * @returns {boolean}
 */
function isIphoneX() {
    return (
        Platform.OS === 'ios' &&
        ((screenH === X_HEIGHT && screenW === X_WIDTH) ||
            (screenH === X_WIDTH && screenW === X_HEIGHT))
    )
}

global._TabBarHeight_ = isIphoneX()?83:49;
global._statusbarHeight_ = isIphoneX()?40:20;
AppRegistry.registerComponent('Study', () => App);
