<template>
  <div class="index-header">
    <div class="find-music-title">
      <div class="back-btn" @click="goBack" v-if="back">
        <a-button type="link"><a-icon type="left" />返回</a-button>
      </div>
      <span v-if="config"> {{ config.name }}</span>
    </div>
    <a-tabs v-model="tabPath" @change="callback" v-if="config">
      <a-tab-pane
        :tab="tab.name"
        :key="tab.path"
        v-for="tab of config.tabList"
      ></a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
  name: 'indexHeader',
  props: {
    config: {
      type: Object
    },
    back: {
      type: Boolean
    },
    path: {
      type: String
    }
  },
  watch: {
    path(val) {
      this.$emit('pathChange', val);
    }
  },
  created() {},
  data() {
    return {
      tabPath: this.path
    };
  },
  methods: {
    callback(key) {
      this.$router.push(key);
      this.$emit('pathChange', key);
    },
    goBack() {
      this.$router.back();
    }
  }
};
</script>

<style lang="less" scoped>
.index-header {
  background-color: #fff;
  .find-music-title {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    .ant-btn {
      padding-left: 0;
    }
  }
}
</style>
