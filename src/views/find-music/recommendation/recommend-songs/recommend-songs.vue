<template>
  <div class="recommend-songs">
    <index-header :back="true" />
    <div class="recommend-songs-title">
      <div class="today">{{ today }}</div>
      <div class="recommend-song-info">
        <div class="recommend-song-name">每日歌曲推荐</div>
        <div class="recommend-song-des">
          根据你的音乐口味生成，每天6: 00 更新
        </div>
      </div>
    </div>
    <div class="no-login" v-if="!userInfo.token">
      你还未登录，暂时没法获得每日推荐~
      <!-- <a-button type="link" @click="login">去登录</a-button> -->
    </div>
    <song-list :songList="songList" v-else />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import SongList from '@/components/song-list/song-list';
import IndexHeader from '@/components/index-header/index-header';
export default {
  name: 'RecommendSongs',
  computed: {
    today() {
      return new Date().getDate();
    },
    ...mapGetters(['userInfo'])
  },
  components: {
    SongList,
    IndexHeader
  },
  created() {
    this.getTodaysong();
  },
  data() {
    return {
      songList: []
    };
  },
  watch: {
    userInfo() {
      this.getTodaysong();
    }
  },
  methods: {
    getTodaysong: async function() {
      if (!this.userInfo.token) {
        return;
      }
      let res = await this.$api.recommendSongs();
      let {
        data: { code, recommend }
      } = res;
      if (code === 200) {
        this.songList = recommend;
        this.setSeqList(recommend);
      }
    },
    login() {},
    ...mapActions(['setSeqList'])
  }
};
</script>

<style lang="less" scoped>
@import '~@/assets/less/index';
.recommend-songs {
  cursor: default;
  padding-left: 20px;
  .recommend-songs-title {
    margin-top: 30px;
    display: flex;
    .today {
      width: 100px;
      height: 100px;
      background-color: #fff;
      border: 1px solid #eaeaea;
      color: @index-color;
      font-size: 60px;
      text-align: center;
      line-height: 100px;
      font-weight: 600;
      margin-right: 20px;
    }
    .recommend-song-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .recommend-song-name {
        font-size: 18px;
        margin-bottom: 20px;
      }
    }
  }
  .no-login {
    width: 100%;
    min-height: 300px;
    line-height: 300px;
    text-align: center;
  }
}
</style>
