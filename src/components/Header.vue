<template>
  <div class="header">
    <div class="header-main">
      <span class="logo" :style="{ backgroundImage: `url(${logoSrc})` }"></span>
    </div><!-- /.header-main -->

    <div class="header-secondary">
        <h1>
            <span>@WTWRISK</span>

            <span>#WTWRIMS</span>
        </h1>
    </div><!-- /.header-secondary -->
  </div>
</template>

<script>
import logoSrc from '../assets/logo@2x.png';

export default {
  name: 'Header',
  data() {
    return {
      logoSrc
    }
  },
};
</script>

<style scoped>
  .header { text-align: center; }
  .header-main { height: 148px; background-color: #791b86; line-height: 148px; margin-bottom: 20px; }
  .header-main .logo { display: inline-block; vertical-align: middle; width: 793px; height: 45px; background-image: url(../assets/logo@2x.png); background-size: 100% 100%; background-position: center center; background-repeat: no-repeat;  }
  .header-secondary { max-width: 1200px; margin: 0 auto; color: #272727; letter-spacing: 0; }
  .header-secondary h1 { display: flex; font-size: 64px; font-weight: 900; }
  .header-secondary h1 span { width: 50%; flex: 0 0 auto; }
</style>
