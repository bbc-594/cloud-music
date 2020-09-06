<template>
  <div class="song" @click.stop="select(index)" @dblclick="play(song, index)">
    <div class="song-l">
      <div class="song-id">
        <span v-if="currentId !== song.id"> {{ index | _pad }}</span>
        <icon-svg iconHref="icon-laba3" v-else />
      </div>
      <div class="song-collect" @click="songStar(song.id, song.starred)">
        <icon-svg iconHref="icon-aixin" v-if="song.starred || song.st === 0" />
        <icon-svg iconHref="icon-aixin1" v-else />
      </div>
      <div class="song-pic" v-if="showPic">
        <img v-lazy="album.picUrl" alt="" />
      </div>
      <div class="song-name">{{ song.name }}</div>
    </div>
    <div class="song-r">
      <div class="song-operate">
        <span class="play" @click="play(song, index)" v-if="selected === index">
          <icon-svg iconHref="icon-bofang4" />
        </span>
      </div>
      <!-- <div class="song-author">{{ artists | getAuthor }}</div> -->
      <div class="song-author">
        <p
          class="artist"
          @click="getArtist(artist.id)"
          v-for="(artist, index) of artists"
          :key="artist.id"
        >
          {{ artist.name }}
          <span v-if="index + 1 < artists.length">/</span>
        </p>
      </div>
      <div class="song-album" @click="getAlbum(album.id)">{{ album.name }}</div>
      <div class="sont-time">{{ duration | formatTime }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'song',
  props: {
    song: {
      type: Object
    },
    index: {
      type: Number
    },
    selected: {
      type: Number
    },
    showPic: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      timer: null
    };
  },
  // inject: ['show'],
  computed: {
    artists() {
      if (this.song.artists) {
        return this.song.artists;
      } else {
        return this.song.ar;
      }
    },
    album() {
      return this.song.album ? this.song.album : this.song.al;
    },
    duration() {
      return this.song.duration ? this.song.duration : this.song.dt;
    },
    currentId() {
      if (this.currentSong.id) {
        return this.currentSong.id;
      } else {
        return -1;
      }
    },
    ...mapGetters(['currentSong', 'mode'])
  },
  methods: {
    select(index) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$emit('selected', index);
      }, 300);
    },
    play(song, index) {
      clearTimeout(this.timer);
      this.$emit('play', { song, index });
    },
    getArtist: async function(id) {
      let res = await this.$api.singerDetail(id);
      const {
        data: { artist: singer }
      } = res;
      this.setCurSinger(singer);
      this.$router.push('/singerDetail');
    },
    getAlbum(id) {
      this.$router.push({ path: '/album-list', query: { id } });
    },
    songStar: async function(songid, starred) {
      let like = starred ? false : true;
      let res = await this.$api.likeSong(songid, like);
      const {
        data: { code }
      } = res;
      if (code === 200) {
        like
          ? this.$message.success('收藏成功')
          : this.$message.success('取消收藏成功');
        // this.getTodaysong();
      }
    },
    destroyed () {
      clearTimeout(this.timer);
    },
    ...mapActions(['setCurSinger'])
  }
};
</script>

<style lang="less" scoped>
@import '~@/assets/less/index';
.song {
  display: flex;
  padding: 15px 0 15px 10px;
  cursor: pointer;
  align-items: center;
  transition: all 0.8s;
  .song-l,
  .song-r {
    display: flex;
    align-items: center;
    width: 50%;
  }
  .song-l {
    div {
      color: #000;
      margin-right: 20px;
    }
    .song-pic {
      width: 60px;
      height: 60px;
      img {
        width: 100%;
      }
    }
  }
  .song-r {
    justify-content: space-evenly;
    font-size: 13px;
    color: #999;
    div {
      width: 33%;
      .ellipsis;
      text-align: center;
    }
    .song-author {
      display: flex;
      width: 40%;
      .artist {
        // width: 100%;
        margin-bottom: 0;
        span {
          margin-right: 4px;
        }
      }
    }

    .song-operate {
      .play {
        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}
.song:nth-child(even) {
  background-color: #f2f2f3;
}
.song:active {
  background-color: #f3f3f4;
  .song-l {
    transform: translate(10px, 0);
    transition: all 0.5s;
  }
}
</style>
