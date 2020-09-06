<template>
  <div
    @dragstart="progressDragStart"
    @dragover="progressDropMove"
    @dragend="progressDragEnd"
    class="progress-bar"
    ref="progressBar"
    @click="progressClick"
  >
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div
        class="progress-btn-wrapper"
        ref="progressBtn"
        @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
// import { prefixStyle } from 'common/js/dom';

// const transform = prefixStyle('transform');
const progressBtnWidth = 16;
export default {
  name: 'progress-bar',
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.touch = {};
  },
  methods: {
    progressTouchStart(e) {
      this.touch.initiated = true;
      this.touch.startX = e.touches[0].pageX;
      this.touch.left = this.$refs.progress.clientWidth;
    },
    progressDragStart(e) {
      this.touch.startX = e.pageX;
      this.touch.initiated = true;
      this.touch.left = this.$refs.progress.clientWidth;
      // this.touch.startX = e.touches[0].pageX;
    },
    progressTouchMove(e) {
      if (!this.touch.initiated) {
        return;
      }
      const deltaX = e.touches[0].pageX - this.touch.startX;
      const offsetWidth = Math.min(
        this.$refs.progressBar.clientWidth - progressBtnWidth,
        Math.max(0, this.touch.left + deltaX)
      );
      this._offset(offsetWidth);
    },
    progressDropMove(e) {
      if (!this.touch.initiated) {
        return;
      }
      const deltaX = e.pageX - this.touch.startX;
      const offsetWidth = Math.min(
        this.$refs.progressBar.clientWidth - progressBtnWidth,
        Math.max(0, this.touch.left + deltaX)
      );
      this._offset(offsetWidth);
    },
    progressTouchEnd() {
      this.touch.initiated = false;
      this._triggerPercent();
    },
    progressDragEnd() {
      this.touch.initiated = false;
      this._triggerPercent();
    },
    _offset(offsetWidth) {
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
      const percent = offsetWidth / barWidth;
      this.$refs.progress.style.width = `${percent * 100}%`;
      this.$refs.progressBtn.style.transform = `translate3d(${offsetWidth}px, 0, 0)`;
    },
    _triggerPercent() {
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
      const percent = this.$refs.progress.clientWidth / barWidth;
      this.$emit('percentChange', percent);
    },
    progressClick(e) {
      // 这里当我们点击 progressBtn的时候，e.offsetX获取不对
      // this._offset(e.offsetX)
      const rect = this.$refs.progressBar.getBoundingClientRect();
      const offsetWidth = e.pageX - rect.left;
      this._offset(offsetWidth);
      this._triggerPercent();
    }
  },
  watch: {
    percent(newPercent) {
      if (newPercent >= 0 && !this.touch.initiated) {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
        const offsetWidth = newPercent * barWidth;
        this._offset(offsetWidth);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import '~@/assets/less/index';
.progress-bar {
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: #f2f3f5;
    .progress {
      position: absolute;
      height: 100%;
      background: @index-color;
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 5px solid #f2f2f3;
        border-radius: 50%;
        background-color: @index-color;
      }
    }
  }
}
</style>
