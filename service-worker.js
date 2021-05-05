/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["address.html","530d43f3635d683639ebd31d298a5d4f"],["checkout.html","30e95b1d2cf4ca3785915b276860e4da"],["detail.html","ad48b8098531e2d610cab9c5f66f632a"],["dist/jbvalidator.min.js","672347aa13a70df15b9005bfb2dac844"],["dist/lang/en.json","458c1b3df842501fb5cdcbc642feb842"],["dist/lang/tr.json","b54c89c22a29563fafc46461af6f951e"],["images/About.jpeg","3bacdb39bf665682c9148fa7aec6ddde"],["images/background.jpg","41798922b8189aa1c938bfccde6cef2c"],["images/bg1.jpg","0206d9c3432b03a6df168a4156d38b0c"],["images/bg2.jpg","d84816ad5aecb420eb34656d9acb4137"],["images/bg3.jpg","21f6ec742c23c71cc7291a3c2bb87af1"],["images/board-games-benefits.jpeg","7db64c602877823ef9ea5ef0692fd944"],["images/knowledgeCapsules.jpg","907587389a9873173d4aff44919148d0"],["images/products/img-1.jpg","ef13f0ae83d4b14a6cadeb9368d800a3"],["images/products/img-2.png","3b1f3163e61afe5e7a22177295c4804b"],["images/products/img-3.png","ede05bbda4b8f02b710ea48cf0e76f04"],["images/testimonials/avatar.png","b15acc02698496377328311b6bc9edb4"],["images/testimonials/image-1.jpg","dcf3a4dc152eb51b1a593c817b28787b"],["images/testimonials/image-2.jpg","2b9c51966cbe6900de81e90a594aca1f"],["images/testimonials/image-3.png","37b2d28b0ec7dec7ddbade0472c41c97"],["images/testimonials/image-4.jpg","21ec5c83f6963636b0530b79f41cb579"],["images/testimonials/image-5.jpg","005cc40ff9611dc9539ddd2145d0843e"],["images/varoh-games-logo.png","06b3e5d3ab47ef36f320f012debc6bd7"],["index.html","831999ea91a67bb888d5ef53ee2c789a"],["myorders.html","c3276d98cafb528f9e007b1dca20a4e8"],["package.json","a2e856ee03d7ca7cece77f5d30a1c024"],["privacypolicy.html","5a573b7755738628b272b3ebb2771c00"],["products.html","854d719436bb61a229adba274681cb6c"],["pwa/android-chrome-192x192.png","6800189313aa06ceab8ed673c32ca7e7"],["pwa/android-chrome-512x512.png","790dab536526cd73e6eaab2d305c9fd3"],["pwa/apple-touch-icon.png","8b2942cd0d176c0b91a3152b780c4b08"],["pwa/browserconfig.xml","a493ba0aa0b8ec8068d786d7248bb92c"],["pwa/favicon-16x16.png","3735e2e0177b6047806dd448a3f65a23"],["pwa/favicon-32x32.png","01cae2c20d3ba111db42cfb7a0eb4e0b"],["pwa/favicon.ico","e8a1ee5f4ea1b73a874dc834d287ad68"],["pwa/mstile-150x150.png","95fd881d94b8f53322093453e39e4826"],["pwa/safari-pinned-tab.svg","dec11d9cf9887e23e400dd9427a6c398"],["script1.js","fa3b281938c12572a5c194207d34c3bf"],["scripts/address.js","e94d541c713bb2fa2234da156bb04d97"],["scripts/auth_header.js","6156f4e3b3e0f1a30777b17b9b5a7180"],["scripts/checkout.js","32e75c4458ed8e7fd459050fc2aab3d0"],["scripts/contact_us.js","25d1745c74088c7060e2076d39378b87"],["scripts/detail.js","82fb62b1438be91e2c1415fd99d3cdcb"],["scripts/landingProducts.js","798383aa51ad6989ba47af6bf310d747"],["scripts/my_orders.js","e38dbcc3b32e3855b4faf28eef076ad2"],["scripts/products.js","241e34b4e5cc9579b975c88dcd6a0d1f"],["site.webmanifest","51731883accb59817c49db7fac6edbf7"],["style.css","7a8f10d18620a439dc0925aa6558108b"],["style1.css","2fac4f3ecf88ff760325ce1b00bf0f5d"],["termsofservice.html","72ad2ce0f2e1163a5956b1fb523a9c3f"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







