<template>
  <div class="singer-list">
    <loading v-if="artists.length === 0" />
    <div
      v-else
      class="singer"
      v-for="artist of artists"
      :key="artist.id"
      @click="getSingerDetail(artist)"
    >
      <div class="singer-pic">
        <img :src="artist.img1v1Url" alt="" />
      </div>
      <div class="singer-name">{{ artist.name }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    artists: {
      type: Array
    }
  },
  methods: {
    getSingerDetail(singer) {
      this.setCurSinger(singer);
      this.$router.push('/singerDetail');
    },
    ...mapActions(['setCurSinger'])
  }
};
</script>

<style lang="less" scoped>
.singer-list {
  margin-top: 20px;
  padding-right: 20px;
  .singer {
    display: flex;
    padding: 10px;
    background-color: #f2f2f3;
    align-items: center;
    .singer-pic {
      width: 60px;
      margin-right: 10px;
      // height: 60px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .singer:nth-child(odd) {
    background-color: #fff;
  }
}
</style>
