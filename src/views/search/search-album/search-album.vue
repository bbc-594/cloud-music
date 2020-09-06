<template>
  <div class="search-album">
    <loading v-if="albums.length === 0" />
    <div
      v-else
      class="album"
      v-for="album of albums"
      :key="album.id"
      @click.stop="getDetail(album.id)"
    >
      <div class="album-pic">
        <img :src="album.picUrl" alt="" />
      </div>
      <div class="album-name">{{ album.name }}</div>
      <div class="album-artist" @click.stop="getArtist(album.artist.id)">
        {{ album.artist.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    albums: {
      type: Array
    }
  },
  methods: {
    getDetail(id) {
      this.$router.push({ path: '/album-list', query: { id } });
    },
    getArtist: async function(id) {
      let res = await this.$api.singerDetail(id);
      const {
        data: { artist: singer }
      } = res;
      this.setCurSinger(singer);
      this.$router.push('/singerDetail');
    },
    ...mapActions(['setCurSinger'])
  }
};
</script>

<style lang="less" scoped>
.search-album {
  .album {
    display: flex;
    padding: 10px;
    cursor: pointer;
    margin-top: 20px;
    align-items: center;
    .album-pic {
      width: 5%;
      margin-right: 5%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .album-name {
      width: 50%;
    }
    .album-artist {
      font-size: 13px;
      color: #888;
      width: 40%;
    }
  }
  .album:nth-child(odd) {
    background-color: #f2f3f5;
  }
}
</style>
