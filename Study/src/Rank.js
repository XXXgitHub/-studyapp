import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import {PageScrollView} from "../baseComponent/PageScrollView";
import {windowSize} from '../baseComponent/WindowSize'
import TMFlatList from "../baseComponent/TMFlatList";
import HeadImage from '../baseComponent/ContactHeadImage';
let arrSource = [
    {NO:5,name:'范汝亮',score:50000},
    {NO:1,name:'张三',score:100000},
    {NO:2,name:'李四',score:90000},
    {NO:3,name:'王五',score:70000},
    {NO:4,name:'韩建',score:65000},
    {NO:5,name:'范汝亮',score:50000},
    {NO:6,name:'王肖林',score:48000},
]
export default class Rank extends Component {
    static navigationOptions = {
        headerTitle:'排行榜'
    };

    renderItem = ({item,index})=>{
        return (
            <View style={{backgroundColor:index == 0?'#e3e3e3':'#fff',width:windowSize.width,height:index == 0?40:66,flexDirection:'row',alignItems:'center',paddingLeft:25,paddingRight:30}}>
                <Text style = {{fontSize:14,color:'#101010'}}>{item.NO}</Text>
                <HeadImage arrName={[item.name]} style={{width:38, height:38,borderRadius:19,marginLeft:15,marginRight:30}}/>
                <Text style = {styles.text1}>{item.name}</Text>
                <View style={{flex:1}}/>
                <Image source={require('../images/icon1.png')} style={{width:18,height:18,marginRight:3}}/>
                <Text style = {styles.text1}>{item.score}</Text>
            </View>)
    }
    renderPage = (rowData,rowID)=>{
        return (
            <TMFlatList
                key = {rowID}
                arrSource={arrSource}
                renderItem = {this.renderItem}
            />
        )
    }

    render() {
        return (
            <PageScrollView
                arrTab = {['本月积分榜','总积分榜']}
                renderRow = {this.renderPage}
                tabProps={{style:{backgroundColor:'white'},tabbarColor:'#e6e6e6',tabTextColor:'#e6e6e6',tabTextSelectColor:'#101010'}}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text1:{
        fontSize:12,
        color:'#101010'
    },
});