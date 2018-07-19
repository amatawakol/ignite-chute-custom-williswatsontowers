import Vue from 'vue'
import VueMoment from 'vue-moment';
// Web component polyfill
import 'document-register-element/build/document-register-element';
import vueCustomElement from 'vue-custom-element'
import { VueMasonryPlugin } from 'vue-masonry';

import config from './config';
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueMasonryPlugin);
Vue.use(vueCustomElement);
Vue.use(VueMoment);

// When used as embed
const sourceScriptElement = document.querySelector(`script[data-chute-${config.runnerName}]`);
if (sourceScriptElement) {
  const rootElement = document.createElement('chute-display');

  sourceScriptElement.parentNode.insertBefore(rootElement, sourceScriptElement.nextSibling);    
}

Vue.customElement('chute-display', App);
