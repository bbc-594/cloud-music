<template>
  <div class="comment">
    <div class="comment-info">
      <div class="user-avatar">
        <a-avatar :src="comment.user.avatarUrl" />
      </div>
      <div class="comment-content">
        <p class="user-name">{{ comment.user.nickname }}:</p>
        <p class="content">
          {{ comment.content }}
        </p>
      </div>
    </div>
    <div class="comment-operate">
      <div class="create-time">{{ comment.time | formatDate }}</div>
      <div class="comment-operate">
        <div class="comment-like">
          <icon-svg iconHref="icon-zan-copy" />
          <span class="like-count">({{ comment.likedCount }})</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style lang="less" scoped>
.comment {
  margin-top: 20px;
  padding-bottom: 10px;
  width: 100%;
  border-bottom: 1px solid #eaeaea;
  .comment-info {
    display: flex;
    margin-bottom: 20px;
    .user-avatar {
      margin-right: 10px;
    }
    .comment-content {
      display: flex;
      width: 100%;
      justify-content: flex-start;
      font-size: 13px;
      .user-name {
        display: inline-block;
        color: #477aac;
        margin-right: 10px;
      }
      .content {
        width: 80%;
      }
    }
  }
  .comment-operate {
    display: flex;
    justify-content: space-between;
    .create-time {
      font-size: 13px;
    }
    .comment-like {
      display: flex;
      align-items: center;
      .like-count {
        margin-left: 10px;
        font-size: 12px;
        color: #999;
      }
    }
  }
}
</style>
