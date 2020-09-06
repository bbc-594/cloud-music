import * as types from './mutation-types';
// import { message } from 'ant-design-vue';
const mutations = {
  [types.SET_USER_INFO](state, user) {
    localStorage.setItem('user', JSON.stringify(user));
    state.user = user;
  },
  // [types.ERR_MSG](state, msg) {
  //   message.error(msg, 2);
  // },
  [types.SET_CURRENT_SONG](state, song) {
    if (!song) {
      state.currentSong = {};
      return;
    }
    state.currentSong = song;
  },
  [types.SET_PLAY_LIST](state, songList) {
    state.playList = songList;
  },
  [types.SET_SEQUENCE_LIST](state, seqList) {
    state.sequenceList = seqList;
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index;
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.playMode = mode;
  },
  [types.SET_CURRENT_LIST](state, list) {
    state.currentList = list;
  },
  [types.SET_HISTORY_SEARCH](state, keyword) {
    localStorage.setItem('hisKey', JSON.stringify(state.hisKeyList));
    state.hisKeyList.push(keyword);
  },
  [types.SET_CURRENT_SINGER](state, singer) {
    state.currentSinger = singer;
  },
  [types.SET_GET_MORE](state, getMore) {
    state.getMore = getMore;
  },
  [types.SET_PLAYER_SHOW](state, bool) {
    state.playerShow = bool;
  },
  [types.SET_FM](state, bool) {
    state.fmMode = bool;
  }
};
export default mutations;
