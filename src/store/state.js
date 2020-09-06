import { playMode } from '../utils/config';
const storageData = {
  user: JSON.parse(localStorage.getItem('user')),
  hisKeyList: JSON.parse(localStorage.getItem('hisKey'))
};
const state = {
  user: storageData.user || {},
  currentSong: {},
  currentList: {},
  playList: [],
  sequenceList: [],
  currentIndex: -1,
  playMode: playMode.sequence,
  hisKeyList: storageData.hisKeyList || [],
  currentSinger: {},
  getMore: false,
  playerShow: false,
  fmMode: false
};
export default state;
