import * as api from '@/api/api';
import * as types from './mutation-types';
import { playMode } from '../utils/config';
import { shuffle } from '../utils/RandomArr';

function getIndex(arr, song) {
  return arr.findIndex(item => {
    return song.id === item.id;
  });
}
// 用户登录
export const userLogin = async ({ commit }, reqBody) => {
  const res = await api.loginByPhone(reqBody);
  const { data } = res;
  if (data.code === 200) {
    commit(types.SET_USER_INFO, data);
    return data;
  }
};
export const setPlayer = ({ commit }, Bool) => {
  commit(types.SET_PLAYER_SHOW, Bool);
};
// 退出登录
export const userlogout = async ({ commit }) => {
  const res = await api.logout();
  const { data } = res;
  if (data.code === 200) {
    commit(types.SET_USER_INFO, {});
  }
};
// ** 歌曲播放模块 ** //
// 存储当前播放歌曲
export const setCurSong = ({ commit }, song) => {
  commit(types.SET_CURRENT_SONG, song);
};
export const setPlayList = ({ commit, state }, songList) => {
  const { sequenceList, currentSong } = state;
  let index = getIndex(sequenceList, currentSong);
  commit(types.SET_PLAY_LIST, songList);
  commit(types.SET_CURRENT_INDEX, index);
};
export const setSeqList = ({ commit, state }, songList) => {
  // const { sequenceList, currentSong } = state;
  commit(types.SET_SEQUENCE_LIST, songList);
  if (state.playMode === playMode.random) {
    let list = shuffle(songList);
    // let index = getIndex(sequenceList, currentSong);
    commit(types.SET_PLAY_LIST, list);
  } else {
    commit(types.SET_PLAY_LIST, songList);
  }
};
export const setFmMode = ({ commit }, Bool) => {
  commit(types.SET_FM, Bool);
}
export const setCurIndex = ({ commit }, index) => {
  commit(types.SET_CURRENT_INDEX, index);
};
export const setPlayMode = ({ commit }, mode) => {
  commit(types.SET_PLAY_MODE, mode);
};
export const setHistorySearch = ({ commit, state }, keyword) => {
  if (state.hisKeyList.includes(keyword) > 0) {
    return;
  }
  commit(types.SET_HISTORY_SEARCH, keyword);
};
export const setCurSinger = ({ commit }, singer) => {
  commit(types.SET_CURRENT_SINGER, singer);
};
export const setMore = ({ commit }, getMore) => {
  commit(types.SET_GET_MORE, getMore);
};
// ** 歌曲播放模块 ** //
// // 用户注册
// export const userRegister = async ({ commit, state }, reqBody) => {
//   const res = await api.register(reqBody);
//   const {
//     data: { code, data, msg }
//   } = res;
//   if (code === 200) {
//     commit(types.SET_USER_INFO, data);
//   } else {
//     commit(types.ERR_MSG, msg);
//   }
// };
// 当前歌单内容
export const setCurList = ({ commit }, list) => {
  commit(types.SET_CURRENT_LIST, list);
};
