<template>
  <div class="asset" :data-id="asset.id" :data-type="asset.type" v-masonry-tile >
    <div class="asset-inner">
      <div class="asset-preview" v-if="asset.type === 'image'">
        <img :src="asset.url" :alt="asset.caption">
      </div>

      <div class="asset-preview" v-if="asset.type === 'video'">
        <video autoplay loop muted v-if="!youtubeEmbed">
          <source :src="asset.video_url" type="video/mp4" />
          <source :src="asset.video_webm_url" type="video/webm" />
        </video>

        <div class="embed">
          <iframe width="16" height="10" :src="youtubeEmbed" allow="autoplay; encrypted-media"></iframe>
        </div><!-- /.youtube -->
      </div>

      <div class="asset-content">
        <div class="content-head">
          <div class="asset-info-main">
            <div class="asset-author-avatar" :style="{ backgroundImage: `url(${asset.user.avatar})` }">
            </div><!-- /.asset-author-avatar -->

            <div class="asset-author-name">
              <span>{{asset.account.name || asset.user.name}}</span>
            </div><!-- /.asset-author-name -->

            <div class="asset-meta">
              <span>@{{asset.username}}</span>

              <span>{{ asset.created_at | moment('from') }}</span>
            </div><!-- /.asset-meta -->
          </div><!-- /.asset-info-main -->
        </div><!-- /.content-head -->

        <div class="content-body" v-html="asset.caption"></div>
      </div><!-- /.asset-content -->
    </div><!-- /.asset-inner -->
  </div>
</template>

<script>
import getYouTubeID from 'get-youtube-id';

import { HTTP } from '../services/http-common';
import { trackEvent } from '../services/analytics';

export default {
  name: 'Asset',
  props: {
    asset: Object
  },
  computed: {
    youtubeEmbed() {
      if (getYouTubeID(this.asset.video_url)) {
        return `https://www.youtube.com/embed/${getYouTubeID(this.asset.video_url)}?autoplay=1&controls=0&showinfo=0&mute=1`;
      }

      return null;
    }
  }
};
</script>

<style scoped>
  .asset { width: 50%; padding: 15px; opacity: 0; }
  .asset.current-visible { opacity: 1; }
  
  .asset .asset-inner { background-color: #fff; color: #272727; cursor: pointer; overflow: hidden; box-shadow: 0 2px 24px rgba(0,0,0,.2); }
  .asset .asset-preview img,
  .asset .asset-preview video,
  .asset .asset-preview iframe { display: block; width: 100%; height: auto; border: 0; }
  .asset .asset-preview .embed { position: relative; }
  .asset .asset-preview .embed:after { display: block; content: ''; padding-top: 56.25%; }
  .asset .asset-preview .embed iframe { position: absolute; top: 0; left: 0; height: 100%; }
  .asset .asset-content { font-size: 20px; letter-spacing: 0; padding: 20px; }

  .asset .asset-info-main { overflow: hidden; }
  .asset .asset-info-main .asset-author-avatar { float: left; width: 70px; height: 70px; background-size: cover; background-position: center center; background-repeat: no-repeat; border-radius: 50%; margin-right: 10px; }
  .asset .asset-info-main .asset-author-name { font-size: 22px; font-weight: 700; padding-top: 6px }
  .asset .asset-info-main .asset-author-name a { color: inherit; text-decoration: none; }
  .asset .asset-info-main .asset-meta { font-size: 18px; color: #989898; }
  .asset .asset-info-main .asset-meta span:after { content: '·'; margin-left: 5px; margin-right: 3px; }
  .asset .asset-info-main .asset-meta span:last-child:after { content: none; }

  .gallery.large-font .asset[data-type="text"] .asset-content { font-size: 28px; }

</style>
