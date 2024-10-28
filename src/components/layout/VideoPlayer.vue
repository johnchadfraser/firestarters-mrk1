<template>
  <div
    :class="
      videoDisplay === 'article' ? 'video-player-article' : 'video-player'
    "
  >
    <!--Video placeholder-->
    <div
      :class="
        videoDisplay === 'article'
          ? 'video-container-article'
          : 'video-container rt rb'
      "
    >
      <iframe
        frameborder="0"
        :class="
          videoDisplay === 'article'
            ? 'responsive-iframe-article'
            : 'responsive-iframe'
        "
        allowfullscreen="1"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
        :title="videoTitle"
        :src="videoSrc"
      >
      </iframe>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    videoSrc: String,
    videoTitle: String,
    videoDisplay: String,
  },
};
</script>

<style scoped>
/*Some styles here support older iPhone responsiveness.*/

.video-container {
  position: relative;
  overflow: hidden;
  width: 80%;
  /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
  padding-top: 56.25%;
  margin: 1rem 2rem;
}

.responsive-iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  -webkit-border-radius: 0.5rem;
  -moz-border-radius: 0.5rem;
}

.video-player {
  position: relative;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  .video-container {
    width: 80%;
    margin: 1rem 3rem;
  }

  .video-player {
    margin-bottom: 1rem;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .video-container {
    width: 80%;
    margin: 2rem 4rem;
  }

  .video-player {
    margin-bottom: 1rem;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  .video-container {
    width: 80%;
    margin: 2rem 6rem;
  }

  .video-player {
    margin-bottom: 1rem;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  .video-container {
    width: 90%;
    margin: 3.25rem;
  }

  .video-player {
    height: 35rem;
    margin: 1.5rem 1.5rem 5rem;
  }
}
</style>
