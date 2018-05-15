/**
 * Created by robin on 16/9/2.
 */
'use strict'
import React,{Component} from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableHighlight,
    StyleSheet,
    Image,
    TouchableOpacity,
    NetInfo,
    Alert,
    NativeModules,
    DeviceEventEmitter,
    AsyncStorage,
    InteractionManager,
    ScrollView,
    Animated,
    ListView
} from 'react-native'
import {windowSize} from './WindowSize'
import {TMListView} from './TMListView'
import PropTypes from 'prop-types';
const dismissKeyboard = require('dismissKeyboard')

export class TabBarScrollView extends Component{
    static propTypes =
    {
        tabbarColor:PropTypes.string,
        tabTextColor:PropTypes.string,
        tabTextSelectColor:PropTypes.string,
        PageSize:PropTypes.number
    }
    static defaultProps = {
        tabbarColor:'#37B4FB',
        tabTextColor:'#8d95a0',
        tabTextSelectColor:'#f1f2f6',
        PageSize:3,
    }
    constructor(props){
        super(props);

        if (props.arrTab.length >= 3) {
          this.PageSize = this.props.PageSize
        }
        else {
          this.PageSize = props.arrTab.length
        }

        this.itemWith = windowSize.width/this.PageSize
        this.tabBarWidth = windowSize.width/9
        this.animValue = new Animated.Value(0)
        var ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>{r1 !== r2}});
        this.state = {
            dataSource:ds.cloneWithRows(props.arrTab),
            index:0
        }
    }

    componentDidMount()
    {

    }

    setTabContentOffset(contentOffset)
    {
      var value = (contentOffset.x/windowSize.width)/(this.PageSize-1)

      Animated.spring(
        this.animValue,
        {
          toValue: value,
          friction:8,
        }
      ).start();
    }
    setIndex(index)
    {

      var width = this.itemWith
      var count = this.props.arrTab.length
      var value = index*1.0/(this.PageSize-1)
      Animated.spring(
        this.animValue,
        {
          toValue: value,
          friction:8,
        }
      ).start();
      if (count > this.PageSize) {
        setTimeout(
          () => {
            var x = (index - 1)*width
            if (x > (count - this.PageSize)*width) {
              x = (count - this.PageSize)*width
            }
            else if (x < 0)
            {
              x = 0;
            }

            var scrollTo = {animated: true}
            scrollTo.x = x
            this._scrollView.scrollTo(scrollTo);},
          200
        );
      }

      this.setState({index:index})


    }

    onSelect(index)
    {
      this.setIndex(index)
      if (this.props.onSelect) {
        this.props.onSelect(index)
      }
    }

    render(){
      var tabs = []
      for (var i = 0; i < this.props.arrTab.length; i++) {
        var title = this.props.arrTab[i]
        var textColor = this.props.tabTextColor
        if (i == this.state.index) {
          textColor = this.props.tabTextSelectColor
        }
        tabs.push(<Text key ={i} style = {{width:this.itemWith,height:25,fontSize:15,textAlign:'center',color:textColor}}
                           onPress = {this.onSelect.bind(this,i)}>{title}</Text>)
      }
        return(
          <View style = {[{width:windowSize.width,height:34,backgroundColor:'#33363b'},this.props.style]}>
            <ScrollView

              ref={(scrollView) => {this._scrollView = scrollView}}
              horizontal = {true}
              showsHorizontalScrollIndicator = {false}>
              <View>
                <View style = {{flexDirection:'row',marginTop:5}}>
                  {tabs}
                </View>
              <Animated.View style = {{width:this.tabBarWidth,height:3,position:'absolute',
                                    left:this.animValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [(this.itemWith - this.tabBarWidth)/2, windowSize.width -(this.itemWith + this.tabBarWidth)/2],
                                }),top:30,backgroundColor:this.props.tabbarColor}}>

              </Animated.View>
              </View>
            </ScrollView>

          </View>

        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f0f0f0'
    },
});
