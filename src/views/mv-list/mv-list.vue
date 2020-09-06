<template>
  <div class="mv-list">
    <index-header :config="config" :path="path" @pathChange="pathChange" />
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'mvList',
  data() {
    return {
      config: {
        name: 'MV',
        tabList: [
          { name: '精选', path: '/mv-list/choiceness' },
          { name: '排行榜', path: '/mv-list/rank' },
          { name: '全部', path: '/mv-list/all-mv' }
        ]
      },
      path: '/mv-list/choiceness'
    };
  },
  methods: {
    pathChange(path) {
      this.path = path;
      sessionStorage.setItem('mv-path', path);
    }
  },
  created() {
    if (sessionStorage.getItem('mv-path')) {
      this.path = sessionStorage.getItem('mv-path');
    }
  },
  beforeDestroy() {
    sessionStorage.removeItem('mv-path');
  }
};
</script>

<style></style>
