<template>
  <div id="chute-display" class="chute-display" v-if="chuteConfig">
    <ChuteLoader v-if="chuteConfigLoading" />

    <Header v-if="!chuteConfigLoading" />

    <Gallery
      v-if="!chuteConfigLoading"
      :albumShortcut="chuteConfig.album.shortcut"
      :assets="assets"
      :loading="galleryLoading"
    />

    <Footer v-if="!chuteConfigLoading" />
  </div>
</template>

<script>
import config from './config';
import { HTTP } from './services/http-common';
import { initAnalytics, trackEvent } from './services/analytics';

import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Gallery from './components/Gallery.vue';
import ChuteLoader from './components/ChuteLoader.vue';

const ROTATION_DELAY = 20000;
const MAX_ROTATE_ATTEMPTS = 3;
const MAX_VISIBLE_ASSETS = 8;

export default {
  name: 'app',
  components: {
    Header,
    Footer,
    Gallery,
    ChuteLoader
  },
  data() {
    return {
      chuteConfigLoading: true,
      chuteConfig: null,
      rotateAttempts: 0,
      allAssets: [],
      assets: [],
      galleryLoading: true,
      newesetId: null,
      galleryErrors: []
    }
  },
  methods: {
    loadPage(fromFirst) {
      return HTTP.get(`albums/${this.chuteConfig.album.shortcut}/assets`, {
        params: {
          per_page: 50,
          since_id: !fromFirst && this.newesetId ? this.newesetId : undefined
        }
      })
      .then(response => {
        if (response.data.data[0]) {
          this.newesetId = response.data.data[0].id;
        }

        this.assets = [...this.assets, ...response.data.data].sort((a1, a2) => new Date(a2.created_at).getTime() - new Date(a1.created_at).getTime());
        this.allAssets = [...this.allAssets, ...response.data.data].sort((a1, a2) => new Date(a2.created_at).getTime() - new Date(a1.created_at).getTime());

        return response;
      })
      .catch(e => {
        this.galleryErrors.push(e);

        return e;
      });
    },
    dropVisibleAssets() {
      const visibleAssetsCount = this.$el.querySelectorAll('.gallery .asset.current-visible').length

      this.assets = this.assets.slice(visibleAssetsCount);

      if (!this.assets.length) {
        this.assets = [...this.allAssets];
      }
    },
    rotate() {
      this.loadPage()
        .then(response => {
          if (!response.data.data.length) {
            this.rotateAttempts += 1;
          }

          if (this.rotateAttempts >= MAX_ROTATE_ATTEMPTS) {
            this.dropVisibleAssets();
            this.rotateAttempts = 0;
          }

          setTimeout(() => {
            this.rotate();
          }, ROTATION_DELAY)

        });
    }
  },
  created() {
    this.chuteConfig = config.defaultConfig;

    initAnalytics({
      displayId: this.chuteConfig.id,
      displayType: this.chuteConfig.runner,
      clientId: this.chuteConfig.cID,
      albumShortcut: this.chuteConfig.album.shortcut
    });

    this.chuteConfigLoading = false;

    return this.loadPage(true)
      .then(() => {
        this.galleryLoading = false;

        setTimeout(() => {
          this.rotate();
        }, ROTATION_DELAY);
      });
    },
    updated() {
      const galleryHeight = this.$el.querySelector('.gallery').clientHeight;
      const assets = Array.from(this.$el.querySelectorAll('.gallery .asset'));
      let mediaAssetsCount = 0;

      assets.forEach((asset, index) => {
        if (asset.offsetTop < galleryHeight && index < MAX_VISIBLE_ASSETS) {
          asset.classList.add('current-visible');
          const assetType = asset.getAttribute('data-type');

          if (assetType === 'video' || assetType === 'images') {
            mediaAssetsCount += 1;
          }
        }
      });

      if (mediaAssetsCount <= 2) {
        this.$el.querySelector('.gallery').classList.add('large-font');
      } else {
        this.$el.querySelector('.gallery').classList.remove('large-font');
      }
    }
};
</script>

<style>
  * { margin: 0; padding: 0; outline: 0; box-sizing: border-box; }
  #chute-display { font-family: 'Open Sans', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; height: 100vh; overflow: hidden; }

  .chute-modal-open { overflow: hidden; }
</style>
