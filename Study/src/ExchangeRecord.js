import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import {windowSize} from '../baseComponent/WindowSize';
import TMFlatList from '../baseComponent/TMFlatList';

let arrSource = [
    {image:require('../images/s1.png'),date:'2018-04-30',title:'Apple iPhone X 64G 深空灰 全网通4G',score:'30000'},
    {image:require('../images/s1.png'),date:'2018-04-30',title:'Apple iPhone X 64G 深空灰 全网通4G',score:'30000'},
];
export default class ExchangeRecord extends Component {
    static navigationOptions = {
        headerTitle:'兑换记录'
    };
    renderItem = ({item})=>
    {
        return (
            <View style={{height:116,flexDirection:'row',alignItems:'center',backgroundColor:'#fff',paddingRight:12,paddingLeft:25}}>
                <Image source={item.image} style={{width:75,height:95,marginRight:30}}/>
                <View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image source={require('../images/icon1.png')} style={{width:18,height:18,marginRight:3}}/>
                        <Text style = {styles.text1}>{item.score}</Text>
                    </View>
                    <Text style = {{color:'#101010',fontSize:12,maxWidth:200,marginTop:10,marginBottom:10}}>{item.title}</Text>
                    <Text style = {{color:'#101010',fontSize:12}}>兑换时间：{item.date}</Text>
                </View>
                <View style={{backgroundColor:'#259B24',position:'absolute',top:0, right:0,width:60,height:20,justifyContent:'center',alignItems:'center'}}>
                    <Text style = {{color:'#fff',fontSize:11}}>兑换成功</Text>
                </View>
            </View>)
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{height:33,width:windowSize.width,backgroundColor:'#e3e3e3',justifyContent:'center',alignItems:'center'}}>
                    <Text style = {styles.text1}>提示：所有兑换商品请向负责人索要</Text>
                </View>
                <TMFlatList
                    style={{flex:1,backgroundColor:'white'}}
                    arrSource={arrSource}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text1:{
        color:'#101010',
        fontSize:12
    }
});