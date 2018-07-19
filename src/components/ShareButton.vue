<template>
  <button class="share-btn" @click="handleClick">
    <font-awesome-icon :icon="socialIcon" />
  </button>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import iconFacebook from '@fortawesome/fontawesome-free-brands/faFacebookF';
import iconTwitter from '@fortawesome/fontawesome-free-brands/faTwitter';
import iconPinterest from '@fortawesome/fontawesome-free-brands/faPinterestP';

import { trackEvent } from '../services/analytics';

export default {
  name: 'ShareButton',
  components: {
    FontAwesomeIcon
  },
  props: {
    type: String,
    caption: String,
    shortcut: String,
    albumShortcut: String
  },
  methods: {
    handleClick() {
      trackEvent(`share_${this.type}`, {
        asset: this.shortcut
      });

      this.openShareWindow();
    },
    openShareWindow() {
      window.open(this.shareUrl, 'Share', 'width=500,height=250')
    }
  },
  computed: {
    socialIcon() {
      switch (this.type) {
        case 'facebook':
          return iconFacebook;

        case 'twitter':
          return iconTwitter;

        case 'pinterest':
          return iconPinterest;

        default:
          return null;
      }

    },
    shareUrl() {
      const url = encodeURIComponent(window.location.href);
      const caption = encodeURIComponent(this.caption);
      const imageUrl = encodeURIComponent(this.imageUrl);

      switch (this.type) {
        case 'facebook':
          return `https://www.facebook.com/dialog/feed?display=popup&app_id=418143708282236&caption=${caption}&description=${caption}&link=${url}&name=${caption}&picture=${imageUrl}`;

        case 'twitter':
          return `https://twitter.com/intent/tweet?hashtags=&related=&text=&url=${url}&via=`;

        case 'pinterest':
          return `https://www.pinterest.com/pin/create/button/?description=${caption}&media=${imageUrl}&url=${url}`;
      }

    },
    imageUrl() {
      return `https://media.chute.io/resize/${this.albumShortcut}/${this.shortcut}/256x256`;
    }
  }
};
</script>

<style scoped>
  .share-btn { width: 20px; height: 20px; background-color: transparent; color: inherit; -webkit-appearance: none; border: 0; text-align: center; font-size: 16px; line-height: 20px; opacity: .4; transition: 150ms; cursor: pointer; }
  .share-btn:hover { opacity: 1; }
</style>
