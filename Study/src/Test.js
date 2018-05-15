'use strict'
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
    Platform
}from 'react-native'
export var windowSize = Dimensions.get('window');
import {TestCell} from '../baseComponent/TestCell';
import {TMListView} from '../baseComponent/TMListView';
import TestResult from './TestResult';
export default class Test extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        headerTitle: '测试',
        headerTitleStyle: {
            alignSelf:'center',
            marginRight: 50,
            // marginLeft: 100,
        },
    });


    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            arrSource:[
                {title:'题目题目题目题目题目题目题目',items:['答案1','答案2','答案3','答案4']},
                {title:'题目题目题目题目题目题目题目',items:['答案1','答案2','答案3','答案4']},
                {title:'题目题目题目题目题目题目题目',items:['答案1','答案2','答案3','答案4']}
            ],
            index:0,
            nextEnable:false,
            showResult:false
        };
    }


    componentDidMount() {
    }


    onDidSelect = (arrChose,rowData)=>
    {
        if (arrChose.length > 0) {

            this.setState({nextEnable:true})
        }
        else
        {
            this.setState({nextEnable:false})
        }

    }


    renderRow = (rowData, sectionID, rowID)=>
    {
        let  index= Number(rowID)+1;
        let No = `(${index}/${this.state.arrSource.length})`;
        return (
            <View style = {{width:windowSize.width}}>
                <TestCell
                    title = {(Number(rowID)+1)+'.'+rowData.title}
                    No = {No}
                    arrItem = {rowData.items}
                    rowData = {rowData}
                    onDidSelect = {this.onDidSelect}>
                </TestCell>
            </View>
            )
    }

    onCommit()
    {
        this.setState({showResult:true});
    }


    next = ()=>{
        if (this.state.nextEnable) {
            let index = this.state.index;
            if (index < this.state.arrSource.length - 1) {
                index += 1;
                this.toIndexPage(index);
                if (this.state.arrSource[index].Value == null) {
                    this.state.nextEnable = false;
                }

                this.setState({index: index});

            }
            else {
                this.onCommit();
            }
        }

    }

    previous = ()=>{
        var index = this.state.index;
        if (index > 0) {
            index -= 1;
            this.toIndexPage(index)
            this.setState({index:index,nextEnable:true})
        }

    }


    toIndexPage(index)
    {
        this.listView.scrollTo({x:windowSize.width * index,animated:true});
        // if(__ANDROID__){
        //     InteractionManager.runAfterInteractions(()=>{
        //         this.setState({ nextEnable: true })
        //     })
        // }
    }


    renderButton()
    {
        let index = this.state.index;
        let arrSource = this.state.arrSource;
        let nextEnable = this.state.nextEnable;
        return (
            <View style={{height:40,backgroundColor:'#fff',flexDirection:'row',alignItems:'center'}}>
                <TouchableOpacity style={{marginLeft:10,height:26,width:81,backgroundColor:'white',justifyContent:'center',alignItems:'center',borderWidth:1,borderRadius:13,borderColor:index == 0?'#dddddd':'#4caeff'}}
                                  onPress={this.previous}>
                    <Text allowFontScaling={false} style={{color:index == 0?'#dddddd':'#4caeff'}}>{'<上一题'}</Text>
                </TouchableOpacity>
                <View style={{flex:1}}/>
                <TouchableOpacity style={{marginRight:10,height:26,width:81,backgroundColor:'white',justifyContent:'center',alignItems:'center',borderWidth:1,borderRadius:13,borderColor:nextEnable?'#4caeff':'#dddddd'}}
                                  onPress={this.next}>
                    <Text allowFontScaling={false} style={{color:nextEnable?'#4caeff':'#dddddd'}}>{index == arrSource.length-1?'提交':'下一题>'}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    renderTest()
    {
        return (
            <View style = {{flex:1, }}>
                <TMListView
                    arrSource={this.state.arrSource}
                    ref = {(scrollView) =>{this.listView = scrollView}}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    horizontal={true}
                    renderRow={this.renderRow}
                    scrollEnabled={false}
                    style = {{backgroundColor:'white'}}/>
                {this.renderButton()}
            </View>
        )
    }


    render() {

        return (
            <View
                style={styles.container}>
                {this.renderTest()}
                {this.state.showResult?<TestResult {...this.props}/>:null}
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});