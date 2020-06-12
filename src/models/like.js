import axios from 'axios'

class LikeModel{
    like(behavior, artid, category) {
        let url = behavior === 'like' ? 'like' : '/like/cancel'
        axios.post(url, {
            art_id: artid,
            type: category
        })
    }
    getClassicLikeStatus(artid, category) {
        return new Promise((resolve, reject) => {
            axios.get(`/classic/${category}/${artid}/favor`).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export {
    LikeModel
}