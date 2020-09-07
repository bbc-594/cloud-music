<template>
  <div class="player">
    <transition name="normal">
      <div class="player-content" v-show="playerShow">
        <div class="normal-player">
          <div class="cd-msk-l">
            <div class="cd-msk-wrapper">
              <img :src="albumPic" alt="" />
            </div>
          </div>
          <div class="song-info" v-if="currentSong.id">
            <div class="song-name">{{ currentSong.name }}</div>
            <div class="song-album-artist">
              <div class="album-name">
                专辑: <span>{{ currentSong.album.name }}</span>
              </div>
              <div class="artist-name">
                歌手:
                <p
                  class="artist"
                  v-for="(artist, index) of currentSong.artists"
                  :key="artist.id"
                >
                  {{ artist.name }}
                  <span v-if="index + 1 < currentSong.artists.length">/</span>
                </p>
              </div>
            </div>
            <div ref="lyricList" class="lyric-list" v-if="currentLyric">
              <p
                v-for="(line, index) of currentLyric.lines"
                :key="index"
                ref="lyricLine"
                :class="currentLineNum === index ? 'current' : ''"
              >
                {{ line.txt }}
              </p>
            </div>
          </div>
        </div>
        <div class="singer-correlation">
          <div class="singer-comment">
            <comment-list
              :hotComments="hotComments"
              :comments="comments"
              :total="total"
              :id="currentSong.id"
              :type="0"
              @commSucess="commSucess"
            />
            <!-- <div class="comment-count">评论 ({{ total }})</div>
            <div class="comment-box"></div>
            <div class="comment-list">
              <p class="comment-list-title">最热评论</p>
              <comment
                v-for="comment of hotComments"
                :key="comment.commentId"
                :comment="comment"
              />
              <p class="comment-list-title">最新评论</p>
              <comment
                v-for="comment of comments"
                :key="comment.commentId"
                :comment="comment"
              />
            </div> -->
            <div class="comment-pagination">
              <pagination
                :total="total"
                :page="offset + 1"
                @pageChange="pageChange"
                :size="limit"
              />
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="mini-player">
      <div class="song-pic" @click="nomorlControl">
        <img :src="albumPic" alt />
      </div>
      <div class="song-operate">
        <div class="pre" @click="pre" v-show="!fmMode">
          <icon-svg iconHref="icon-pre" />
        </div>
        <div class="play-pause" @click="songControl">
          <icon-svg iconHref="icon-bofang6" v-if="!played" />
          <icon-svg iconHref="icon-zanting" v-else />
        </div>
        <div class="next" @click="next">
          <icon-svg iconHref="icon-next" />
        </div>
      </div>
      <div class="process-wrapper">
        <div class="time time-l">{{ currentTime | formatCurTime }}</div>
        <div class="process-bar-wrapper">
          <process-bar
            @percentChange="onProgressBarChange"
            :percent="percent"
          />
        </div>
        <div class="time time-r">
          {{ duration | formatCurTime }}
        </div>
      </div>
      <div class="play-mode" @click="changeMode">
        <icon-svg :iconHref="playMode" />
      </div>
      <div class="volumn">
        <div class="volumn-btn" @click="getMetu">
          <icon-svg :iconHref="volumeIcon" />
        </div>
        <a-slider id="volumn" v-model="volume" :defaultValue="30" />
      </div>
    </div>
    <audio
      ref="player"
      :src="this.currentSong.url"
      @ended="end"
      @canplay="ready"
      @timeupdate="updateTime"
    ></audio>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { createSong } from '@/utils/song';
