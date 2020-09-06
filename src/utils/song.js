import { lyric } from '../api/api';
export default class Song {
  constructor({ id, name, artists, album, starred, mvid, duration, url }) {
    this.id = id;
    this.mvid = mvid;
    this.name = name;
    this.artists = artists;
    this.album = album;
    this.starred = starred;
    this.duration = duration;
    this.url = url;
  }
  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric);
    }
    return new Promise((resolve, reject) => {
      lyric(this.id).then(res => {
        const {
          data: {
            code,
            lrc: { lyric }
          }
        } = res;
        if (code === 200) {
          this.lyric = lyric;
          resolve(this.lyric);
        } else {
          reject('no lyric');
        }
      });
    });
  }
}
export const createSong = songData => {
  return new Song({
    id: songData.id,
    mvid: songData.mvid,
    name: songData.name,
    artists: songData.artists || songData.ar,
    album: songData.album || songData.al,
    starred: songData.starred || true,
    duration: songData.duration || songData.dt,
    url: songData.url
  });
};
