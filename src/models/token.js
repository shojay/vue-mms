import { config } from '../config/index'
import axios from 'axios'

class Token{
    constructor() {
        this.verifyUrl = config.api_base_url + 'token/verify'
        this.tokenUrl = config.api_base_url + 'token'
    }

    tokenLogin() {
        return new Promise((resolve, reject) => {
            axios.post('/token/login').then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }

    verify() {
        let token = sessionStorage.getItem('token')
        if (!token) {
            // 生成token
            this.getTokenFromServer()
        } else {
            // 验证token
            this._verifyFromServer(token)
        }
    }

    _verifyFromServer(token) {
        axios.post(this.verifyUrl, {
            token
        }).then(res => {
            let valid = res.data.is_valid
            if (!valid) {
                // 如果无效重新获取token
                this.getTokenFromServer()
            } else {
                console.log('token ok')
            }
        })
    }

    getTokenFromServer(callback) {
        axios.post(this.tokenUrl, {
            type: 101,
            account: 'bom0628@163.com',
            secret: 'qqww3344'
        }).then(res => {
            console.log(res)
            sessionStorage.setItem('token', res.data.token)
            callback && callback(res.data.token)
        })
    }
}

export {
    Token
}