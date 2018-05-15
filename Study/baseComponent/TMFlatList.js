//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,FlatList,Image } from 'react-native';
import PropTypes from 'prop-types';
// create a component
export default class TMFlatList extends Component {
    static propTypes =
        {
            arrSource:PropTypes.any,
        }
    static defaultProps = {
        arrSource:[],
    }


    constructor(props) {
        super(props);

        this.onOpen = false;

    }
    scrollTo(e)
    {
        this.listView.scrollToOffset(e);
    }
    _keyExtractor = (item, index) => `${index}`;

    render() {

        if (this.props.arrSource.length === 0) {
            return (<View style = {{backgroundColor:'#f4f4f4',flex:1,alignItems:'center'}}>
                <Image  style = {{width:110,height:80,marginTop:100}}/>
                <Text allowFontScaling={false} style = {{color:'#8d95a0',fontSize:14,marginTop:5}}>暂无数据</Text>
            </View>);
        }
        else
        {
            return (
                <FlatList
                    data={this.props.arrSource}
                    ref={(ref)=>this.listView = ref}
                    style={styles.listView}
                    ItemSeparatorComponent={() => <View style={[styles.separator,this.props.separatorStyle]} />}
                    keyExtractor={this._keyExtractor}
                    {...this.props}
                />
            );
        }

    }
}

// define your styles
const styles = StyleSheet.create({
    listView: {
        flex:1,
        backgroundColor: '#f1f2f6',
    },
    separator: {
        height: 1,
        backgroundColor: '#ebebeb',
    },
});

