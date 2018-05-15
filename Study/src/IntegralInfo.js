import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import TMFlatList from '../baseComponent/TMFlatList';

let arrSource = [
    {date:'2018-05-01',title:'答题得分',score:'+30'},
    {date:'2018-04-30',title:'投稿得分',score:'+30'},
    {date:'2018-04-29',title:'兑换商品',score:'-30'},
    {date:'2018-04-28',title:'签到',score:'+10'},
];
export default class IntegralInfo extends Component {
    static navigationOptions = {
        headerTitle:'积分明细'
    };
    renderItem = ({item})=>
    {
        return (
            <View style={{height:56,flexDirection:'row',alignItems:'center',backgroundColor:'#fff',paddingRight:12,paddingLeft:25}}>
                <Text style = {{color:'#101010',fontSize:12}}>{item.date}</Text>
                <Text style = {{flex:1,color:'#101010',fontSize:12, marginRight:15,textAlign:'center'}}>{item.title}</Text>
                <Image source={require('../images/icon1.png')} style={{width:18,height:18,marginRight:3}}/>
                <Text style = {styles.text1}>{item.score}</Text>
            </View>)
    }
    render() {
        return (
            <View style={styles.container}>
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