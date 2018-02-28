/**
 * 刷新从网络获取;非刷新从本地获取,
 * 若本地数据过期,先返回本地数据,然后返回从网络获取的数据
 * @flow
 */

import {
    AsyncStorage,
} from 'react-native';

import DataRepository, {FlAG_STORAGE} from '../dao/RepositoryDao';
import TimeUtils from './TimeUtils';

export default class RepositoryUtils {
    constructor(aboutCommon) {
        this.aboutCommon = aboutCommon;
        this.DataRepository = new DataRepository(FlAG_STORAGE.flag_mine);
        this.itemMap = new Map();
    }

    updateData(key, value) {
        this.itemMap.set(key, value);
        var arr = [];
        for (var value of this.itemMap.values()) {
            arr.push(value);
        }
        this.aboutCommon.onNotifyDataChanged(arr);
    }

    // 获取指定 url 下的数据
    fetchRepository(url) {
        this.DataRepository.fetchRepository(url)
        .then(result=>{
            if (result) {
                this.updateData(url, result);
                if (!TimeUtils.checkData(result.update_date)) {
                    return this.DataRepository.fetchRepository(url);
                }
            }
        })
        .then((item)=>{
            if (item) {
                this.updateData(url, item);
            }
        })
        .catch(e=>{
            reject(e);
        })
    }

    // 批量获取url对应的数据
    fetchRepositorys(urls) {
        for (let i = 0, l = urls.length; i < l; ++ i) {
            url = urls[i];
            this.fetchRepository(url);
        }
    }
}
