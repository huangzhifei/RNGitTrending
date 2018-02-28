/**
 * BaseCommon
 * 公共逻辑处理
 * @flow
 */
'use strict';


import React, {Component} from 'react';
import {
    DeviceEventEmitter,
} from 'react-native';

import {ACTION_HOME} from '../page/Entry/HomePage'

export default class BaseComponent extends Component {
    constructor(props) {
        super (props);
        this.state = {
            theme: this.props.theme,
        }
    }

    // 新建通知的监听
    componentDidMount() {
        this.baseListener = DeviceEventEmitter.addListener('ACTION_BASE', (action, params) =>this.changeThemeAction(action, params));
    }

    // 卸载通知
    componentWillUnmount() {
        if (this.baseListener) {
            this.baseListener.remove();
        }
    }

    // 接收通知
    changeThemeAction(action, params) {
        if (action === ACTION_HOME.A_THEME) {
            this.onThemeChange(params);
        }
    }

    // 更新通知
    onThemeChange(theme) {
        if (!theme) return;
        this.setState(
            {
                theme: theme,
            }
        );
    }
}

