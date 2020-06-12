import { LikeModel } from '../models/like';
const likeModel = new LikeModel();
export const classicMixin = {
  methods: {
    onLike(e) {
      this.likeCount = e.count;
      this.likeStatus = !e.like;
      likeModel.like(e.likeStr, this.classic.id, this.classic.type);
    }
  },
};
