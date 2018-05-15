/**
 * Created by robin on 16/9/5.
 */
'use strict'

import React,{Component} from 'react'
import {
    View,
    Image,
    Text,
    StyleSheet,
    ListView,
    RefreshControl,
    Dimensions
} from 'react-native'
export var windowSize = Dimensions.get('window');
import PropTypes from 'prop-types';


export class TMListView extends Component{
    static propTypes =
        {
            arrSource:PropTypes.any,
            renderRow:PropTypes.func,
            renderSectionHeader:PropTypes.func,
            type:PropTypes.string,
            sectionIds:PropTypes.array,
            rowIds:PropTypes.array,
            tableViewStyle: PropTypes.oneOf(['Plain', 'Grouped']),
            showNoData: PropTypes.bool,
            getSectionData:PropTypes.func,
            getRowData:PropTypes.func,
        }
    static defaultProps = {
        arrSource:[],
        tableViewStyle:'Plain',
        showNoData:true,
        getSectionData:(dataBlob, sectionID)=>{return dataBlob[sectionID]},
        getRowData:(dataBlob, sectionID, rowID)=>{return dataBlob[sectionID][rowID]},
    }


    constructor(props) {
        super(props);
        let ds;
        if (props.tableViewStyle == 'Plain') {
            ds = new ListView.DataSource({  rowHasChanged: (row1, row2) => row1 !== row2,
            })
        }
        else {

            ds = new ListView.DataSource(
                {
                    getSectionData: this.props.getSectionData,
                    getRowData: this.props.getRowData,
                    rowHasChanged: (row1, row2) => row1 !== row2,
                    sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
                })
        }

        this.ds = ds
        this.state = {
            dataSource: this.getDataSource(props),
        };
    }

    getDataSource(props)
    {
        let dataSource = null
        if (props.tableViewStyle == 'Plain')
        {
            dataSource = this.ds.cloneWithRows(props.arrSource)
        }
        else {
            if (props.sectionIds != null && props.rowIds != null) {
                dataSource = this.ds.cloneWithRowsAndSections(props.arrSource, props.sectionIds, props.rowIds)
            }
            else {
                dataSource = this.ds.cloneWithRowsAndSections(props.arrSource)
            }
        }

        return dataSource
    }
    componentWillReceiveProps(props)
    {
        this.setState({dataSource:this.getDataSource(props)})
    }

    scrollTo(e)
    {
        this.refs.listView.scrollTo(e)
    }


    render(){
        if (this.props.arrSource.length == 0 && this.props.showNoData) {
            return (<View style = {{backgroundColor:'#f4f4f4',flex:1,alignItems:'center'}}>
                {/*<Image source = {require('../res/img/icon_nopic@2x.png')} style = {{width:110,height:80,marginTop:100}}></Image>*/}
                <Text allowFontScaling={false} style = {{color:'#8d95a0',fontSize:14,marginTop:5}}>暂无数据</Text>
            </View>)
        }
        else {
            return (
                <ListView
                    dataSource={this.state.dataSource}
                    ref='listView'
                    style={styles.listView}
                    enableEmptySections = {true}
                    removeClippedSubviews={false}
                    renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={[styles.separator,this.props.separatorStyle]} />}
                    {...this.props}
                />
            );
        }
    }

}

const styles = StyleSheet.create({
    listView: {
        flex:1,
        backgroundColor: '#f1f2f6',
    },
    separator: {
        height: 1,
        backgroundColor: '#F4F4F4',
    },

});
