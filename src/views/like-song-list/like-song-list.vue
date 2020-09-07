<template>
  <div>
    <index-header :back="true" />
    <loading v-if="!result.id" />
    <div class="like-song-list" ref="songList" v-else>
      <div class="song-list-top">
        <div class="list-title">歌单</div>
        <div class="list-info">
          <div class="list-pic">
            <img :src="coverImgUrl" />
            <span class="play-num">
              <icon-svg iconHref="icon-erji1" />
              {{ currentList.playCount | numberFormat }}
            </span>
          </div>
          <div class="list-des">
            <div class="list-name">{{ this.currentList.name }}</div>
            <div class="list-creator">
              <div class="list-creator-avatar">
                <a-avatar :src="avatarUrl" />
              </div>
              <div class="list-creator-name">
                {{ nickname }}
              </div>
              <div class="list-creator-time">
                {{ createTime | formatDate }}
                <span style="margin-left: 10px">创建</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <song-list :songList="result.tracks" />
    </div>
  </div>
</template>

<script>
// const SIZE = 50;
import SongList from '@/components/song-list/song-list';
import Loading from '@/components/loading/loading';
import { mapGetters } from 'vuex';
export default {
  name: 'likeSongList',
  components: {
    SongList,
    Loading,
  },
  data() {
    return {
      ids: [],
      page: 0,
      size: 50,
      songList: [],
      result: {},
    };
  },
  props: {
    getMore: {
      type: Boolean,
    },
  },
  watch: {
    // getMore(val) {
    //   if (val) {
    //     this.getmore();
    //   }
    // }
    currentList() {
      // const selector = 'song-list-top';
      // const { coverImgUrl } = this.currentList;
      // this.changeBg(selector, coverImgUrl);

      this.$nextTick(() => {
        // this.songList.length = 0;
        this.result = {};
      });
      this.getListDetail();
    },
  },
  computed: {
    listName() {
      let listname = this.result.name;
      let creatorName = this.result.creator.nickname;
      if (listname.indexOf(creatorName) > 0) {
        return '我喜欢的音乐';
      } else {
        return listname;
      }
    },
    coverImgUrl() {
      return this.currentList.coverImgUrl || this.currentList.picUrl;
    },
    avatarUrl() {
      const creator = this.currentList.creator || this.result.creator;
      return creator.avatarUrl;
    },
    nickname() {
      const creator = this.currentList.creator || this.result.creator;
      return creator.nickname;
    },
    createTime() {
      const { createTime } = this.result;
      return createTime;
    },
    ...mapGetters(['userInfo', 'currentList']),
  },
  mounted() {},
  created() {
    // this.getlikeList();
    this.getListDetail();
  },
  methods: {
    changeBg(selector, imgUrl) {
      document.styleSheets[0].addRule(
        '.song-list-top::before',
        'background:url(' + imgUrl + ')'
      );
    },
    getListDetail: async function() {
      const { id } = this.currentList;
      let res = await this.$api.playListDetail(id);
      const {
        data: { playlist },
      } = res;
      this.result = playlist;
    },
  },
};
</script>

<style lang="less" scoped>
.like-song-list {
  cursor: default;
}
.list-title {
  margin-bottom: 20px;
}
.list-info {
  position: relative;
  display: flex;
  .list-pic {
    position: relative;
    width: 180px;
    height: 180px;
    margin-right: 20px;
    img {
      width: 100%;
    }
    .play-num {
      position: absolute;
      right: 5px;
      top: 0;
      color: #fff;
      font-size: 12px;
      svg {
        color: #fff;
        margin-top: 2px;
      }
    }
  }
  .list-des {
    .list-name {
      margin-bottom: 20px;
      font-size: 22px;
      font-weight: 600;
    }
    .list-creator {
      display: flex;
      align-items: center;
      .list-creator-avatar,
      .list-creator-name {
        margin-right: 15px;
      }
      .list-creator-time {
        font-size: 12px;
        color: #888;
      }
    }
  }
}
.song-list-top {
  position: relative;
  background-color: rgba(255, 255, 255, 0.6);
  // opacity: 0.6;
  // z-index: -99;
}
// .song-list-top::before {
//   content: '';
//   position: absolute;
//   background-size: cover;
//   top: 0;
//   left: 300px;
//   width: 100%;
//   height: 100%;
//   // background-color: rgba(0, 0, 0, 0.85);
//   filter: blur(22px) contrast(0.9);
//   // z-index: -99;
// }
</style>
