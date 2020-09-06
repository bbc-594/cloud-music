<template>
  <div class="search-mv">
    <loading v-if="mvs.length === 0" />
    <div
      v-else
      class="mv"
      v-for="mv of mvs"
      :key="mv.id"
      @click="getMvDetail(mv.id)"
    >
      <div class="mv-pic">
        <img :src="mv.cover" alt="" />
        <span class="play-count">{{ mv.playCount }}</span>
        <span class="duration">{{ mv.duration | formatTime }}</span>
      </div>
      <div class="mv-name">{{ mv.name }}</div>
      <div class="mv-artist">
        <p
          class="artist"
          v-for="(artist, index) of mv.artists"
          :key="artist.id"
        >
          {{ artist.name }}
          <span v-if="index + 1 < mv.artists.length">/</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mvs: {
      type: Array
    }
  },
  methods: {
    getMvDetail(id) {
      this.$router.push({ path: '/mvDetail', query: { id } });
    }
  }
};
</script>

<style lang="less" scoped>
@import '~@/assets/less/index';
.search-mv {
  .grid(10px, 160px);
  .mv {
    margin-top: 10px;
    width: 160px;
    cursor: default;
    .mv-pic {
      width: 180px;
      position: relative;
      img {
        width: 100%;
      }
      .play-count,
      .duration {
        position: absolute;
        padding: 0 5px;
        background-color: rgba(0, 0, 0, 0.2);
        color: #fff;
        font-size: 12px;
      }
      .duration {
        bottom: 0;
        left: 0;
      }
      .play-count {
        top: 0;
        right: 0;
      }
    }
    .mv-name {
      margin-top: 5px;
      .ellipsis;
    }
    .mv-artist {
      font-size: 13px;
      color: #888;
    }
  }
}
</style>
