import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ListView,
    Dimensions,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import { SwipeListView,SwipeRow } from 'react-native-swipe-list-view';
import Cell from '../baseComponent/ArticleCell';

export default class Favorite extends Component {
    static navigationOptions = {
        headerTitle:'收藏夹'
    };
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            listType: 'FlatList',
            arrSource : [
                {key:'1',image:require('../images/p1.png'),title:'如果你无法简洁的表达你的想法，那只说明你还不够了解它。',score:30,isRead:false,isVideo:false,viewCount:20,commentCount:20},
                {key:'2',image:require('../images/p1.png'),title:'如果你无法简洁的表达你的想法，那只说明你还不够了解它。',score:30,isRead:true,isVideo:false,viewCount:20,commentCount:20},
                {key:'3',image:require('../images/p1.png'),title:'如果你无法简洁的表达你的想法，那只说明你还不够了解它。',score:30,isRead:true,isVideo:true,viewCount:20,commentCount:20},
                {key:'4',image:require('../images/p1.png'),title:'如果你无法简洁的表达你的想法，那只说明你还不够了解它。',score:30,isRead:false,isVideo:false,viewCount:20,commentCount:20},
            ],
        };
    }

    closeRow(rowMap, rowKey) {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    }

    deleteRow(rowMap, rowKey) {
        this.closeRow(rowMap, rowKey);
        const newData = [...this.state.arrSource];
        const prevIndex = this.state.arrSource.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        this.setState({arrSource: newData});
    }

    render() {
        return (
            <SwipeListView
                useFlatList
                data={this.state.arrSource}
                renderItem={ (data, rowMap) => (
                    <Cell
                        item = {data.item}
                        onPress={()=>console.log('You touched me')}/>)
                }
                renderHiddenItem={ (data, rowMap) => (
                    <View style={styles.rowBack}>
                        <TouchableOpacity style={styles.backRightBtn} onPress={ _ => this.deleteRow(rowMap, data.item.key) }>
                            <Text style={{color:'#fff'}}>删除</Text>
                        </TouchableOpacity>
                    </View>
                )}
                disableRightSwipe = {true}
                rightOpenValue={-75}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    rowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        backgroundColor:'#e6e6e6'
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 13,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        backgroundColor: 'red',
        right: 0
    },
});