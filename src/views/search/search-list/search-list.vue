<template>
  <div class="search-list">
    <loading v-if="playList.length === 0" />
    <div
      v-else
      class="play-list"
      v-for="list of playList"
      :key="list.id"
      @click="getListView(list)"
    >
      <div class="list-l">
        <div class="list-pic">
          <img :src="list.coverImgUrl" alt="" />
        </div>
        <div class="list-name">{{ list.name }}</div>
      </div>
      <div class="list-r">
        <div class="song-number">{{ list.trackCount }}首</div>
        <div class="list-author">by {{ list.creator.nickname }}</div>
        <div class="play-count">播放: {{ list.playCount | numberFormat }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    playList: {
      type: Array
    }
  },
  methods: {
    getListView(list) {
      this.setCurList(list);
      this.$router.push('/like-song-list');
    },
    ...mapActions(['setCurList'])
  }
};
</script>

<style lang="less" scoped>
.search-list {
  .play-list {
    display: flex;
    margin-top: 20px;
    padding: 10px;
    .list-l,
    .list-r {
      width: 50%;
      display: flex;
      align-items: center;
      .list-pic {
        width: 8%;
        margin-right: 10px;
        img {
          width: 100%;
        }
      }
    }
    .list-r {
      justify-content: space-evenly;
      div {
        width: 30%;
        color: #888;
        font-size: 13px;
        text-align: center;
      }
    }
  }
  .play-list:nth-child(odd) {
    background-color: #f2f3f5;
  }
}
</style>
