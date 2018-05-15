/**
 * Created by fanruliang on 2017/9/29.
 */
'use strict';
import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import PropTypes from 'prop-types';
export default class ContactHeadImage extends Component{
    static propTypes = {
        arrName: PropTypes.array,
        borderRadius:PropTypes.number
    };
    static defaultProps = {

        arrName:[],
        borderRadius:17.5,
    };

    constructor()
    {
        super();
    }

    componentDidMount()
    {


    }

    getName(str)
    {
        if (str.length >= 2) {
            return str.substring(str.length-2);
        }
        else {
            return str;
        }
    }

    getColor(str)
    {
        let hash = this.hash(str) + '';
        if (hash.length <9) {
            hash += '000000000';
        }
        let r = parseInt(hash.substring(0,3))%255;
        let g = parseInt(hash.substring(3,6))%255;
        let b = parseInt(hash.substring(6,9))%255;
        return `rgba(${r},${g},${b},1.0)`;
    }

    hash(str){
        let hash  =   1315423911,i,ch;
        for (i = str.length - 1; i >= 0; i--) {
            ch = str.charCodeAt(i);
            hash ^= ((hash << 5) + ch + (hash >> 2));
        }

        return  (hash & 0x7FFFFFFF);
    }

    render(){

        let arrName = this.props.arrName;
        let colors = [];
        let showNames = [];
        for (let i = 0; i < arrName.length; i++) {
            let strName = arrName[i];
            colors.push(this.getColor(strName));
            showNames.push(this.getName(strName));
        }
        let ContentText = null;
        if (arrName.length === 3) {
            ContentText = <View style = {[styles.imageStyle,this.props.style,{flexDirection:'row'}]}>
                <View style = {{flex:1}}>
                    <View style = {[styles.textBg,{backgroundColor:colors[0],borderTopLeftRadius:this.props.borderRadius,borderBottomLeftRadius:this.props.borderRadius}]}>
                        <Text style = {[styles.textStyle,this.props.textStyle]} allowFontScaling = {false}>{showNames[0]}</Text>
                    </View>
                </View>
                <View style = {{flex:1}}>
                    <View style = {[styles.textBg,{backgroundColor:colors[1],borderTopRightRadius:this.props.borderRadius}]}>
                        <Text style = {[styles.textStyle,this.props.textStyle]} allowFontScaling = {false}>{showNames[1]}</Text>
                    </View>
                    <View style = {[styles.textBg,{backgroundColor:colors[2],borderBottomRightRadius:this.props.borderRadius}]}>
                        <Text style = {[styles.textStyle,this.props.textStyle]} allowFontScaling = {false}>{showNames[2]}</Text>
                    </View>
                </View>
            </View>;
        }
        else if(arrName.length > 3){
            ContentText = <View style = {[styles.imageStyle,this.props.style,{flexDirection:'row'}]}>
                <View style = {{flex:1}}>
                    <View style = {[styles.textBg,{backgroundColor:colors[0],borderTopLeftRadius:this.props.borderRadius}]}>
                        <Text style = {[styles.textStyle,this.props.textStyle]} allowFontScaling = {false}>{showNames[0]}</Text>
                    </View>
                    <View style = {[styles.textBg,{backgroundColor:colors[1],borderBottomLeftRadius:this.props.borderRadius}]}>
                        <Text style = {[styles.textStyle,this.props.textStyle]} allowFontScaling = {false}>{showNames[1]}</Text>
                    </View>
                </View>
                <View style = {{flex:1}}>
                    <View style = {[styles.textBg,{backgroundColor:colors[2],borderTopRightRadius:this.props.borderRadius}]}>
                        <Text style = {[styles.textStyle,this.props.textStyle]} allowFontScaling = {false}>{showNames[2]}</Text>
                    </View>
                    <View style = {[styles.textBg,{backgroundColor:colors[3],borderBottomRightRadius:this.props.borderRadius}]}>
                        <Text style = {[styles.textStyle,this.props.textStyle]} allowFontScaling = {false}>{showNames[3]}</Text>
                    </View>
                </View>
            </View>;
        }
        else if (arrName.length === 2){
            ContentText = <View style = {[styles.imageStyle,this.props.style,{flexDirection:'row'}]}>
                <View style = {{flex:1}}>
                    <View style = {[styles.textBg,{backgroundColor:colors[0]}]}>
                        <Text style = {[styles.textStyle,this.props.textStyle]} allowFontScaling = {false}>{showNames[0]}</Text>
                    </View>
                </View>
                <View style = {{flex:1}}>
                    <View style = {[styles.textBg,{backgroundColor:colors[1]}]}>
                        <Text style = {[styles.textStyle,this.props.textStyle]} allowFontScaling = {false}>{showNames[1]}</Text>
                    </View>
                </View>
            </View>;
        }
        else if(arrName.length === 1){
            ContentText = <View style = {[styles.imageStyle,this.props.style,{backgroundColor:colors[0]}]}>
                <Text style = {[styles.textStyle,this.props.textStyle]} allowFontScaling = {false}>{showNames[0]}</Text>
            </View>;
        }
        return(
            ContentText
        );
    }

}

const styles = StyleSheet.create({
    imageStyle:
        {
            width:35,
            height:35,
            borderRadius:17.5,
            justifyContent:'center',
            alignItems:'center',
            overflow:'hidden',
        },
    textStyle:
        {
            color:'white',
            fontSize:12,
        },
    textBg:
        {
            flex:1,
            justifyContent:'center',
            alignItems:'center'
        }

});