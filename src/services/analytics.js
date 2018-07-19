import '../libs/analytics.min';

let analytics;

export const initAnalytics = ({ displayId, displayType, clientId, albumShortcut }) => {
  analytics = new Chute.Analytics({
    dID: displayId,
    dTp: displayType,
    cID: clientId,
    lID: albumShortcut
  }, {
    autoTrackTime: true,
    autoPageview: true
  });
}

export const trackEvent = (eventName , params) => {
  analytics.trigger(eventName, params);
}
