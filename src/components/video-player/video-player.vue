<template>
  <div class="video">
    <div id="video-player"></div>
  </div>
</template>

<script>
import Player from 'xgplayer';
export default {
  mounted() {
    this._playInit();
  },
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      player: null
    };
  },
  watch: {
    url(val) {
      this.player.src = val;
    }
  },
  methods: {
    _playInit() {
      // eslint-disable-next-line no-undef
      this.player = new Player({
        el: document.querySelector('#video-player'),
        url: this.url,
        fluid: true,
        volume: 0.6,
        // autoplay: true,
        // autoplayMuted: true,
        playbackRate: [0.5, 0.75, 1, 1.5, 2],
        videoInit: true,
        download: true, //设置download控件显示,
        closeVideoTouch: false
        // fitVideoSize: 'auto'
      });
    }
  }
};
</script>

<style lang="less" scoped>
.video {
  width: 100%;
}
</style>
