<template>
  <div class="find-music">
    <div class="find-music-header">
      <index-header :config="config" :path="path" @pathChange="pathChange" />
    </div>
    <keep-alive>
      <router-view :getMore="getMore" />
    </keep-alive>
  </div>
</template>

<script>
import IndexHeader from '../../components/index-header/index-header';
export default {
  name: 'FindMusic',
  data() {
    return {
      config: {
        name: '发现音乐',
        tabList: [
          { name: '个性推荐', path: '/find-music/recommend' },
          { name: '歌单', path: '/find-music/play-list' },
          { name: '最新音乐', path: '/find-music/new-music' },
          { name: '歌手', path: '/find-music/singer' },
        ],
      },
      path: '/find-music/recommend',
    };
  },
  created() {
    if (sessionStorage.getItem('find-music-path')) {
      this.path = sessionStorage.getItem('find-music-path');
    }
  },
  watch: {
    $route() {},
  },
  methods: {
    callback(key) {
      this.$router.push(key);
    },
    pathChange(path) {
      sessionStorage.setItem('find-music-path', path);
      this.path = path;
    },
  },
  props: {
    getMore: {
      type: Boolean,
      default: false,
    },
  },
  beforeDestroy() {
    sessionStorage.removeItem('mv-path');
  },
  components: {
    IndexHeader,
  },
};
</script>

<style lang="less" scoped>
.find-music {
  background-color: #fff;
  .find-music-title {
    font-size: 14px;
  }
  .find-music-header {
    position: sticky;
    top: 0;
    z-index: 9;
  }
}
</style>
