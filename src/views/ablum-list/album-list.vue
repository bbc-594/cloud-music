<template>
  <div>
    <index-header :back="true" />
    <loading v-if="!album" />
    <div class="like-song-list" ref="songList" v-else>
      <div class="song-list-top">
        <div class="list-title">专辑</div>
        <div class="list-info">
          <div class="list-pic">
            <img :src="album.picUrl" />
            <!-- <span class="play-num"> -->
            <!-- <icon-svg iconHref="icon-erji1" /> -->
            <!-- {{ currentList.playCount }} -->
            <!-- </span> -->
          </div>
          <div class="list-des">
            <div class="list-name">{{ album.name }} <span></span></div>
            <div class="list-creator">
              <!-- <div class="list-creator-avatar">
                <a-avatar :src="avatarUrl" />
              </div> -->
              <div class="list-creator-name">
                歌手:
                {{ album.artists | getAuthor }}
              </div>
              <div class="list-creator-time">
                <span style="margin-right: 10px">发布时间: </span>
                {{ album.publishTime | formatDate }}
              </div>
            </div>
            <div class="list-introduce">
              <p ref="introduce">{{ album.description }}</p>
              <div class="intr-btn" @click="showMore">
                <a-icon type="down" v-if="!show" />
                <a-icon type="up" v-else />
              </div>
            </div>
          </div>
        </div>
      </div>
      <song-list :songList="songList" />
    </div>
  </div>
</template>

<script>
// const SIZE = 50;
import SongList from '@/components/song-list/song-list';
import Loading from '@/components/loading/loading';
import { mapGetters } from 'vuex';
export default {
  name: 'albumList',
  components: {
    SongList,
    Loading
  },
  data() {
    return {
      songList: [],
      album: {},
      show: false
    };
  },
  props: {},
  watch: {
    // getMore(val) {
    //   if (val) {
    //     this.getmore();
    //   }
    // }
    // currentList() {
    //   // const selector = 'song-list-top';
    //   // const { coverImgUrl } = this.currentList;
    //   // this.changeBg(selector, coverImgUrl);
    //   this.$nextTick(() => {
    //     // this.songList.length = 0;
    //     this.result = {};
    //   });
    //   console.log('this.songList :', this.songList);
    //   this.getListDetail();
    // }
    $route() {
      this.getAlbum();
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'currentList'])
  },
  mounted() {},
  created() {
    // this.getlikeList();
    this.getAlbum();
  },
  methods: {
    // changeBg(selector, imgUrl) {
    //   console.log('imgUrl :', imgUrl);
    //   document.styleSheets[0].addRule(
    //     '.song-list-top::before',
    //     'background:url(' + imgUrl + ')'
    //   );
    // },
    getAlbum: async function() {
      const { id } = this.$route.query;
      let res = await this.$api.albumDetail(id);
      const {
        data: { songs, album }
      } = res;
      this.songList = songs;
      this.album = album;
      // // const {data: {data} } =res;
    },
    showMore() {
      this.$nextTick(() => {
        let { show } = this;
        if (show) {
          this.$refs.introduce.style.overflow = 'hidden';
          this.$refs.introduce.style.display = '-webkit-box';
        } else {
          this.$refs.introduce.style.overflow = 'visible';
          this.$refs.introduce.style.display = 'block';
        }
        this.show = !show;
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import '~@/assets/less/index';
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
    width: 15vw;
    min-width: 180px;
    min-height: 180px;
    height: 15vw;
    margin-right: 20px;
    img {
      width: 100%;
      height: 100%;
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
    .list-introduce {
      margin-top: 20px;
      max-width: 1000px;
      // width: 100%;
      font-size: 12px;
      padding-right: 100px;
      color: #888;
      p {
        margin-bottom: 0;
        .moreEllipsis;
      }
      .intr-btn {
        display: block;
        margin-top: 10px;
        text-align: right;
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
