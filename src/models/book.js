import axios from 'axios'

class BookModel{
    getHotList() {
        return new Promise((resolve, reject) => {
            axios.get('/book/hot_list').then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
    getDetail(bid) {
        return new Promise((resolve, reject) => {
            axios.get(`/book/${bid}/detail`).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
    getLikeStatus(bid) {
        return new Promise((resolve, reject) => {
            axios.get(`/book/${bid}/favor`).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
    postComment(bid, comment) {
        return new Promise((resolve, reject) => {
            axios.post(`/book/add/short_comment`, {
                book_id: bid,
                content: comment
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
    getComments(bid) {
        return new Promise((resolve, reject) => {
            axios.get(`/book/${bid}/short_comment`).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
    search(start, q) {
        return new Promise((resolve, reject) => {
            axios.get('/book/search?summary=1', {
                params: {
                    q,
                    start
                }
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export {
    BookModel
}