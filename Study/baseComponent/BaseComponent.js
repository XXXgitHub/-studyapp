import React, {Component, PropTypes} from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react/native'
import Store from '../store'
import {
    DeviceEventEmitter
}from 'react-native'
@observer
export default class BaseComponent extends Component {
    // 构造
    constructor(props) {
        super(props);
        this.dataStore = Store.data;
        this.loginStore = Store.login;
    }

    navigatorPush(nextRouter, params = null) {
        const {navigate} = this.props.navigation;
        navigate(nextRouter, params);
    };


}