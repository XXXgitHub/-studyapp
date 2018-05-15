import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';


export default class login extends Component {
    static navigationOptions = {
        header:null
    };
    constructor()
    {
        super();
        this.phoneNum ='';
        this.state = {
            isSending: false,
            second: 60
        }
    }

    //获取登录信息
    getLoginInfo(){
        AsyncStorage.getItem('userInfo',(error, object)=>{
            if (error){
                console.log(error);
            }
            else{
                let oldLoginInfo = JSON.parse(object);
                if (oldLoginInfo != null)
                {
                    this.phoneNum = oldLoginInfo.account;
                }

            }
        });
    }

    //存储登录信息
    saveLoginInfo(){
        AsyncStorage.setItem('userInfo', JSON.stringify({
            account:this.phoneNum,
        }));
    }

    countDown() {
        var second = this.state.second;
        second--;
        if (second == 0) {
            this.setState({second: second, isSending: false});
            if (this.interval != null)
            {
                clearInterval(this.interval);
            }

        }
        else {
            this.setState({second: second});
        }
    }

    sendAction() {
        if (this.phoneNum.length === 0) {
            this.setState({tip: '请填写手机号'});
        }
        else if (this.phoneNum.length !== 11) {
            this.setState({tip: '您输入的手机号码有误，请重新输入'});
        }
        else {
            this.setState({second: 60, isSending: true, tip: ''});
            this.interval = setInterval(
                this.countDown.bind(this),
                1000
            );

        }
    }

    changeText = (text) =>{
        this.phoneNum = text;
    };
    changeText2 = (text) =>{
        this.code = text;
    };
    render() {
        var strSend = '发送';
        var bgcolor = {backgroundColor: '#37B4FB'};
        var textcolor = {color: '#fff', fontSize: 14};
        if (this.state.isSending) {
            strSend = '剩余(' + this.state.second + ')S';
            bgcolor = {backgroundColor: '#F3F3F3'};
            textcolor = {color: '#BBBBBB'};
        }
        return (
            <View style={styles.container}>
                <View style = {{flex:1,padding:40}}>
                    <View style = {{height:100,justifyContent:'center'}}>
                        <Text style = {{fontSize:18}}>验证码登录</Text>
                    </View>

                    <TextInput
                        keyboardType = 'numeric'
                        placeholder= '手机号'
                        placeholderTextColor='gray'
                        autoCapitalize= 'none'
                        autoCorrect={false}
                        clearButtonMode='always'
                        underlineColorAndroid = 'rgba(0,0,0,0)'
                        style={styles.inputText}
                        onChangeText={this.changeText} />
                    <View
                        style = {{marginTop:50,height:30,flexDirection:'row',alignContent:'center'}}
                    >
                        <View style = {{flex:1,marginRight:10}}>
                            <TextInput
                                keyboardType = 'numeric'
                                placeholder= '请输入验证码'
                                placeholderTextColor='gray'
                                autoCapitalize= 'none'
                                autoCorrect={false}
                                clearButtonMode='always'
                                underlineColorAndroid = 'rgba(0,0,0,0)'
                                style={styles.inputText}
                                onChangeText={this.changeText2}/>
                        </View>

                        <TouchableOpacity style={[styles.sendBtn, bgcolor]} onPress={this.sendAction.bind(this)} disabled={this.state.isSending}>
                            <Text style={textcolor}>{strSend}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height: 40, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: '#FC9093', fontSize: 12}}>{this.state.tip}</Text>
                    </View>

                    <TouchableOpacity style = {{height:40,justifyContent:'center',alignItems:'center',borderWidth:1,
                        borderRadius:4,borderColor:'gray'}}
                                      onPress={this.onLogin}
                    >
                        <Text>登录</Text>
                    </TouchableOpacity>
                </View>
                <View style = {{height:100}}>
                </View>
            </View>
        );
    }

    onLogin = ()=>{
        this.setState({second: 0, isSending: false});
        if (this.interval != null)
        {
            clearInterval(this.interval);
        }
        const { navigate } = this.props.navigation;
        navigate('TabView');
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputText:{
        height:30,
        borderWidth:1,
        borderRadius:2,
        paddingLeft:10,
        fontSize:15,
        backgroundColor:'white',
        borderColor:'gray',
        paddingTop:0,
        paddingBottom:0
    },
    sendBtn: {
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 30,
        borderRadius:2
    },
});