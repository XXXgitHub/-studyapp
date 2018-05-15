import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    Image
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import HomePage from './HomePage';
import Store from './Store';
import My from './My';
let {width} = Dimensions.get('window');
export default class TabView extends Component {
    static navigationOptions = {
        header:null
    };
    constructor(props){
        super(props);
        this.state = {
            currentTab: 'HomePage',
            hideTabBar: false
        };
        this.tabNames = [
            ["", require('../images/tab1.png'), "HomePage", <HomePage {...this.props}/>],
            ["", require('../images/tab2.png'), "Store", <Store {...this.props}/>],
            ["", require('../images/tab3.png'), "My", <My {...this.props}/>],
        ];
        TabView.hideTabBar = TabView.hideTabBar.bind(this);
        TabView.showTabBar = TabView.showTabBar.bind(this);
    }
    static showTabBar(){
        this.setState({hideTabBar: false})
    }
    static hideTabBar(){
        this.setState({hideTabBar: true})
    }
    render(){
        return (
            <TabNavigator
                hidesTabTouch={true}
                tabBarStyle={[{height: _TabBarHeight_, alignItems:'center', justifyContent: 'center',},
                    (this.state.hideTabBar?styles.hide:{})
                ]}
                sceneStyle={{ paddingBottom: styles.tabbar.height }}>
                {
                    this.tabNames.map((item, i) => {
                        return (
                            <TabNavigator.Item
                                key={i}
                                tabStyle={styles.tabStyle}
                                selected={this.state.currentTab === item[2]}
                                selectedTitleStyle={{color: "#3496f0"}}
                                renderIcon={() => <Image source={item[1]} style={{width:20,height:20}}/>}
                                renderSelectedIcon={() => <Image source={item[1]} style={{width:20,height:20}}/>}
                                onPress={() => this.setState({ currentTab: item[2] })}>
                                {item[3]}
                            </TabNavigator.Item>
                        )
                    })
                }
            </TabNavigator>
        )
    }
}

const styles = StyleSheet.create({
    tabbar: {
        alignItems:'center',
        justifyContent: 'center',
    },
    hide: {
        transform: [
            {translateX:width}
        ]
    },
    tabStyle:{
        padding: 4,
    }
});