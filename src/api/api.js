import service from './http';
// 首页轮播图
export const banner = type => {
  return service.post('/banner', { type });
};
// 推荐歌单
export const personalList = limit => {
  return service.get(`/personalized?limit=${limit}`);
};
// 独家放送
export const privatecontent = () => {
  return service.get('/personalized/privatecontent');
};
// 最新音乐
export const newSong = () => {
  return service.get('/personalized/newsong');
};

// 用户登录 —— 手机
export const loginByPhone = ({ phone, password }) => {
  return service.get(`/login/cellphone?phone=${phone}&password=${password}`);
};
// 用户退出登录
export const logout = () => {
  return service.get('/logout');
};
// 刷新用户状态
export const refresh = () => {
  return service.get('/login/refresh');
};

// 获取登录状态
export const status = () => {
  return service.get('/login/status');
};
// 获取用户详情
export const userDetail = id => {
  return service.get(`/user/detail?uid=${id}`);
};
// 获取音乐url
export const songUrl = id => {
  return service.get(`/song/url?id=${id}`);
};
// 检查音乐是否可用
export const songCheck = id => {
  return service.get(`/check/music?id=${id}`);
};
// 获取每日推荐歌曲
export const recommendSongs = () => {
  const timestamp = new Date().getTime();
  return service.get(`/recommend/songs?timestamp=${timestamp}`);
};
// 喜欢音乐
export const likeSong = (id, like = true) => {
  return service.get(`/like?id=${id}&like=${like}`);
};
// 喜欢的音乐列表
export const likeList = uid => {
  return service.get(`/likelist?uid=${uid}`);
};
// 获取音乐详情
export const songDetail = ids => {
  return service.get(`/song/detail?ids=${ids}`);
};
//  获取用户歌单
export const playList = uid => {
  return service.post('/user/playlist', { uid });
};
// 获取歌单详情
export const playListDetail = id => {
  return service.get(`/playlist/detail?id=${id}`);
};
// 默认搜索关键词
export const defaultSearch = () => {
  return service.get('/search/default');
};
// 热搜列表
export const hotSearch = () => {
  return service.get('/search/hot');
};
// 搜索
export const search = (keyword, type, offset = 0) => {
  return service.get(
    `/search?keywords=${keyword}&type=${type}&offset=${offset}`
  );
};

//歌词
export const lyric = id => {
  return service.get(`/lyric?id=${id}`);
};
// 新歌速递
export const topSong = type => {
  return service.get(`/top/song?type=${type}`);
};
// 新碟上架
export const topAlbum = (offset, limit) => {
  return service.get(`/top/album?offset=${offset}&limit=${limit}`);
};

// 热门歌手
export const topArtist = (offset, limit) => {
  return service.get(`/top/artists?limit=${limit}&offset=${offset}`);
};
// 歌手热门top50
export const artTopSong = id => {
  return service.get(`/artist/top/song?id=${id}`);
};
// 获取歌手描述
export const singerDes = id => {
  return service.get(`/artist/desc?id=${id}`);
};
// 获取歌手单曲
export const singerDetail = id => {
  return service.get(`/artists?id=${id}`);
};
// 歌手单曲
export const artSongs = id => {
  return service.get(`/artists?id=${id}`);
};
// 歌手分类
export const artistList = (cat, limit, offset) => {
  return service.get(`/artist/list?cat=${cat}&offset=${offset}&limit=${limit}`);
};
// 专辑内容
export const albumDetail = id => {
  return service.get(`/album?id=${id}`);
};
// 精品歌单
export const topPlaylist = (cat, before) => {
  return service.get(`/top/playlist/highquality?cat=${cat}&before=${before}`);
};

// 获取Mv数据
export const mvDetail = id => {
  return service.get(`/mv/detail?mvid=${id}`);
};
// 获取mv地址
export const mvUrl = id => {
  return service.get(`/mv/url?id=${id}`);
};

// 网易出品
export const exclusive = (offset = 0, limit = 30) => {
  return service.get(`/mv/exclusive/rcmd?offset = ${offset}&limit=${limit}`);
};
// 最新Mv
export const firstMv = (area, limit = 30) => {
  return service.get(`/mv/first?limit=${limit}&area=${area}`);
};
// mv排行
export const topMv = (area, offset) => {
  return service.get(`/top/mv?area=${area}&offset=${offset}`);
};

// 全部mv
export const allMv = (area, order, type, offset, limit) => {
  return service.get(
    `/mv/all?area=${area}&order=${order}&type=${type}&offset=${offset}&limit=${limit}`
  );
};

// 歌曲评论
export const musicComment = (id, limit, offset) => {
  return service.get(`/comment/music?id=${id}&limit=${limit}&offset=${offset}`);
};
// mv评论
export const mvComment = (id, limit, offset) => {
  return service.get(`/comment/mv?id=${id}&limit=${limit}&offset=${offset}`);
};
// 发送评论或删除
export const comment = (t, type, id, content, commentId) => {
  return service.get(
    `/comment?t=${t}&type=${type}&id=${id}&content=${content}&commentId=${commentId}`
  );
};

// 私人FM
export const personal_FM = () => {
  return service.get('/personal_fm');
};
