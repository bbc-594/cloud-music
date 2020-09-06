<template>
  <div class="song-list">
    <div class="song-list-operate">
      <div class="operate-l">
        <div class="play-all" @click="playAll">
          <icon-svg iconHref="icon-zanting1" />
          <p>播放全部</p>
        </div>
        <div class="select">
          <icon-svg iconHref="icon-liebiao5" />
          <p>选择</p>
        </div>
      </div>
      <div class="operate-r">
        <div class="search">
          <a-input-search v-model="keyword" @search="search" />
        </div>
      </div>
    </div>
    <!-- <div class="loading" v-if="songList.length === 0">
      <a-spin size="large">
        <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
      </a-spin>
    </div> -->
    <loading v-if="songList.length === 0" />
    <div class="list" v-else-if="songList.length > 0 && !searched">
      <song
        :song="song"
        :index="index + 1"
        :selected="selected"
        v-for="(song, index) of songList"
        :key="song.id"
        :showPic="showPic"
        @play="play"
        @selected="selectedIndex"
      />
    </div>
    <div class="search-list" v-else>
      <song
        @play="play"
        @selected="selectedIndex"
        :selected="selected"
        v-for="(song, index) of searchList"
        :key="song.name"
        :song="song"
        :index="index + 1"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { createSong } from '@/utils/song';
import { playMode } from '@/utils/config';
import { getRandomInt } from '@/utils/RandomArr';
import { getAuthor } from '@/filters/index';
import Song from '@/components/song/song';
import Loading from '@/components/loading/loading';
export default {
  name: 'songList',
  computed: {
    currentId() {
      if (this.currentSong.id) {
        return this.currentSong.id;
      } else {
        return -1;
      }
    },
    ...mapGetters(['currentSong', 'mode'])
  },
  components: {
    Song,
    Loading
  },
  filters: {
    getId(index) {
      if (index < 9) {
        return `0${index + 1}`;
      } else {
        return index + 1;
      }
    },
    getAuthor(artists) {
      let ret = [];
      if (!artists) {
        return '';
      }
      artists.forEach(s => {
        ret.push(s.name);
      });
      return ret.join('/');
    }
  },
  data() {
    return {
      // songList: []
      selected: -1,
      searched: false,
      searchList: [],
      keyword: ''
    };
  },
  props: {
    songList: {
      type: Array,
      default: () => []
    },
    showPic: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    keyword(val) {
      if (val === '') {
        this.searchList.length = 0;
        this.searched = false;
      }
    }
  },
  methods: {
    playAll() {
      if (this.mode === playMode.random) {
        // this.set
        const length = this.songList.length;
        const index = getRandomInt(0, length) - 1;
        const song = this.songList[index];
        this.play({ song, index });
      } else {
        const song = this.songList[0];
        this.play({ song, index: 0 });
      }
    },
    play({ song, index }) {
      const { id } = song;
      this.setFmMode(false);
      this.setSeqList(this.songList);
      this.$api.songCheck(id).then(async res => {
        let {
          data: { success }
        } = res;
        if (success) {
          let res = await this.$api.songUrl(id);
          let {
            data: { data }
          } = res;
          const { url, code } = data[0];
          if (code === -110) {
            this.$message.error('暂无版权!');
          } else {
            this.setCurSong(createSong({ url, ...song }));
            this.setCurIndex(index - 1);
          }
        } else {
          this.$message.error('暂无版权!');
        }
      });
    },
    search(keyword) {
      let reg = new RegExp(keyword);
      this.songList.forEach(song => {
        const album = song.al.name || song.album.name;
        const artist = song.ar || song.artist;
        const artnames = getAuthor(artist);
        if (song.name.match(reg) || album.match(reg) || artnames.match(reg)) {
          this.searchList.push(song);
        }
      });
      this.searched = true;
    },
    selectedIndex(index) {
      this.selected = index;
    },
    ...mapActions([
      'setCurSong',
      'setPlayList',
      'setCurIndex',
      'setSeqList',
      'setFmMode'
    ])
  }
};
</script>
<style lang="less" scoped>
@import '~@/assets/less/index';
.song-list {
  margin-top: 30px;
  cursor: default;
  .song-list-operate {
    display: flex;
    position: sticky;
    justify-content: space-between;
    top: 0;
    background-color: #fff;
    padding-bottom: 10px;
    div {
      display: flex;
      align-items: center;
      margin-right: 30px;
      p {
        margin-bottom: 0;
      }
    }
    .operate-l {
      display: flex;
      .play-all {
        svg {
          width: 20px;
          height: 20px;
          color: @index-color;
          margin-right: 5px;
        }
      }
      .select {
        svg {
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
