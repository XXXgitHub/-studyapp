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
    {image:require('../images/p1.png'),title:'如果你无法简洁的表达你的想法，那只说明你还不够了解它。',score:30,isRead:false,isVideo:false,viewCount:20,commentCount:20},
    {image:require('../images/p1.png'),title:'如果你无法简洁的表达你的想法，那只说明你还不够了解它。',score:30,isRead:true,isVideo:false,viewCount:20,commentCount:20},
    {image:require('../images/p1.png'),title:'如果你无法简洁的表达你的想法，那只说明你还不够了解它。',score:30,isRead:true,isVideo:true,viewCount:20,commentCount:20},
    {image:require('../images/p1.png'),title:'如果你无法简洁的表达你的想法，那只说明你还不够了解它。',score:30,isRead:false,isVideo:false,viewCount:20,commentCount:20},
];
export default class MessageCenter extends Component {
    static navigationOptions = {
        headerTitle:'消息中心'
    };

    renderItem = ({item})=>
    {
        return (
            <View style={{height:64,flexDirection:'row',alignItems:'center',backgroundColor:'#f2f2f2',paddingRight:12,paddingLeft:25}}>
                <Text style = {{color:'#101010',fontSize:12,width:70}}>1天前</Text>
                <Text style = {{flex:1,color:'#101010',fontSize:12, marginRight:15}}>{item.title}</Text>
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
                    separatorStyle = {{backgroundColor:'#fff',height:3}}
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