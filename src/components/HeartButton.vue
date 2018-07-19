<template>
  <button class="heart-btn" :class="{selected: getHearted()}" @click="handleClick">
    <font-awesome-icon :icon="getIcon()" />

    <span class="count">{{asset.hearts}}</span>
  </button>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faHeart from '@fortawesome/fontawesome-free-regular/faHeart';
import faHeartSolid from '@fortawesome/fontawesome-free-solid/faHeart';

import { trackEvent } from '../services/analytics';
import { HTTP } from '../services/http-common';

export default {
  name: 'HeartButton',
  components: {
    FontAwesomeIcon
  },
  props: {
    asset: Object
  },
  methods: {
    handleClick() {
      this.toggleHeart();

      trackEvent('click_heart', {
        asset: this.asset.shortcut
      });
    },
    toggleHeart() {
      if (this.getHearted()) {
        this.removeHeart();
      } else {
        this.heart();
      }
    },
    heart() {
      HTTP.post(`albums/${this.asset.album_id}/assets/${this.asset.id}/hearts`)
        .then(response => {
          const heartedAssets = this.getHeartedAssets().filter(asset => asset.assetId !== this.asset.id);

          this.asset.hearts += 1;

          heartedAssets.push({
            count: this.asset.hearts,
            assetId: response.data.data.asset_id,
            identifier: response.data.data.identifier
          });

          this.setHeartedAssets(heartedAssets);
        });
    },
    removeHeart() {
      HTTP.delete(`albums/${this.asset.album_id}/assets/${this.asset.id}/hearts/${this.getHearted().identifier}`)
        .then(response => {
          const heartedAssets = this.getHeartedAssets().filter(asset => asset.assetId !== this.asset.id);

          this.asset.hearts -= 1;

          this.setHeartedAssets(heartedAssets);

        });
    },
    getHearted() {
      if (!('localStorage' in window)) {
        return false;
      }

      return this.getHeartedAssets().find(asset => asset.assetId === this.asset.id);

    },
    getHeartedAssets() {
      return JSON.parse(localStorage.getItem('heartedAssets') || '[]')
    },
    setHeartedAssets(heartedAssets = []) {
      localStorage.setItem('heartedAssets', JSON.stringify(heartedAssets));
    },
    getIcon() {
      if (this.getHearted()) {
        return faHeartSolid;
      }

      return faHeart;
    }
  }
};
</script>

<style scoped>
  .heart-btn { width: 20px; height: 20px; background-color: transparent; -webkit-appearance: none; border: 0; text-align: center; font-size: 16px; line-height: 20px; opacity: .4; transition: 150ms; cursor: pointer; white-space: nowrap; }
  .heart-btn:hover { opacity: 1; }
  .heart-btn.selected { color: #e03737; opacity: 1; }
  
  .heart-btn .count { display: inline-block; vertical-align: top; font-size: 14px; }
</style>
