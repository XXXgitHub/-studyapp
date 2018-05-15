import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';
import Swiper from 'react-native-swiper';
let {width, height} = Dimensions.get('window');
export default class store extends Component {
    constructor()
    {
        super();
    }
    componentDidMount() {

    }

    btnClick = (index)=>
    {
        console.log('index', index);
    }

    onSelectItem(item)
    {
        Alert.alert('-300000','是否确定兑换该商品？',[{text:'取消'},{text:'确定',onPress:()=>{
            console.log('点击确定')
            }}]);
    }

    render() {
        let arrSource = [];
        for (let i= 0;i<20;i++)
        {
            arrSource.push('商品'+(i+1));
        }
        return (
            <View style={{flex:1,paddingTop:_statusbarHeight_, marginBottom:_TabBarHeight_,backgroundColor:'#f7f7f7'}}>
                <View style={{flexDirection:'row',backgroundColor:'#e3e3e3',height:40,justifyContent:'center',alignItems:'center'}}>
                    <Text style = {{fontSize:14,color:'#101010'}}>当前积分：</Text>
                    <Image style={{height:20,width:20}} source={require('../images/icon1.png')}/>
                    <Text style = {styles.text}>30000</Text>
                </View>
                <ScrollView style = {{flex:1,backgroundColor:'#e6e6e6'}}>
                    {arrSource.map((item,i)=>{
                        return (
                            <TouchableOpacity style={styles.itemStyle}
                                              key = {'item'+i}
                                              onPress={()=>this.btnClick(i)}
                            >
                                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                    <Image style = {{width:150,height:190}} source = {require('../images/s1.png')}/>
                                    <View style = {{height:30,flexDirection:'row',alignItems:'center'}}>
                                        <Image style={{height:20,width:20}} source={require('../images/icon1.png')}/>
                                        <Text style = {styles.text}>300000</Text>
                                        <View style = {{flex:1}}/>
                                        <Text style = {styles.text}>商品：10</Text>
                                    </View>
                                    <View style={{flexDirection:'row',height:30,alignItems:'center'}}>
                                        <Text style = {styles.text}>Apple iPhone X 64G 深空灰 全网通4G</Text>
                                        <View style={{flex:1}}/>
                                        <TouchableOpacity style={{height:30,width:60,alignItems:'center',
                                            justifyContent:'center',backgroundColor:'#d1d1d1'}}
                                                          onPress={()=>this.onSelectItem(item)}
                                        >
                                            <Text style = {{fontSize:12,color:'#fff'}}>立即兑换</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>)
                    })}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentStyle:{
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection:'row'
    },
    itemStyle:{
        width:width,
        height:260,
        backgroundColor:'white',
        paddingLeft:30,
        paddingRight:10,
        marginBottom:13
    },
    text:{
        fontSize:12,
        color:'#101010'
    }
});