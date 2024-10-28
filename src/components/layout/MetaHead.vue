<template>
    <metainfo></metainfo>
</template>

<script>

export default({
    props:['title', 'description', 'ogImageTypePath', 'ogImage'],
    data() {
      return {
        imagePath: process.env.VUE_APP_CDN_URL + "/" + process.env.VUE_APP_CDN_REPOSITORY_PATH + "/image",
        host: window.location
      }
    },
    metaInfo() {
      return {
        title: `${this.title}`,
        description: `${this.description}`,
        og: {
          site_name: 'Firestarters - Your Global Business Community',
          title: `${this.title}`,
          description: `${this.description}`,
          url: `${this.host}`,
          image: `${this.imagePath}/${this.ogImageTypePath}/${this.ogImage}`
        }
    }
  },
})
</script>