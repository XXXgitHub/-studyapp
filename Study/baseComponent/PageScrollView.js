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
    ScrollView
} from 'react-native'
import {windowSize} from './WindowSize'
import {TabBarScrollView} from './TabBarScrollView'
import {TMListView} from './TMListView'
const dismissKeyboard = require('dismissKeyboard')
import PropTypes from 'prop-types';
export class PageScrollView extends Component{
    static propTypes =
    {
        scrollEnabled:PropTypes.bool,
        arrTab:PropTypes.array,
        renderRow:PropTypes.func,
        tabProps:PropTypes.any
    }
    static defaultProps = {
        scrollEnabled:true,
        arrTab:[]
    }
    constructor(props){
        super(props);
        this.index = 0;
        this.state = {

        }
    }

    componentDidMount()
    {

    }

    onSelectTab = (index)=>
    {
      var scrollTo = {animated: false}
      scrollTo.x = windowSize.width*index
      this._scrollView.scrollTo(scrollTo);
      this.onSelectPage(index)
    }

    onSelectPage(index)
    {
      this.index = index
      if (this.props.onSelectPage) {
        this.props.onSelectPage(index)
      }
    }

    onScrollEnd(e)
    {
      var contentOffset = e.nativeEvent.contentOffset
      var pageIndex = parseInt((contentOffset.x+10)/windowSize.width)
      if (pageIndex != this.index) {
        this._tabBarScrollView.setIndex(pageIndex)
        this.onSelectPage(pageIndex)
      }
    }

    onScroll = (e)=>
    {
      var contentOffset = e.nativeEvent.contentOffset
      this._tabBarScrollView.setTabContentOffset(contentOffset);
    }

    render(){
      return(
        <View style={styles.container}>
          <TabBarScrollView
            ref={(scrollView) => {this._tabBarScrollView = scrollView}}
            onSelect = {this.onSelectTab}
            arrTab = {this.props.arrTab}
            {...this.props.tabProps}>
          </TabBarScrollView>
          <TMListView
              ref={(scrollView) => {this._scrollView = scrollView}}
              horizontal = {true}
              pagingEnabled = {true}
              renderRow = {this.props.renderRow}
              arrSource = {this.props.arrTab}
              showsHorizontalScrollIndicator = {false}
              onScroll = {this.onScroll}
              onMomentumScrollEnd={(e)=>this.onScrollEnd(e)}
              scrollEnabled = {this.props.scrollEnabled}>
          </TMListView>

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
