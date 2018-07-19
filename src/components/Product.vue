<template>
  <div class="product">
    <a :href="url" target="_blank" class="product-inner" @click="handleClick">
      <div class="product-image">
        <img :src="image" :alt="name" />
      </div><!-- /.product-image -->

      <div class="product-name" :style="{ color: config.tagFontColor }">
        {{name}}
      </div><!-- /.product-name -->
    </a><!-- /.product-inner -->
  </div><!-- /.product -->
</template>

<script>
import { trackEvent } from '../services/analytics';

export default {
  name: 'Product',
  props: {
    id: Number,
    sku: String,
    image: String,
    url: String,
    name: String,
    assetShortcut: String,
    config: Object
  },
  methods: {
    handleClick() {
      trackEvent('product_click', {
        product: this.sku,
        asset: this.assetShortcut
      });

      trackEvent('click_url', {
        product: this.sku,
        asset: this.assetShortcut
      });
    }
  }
};
</script>

<style scoped>
  .product { display: inline-block; vertical-align: top; width: 50%; padding: 10px; }
  .product .product-inner { display: block; color: inherit; text-decoration: none; }

  .product .product-image { width: 100%; position: relative; }
  .product .product-image:after { content: ''; display: block; padding-top: 100%; }
  .product .product-image img { max-width: 100%; max-height: 100%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
  
  .product .product-name { font-size: 12px; }
</style>
