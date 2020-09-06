<template>
  <div class="mv-detail">
    <div class="mv-title" v-if="mv.id">
      <div class="back-btn" @click="back"><a-icon type="left" /></div>
      <div class="mv-name">{{ mv.name }}</div>
      <div class="mv-artists">
        <span>{{ mv.artists | getAuthor }}</span>
      </div>
      <div class="mv-play-count">
        播放数:
        {{ mv.playCount | numberFormat }}
      </div>
    </div>
    <video-player v-if="url" :url="url" />
    <div class="mv-comment">
      <comment-list
        :total="total"
        :hotComments="hotComments"
        :comments="comments"
        :id="mv.id"
        :type="1"
        @commSucess="commSucess"
      />
      <pagination
        :total="total"
        :page="offset + 1"
        @pageChange="pageChange"
        :size="limit"
      />
    </div>
  </div>
</template>

<script>
import VideoPlayer from '../../components/video-player/video-player';
import Pagination from '../../components/pagination/pagination';
import CommentList from '../../components/comment-list/comment-list';
export default {
  name: 'MvDetail',
  components: {
    VideoPlayer,
    Pagination,
    CommentList
  },
  data() {
    return {
      mv: {},
      url: '',
      total: 0,
      offset: 0,
      limit: 20,
      hotComments: [],
      comments: []
    };
  },
  watch: {
    $route(to, from) {
      if (from.name === 'MvDetail') {
        return;
      }
      this.getMv();
    }
  },
  mounted() {
    this.getMv();
    this.getMvComment();
  },
  methods: {
    getMv: async function() {
      const { id } = this.$route.query;
      let res = this.$api.mvDetail(id).then(async res => {
        const {
          data: { data }
        } = res;
        this.mv = data;
        let urlRes = await this.$api.mvUrl(data.id);
        const {
          data: { data: urlData }
        } = urlRes;
        this.url = urlData.url;
      });
    },
    pageChange({ page }) {
      this.offset = page - 1;
      this.getMvComment();
    },
    commSucess(comment) {
      this.$message.success('评论成功！');
      this.comments.unshift(comment);
    },
    getMvComment: async function() {
      const { id } = this.$route.query;
      let { offset, limit } = this;
      offset = offset * limit;
      let res = await this.$api.mvComment(id, limit, offset);
      const {
        data: { hotComments, comments, total }
      } = res;
      if (hotComments) {
        this.hotComments = hotComments;
      }
      this.comments = comments;
      this.total = total;
    },
    back() {
      this.$router.back();
    }
  }
};
</script>

<style lang="less" scoped>
@import '~@/assets/less/index';
.mv-detail {
  width: 100%;
  max-width: 800px;
  min-width: 665px;
  margin: 0 auto;
  .mv-title {
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 10px;
    .mv-play-count {
      position: absolute;
      right: 20px;
      font-size: 13px;
      color: #888;
    }
    .back-btn {
      margin-right: 10px;
    }
    .mv-artists {
      width: 22%;
      margin-left: 20px;
      .ellipsis;
      span {
        color: #1a5a99;
        // opacity: 0.6;
      }
    }
  }
  .mv-comment {
    margin-top: 20px;
  }
}
</style>
