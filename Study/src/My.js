import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';

import HeadImage from '../baseComponent/ContactHeadImage';
import TMFlatList from '../baseComponent/TMFlatList';
import ReadRecord from "./ReadRecord";
import IntegralInfo from "./IntegralInfo";
import ExchangeRecord from "./ExchangeRecord";
export default class my extends Component {

    renderTop()
    {
        return (<View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:44,backgroundColor:'#f7f7f7'}}>
            <View style={{position:'absolute',top:0, left:0,right:0,bottom:0,justifyContent:'center',alignItems:'center'}}>
                <Text style = {{fontSize:17}}>个人中心</Text>
            </View>
            <TouchableOpacity style={{width:50,height:44, justifyContent:'center',alignItems:'center'}} onPress={this.onSet}>
                <Image source={require('../images/top1.png')} style = {{width:20,height:20}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{width:90,height:25,backgroundColor:'#e3e3e3',borderRadius:20,marginRight:10,
                flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <Text style = {{fontSize:12,color:'#101010', marginRight:10}}>签到</Text>
                <Image source={require('../images/icon1.png')} style={{width:18,height:18}}/>
                <Text style = {{fontSize:10,color:'#101010'}}>+10</Text>
            </TouchableOpacity>
        </View>);
    }

    renderHeadView()
    {
        return (<View style={{height:180,backgroundColor:'#e3e3e3',justifyContent:'center',alignItems:'center'}}>
            <HeadImage arrName={['张三']} style={{height:60,width:60,borderRadius:30}}/>
            <Text style = {{fontSize:14,color:'#101010',marginTop:10}}>张三</Text>
            <View style = {{height:44,flexDirection:'row', marginTop:20}}>
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <View style={{flexDirection:'row',height:20,marginBottom:10}}>
                        <Image source={require('../images/icon1.png')} style={{width:18,height:18,marginRight:5}}/>
                        <Text style = {{fontSize:12,color:'#101010'}}>30,000</Text>
                    </View>
                    <Text style = {{fontSize:12,color:'#101010'}}>当前学分</Text>
                </View>
                <View style={{height:44,width:1,backgroundColor:'white'}}/>
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Text style = {{fontSize:12,color:'#101010',marginBottom:10}}>10</Text>
                    <Text style = {{fontSize:12,color:'#101010'}}>共学习项</Text>
                </View>
                <View style={{height:44,width:1,backgroundColor:'white'}}/>
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Text style = {{fontSize:12,color:'#101010',marginBottom:10}}>10分钟</Text>
                    <Text style = {{fontSize:12,color:'#101010'}}>今日阅读</Text>
                </View>
            </View>
        </View>)
    }

    renderItem = ({item})=>{

        return (
            <TouchableOpacity onPress={()=>this.onDidSelect(item)} style={{height:50,backgroundColor:'white',flexDirection:'row',alignItems:'center'}}>
                <Text style = {{marginLeft:40,fontSize:14,color:'#101010'}}>{item}</Text>
                <View style={{flex:1}}/>
                <Image style={{width:20,height:20,marginRight:15}} source={require('../images/right.png')}/>
            </TouchableOpacity>
        )
    }

    onDidSelect(item)
    {
        if (item === '阅读记录')
        {
            this.props.navigation.navigate('ReadRecord');
        }
        else if (item === '积分明细')
        {
            this.props.navigation.navigate('IntegralInfo');
        }
        else if (item === '我的收藏')
        {
            this.props.navigation.navigate('Favorite');
        }
        else if (item === '兑换记录')
        {
            this.props.navigation.navigate('ExchangeRecord');
        }
    }

    onSet = ()=>
    {
        this.props.navigation.navigate('Set');
    }

    render() {
        return (
            <View style={{flex: 1, paddingTop:_statusbarHeight_, marginBottom:_TabBarHeight_, backgroundColor:'#f7f7f7'}}>
                {this.renderTop()}
                {this.renderHeadView()}
                <TMFlatList
                    style={{backgroundColor:'#fff'}}
                    arrSource={['阅读记录','积分明细','我的收藏','兑换记录']}
                    renderItem = {this.renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f7f7f7'
    }
});