<template>
  <div class="comment-list">
    <div class="comment-count">评论 ({{ total }})</div>
    <div class="comment-box">
      <a-textarea placeholder="请输入评论" v-model="content" :rows="4" />
      <div class="comment-box-operate">
        <div class="emoji" @click="pickerShow = !pickerShow">
          <icon-svg iconHref="icon-biaoqing" />
          <VEmojiPicker
            v-show="pickerShow"
            :pack="pack"
            @select="selectEmoji"
          />
        </div>
        <div class="comment-btn" @click="comment">评论</div>
      </div>
    </div>
    <div class="comment-list">
      <p class="comment-list-title">最热评论</p>
      <comment
        v-for="comment of hotComments"
        :key="comment.commentId"
        :comment="comment"
      />
      <p class="comment-list-title">最新评论</p>
      <comment
        v-for="comment of comments"
        :key="comment.commentId"
        :comment="comment"
      />
    </div>
    <!-- <div class="comment-pagination">
      <pagination
        :total="total"
        :page="offset + 1"
        @pageChange="pageChange"
        :size="limit"
      />
    </div> -->
  </div>
</template>

<script>
import Comment from '../comment/comment';
import VEmojiPicker from 'v-emoji-picker';
export default {
  data() {
    return {
      pack: [],
      pickerShow: false,
      content: ''
    };
  },
  components: {
    Comment,
    VEmojiPicker
  },
  methods: {
    selectEmoji(emoji) {
      this.content += emoji.data;
    },
    comment: async function() {
      const { content, id, type } = this;
      let res = await this.$api.comment(1, type, id, content);
      const {
        data: { code, comment }
      } = res;
      if (code === 200) {
        this.$emit('commSucess', comment);
        this.content = '';
      }
    }
  },
  props: {
    hotComments: {
      type: Array,
      default: () => []
    },
    comments: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number,
      default: 0
    },
    id: {
      type: Number
    },
    type: {
      type: Number
    }
  }
};
</script>
<style lang="less" scoped>
.comment-list {
  width: 60vw;
  margin: 0 auto;
  #EmojiPicker {
    position: absolute;
    z-index: 9;
  }
  .comment-box {
    margin-top: 10px;
    textarea {
      resize: none;
    }
    .comment-box-operate {
      display: flex;
      margin-top: 10px;
      align-items: center;
      justify-content: space-between;
      .emoji {
        position: relative;
      }
      .comment-btn {
        padding: 2px 12px;
        background-color: #df3b3b;
        color: #fff;
        cursor: pointer;
        border-radius: 20px;
      }
    }
  }
  .comment-pagination {
    width: 100%;
  }
  .comment-list-title {
    margin: 30px 0;
  }
}
</style>