import { shuffle } from '../../utils/RandomArr.js';
import { playMode } from '@/utils/config';
import Lyric from 'lyric-parser';
import ProcessBar from '@/components/process-bar/process-bar';
import Pagination from '../../components/pagination/pagination';
import CommentList from '../../components/comment-list/comment-list';
export default {
  name: 'miniPlay',
  data() {
    return {
      played: false,
      currentTime: 0,
      songReady: false,
      currentLyric: null,
      currentLineNum: 0,
      nomalShow: false,
      hotComments: [],
      comments: [],
      // songList: [],
      total: 0,
      offset: 0,
      limit: 20,
      volume: 50,
      mute: false,
    };
  },
  components: {
    ProcessBar,
    Pagination,
    // Comment
    CommentList,
  },
  created() {
    if (!this.currentSong.id) {
      return;
    }
    this.changeBg(this.albumPic);
  },
  computed: {
    albumPic() {
      if (this.currentSong.id) {
        return this.currentSong.album.picUrl;
      } else {
        return require('@/assets/images/nopic1.png');
      }
    },
    volumeIcon() {
      return this.mute ? 'icon-jingyin1' : 'icon-laba3-copy';
    },
    playMode() {
      return this.mode === playMode.sequence
        ? 'icon-xunhuan-wangyiicon'
        : this.mode === playMode.random
        ? 'icon-suijibofang-wangyiicon'
        : 'icon-loop';
    },
    duration() {
      if (!this.currentSong.duration) {
        return;
      }
      let duration = parseInt(this.currentSong.duration.toString().slice(0, 3));
      return duration;
    },
    percent() {
      return this.currentTime / this.duration;
    },
    ...mapGetters([
      'currentSong',
      'playList',
      'currentIndex',
      'mode',
      'seqList',
      'playerShow',
      'fmMode',
    ]),
  },
  watch: {
    currentSong(oldVal, newVal) {
      if (oldVal.id === newVal.id) {
        this.loop();
      }
      if (this.currentLyric) {
        this.currentLyric.stop();
      }
      let vm = this;
      this.$nextTick(() => {
        vm.$refs.player.play();
        vm.$refs.player.volume = vm.volume / 100;
        this.getLyric();
        this.getComment();
        this.changeBg(this.albumPic);
        this.played = true;
      });
    },
    volume(val) {
      this.mute = val === 0 ? true : false;
      this.$refs.player.volume = val / 100;
    },
  },
  methods: {
    end() {
      if (this.mode === playMode.loop) {
        this.loop();
      } else {
        this.next();
      }
    },
    getFm: async function() {
      let res = await this.$api.personal_FM();
      const {
        data: { data },
      } = res;
      // this.songList = data;
      this.setFmMode(true);
      this.setSeqList(data);
      this.play({ song: data[0], index: 1 });
      // this.setSeqList(data);
      // this.setCurSong(data[0]);
    },
    next() {
      if (!this.songReady) {
        return;
      }
      let index = this.currentIndex + 1;
      if (index === this.playList.length && !this.fmMode) {
        this.loop();
      } else if (index === this.seqList.length && this.fmMode) {
        this.getFm();
      } else {
        let song = this.playList[index];
        this.play({ song, index });
      }
      if (!this.played) {
        this.songControl();
      }
      this.songReady = false;
    },
    pre() {
      if (!this.songReady) {
        return;
      }
      let index = this.currentIndex;
      if (index === 0) {
        const lastIndex = this.playList.length - 1;
        let song = this.playList[lastIndex];
        this.play({ song, index: lastIndex });
      } else {
        index = index - 1;
        let song = this.playList[index];
        this.play({ song, index });
      }
      this.songReady = false;
    },
    getMetu() {
      if (this.metu) {
        this.volume = 50;
      }
      this.volume = this.metu ? 50 : 0;
      this.metu = !this.metu;
    },
    nomorlControl() {
      if (!this.currentSong.id) {
        return;
      }
      // this.nomalShow = !this.nomalShow;
      this.setPlayer(!this.playerShow);
    },
    changeBg(imgUrl) {
      document.styleSheets[0].addRule(
        '.normal-player::before',
        'background:url(' + imgUrl + ')'
      );
    },
    commSucess(comment) {
      this.$message.success('评论成功！');
      this.comments.unshift(comment);
      // this.getComment();
    },
    pageChange({ page }) {
      this.offset = page - 1;
      this.getComment();
    },
    getComment: async function() {
      const { id } = this.currentSong;
      let { offset, limit } = this;
      offset = offset * limit;
      let res = await this.$api.musicComment(id, limit, offset);
      const {
        data: { hotComments, comments, total, more },
      } = res;
      if (hotComments) {
        this.hotComments = hotComments;
      }
      this.comments = comments;
      this.total = total;
    },
    getLyric: async function() {
      let lyric = await this.currentSong.getLyric();
      this.currentLyric = new Lyric(lyric, this.handleLyrc);
      if (this.played) {
        this.currentLyric.play();
      }
    },
    handleLyrc({ lineNum }) {
      // console.log('lineNum :', lineNum);
      // console.log('lyric :', lyric);
      this.currentLineNum = lineNum;
      // console.log('curLine :', lineNum);
      // if (lineNum > 5) {
      let lyricList = document.querySelector('.lyric-list');
      if (lineNum > 5) {
        let clientTop = this.$refs.lyricLine[lineNum - 5].offsetTop;
        lyricList.scrollTop = clientTop - 100;
      } else {
        lyricList.scrollTop = 0;
      }
      // if (lineNum > 4) {
      //   console.log('lineNum :', lineNum);
      //   let lineEl = this.$refs.lyricLine[lineNum - 5];
      //   lyricList.scrollTo(lineEl.offsetHeight, 200);
      // } else {
      //   // lyricList.scrollTo(0, 0);
      // }
      // }
    },
    loop() {
      // let song = this.playList[0];
      // this.play(song, 0);
      this.$refs.player.currentTime = 0;
      this.$refs.player.play();
      if (this.currentLyric) {
        this.currentLyric.seek(0);
      }
    },
    changeMode() {
      let mode = (this.mode + 1) % 3;
      if (this.fmMode) {
        mode = playMode.sequence;
      }
      this.setPlayMode(mode);
      let list = [];
      if (this.mode === playMode.random) {
        list = shuffle(this.playList);
        this.setPlayList(list);
      } else {
        list = this.seqList;
        this.setPlayList(list);
      }
    },
    songControl() {
      if (!this.songReady) {
        return;
      }
      if (this.played) {
        this.$refs.player.pause();
      } else {
        this.$refs.player.play();
      }
      if (this.currentLyric) {
        this.currentLyric.togglePlay();
      }
      this.played = !this.played;
    },
    play({ song, index }) {
      const { id } = song;
      this.$api.songCheck(id).then(async (res) => {
        let {
          data: { success },
        } = res;
        if (success) {
          let res = await this.$api.songUrl(id);
          let {
            data: { data },
          } = res;
          const { url } = data[0];
          this.setCurSong(createSong({ url, ...song }));
          this.setCurIndex(index);
        } else {
          this.$message.error('暂无版权!');
        }
      });
    },
    onProgressBarChange(percent) {
      const currentTime = this.duration * percent;
      this.$refs.player.currentTime = currentTime;
      if (!this.played) {
        this.songControl();
      }
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000); // 及时跳转
      }
    },
    ready() {
      this.songReady = true;
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime;
    },
    ...mapActions([
      'setCurSong',
      'setCurIndex',
      'setPlayMode',
      'setPlayList',
      'setPlayer',
      'setFmMode',
      'setSeqList',
    ]),
  },
};
</script>

