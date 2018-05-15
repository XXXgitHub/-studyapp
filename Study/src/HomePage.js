import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Animated,
    ScrollView,
    InteractionManager
} from 'react-native';

import {PageScrollView} from "../baseComponent/PageScrollView";
import {windowSize,isIphoneX} from '../baseComponent/WindowSize';
import TMFlatList from "../baseComponent/TMFlatList";
import {TabBarScrollView} from '../baseComponent/TabBarScrollView'
import Cell from '../baseComponent/ArticleCell';
import ArticleDetail from './ArticleDetail';
import BaseComponent from "../baseComponent/BaseComponent";
let topViewHeight = 194;
let arrTab = ['重点学习','技术文章','近期公告','必学堂'];
export default class HomePage extends BaseComponent {
    constructor(props)
    {
        super(props);

        this.state = {
            scrollY: new Animated.Value(0)
        }

    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(()=>{
            this.dataStore.getList(0);
        });

    }


    onDidSelect(item)
    {
        this.props.navigation.navigate('ArticleDetail',item)
    }


    renderItem(item,i){

        return (
            <Cell
                key = {i}
                item = {item}
                onPress={()=>this.onDidSelect(item)}
            />
        )
    }

    renderPage = (rowData,rowID)=>{
        return (
            <View key = {rowID} style={{width:windowSize.width,minHeight:100}}>
                {this.dataStore.arrList[rowID].map((item,i)=>{
                    return this.renderItem(item,i);
                })}
            </View>
        )

    };

    renderNav()
    {
        return(<View style={styles.navBar}>
            <View style={styles.titleStyle}>
                <Text style = {{fontSize:17}}>app名称</Text>
            </View>

            <TouchableOpacity style={styles.btnBg}
                              onPress={this.onRank}>
                <Image source={require('../images/top1.png')} style = {{width:20,height:20}}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnBg}
                              onPress={this.onMessage}>
                <Image source={require('../images/message.png')} style = {{width:20,height:20}}/>
            </TouchableOpacity>
        </View>)
    }

    render() {

        let showY = this.state.scrollY.interpolate({
            inputRange: [0, topViewHeight, topViewHeight],
            outputRange: [-9999, -9999, 0]
        });
        let opacity = this.state.scrollY.interpolate({
            inputRange: [0, topViewHeight],
            outputRange: [1, 0]
        });

        return (
            <View style={{flex: 1, paddingTop:_statusbarHeight_, marginBottom:_TabBarHeight_, backgroundColor:'#f7f7f7'}}>
                {this.renderNav()}
                <View style={{flex:1}}>
                    <ScrollView onPress={this.onPress}
                                ref={(scrollView) => {this.ScrollView = scrollView}}
                                style = {{backgroundColor:'#e6e6e6'}}
                                scrollEventThrottle={16}
                                onScroll={Animated.event(
                                    [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
                                )}>

                        <Animated.View style={[styles.topView,{opacity}]}>
                            <Image source={require('../images/p2.png')} style={{width:356,height:172}}/>
                        </Animated.View>
                        <TabBarScrollView
                            ref={(scrollView) => {this._tabBarScrollView = scrollView}}
                            onSelect = {this.onSelectTab}
                            arrTab = {arrTab}
                            style={{backgroundColor:'white'}}
                            tabbarColor = '#e6e6e6'
                            tabTextColor = '#e6e6e6'
                            tabTextSelectColor = '#101010'
                            PageSize = {4}>
                        </TabBarScrollView>

                        <ScrollView
                            style={{flex:1}}
                            ref={(scrollView) => {this._pageScrollView = scrollView}}
                            horizontal = {true}
                            pagingEnabled = {true}
                            showsHorizontalScrollIndicator = {false}
                            onScroll = {this.onPageScroll}
                            onMomentumScrollEnd={(e)=>this.onScrollEnd(e)}>
                            {arrTab.map((value,i)=>{
                                return this.renderPage(value,i);
                            })}
                        </ScrollView>
                    </ScrollView>
                    <Animated.View
                        style={{position:'absolute',top:0,left:0,right:0, height: 34,transform: [
                                {translateY: showY}
                            ]}}>
                        <TabBarScrollView
                            ref={(scrollView) => {this._tabBarScrollView2 = scrollView}}
                            onSelect = {this.onSelectTab}
                            arrTab = {arrTab}
                            style={{backgroundColor:'white'}}
                            tabbarColor = '#e6e6e6'
                            tabTextColor = '#e6e6e6'
                            tabTextSelectColor = '#101010'
                            PageSize = {4}>
                        </TabBarScrollView>
                    </Animated.View>
                </View>
            </View>
        );
    }


    onSelectTab = (index)=>
    {
        let scrollTo = {animated: false}
        scrollTo.x = windowSize.width*index
        this._pageScrollView.scrollTo(scrollTo);
        this.onSelectPage(index);
    };

    onSelectPage(index)
    {
        this.index = index;
        this._tabBarScrollView.setIndex(index);
        this._tabBarScrollView2.setIndex(index);

        if (this.state.scrollY._value > topViewHeight)
        {
            this.ScrollView.scrollTo({y:topViewHeight,animated:false})
        }

        InteractionManager.runAfterInteractions(()=>{
            this.dataStore.getList(index);
        })
    }

    onScrollEnd(e)
    {
        var contentOffset = e.nativeEvent.contentOffset
        var pageIndex = parseInt((contentOffset.x+10)/windowSize.width)
        if (pageIndex != this.index) {
            this._tabBarScrollView.setIndex(pageIndex);
            this._tabBarScrollView2.setIndex(pageIndex);
            this.onSelectPage(pageIndex)
        }
    }

    onPageScroll = (e)=>
    {
        let contentOffset = e.nativeEvent.contentOffset;
        this._tabBarScrollView.setTabContentOffset(contentOffset);
        this._tabBarScrollView2.setTabContentOffset(contentOffset);
    }

    onRank = ()=>{
        this.props.navigation.navigate('Rank')
    }

    onMessage = ()=>{
        this.props.navigation.navigate('MessageCenter')
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f7f7f7',
    },
    text1:{
        fontSize:12,
        color:'#101010'
    },
    topView:{
        height:topViewHeight-13,
        backgroundColor:'#ffffff',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:13
    },
    btnBg:{
        width:50,
        height:44,
        justifyContent:'center',
        alignItems:'center'
    },
    titleStyle:{
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        justifyContent:'center',
        alignItems:'center'
    },
    navBar:{
        height:44,
        backgroundColor:'#F7F7F7',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    }
});