<template>
  <div class="new-music">
    <div class="new-music-type">
      <div class="type-l">
        <ul class="tab">
          <li
            :class="selected === index ? 'selected' : ''"
            v-for="(tab, index) of tabs"
            @click="change(index)"
            :key="index"
          >
            {{ tab }}
          </li>
        </ul>
        <h3 v-show="selected === 1">本周新碟</h3>
      </div>
      <div class="type-r" v-show="selected === 0">
        <div class="area">
          <span
            @click="changeArea(area.id)"
            :class="selArea === area.id ? 'selected' : ''"
            v-for="area of areas"
            :key="area.id"
            >{{ area.name }} <a-divider type="vertical"
          /></span>
        </div>
      </div>
    </div>
    <keep-alive>
      <div class="new-music-content">
        <div class="top-song" v-show="selected === 0">
          <song-list :songList="songList" :showPic="true" />
        </div>
        <div class="top-album" v-show="selected === 1">
          <div class="album-list">
            <div
              class="album"
              v-for="album of albumList"
              :key="album.id"
              @click="getDetail(album.id)"
            >
              <div class="album-pic">
                <img v-lazy="album.picUrl" alt="" />
                <!-- <div class="cd"></div> -->
              </div>
              <div class="album-name">{{ album.name }}</div>
              <div class="album-artist">{{ album.artists[0].name }}</div>
            </div>
          </div>
        </div>
      </div>
    </keep-alive>
  </div>
</template>

<script>
import SongList from '@/components/song-list/song-list';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'newMusic',
  data() {
    return {
      selected: 0,
      tabs: ['新歌速递', '新碟上架'],
      songList: [],
      albumList: [],
      selArea: 0,
      areas: [
        { id: 0, name: '全部' },
        { id: 7, name: '华语' },
        { id: 96, name: '欧美' },
        { id: 8, name: '日本' },
        { id: 16, name: '韩国' }
      ],
      offset: 0
    };
  },
  components: {
    SongList
  },
  computed: {
    ...mapGetters(['getMore'])
  },
  watch: {
    getMore(oldval, newval) {
      if (oldval !== newval && newval) {
        this.offset += 1;
        this.getTopAlbum();
      }
    }
  },
  created() {
    this.getTopMusic();
  },
  methods: {
    getTopMusic: async function(type = 0) {
      let res = await this.$api.topSong(type);
      const {
        data: { data }
      } = res;
      this.songList = data;
    },
    getTopAlbum: async function(limit = 20) {
      let { offset } = this;
      offset = offset * limit;
      let res = await this.$api.topAlbum(offset, limit);
      const {
        data: { albums, total }
      } = res;
      this.albumList = [...this.albumList, ...albums];
      if (this.albumList.length < total) {
        this.setMore(false);
      }
    },
    changeArea(id) {
      this.selArea = id;
      this.songList.splice(0);
      this.getTopMusic(id);
    },
    change(index) {
      this.selected = index;
      if (index === 1 && this.albumList.length === 0) {
        this.getTopAlbum();
      }
    },
    getDetail(id) {
      this.$router.push({ path: '/album-list', query: { id } });
    },
    ...mapActions(['setMore'])
  }
};
</script>

<style lang="less" scoped>
@import '~@/assets/less/index';
.new-music-type {
  padding: 20px 60px 10px 0;
  z-index: 99;
  display: flex;
  justify-content: space-between;
  position: sticky;
  background-color: #fff;
  top: 73.9px;
}
.tab {
  display: flex;
  li {
    padding: 5px 10px;
    font-size: 12px;
    cursor: pointer;
    border: 1px solid #eaeaea;
  }
  li:nth-child(1) {
    border-right: none;
  }
  .selected {
    color: #fff;
    background-color: #999;
  }
}
.type-r {
  span {
    font-size: 12px;
    margin-right: 10px;
    color: #888;
    cursor: pointer;
  }
  .selected {
    color: rgba(0, 0, 0, 0.85);
  }
}
.album-list {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(10vw, 1fr));
  .album {
    width: 150px;
    .album-pic {
      width: 90%;
      background-color: #fff;
      position: relative;
      img {
        width: 100%;
      }
    }
    // .album-pic::before {
    //   content: '';
    //   // z-index: -99;
    //   position: absolute;
    //   top: 0;
    //   right: -25px;
    //   width: 100%;
    //   height: 100%;
    //   border-radius: 50%;
    //   background-color: #000;
    // }
    .album-name {
      margin-top: 5px;
      .ellipsis;
    }
    .album-artist {
      font-size: 12px;
      color: #acacac;
    }
  }
}
</style>
