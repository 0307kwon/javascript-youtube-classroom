import ArrayStorage from './ArrayStorage.js';

export default class VideoStorage extends ArrayStorage {
  constructor(key) {
    super(key);
  }

  popVideoByVideoId(videoId) {
    const videos = this.getItem();
    const poppedVideo = videos.find(video => video.videoId === videoId);

    if (!poppedVideo) {
      return;
    }

    this.setItem(videos.filter(video => video.videoId !== videoId));

    return poppedVideo;
  }

  setVideoProperty(targetVideoId, property = {}) {
    if (Object.values(property).length === 0) {
      console.error('setVideoProperty의 property 인자가 비어있습니다.');
      return;
    }

    const videos = this.getItem();
    const targetIndex = videos.findIndex(
      video => video.videoId === targetVideoId
    );

    Object.keys(property).forEach(key => {
      const targetVideo = videos[targetIndex];
      if (targetVideo[key] === undefined) return;

      targetVideo[key] = property[key];
    });

    this.setItem(videos);
  }

  getVideoById(targetVideoId) {
    const videos = this.getItem();
    return videos.find(video => video.videoId === targetVideoId);
  }

  getVideosBy(storageOption = {}) {
    if (Object.values(storageOption).length === 0) {
      console.error('getVideosBy의 storageOption 인자가 비어있습니다.');
      return;
    }

    const videos = this.getItem();
    const isSatisfiedByOption = video => {
      const keys = Object.keys(storageOption);
      return keys.every(key => {
        if (video[key] === undefined) {
          console.error(
            `getVideosBy의 인자가 유효하지 않은 key값입니다.(key: ${key})`
          );
        }

        return video[key] === storageOption[key];
      });
    };

    return videos.filter(isSatisfiedByOption);
  }
}
