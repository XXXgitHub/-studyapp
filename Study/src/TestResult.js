import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';

import {windowSize} from '../baseComponent/WindowSize';
import HeadImage from '../baseComponent/ContactHeadImage';
export default class TestResult extends Component {

    constructor()
    {
        super();
        this.state = {
            showAll:false,
            arrSource:[
                {title:'题目题目题目题目题目题目题目',answer:'答案1',standardAnswer:'答案2',isRight:false},
                {title:'题目题目题目题目题目题目题目',answer:'答案3',standardAnswer:'答案2',isRight:false},
                {title:'题目题目题目题目题目题目题目',answer:'答案2',standardAnswer:'答案2',isRight:true}
            ],
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{width:windowSize.width-100,height:windowSize.height-200,backgroundColor:'white'}}>

                    <View style={{flexDirection:'row',paddingTop:30,paddingLeft:40}}>
                        <HeadImage arrName={['范汝亮']} style = {{width:60, height:60,borderRadius:30}}/>
                        <View style={{marginLeft:25}}>
                            <View style={{height:24,flexDirection:'row',alignItems:'center',marginBottom:5}}>
                                <Image source={require('../images/icon1.png')} style={{width:24,height:24,marginRight:10}}/>
                                <Text style = {styles.text1}>+30</Text>
                            </View>
                            <TouchableOpacity style={{backgroundColor:'#5677FC',borderRadius:2,width:74,height:28,justifyContent:'center',alignItems:'center'}}
                                              onPress={()=>{
                                                  this.setState({showAll:true})
                                              }}>
                                <Text style = {{fontSize:12,color:'#fff'}}>查看答案</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ScrollView style={{flex:1}}>
                        {this.state.arrSource.map((item,i)=>{
                            return (
                                <View style={{borderBottomWidth:1,borderBottomColor:'black',marginHorizontal:20,marginTop:15,
                                    height:110}}>
                                    <Text style = {{fontSize:12,color:'#101010'}}>{`${i+1}.${item.title}`}</Text>
                                    <View style={{flex:1,flexDirection:'row',padding:15}}>
                                        <Text style = {{fontSize:16,color:'#101010'}}>+{item.isRight?10:0}</Text>
                                        <View style={{marginLeft:25}}>
                                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                                <Image source={item.isRight?require('../images/gou.png'):require('../images/wrong.png')} style={{width:24, height:24}}/>
                                                <Text style = {styles.text1}>{item.answer}</Text>
                                            </View>

                                            {this.state.showAll && !item.isRight?<View style={{flexDirection:'row',alignItems:'center'}}>
                                                <Image source={require('../images/gou.png')} style={{width:24, height:24}}/>
                                                <Text style = {styles.text1}>{item.standardAnswer}</Text>
                                            </View>:null}
                                        </View>
                                    </View>
                                </View>
                            )
                        })}
                    </ScrollView>

                    <TouchableOpacity style={{position:'absolute', top:0,right:0,width:30,height:30,justifyContent:'center',alignItems:'center'}}
                                      onPress={()=>this.props.navigation.goBack()}>
                        <Text style={{fontSize:18}}>x</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position:'absolute',
        top:0,
        left:0,
        bottom:0,
        right:0,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    text1:{
        fontSize:14,
        color:'#101010'
    }
});