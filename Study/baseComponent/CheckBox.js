/**
 * Created by fanruliang on 2017/9/8.
 */
import React, {Component} from 'react'
import{
    View,
    ListView,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Image,
    DeviceEventEmitter,
    Platform,
}from 'react-native'
import {observable, computed, action} from 'mobx';
import {observer} from 'mobx-react/native';;
import TMFlatList from './TMFlatList'
import PropTypes from 'prop-types';
@observer
class CheckBoxRow extends Component{

    @computed get chosedState(){
        return this.props.chosedItem.indexOf(this.props.row) >= 0;
    }

    @action choseItem  = ()=>{

        let index = this.props.chosedItem.indexOf(this.props.row);
        if (index >= 0){
            this.props.chosedItem.splice(index, 1);
        }else{
            if (!this.props.multi){
                this.props.chosedItem.splice(0, 1);
            }
            this.props.chosedItem.push(this.props.row);
        }
        if (this.props.onPress) {
            this.props.onPress(this.props.chosedItem)
        }
    };

    renderButton(buttonSize)
    {
        return (
            <View style={{width:buttonSize,height:buttonSize,borderRadius:buttonSize/2,borderWidth:2,borderColor:'#2196f3',backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
                {!this.chosedState?null:<View style={{width:buttonSize/2,height:buttonSize/2,borderRadius:buttonSize/4,backgroundColor:'#2196f3'}}/>}
            </View>
        )
    }



    render(){
        return (
            <TouchableOpacity style = {styles.cell} onPress={this.choseItem}>
                {this.renderButton(20)}
                <Text style = {this.props.labelStyle}>{this.props.name}</Text>
            </TouchableOpacity>
        )
    }
}

export default class CheckBox extends Component{
    @observable chosedItem = [];
    static propTypes = {
        arrItem: PropTypes.array,
        multiEnable:PropTypes.bool,
        defaultChose:PropTypes.array,
    }
    static defaultProps={
        arrItem:[],
        multiEnable:false,
        defaultChose:[],
    }


    constructor(props)
    {
        super(props);

    }

    renderItem = ({item,index})=>{
        return (<CheckBoxRow
                    name = {item}
                    multi = {this.props.multiEnable}
                    row = {parseInt(index)}
                    onPress = {this.props.onPress}
                    chosedItem = {this.chosedItem}
                    labelStyle = {this.props.labelStyle}
        />)

    }

    componentDidMount()
    {
        var arrDefualt = this.props.defaultChose;

        for (var i = 0; i < arrDefualt.length; i++) {
            let value  = arrDefualt[i]
            if (value >= 0) {
                this.chosedItem.push(value);
            }
        }
    }


    render()
    {
        return (<TMFlatList
            style={{flex:1}}
            arrSource = {this.props.arrItem}
            renderItem = {this.renderItem}
        />)
    }
}

const styles = StyleSheet.create({
    cell:{
        height:55,
        flexDirection:'row',
        alignItems:'center',
        marginRight:10,
    }
});