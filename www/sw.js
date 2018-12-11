importScripts('nuxt/workbox.3ffff7b2.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "nuxt/app.108dbffd239b3060457f4b5389ff83c8.css",
    "revision": "108dbffd239b3060457f4b5389ff83c8"
  },
  {
    "url": "nuxt/app.dc53a1ffa9e6600a704a.js",
    "revision": "5b94269fb5a73137fb58300166cdb450"
  },
  {
    "url": "nuxt/layouts_default.a06dc93620cb9b69d01b.js",
    "revision": "cfd9ba3455877a8309ac3b704723787e"
  },
  {
    "url": "nuxt/manifest.41cf45654948888543fd.js",
    "revision": "0fedcba8c305e8d4326412bba93a4a1a"
  },
  {
    "url": "nuxt/pages_index.1b83447a687ab301be99.js",
    "revision": "3ca4dab09e12ed9cc080d9152c863633"
  },
  {
    "url": "nuxt/pages_new_switch.3e87dd0e81e8e908b669.js",
    "revision": "518bc347cd4b716335011c875392cfa3"
  },
  {
    "url": "nuxt/pages_test.6b9dfc18a9b1656d6f9f.js",
    "revision": "bb14a424c43e539243474f2061626f9b"
  },
  {
    "url": "nuxt/vendor.5691066454bba3b177c9.js",
    "revision": "66a22118e013ab572f63e6f54a2b7c2c"
  }
], {
  "cacheId": "sm-plug",
  "directoryIndex": "/",
  "cleanUrls": false
})



workbox.clientsClaim()
workbox.skipWaiting()


workbox.routing.registerRoute(new RegExp('nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')





