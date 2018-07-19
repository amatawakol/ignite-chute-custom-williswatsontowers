<template>
  <div>
    <div class="gallery" v-masonry transition-duration="0" item-selector=".asset">
      <ChuteLoader v-if="loading" />

      <div class="gallery-inner">
        <Asset v-for="asset in assets" :key="asset.id" :asset="asset" />  
      </div><!-- /.gallery-inner -->

      <ChuteLoader v-if="!loading && loadingMore" />
    </div>
  </div>
</template>

<script>
import { trackEvent } from '../services/analytics';

import ChuteLoader from './ChuteLoader.vue';
import Asset from './Asset.vue';

export default {
  name: 'Gallery',
  components: {
    ChuteLoader,
    Asset
  },
  props: {
    loading: Boolean,
    assets: Array,
    albumShortcut: String,
    nextPage: Function
  },
  data() {
    return {
      loadingMore: this.loading
    }
  },
  watch: {
    loading(val) {
      this.loadingMore = val
    }
  },
  updated() {
    if (typeof this.$redrawVueMasonry === 'function') {
      this.$redrawVueMasonry()
    }
  }
}
</script>

<style scoped>
  .gallery { max-width: 1200px; margin: 0 auto; overflow: hidden; position: relative; padding: 15px 0; }
</style>
