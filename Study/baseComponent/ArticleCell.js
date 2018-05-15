import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import {windowSize} from "./WindowSize";


export default class ArticleCell extends Component {

    renderVideo(item)
    {
        return (
            <View style = {styles.cell}>
                <TouchableOpacity style = {{flex:1,alignItems:'center',padding:11,backgroundColor:'white'}}
                                  onPress={this.props.onPress}
                >
                    <Text style = {[styles.text1,{marginBottom:8}]}>{item.title}</Text>
                    <Image style={styles.image} source={item.image}/>
                    <View style={styles.bottomView}>
                        <View style={[styles.iconBG,{marginRight:30}]}>
                            <Image source={require('../images/icon1.png')} style={styles.icon}/>
                            <Text style = {styles.text1}>{item.score}</Text>
                        </View>
                        <View style={[styles.iconBG,{marginRight:30}]}>
                            <Image source={require('../images/icon2.png')} style={styles.icon}/>
                            <Text style = {styles.text1}>{item.viewCount}</Text>
                        </View>

                        <View style={styles.iconBG}>
                            <Image source={require('../images/icon2.png')} style={styles.icon}/>
                            <Text style = {styles.text1}>{item.commentCount}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>)
    }
    render() {
        let {item} = this.props;
        if(item.isVideo)
        {
            return this.renderVideo(item)
        }
        else
        {
            return (
                <View style = {{height:146,backgroundColor:'#e6e6e6',width:windowSize.width}}>
                    <TouchableOpacity style = {{height:133,flexDirection:'row',padding:11,backgroundColor:'white'}}
                                      onPress={this.props.onPress}
                    >
                        <Image style={{width:171,height:107,marginRight:16}} source={item.image}/>
                        <View style={{flex:1,justifyContent:'space-between'}}>
                            <Text style = {styles.text1}>{item.title}</Text>
                            <View style={{height:20,flexDirection:'row',alignItems:'center'}}>
                                <Image source={require('../images/icon1.png')} style={styles.icon}/>
                                <Text style = {styles.text1}>{item.score}</Text>
                            </View>
                            <View style={{height:30,flexDirection:'row',alignItems:'center'}}>
                                <View style={[styles.iconBG,{marginRight:30}]}>
                                    <Image source={require('../images/icon2.png')} style={styles.icon}/>
                                    <Text style = {styles.text1}>{item.viewCount}</Text>
                                </View>

                                <View style={styles.iconBG}>
                                    <Image source={require('../images/icon2.png')} style={styles.icon}/>
                                    <Text style = {styles.text1}>{item.commentCount}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>)
        }

    }
}

const styles = StyleSheet.create({
    text1:{
        fontSize:12,
        color:'#101010'
    },
    cell:{
        minHeight:280,
        backgroundColor:'#e6e6e6',
        width:windowSize.width,
        paddingBottom:13
    },
    image:{
        width:339,
        height:229,
        marginRight:16
    },
    icon:{
        width:18,
        height:18,
        marginRight:3
    },
    iconBG:{
        height:18,
        flexDirection:'row',
        alignItems:'center'
    },
    bottomView:{
        height:30,
        width:windowSize.width-80,
        flexDirection:'row',
        alignItems:'center'
    }
});