'use strict'
import React, {Component} from 'react';
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
    ScrollView
}from 'react-native';
import CheckBox from './CheckBox'
export class TestCell extends Component {
    // 构造
    constructor(props) {
        super(props);
        this.initial = -1;
        // 初始状态
        this.state = {

        };
    }

    componentWillMount()
    {

    }


    componentDidMount() {


    }

    onDidSelect = (arrChose)=>
    {
        if (this.props.onDidSelect)
        {
            this.props.onDidSelect(arrChose,this.props.rowData);
        }

    }

    render() {

        return (
            <ScrollView style={styles.container}>
                <View style = {{alignItems:'center',width:'100%',marginTop:20,marginBottom:20,flexDirection:'row',marginLeft:10}}>
                    <Text allowFontScaling={false} style={{fontSize:17,color:'#4caeff',maxWidth:windowSize-100}}>{this.props.title}</Text>
                    <Text allowFontScaling={false} style={{marginLeft:10,color:'#8f8e94',fontSize:17}}>{this.props.No}</Text>
                </View>
                <View
                    style={{marginLeft:15}}>
                    <CheckBox
                        arrItem = {this.props.arrItem}
                        buttonSize = {20}
                        multiEnable={false}
                        labelStyle = {{maxWidth:windowSize.width - 90,fontSize:15,marginLeft:10}}
                        onPress={this.onDidSelect}
                        defaultChose={[this.initial]}/>
                </View>
            </ScrollView>
        )
    }
}
const windowSize = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        width:windowSize.width,
        backgroundColor:'white',
    },
});