import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    WebView,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Keyboard,
    Animated,
    Modal,
    NetInfo
} from 'react-native';
const __ANDROID__ = (Platform.OS === 'android')
import HeadImage from '../baseComponent/ContactHeadImage';
import {windowSize} from '../baseComponent/WindowSize';
import CheckBox from 'react-native-check-box';
import WebViewAndroid from 'react-native-webview-android';
import HTMLView from 'react-native-htmlview';
import BaseComponent from "../baseComponent/BaseComponent";
import {MyVideo} from '../baseComponent/MyVideo/MyVideo';
const dismissKeyboard = require('dismissKeyboard');

export default class ArticleDetail extends BaseComponent {
    static navigationOptions = ({ navigation }) => ({
        headerTitle:'',
        header:navigation.state.params.header,
    });
    constructor(props)
    {
        super(props);
        this.timer = null;
        this.second = 0;
        this.labels = ['生活','科技','娱乐'];
        this.state = {
            isFocus:false,
            keyboardHeight:new Animated.Value(0)
        }
        this.header = props.navigation.state.params.header;
    }


    componentDidMount() {
        this.timer = setInterval(
            () => { this.second++ },
            1000
        );
        let {key} = this.props.navigation.state.params;
        this.dataStore.getDetail(key)

        this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
        //监听网络状态改变
        NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
        this.dataStore.strBodyHtml = null;
        this.dataStore.videoUrl = null;
        console.log('阅读了'+this.second+'秒')
        if (this.timer != null) {
            clearTimeout(this.timer);
        }
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
        NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
    }



    handleConnectivityChange(status) {
        console.log('status change:' + status.type);
    }

    _keyboardDidShow(e){
        console.log('e.startCoordinates.height',e.endCoordinates.height)
        Animated.timing(                            // 随时间变化而执行的动画类型
            this.state.keyboardHeight,                      // 动画中的变量值
            {
                toValue: e.endCoordinates.height,                             // 透明度最终变为1，即完全不透明
            }
        ).start();

    }

    _keyboardDidHide(e){
        Animated.timing(                            // 随时间变化而执行的动画类型
            this.state.keyboardHeight,                      // 动画中的变量值
            {
                toValue: 0,                             // 透明度最终变为1，即完全不透明
            }
        ).start();
        this.setState({
            isFocus:false
        })
    }

    renderHeader()
    {
        let {title,score} = this.props.navigation.state.params;
        return(<Animated.View key = 'header' style={{backgroundColor:'#f5f5f5',height:58,flexDirection:'row', paddingHorizontal:30,alignItems:'center'}}>
            <HeadImage
                style={{width:40,height:40,borderRadius:20,marginHorizontal:10}}
                arrName={['张三']}
                borderRadius={20}
            />
            <View style={{flex:1,height:36, justifyContent:'space-between'}}>
                <Text style = {{fontSize:10,color:'#101010'}}>张三</Text>
                <Text style = {{fontSize:10,color:'#101010'}}>发布时间：2018-03-03 13：19</Text>
            </View>

            <View style={{height:20,flexDirection:'row',alignItems:'center'}}>
                <Image source={require('../images/icon1.png')} style={{width:18,height:18,marginRight:3}}/>
                <Text style = {styles.text1}>{score}</Text>
            </View>
        </Animated.View>)
    }


    renderbody()
    {
        // let body = '';
        // for (let i=0;i<80;i++)
        // {
        //     body += '文字内容';
        // }
        // let body2 = '';
        // for (let i=0;i<10;i++)
        // {
        //     body2 += '文字内容';
        // }
        // let data = [{type:'text',value:body},{type:'image',value:''},{type:'text',value:body2}];
        // return (<View key = 'body' style={{paddingHorizontal:25,paddingVertical:10}}>
        //     {
        //         data.map((item,i)=>{
        //             if (item.type === 'text')
        //             {
        //                 return (<Text key = {i} style = {styles.bodyText}>{item.value}</Text>)
        //             }
        //             else if (item.type === 'image')
        //             {
        //                 return (<Image key = {i} style={{height:200,width:'100%',backgroundColor:'#e6e6e6',marginVertical:10}}/>)
        //             }
        //         })
        //     }
        //
        //
        // </View>)
        if (this.dataStore.strBodyHtml != null)
        {
            return (
                <HTMLView
                    style={{paddingHorizontal:30}}
                    value={this.dataStore.strBodyHtml}
                />
            )
        }


    }

    renderLabels()
    {
        return (
            <View style={{marginTop:10,flexDirection:'row',height:40,alignItems:'center',marginBottom:15}}>
                {this.labels.map((item,i)=>{
                    return (
                        <View key = {i} style={{marginLeft:20,height:30, paddingHorizontal:15,justifyContent:'center',alignItems:'center',borderRadius:15,borderWidth:1,borderColor:'#bbbbbb'}}>
                            <Text style = {styles.bodyText}>{item}</Text>
                        </View>
                    )
                })}
            </View>)
    }

