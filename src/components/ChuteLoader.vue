<template>
  <span class="chute-loader">
    <span class="chute-loader-icon">
      <svg width="98" height="98" viewBox="0 0 98 98" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path id="a" d="M.09 97.817V.2h97.616v97.617z"></path></defs><g fill="none" fill-rule="evenodd"><path d="M48.854 61.494c-4.602 0-8.33-3.73-8.33-8.33s3.728-8.33 8.33-8.33c4.6 0 8.33 3.73 8.33 8.33s-3.73 8.33-8.33 8.33zm-.017-20.702c-6.764 0-12.247 5.482-12.247 12.245 0 6.764 5.483 12.246 12.247 12.246 6.763 0 12.245-5.482 12.245-12.246 0-6.763-5.482-12.245-12.245-12.245z" fill="#000"></path><mask id="b" fill="#fff"><use xlink:href="#a"></use></mask><path fill="#000" mask="url(#b)" d="M53.442 34.13H64.71v-5.486H53.44"></path><path d="M72.578 72v.043h-.555c-.324.02-.652.033-.98.033-.33 0-.656-.013-.98-.033H27.07c-.318.02-.64.033-.962.033-8.548 0-15.478-6.93-15.478-15.48 0-7.29 5.04-13.397 11.823-15.04C22.9 35.54 27.915 30.8 34.043 30.8c3.267 0 6.217 1.348 8.33 3.516 2.494-6.816 9.036-11.68 16.717-11.68 9.83 0 17.798 7.967 17.798 17.797 0 .224-.01.448-.018.673 5.973 2.33 10.207 8.137 10.207 14.935 0 8.34-6.365 15.188-14.5 15.96zM48.854.2C21.872.2 0 22.073 0 49.054c0 26.982 21.872 48.853 48.854 48.853 26.98 0 48.852-21.87 48.852-48.853C97.706 22.073 75.834.2 48.854.2z" fill="#000" mask="url(#b)"></path></g></svg>
    </span>
  </span>
</template>

<script>
export default {
  name: 'ChuteLoader'
};
</script>

<style scoped>
  .chute-loader { display: block; clear: both; margin: 20px 0; text-align: center; }
  .chute-loader-icon { display: inline-block; position: relative; vertical-align: middle; width: 80px; height: 80px; }
  .chute-loader-icon svg { width: 100%; height: 100%; }
  .chute-loader-icon:after { content: ''; pointer-events: none; display: block; border-radius: 50%; width: 80px; height: 100%; position: absolute; top: -7px; left: -7px; margin: auto; padding: 5px; border-top: 2px solid #000; border-bottom: 2px solid #000; border-left: 2px solid transparent; border-right: 2px solid transparent; animation: chute-spin 1s linear infinite; box-sizing: initial; }

  @keyframes chute-spin {
    0% { transform: rotate(0deg); }
    to { transform: rotate(359deg); }
  }
</style>
