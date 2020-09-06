<template>
  <div>
    <index-header :back="true" />
    <loading v-if="!currentSinger" />
    <div class="like-song-list" ref="songList" v-else>
      <div class="song-list-top">
        <div class="list-title">歌手</div>
        <div class="list-info">
          <div class="list-pic">
            <img :src="currentSinger.img1v1Url" />
          </div>
          <div class="list-des">
            <div class="list-name">{{ currentSinger.name }}</div>
            <div class="singer-alias">
              <span
                v-for="(alias, index) of currentSinger.alias"
                :key="index"
                >{{ alias }}</span
              >
            </div>
            <div class="singer-achievement">
              <div class="music-size">单曲数:{{ currentSinger.musicSize }}</div>
              <div class="album-size">专辑数:{{ currentSinger.albumSize }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="song-title">{{ currentSinger.name }}的全部歌曲</div> -->
      <song-list :songList="songList" />
      <div class="getMore" @click="getAllSong">
        <p>
          查看全部歌曲
          <a-icon type="right" />
        </p>
      </div>
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
      album: {}
    };
  },
  props: {},
  watch: {
    currentSinger() {
      this.getTopSong();
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'currentSinger'])
  },
  mounted() {},
  created() {
    // this.getlikeList();
    this.getTopSong();
  },
  methods: {
    // changeBg(selector, imgUrl) {
    //   console.log('imgUrl :', imgUrl);
    //   document.styleSheets[0].addRule(
    //     '.song-list-top::before',
    //     'background:url(' + imgUrl + ')'
    //   );
    // },
    getTopSong: async function() {
      const { id } = this.currentSinger;
      let res = await this.$api.artTopSong(id);
      const {
        data: { songs }
      } = res;
      this.songList = songs;
    },
    getAllSong: async function() {
      const { id } = this.currentSinger;
      let res = await this.$api.artSongs(id);
    }
  }
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
      margin-bottom: 10px;
      font-size: 22px;
      font-weight: 600;
    }
    .singer-alias {
      font-size: 13px;
      margin-bottom: 40px;
      color: #888;
      span {
        margin-right: 10px;
      }
    }
    .singer-achievement {
      display: flex;
      font-size: 13px;
      color: #888;
      div {
        margin-right: 10px;
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
.getMore {
  font-size: 13px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  p {
    margin-bottom: 0;
  }
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
