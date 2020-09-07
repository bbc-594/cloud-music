<template>
  <div id="app-title">
    <div class="app-title-l">
      <icon-svg iconHref="icon-yinle2" size="30" />
      <div>云音乐</div>
    </div>
    <div class="app-title-r">
      <icon-svg @click="minimize" size="16" iconHref="icon-zuixiaohua" />
      <icon-svg
        @click="maximize"
        v-if="!isMax"
        size="16"
        iconHref="icon-zuidahua1"
      />
      <icon-svg @click="maximize" v-else size="16" iconHref="icon-zuidahua" />
      <icon-svg @click="close" size="16" iconHref="icon-guanbi1" />
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron';
export default {
  name: 'AppTitle',
  data() {
    return {
      isMax: false,
    };
  },
  methods: {
    minimize() {
      console.log('dd :>> ');
      ipcRenderer.send('minimize');
    },
    maximize() {
      ipcRenderer.send('maximize');
    },
    close() {
      ipcRenderer.send('close');
    },
  },
};
</script>

<style lang="less" scoped>
#app-title {
  z-index: 99999;
  position: fixed;
  top: 0;
  width: 100%;
  height: 45px;
  background-color: rgba(198, 47, 47);
  -webkit-app-region: drag;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .app-title-l {
    display: flex;
    align-items: center;
    color: #fff;
    padding-left: 30px;
    div {
      margin-left: 10px;
      font-size: 14px;
    }
  }
  .app-title-r {
    padding-right: 10px;
    svg {
      margin: 10px;
      cursor: pointer;
      &:active {
        opacity: 0.6;
      }
    }
  }
}
</style>
