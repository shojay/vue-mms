import axios from 'axios'
import storage from 'good-storage'

class Classic{
    getLatest() {
        return new Promise((resolve, reject) => {
            axios.get('/classic/latest').then(res => {
                this._setLatestIndex(res.data.index)
                const key = this._getKey(res.data.index)
                storage.session.set(key, res.data)
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
    getClassic(index, nextOrPrevious) {
        // 缓存中寻找 or API 写入到缓存中
        // key 确定key
        let key = nextOrPrevious === 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
        let classic = storage.session.get(key)
        if (!classic) {
            return new Promise((resolve, reject) => {
                axios.get(`/classic/${index}/${nextOrPrevious}`).then(res => {
                    storage.session.set(this._getKey(res.data.index), res.data)
                    resolve(res.data)
                }).catch(err => {
                    reject(err)
                })
            })
        }
        return Promise.resolve(classic)
    }
    getClassicFromMy(type, id) {
        return new Promise((resolve, reject) => {
            axios.get(`/classic/${type}/${id}`).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
    getMyFavor() {
        return new Promise((resolve, reject) => {
            axios.get('/classic/favor').then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
    isFirst(index) {
        return index === 1
    }
    isLatest(index) {
        return this._getLatestIndex() == index
    }
    _setLatestIndex(index) {
        sessionStorage.setItem('latest', index)
    }
    _getLatestIndex() {
        return sessionStorage.getItem('latest')
    }
    _getKey(index) {
        const key = 'classic-' + index
        return key
    }
}

export {
    Classic
}