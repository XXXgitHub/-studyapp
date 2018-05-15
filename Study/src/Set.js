import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image
} from 'react-native';

import HeadImage from '../baseComponent/ContactHeadImage';

export default class Set extends Component {
    static navigationOptions = {
        headerTitle:'设置'
    };
    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={{height:81,flexDirection:'row', alignItems:'center',paddingLeft:22,borderBottomWidth:1,borderBottomColor:'#ebebeb'}}>
                    <HeadImage arrName={['范汝亮']} style={{width:60,height:60,borderRadius:30}}/>
                    <View style={{flex:1}}/>
                    <Image style={{width:20,height:20,marginRight:10}} source={require('../images/right.png')}/>
                </View>
                <View style={{height:42,flexDirection:'row', alignItems:'center',paddingLeft:22,borderBottomWidth:1,borderBottomColor:'#ebebeb'}}>
                    <Text style = {styles.text}>清除缓存</Text>
                    <View style={{flex:1}}/>
                    <Text style = {[styles.text,{marginRight:8}]}>200M</Text>
                    <Image style={{width:20,height:20,marginRight:10}} source={require('../images/right.png')}/>
                </View>
                <View style={{height:42,flexDirection:'row', alignItems:'center',paddingLeft:22,borderBottomWidth:1,borderBottomColor:'#ebebeb'}}>
                    <Text style = {styles.text}>检查版本</Text>
                    <View style={{flex:1}}/>
                    <Text style = {[styles.text,{marginRight:8}]}>V1.0</Text>
                    <Image style={{width:20,height:20,marginRight:15}} source={require('../images/right.png')}/>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    text:{
        color:'#101010',
        fontSize:14
    }
});