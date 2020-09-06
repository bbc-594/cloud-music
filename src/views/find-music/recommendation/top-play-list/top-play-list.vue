<template>
  <div class="top-play-list">
    <div class="play-list">
      <div
        class="song-menu"
        v-for="list of playList"
        :key="list.id"
        @click="getListView(list)"
      >
        <div class="menu-img">
          <img v-lazy="list.coverImgUrl" alt />
        </div>
        <div class="menu-name">
          <p>{{ list.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'TopPlayList',
  created() {
    this.getPlayList();
  },
  data() {
    return {
      playList: []
    };
  },
  computed: {
    ...mapGetters(['getMore'])
  },
  watch: {
    getMore(val) {
      if (val) {
        this.getMoreData();
      }
    }
  },
  props: {},
  methods: {
    getPlayList: async function(cat, before) {
      cat = cat || '';
      before = before || 0;
      let res = await this.$api.topPlaylist(cat, before);
      const {
        data: { playlists, more }
      } = res;
      if (more) {
        this.setMore(false);
      }
      this.playList = [...this.playList, ...playlists];
    },
    getListView(list) {
      this.setCurList(list);
      this.$router.push('/like-song-list');
    },
    getMoreData() {
      const length = this.playList.length;
      const { updateTime } = this.playList[length - 1];
      this.getPlayList('', updateTime);
    },
    ...mapActions(['setCurList', 'setMore'])
  }
};
</script>

<style lang="less" scoped>
.play-list {
  // display: flex;
  margin-top: 10px;
  // justify-content: space-between;
  // flex-wrap: wrap;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(10vw, 1fr));
  .song-menu {
    width: 180px;
    cursor: default;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .menu-name {
      width: 100%;
      height: 20px;
      display: block;
      margin-top: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      // white-space: nowrap;
    }
  }
}
</style>
