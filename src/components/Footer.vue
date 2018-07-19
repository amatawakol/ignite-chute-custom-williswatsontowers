<template>
  <div class="footer">
    <img :src="adSrc" alt="Ad">
  </div>
</template>

<script>
import adSrc from '../assets/ad.jpg';

export default {
  name: 'Footer',
  data() {
    return {
      adSrc
    }
  },
};
</script>

<style scoped>
  .footer { position: fixed; bottom: 0; left: 0; right: 0; text-align: center; height: 170px; background-color: #791b86; line-height: 170px; }
  .footer img { vertical-align: middle; }
</style>