    renderPeople()
    {
        let peoples = ['张三','李四','范汝亮','韩建','王肖林','沈蔚乐','杨燚'];
        return(
            <View style={{backgroundColor:'#e6e6e6',height:114,paddingVertical:13}}>
                <ScrollView horizontal={true} style={{backgroundColor:'white'}}>
                    {peoples.map((item,i)=>{
                        return (<View key = {i} style={{height:88,width:70,alignItems:'center',justifyContent:'center'}}>
                            <HeadImage arrName={[item]} style={{width:40,height:40,borderRadius:20}}/>
                        </View>)
                    })}
                </ScrollView>
            </View>
        )
    }

    renderComment()
    {
        let arrComment = [{name:'张三',date:'',like:300,text:'评论内容，随便什么内容都可以，评论内容，随便什么内容都可以评论内容，随便什么内容都可以'},
            {name:'李四',date:'',like:200,text:'评论内容，随便什么内容都可以，评论内容，随便什么内容都可以评论内容，随便什么内容都可以',reply:[{name:'张三',date:'',text:'评论内容，随便什么内容都可以，评论内容，随便什么内容都可以评论内容，随便什么内容都可以'},{name:'王五',date:'',text:'评论内容，随便什么内容都可以，评论内容，随便什么内容都可以评论内容，随便什么内容都可以'}]},
            {name:'范汝亮',date:'',like:300,text:'评论内容，随便什么内容都可以，评论内容，随便什么内容都可以评论内容，随便什么内容都可以'}]
        return (
            <View style={{backgroundColor:'white',paddingTop:30,paddingBottom:30,width:windowSize.width}}>
                <Text style = {{fontSize:14,color:'#101010',marginLeft:20,marginBottom:10}}>热门评论</Text>
                <View style={{marginLeft:10,width:windowSize.width-20,height:1,backgroundColor:'#e6e6e6'}}/>
                {arrComment.map((item,i)=>{
                    return this.renderCommentItem(item,i)
                })}
            </View>
        )
    }

    renderCommentItem(item,i)
    {
        return (
            <View key = {i} style={{paddingLeft:25,paddingTop:20,paddingRight:10,width:windowSize.width}}>
                <View style={{flexDirection:'row',height:40,alignItems:'center'}}>
                    <HeadImage arrName={[item.name]} style={{width:40, height:40,borderRadius:20}}/>
                    <View style={{marginLeft:15,justifyContent:'center',height:40}}>
                        <Text style = {{fontSize:10,color:'#101010',marginBottom:5}}>{item.name}</Text>
                        <Text style = {{fontSize:10,color:'#b3b3b3'}}>5分钟前</Text>
                    </View>
                    <View style={{flex:1}}/>
                    <Image source={require('../images/icon3.png')} style={{width:18,height:18,marginRight:10}}/>
                    <Text style = {{fontSize:10,color:'#101010',marginRight:10}}>{item.like}</Text>
                </View>
                <View style={{marginLeft:55}}>
                    <Text style = {{fontSize:12,color:'#101010'}}>{item.text}</Text>
                    {this.renderCommentReply(item)}
                </View>
            </View>
        )
    }
    renderCommentReply(item)
    {
        if (item.reply == null)
        {
            return null;
        }
        else
        {
            return (
                <View style={{backgroundColor:'#f2f2f2', paddingLeft:15,paddingBottom:15,marginTop:10}}>
                    {item.reply.map((replyItem,i)=>{
                        return(
                            <View key = {i} style={{marginTop:15}}>
                                <View style={{flexDirection:'row'}}>
                                    <Text style = {{fontSize:10,color:'#101010',marginRight:25}}>{replyItem.name}</Text>
                                    <Text style = {{fontSize:10,color:'#b3b3b3'}}>5分钟前</Text>
                                </View>
                                <Text style = {{fontSize:12,color:'#101010'}}>
                                    回复 {item.name}:{replyItem.text}
                                </Text>
                            </View>
                        )
                    })}
                </View>
            )
        }

    }

    renderVideo()
    {

        let src = 'http://player.youku.com/embed/XMzU3Nzk2ODE3Ng==';
        let html = `<iframe marginwidth=0 marginheight=0 src=${src} frameborder=0 width=100% scrolling=no height=200 allowfullscreen="true" allowtransparency="true"></iframe>`

        let {isVideo} = this.props.navigation.state.params;
        if (isVideo)
        {
            if (__ANDROID__)
            {
                return (<WebViewAndroid
                    key = 'video'
                    style={styles.unFullScreen}
                    source = {{html:html}}
                />)
            }
            else
            {
                return (<WebView
                    key = 'video'
                    style={styles.unFullScreen}
                    source = {{html:html}}
                    scalesPageToFit = {false}
                    scrollEnabled = {false}
                    allowsInlineMediaPlayback = {true}
                />)
            }
        }
        else
        {
            if(this.dataStore.videoUrl != null)
            {
                return (<MyVideo
                    url={this.dataStore.videoUrl}
                    style={styles.unFullScreen}
                    onFullScreen={(isFull)=>{
                        if (isFull)
                        {
                            this.props.navigation.setParams({
                                header:null
                            })
                        }
                        else
                        {
                            this.props.navigation.setParams({
                                header:this.header
                            })
                        }

                    }
                    }
                />)
            }
            else
            {
                return null;
            }
        }


    }