<style lang="less" scoped>
.player {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 99;
  .player-content {
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100vh;
    // padding-bottom: 30px;
  }
  .normal-player {
    // min-height: 900px;.
    position: relative;
    height: 100vh;
    // overflow: hidden;
    display: flex;
    justify-content: space-evenly;
    // opacity: 0.6;
    .cd-msk-l {
      width: 40%;
      // text-align: center;
      display: flex;
      justify-content: center;
      .cd-msk-wrapper {
        width: 18vw;
        height: 18vw;
        border-radius: 50%;
        overflow: hidden;
        margin-top: 25vh;
        transition: all 1s;
        animation: rotate 12s linear infinite;
        background-image: radial-gradient(5em 30em ellipse, #fff, #000);
        border: 2px solid #131313;
        box-shadow: 0 0 0 4vw #343935;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    @keyframes rotate {
      0% {
        transform: rotate(0);
      }
      50% {
        transform: rotate(180deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    .song-info {
      width: 50%;
      margin-top: 20vh;
      .song-name {
        font-size: 22px;
      }
      .song-album-artist {
        display: flex;
        margin-top: 10px;
        font-size: 13px;
        .album-name {
          margin-right: 20px;
        }
        .artist-name {
          display: flex;
        }
        span,
        p {
          margin-left: 4px;
          color: #1a5a99;
        }
      }
      .lyric-list {
        width: 100%;
        max-height: 53vh;
        margin-top: 30px;
        overflow: auto;
        transition: all 0.5s;
        p {
          color: #000;
          opacity: 0.8;
          margin-bottom: 10px;
        }
        .current {
          color: #fff;
        }
      }
    }
  }
  .normal-player::before {
    content: '';
    position: absolute;
    background-size: cover;
    // background: url(http://p1.music.126.net/Lh3Pgt892lrR3OPsfPZsAA==/18239798393654554.jpg)
    //   no-repeat;
    top: 0;
    left: 0;
    z-index: -97;
    transform: scale(1.8);
    width: 100%;
    height: 65%;
    opacity: 1.2;
    background-color: rgba(0, 0, 0, 0.65);
    filter: blur(42px) contrast(0.9);
  }
  .singer-correlation {
    position: relative;
    // overflow: auto;
    // overflow: hidden;
    padding-top: 30px;
    .singer-comment {
      width: 60vw;
      margin: 0 auto;
      .comment-pagination {
        width: 100%;
      }
      .comment-list-title {
        margin: 30px 0;
      }
    }
  }
  .singer-correlation::before {
    background-color: #f2f3f5;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: -99;
    transform: scale(1.8);
    width: 100%;
    height: 100%;
    // opacity: 1.2;
    filter: blur(10px);
  }
  .normal-enter-active,
  .normal-leave-active {
    overflow: hidden;
    transition: all 0.2s ease-in-out;
  }
  .normal-enter,
  .normal-leave-to {
    transform: translate(-100%, 100%);
  }
  .mini-player {
    cursor: default;
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    z-index: 999;
    background-color: #fff;
    .song-pic {
      width: 60px;
      height: 100%;
      img {
        width: 100%;
      }
    }
    .song-operate {
      display: flex;
      margin-right: 20px;
      div {
        margin-left: 20px;
        transition: all 0.5s;
      }
      div:active {
        transform: scale(0.96);
        transition: all 0.5s;
      }
      svg {
        width: 30px;
        height: 30px;
      }
    }
    .process-wrapper {
      flex: 1;
      display: flex;
      margin-right: 20px;
      line-height: 30px;
      justify-content: space-between;
      .time {
        padding: 0 20px;
        color: #999;
      }
      .process-bar-wrapper {
        flex: 1;
      }
    }
    .play-mode {
      margin-right: 60px;
    }
    .volumn {
      display: flex;
      min-width: 100px;
      padding-right: 20px;
      align-items: center;
      svg {
        margin-right: 10px;
        // margin-bottom: 0;
      }
      .ant-slider {
        width: 80%;
        margin: 0 !important;
      }
      width: 10%;
    }
  }
}
</style>
