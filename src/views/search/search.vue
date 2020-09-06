<template>
  <div class="search">
    <div class="search-bar">
      <a-input-search
        placeholder="搜索音乐、歌手、歌词、用户"
        v-model="keyword"
        @search="onSearch(keyword)"
      />
    </div>
    <div class="search-hot-history" v-if="songList.length === 0">
      <div class="search hot-search">
        <p>热门搜索</p>
        <div class="keyword-list">
          <span
            class="key-word"
            v-for="keyword of hotKeyword"
            @click="keywordClick(keyword.first)"
            :key="keyword.first"
            >{{ keyword.first }}</span
          >
        </div>
      </div>
      <div class="search history-search">
        <p>搜索历史</p>
        <div class="keyword-list">
          <span
            class="key-word"
            v-for="keyword of historyKeyWords"
            :key="keyword"
            @click="keywordClick(keyword)"
            >{{ keyword }}</span
          >
        </div>
      </div>
    </div>
    <div class="search-result" v-else>
      <div class="search-type">
        <a-tabs :defaultActiveKey="searchType.song" @change="callback">
          <a-tab-pane tab="单曲" :key="searchType.song">
            <song-list :songList="songList"
          /></a-tab-pane>
          <a-tab-pane tab="歌手" :key="searchType.singer" forceRender>
            <singer-list :artists="artists" />
          </a-tab-pane>
          <a-tab-pane tab="专辑" :key="searchType.album">
            <album-list :albums="albums" />
          </a-tab-pane>
          <a-tab-pane tab="MV" :key="searchType.mv">
            <mv-list :mvs="mvs" />
          </a-tab-pane>
          <a-tab-pane tab="歌单" :key="searchType.playList">
            <play-list :playList="playList" />
          </a-tab-pane>
          <a-tab-pane tab="用户" :key="searchType.user"></a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import SongList from '../../components/song-list/song-list';
import SingerList from './search-singers/search-singer';
import AlbumList from './search-album/search-album';
import MvList from './search-mv/search-mv';
import PlayList from './search-list/search-list';
import { searchType } from '../../utils/config';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'Search',
  created() {
    this._pageInit();
  },
  components: {
    SongList,
    SingerList,
    AlbumList,
    MvList,
    PlayList
  },
  computed: {
    ...mapGetters(['historyKeyWords'])
  },
  watch: {
    keyword(val) {
      if (val === '') {
        this.songList.length = 0;
      }
    }
  },
  data() {
    return {
      hotKeyword: [],
      hisKeyword: {},
      keyword: '',
      songList: [],
      artists: [],
      albums: [],
      mvs: [],
      playList: [],
      searchType
    };
  },
  methods: {
    _pageInit() {
      this.getHot();
      this.getDefault();
    },
    keywordClick(keyword) {
      this.keyword = keyword;
      this.onSearch(keyword);
    },
    callback(key) {
      const { keyword } = this;
      this.onSearch(keyword, key);
    },
    getHot: async function() {
      let res = await this.$api.hotSearch();
      const {
        data: {
          result: { hots }
        }
      } = res;
      this.hotKeyword = hots;
    },
    onSearch: async function(keyword, type = 1) {
      let res = await this.$api.search(keyword, type);
      const {
        data: { result }
      } = res;
      this.setHistorySearch(keyword);
      if (type === searchType.song) {
        this.songList = result.songs;
      } else if (type === searchType.singer) {
        this.artists = result.artists;
      } else if (type === searchType.album) {
        this.albums = result.albums;
      } else if (type === searchType.mv) {
        this.mvs = result.mvs;
      } else if (type === searchType.playList) {
        this.playList = result.playlists;
      }
    },
    getDefault: async function() {
      let res = await this.$api.defaultSearch();
      const {
        data: { data }
      } = res;
      this.hisKeyword = data;
    },
    ...mapActions(['setHistorySearch', 'setCurSinger'])
  }
};
</script>

<style lang="less" scoped>
.search-bar {
  padding-right: 20px;
}
.search-hot-history {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  .search {
    width: 45%;
    p {
      padding-bottom: 10px;
      border-bottom: 1px solid #eaeaea;
    }
  }
  .keyword-list {
    display: flex;
    flex-wrap: wrap;
    .key-word {
      margin-top: 10px;
      padding: 0 10px;
      cursor: default;
      height: 30px;
      line-height: 30px;
      border: 1px solid #ccc;
      border-radius: 20px;
      font-size: 13px;
      margin-right: 20px;
    }
  }
}
</style>