    renderBottomBar()
    {
        let {score} = this.props.navigation.state.params;
        return (
            <View key = 'bottomBar' style={{flexDirection:'row',height:40,alignItems:'center'}}>

                <TouchableOpacity style={{flex:1,alignItems:'center',justifyContent:'center'}} onPress={this.onCollect}>
                    <View style={{width:24, height:24,backgroundColor:'gray'}}/>
                </TouchableOpacity>

                <TouchableOpacity style={{flex:1,alignItems:'center',justifyContent:'center'}} onPress={this.onMessage}>
                    <View style={{width:24, height:24,backgroundColor:'gray'}}/>
                </TouchableOpacity>

                <TouchableOpacity style={{flex:1,alignItems:'center',justifyContent:'center'}} onPress={this.onWrite}>
                    <View style={{width:24, height:24,backgroundColor:'gray'}}/>
                </TouchableOpacity>

                <TouchableOpacity style={{flex:3,flexDirection:'row',alignItems:'center', justifyContent:'center',backgroundColor:'#5677FC', height:40}}
                                  onPress={this.onTest}
                >
                    <Text style = {{fontSize:14,color:'#fff'}}>答题拿学分</Text>
                    <Image source={require('../images/icon1.png')} style={{width:18,height:18,marginRight:3}}/>
                    <Text style = {{fontSize:12,color:'#fff'}}>+{score}</Text>
                </TouchableOpacity>

            </View>)
    }

    renderEditText()
    {
        return (
            <Modal style={{flex:1}}
                   visible={this.state.isFocus}
                   transparent = {true}>
                <TouchableOpacity style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)'}} onPress={()=>{dismissKeyboard();}}/>
                <Animated.View style = {{height:88,backgroundColor:'#fff',position:'absolute', bottom:this.state.keyboardHeight.interpolate({
                        inputRange: [0, 1000],
                        outputRange: [0, 1000]
                    }),left:0, right:0}}>
                    <View style={{height:44,width:windowSize.width,flexDirection:'row',alignItems:'center'}}>
                        <View style={styles.inputText}>
                            <TextInput
                                autoFocus={true}
                                placeholder= '评论内容'
                                autoCapitalize= 'none'
                                autoCorrect={false}
                                clearButtonMode='always'
                                underlineColorAndroid = 'rgba(0,0,0,0)'
                                style={{flex:1,paddingTop:0, paddingBottom:0,paddingLeft:10, fontSize:15,}}
                                onChangeText={this.changeText}/>
                        </View>

                        <TouchableOpacity style={{marginRight:15,marginLeft:20,height:35,width:50,backgroundColor:'#5677FC',justifyContent:'center',alignItems:'center'}}>
                            <Text style = {{color:'#fff',fontSize:14}}>发布</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row', height:44,alignItems:'center'}}>
                        <CheckBox
                            style={{flex: 1,marginLeft:15}}
                            onClick={this.onClick}
                            isChecked={true}
                            rightText='匿名'
                        />
                    </View>
                </Animated.View>
            </Modal>)
    }

    render() {

        let {title,isVideo} = this.props.navigation.state.params;
        return (
            <View style={styles.container}>

            <ScrollView style={[styles.scrollView,isVideo || this.dataStore.videoUrl != null?{top:200}:null]}>
                <View key = 'title' style={{backgroundColor:'white',paddingHorizontal:30,height:68,justifyContent:'center'}}>
                    <Text style = {{fontSize:16,color:'#101010'}}>{title}</Text>
                </View>
                {this.renderHeader()}
                {this.renderbody()}
                {this.renderLabels()}
                {this.renderPeople()}
                {this.renderComment()}
                {this.renderBottomBar()}
            </ScrollView>
                {this.renderEditText()}
                {this.renderVideo()}
            </View>
        );
    }

    onClick = ()=>
    {

    }

    onCollect = ()=>
    {

    }

    onMessage = ()=>
    {

    }

    onWrite = ()=>
    {
        console.log('onWrite')
        this.setState({isFocus:true})
    }

    changeText = (text) =>{
        this.commentText = text;
    };

    onTest = ()=>
    {
        this.props.navigation.navigate('Test')
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    text1:{
        fontSize:12,
        color:'#101010'
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom:0,
    },
    unFullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height:200,
    },
    bodyText:{
        fontSize:14,
        color:'#101010'
    },
    scrollView:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom:0,
    },
    inputText:{
        marginLeft:15,
        height:30,
        borderWidth:1,
        borderRadius:15,
        backgroundColor:'white',
        borderColor:'gray',
        flex:1,
    }
});