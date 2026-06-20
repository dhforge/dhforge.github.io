"use strict";

const DHFORGE_GA_MEASUREMENT_ID = "G-F92KK5D5VW";

(() => {
  const measurementId = DHFORGE_GA_MEASUREMENT_ID.trim();
  if (!/^G-[A-Z0-9]+$/i.test(measurementId)) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.append(script);

  window.gtag("js", new Date());
  window.gtag("config", measurementId);
})();
