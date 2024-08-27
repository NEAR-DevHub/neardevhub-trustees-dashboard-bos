export default '<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n    <meta charset="utf-8">\n    <meta name="viewport" content="width=device-width,initial-scale=1">\n    <meta property="og:url" content="devhub.near/widget/app" />\n    <meta property="og:type" content="website" />\n    <meta property="og:title" content="near/dev/hub" />\n    <meta property="og:description" content="The decentralized home base for NEAR builders" />\n    <meta property="og:image" content="https://i.near.social/magic/large/https://near.social/magic/img/account/devhub.near" />\n\n    <meta name="twitter:card" content="summary_large_image">\n    <meta name="twitter:title" content="near/dev/hub">\n    <meta name="twitter:description" content="The decentralized home base for NEAR builders">\n    <meta name="twitter:image" content="https://i.near.social/magic/large/https://near.social/magic/img/account/devhub.near">\n    <link\n      rel="stylesheet"\n      href="https://cdn.jsdelivr.net/npm/@near-wallet-selector/modal-ui-js@8.7.2/styles.css"\n    />\n    <script src="https://ipfs.web4.near.page/ipfs/bafybeifuqa2q6jj46fouv3gvcceazses36t6zxlpixakllxkfecgbo2ehi/main.ad445f4f28aa4706f529.bundle.js" defer></script>\n    <script src="https://ipfs.web4.near.page/ipfs/bafybeifuqa2q6jj46fouv3gvcceazses36t6zxlpixakllxkfecgbo2ehi/runtime.af2cc87996c8a8740ca6.bundle.js" defer></script>\n    <link href="https://ipfs.web4.near.page/ipfs/bafybeifuqa2q6jj46fouv3gvcceazses36t6zxlpixakllxkfecgbo2ehi/main.a4148171ce2bcb689b4c.bundle.css" />\n    <style>\n        @media screen and (max-width: 600px) {\n            .gatewaylinks .nav-link {\n                padding-top: 0px!important;\n                padding-bottom: 0px!important;\n                margin: 0px;\n            }\n            .gatewaylinks img {\n                height: 30px;\n            }\n        }\n    </style>\n    <script>\n    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys getNextSurveyStep onSessionId setPersonProperties".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);\n      posthog.init(\'POSTHOG_API_KEY\',{api_host:\'https://eu.i.posthog.com\', person_profiles: \'identified_only\' // or \'always\' to create profiles for anonymous users as well\n    })\n    </script>\n</head>\n<body>\n<nav class="navbar navbar-expand-sm navbar-light bg-dark" style="display: flex; flex-wrap: nowrap; padding-left: 5px; padding-right: 5px; height: 73px; border-bottom: rgb(0, 236, 151) solid 5px;">\n    <a class="navbar-brand" href="/"><img src="https://i.near.social/magic/large/https://near.social/magic/img/account/devhub.near" style="height: 68px" /></a>\n    <p class="nav-text" style="flex-grow: 1"></p>\n    \n    <div class="navbar-nav gatewaylinks">\n        <button id="open-walletselector-button" type="button" class="nav-button">\n        Open wallet selector\n      </button>\n    </div>\n</nav>\n    <near-social-viewer src="treasury-devdao.near/widget/app" initialProps=\'{"page":""}\'></near-social-viewer>\n</body>\n<script\n    async\n    src="https://ga.jspm.io/npm:es-module-shims@1.8.2/dist/es-module-shims.js"\n    crossorigin="anonymous"\n  ></script>\n  <script type="importmap">\n    {\n      "imports": {\n        "@near-wallet-selector/core": "https://ga.jspm.io/npm:@near-wallet-selector/core@8.9.1/index.js",\n        "@near-wallet-selector/here-wallet": "https://ga.jspm.io/npm:@near-wallet-selector/here-wallet@8.9.1/index.js",\n        "@near-wallet-selector/meteor-wallet": "https://ga.jspm.io/npm:@near-wallet-selector/meteor-wallet@8.9.1/index.js",\n        "@near-wallet-selector/modal-ui-js": "https://ga.jspm.io/npm:@near-wallet-selector/modal-ui-js@8.9.1/index.js",\n        "@near-wallet-selector/my-near-wallet": "https://ga.jspm.io/npm:@near-wallet-selector/my-near-wallet@8.9.1/index.js",\n        "@near-wallet-selector/sender": "https://ga.jspm.io/npm:@near-wallet-selector/sender@8.9.1/index.js"\n      },\n      "scopes": {\n        "https://ga.jspm.io/": {\n          "@here-wallet/core": "https://ga.jspm.io/npm:@here-wallet/core@1.5.1/build/index.js",\n          "@meteorwallet/sdk": "https://ga.jspm.io/npm:@meteorwallet/sdk@1.0.5/dist/meteor-sdk/src/index.js",\n          "@near-js/accounts": "https://ga.jspm.io/npm:@near-js/accounts@0.1.4/lib/index.js",\n          "@near-js/crypto": "https://ga.jspm.io/npm:@near-js/crypto@0.0.5/lib/index.js",\n          "@near-js/keystores": "https://ga.jspm.io/npm:@near-js/keystores@0.0.5/lib/index.js",\n          "@near-js/keystores-browser": "https://ga.jspm.io/npm:@near-js/keystores-browser@0.0.5/lib/index.js",\n          "@near-js/providers": "https://ga.jspm.io/npm:@near-js/providers@0.0.7/lib/index.js",\n          "@near-js/signers": "https://ga.jspm.io/npm:@near-js/signers@0.0.5/lib/index.js",\n          "@near-js/transactions": "https://ga.jspm.io/npm:@near-js/transactions@0.2.1/lib/index.js",\n          "@near-js/types": "https://ga.jspm.io/npm:@near-js/types@0.0.4/lib/index.js",\n          "@near-js/utils": "https://ga.jspm.io/npm:@near-js/utils@0.0.4/lib/index.js",\n          "@near-js/wallet-account": "https://ga.jspm.io/npm:@near-js/wallet-account@0.0.7/lib/index.js",\n          "@near-wallet-selector/wallet-utils": "https://ga.jspm.io/npm:@near-wallet-selector/wallet-utils@8.9.1/index.js",\n          "ajv": "https://ga.jspm.io/npm:ajv@8.12.0/dist/dev.ajv.js",\n          "ajv-formats": "https://ga.jspm.io/npm:ajv-formats@2.1.1/dist/index.js",\n          "ajv/dist/compile/codegen": "https://ga.jspm.io/npm:ajv@8.12.0/dist/compile/codegen/index.js",\n          "base-x": "https://ga.jspm.io/npm:base-x@3.0.9/src/index.js",\n          "bn.js": "https://ga.jspm.io/npm:bn.js@5.2.1/lib/bn.js",\n          "borsh": "https://ga.jspm.io/npm:borsh@0.7.0/lib/index.js",\n          "bs58": "https://ga.jspm.io/npm:bs58@4.0.1/index.js",\n          "buffer": "https://ga.jspm.io/npm:@jspm/core@2.0.1/nodelibs/browser/buffer.js",\n          "capability": "https://ga.jspm.io/npm:capability@0.2.5/index.js",\n          "capability/es5": "https://ga.jspm.io/npm:capability@0.2.5/es5.js",\n          "charenc": "https://ga.jspm.io/npm:charenc@0.0.2/charenc.js",\n          "copy-to-clipboard": "https://ga.jspm.io/npm:copy-to-clipboard@3.3.3/index.js",\n          "crypt": "https://ga.jspm.io/npm:crypt@0.0.2/crypt.js",\n          "crypto": "https://ga.jspm.io/npm:@jspm/core@2.0.1/nodelibs/browser/crypto.js",\n          "decode-uri-component": "https://ga.jspm.io/npm:decode-uri-component@0.2.2/index.js",\n          "depd": "https://ga.jspm.io/npm:depd@2.0.0/lib/browser/index.js",\n          "dijkstrajs": "https://ga.jspm.io/npm:dijkstrajs@1.0.3/dijkstra.js",\n          "encode-utf8": "https://ga.jspm.io/npm:encode-utf8@1.0.3/index.js",\n          "error-polyfill": "https://ga.jspm.io/npm:error-polyfill@0.1.3/index.js",\n          "events": "https://ga.jspm.io/npm:events@3.3.0/events.js",\n          "fast-deep-equal": "https://ga.jspm.io/npm:fast-deep-equal@3.1.3/index.js",\n          "filter-obj": "https://ga.jspm.io/npm:filter-obj@1.1.0/index.js",\n          "http": "https://ga.jspm.io/npm:@jspm/core@2.0.1/nodelibs/browser/http.js",\n          "http-errors": "https://ga.jspm.io/npm:http-errors@1.8.1/index.js",\n          "https": "https://ga.jspm.io/npm:@jspm/core@2.0.1/nodelibs/browser/https.js",\n          "inherits": "https://ga.jspm.io/npm:inherits@2.0.4/inherits_browser.js",\n          "is-mobile": "https://ga.jspm.io/npm:is-mobile@4.0.0/index.js",\n          "js-sha256": "https://ga.jspm.io/npm:js-sha256@0.9.0/src/sha256.js",\n          "json-schema-traverse": "https://ga.jspm.io/npm:json-schema-traverse@1.0.0/index.js",\n          "mustache": "https://ga.jspm.io/npm:mustache@4.2.0/mustache.js",\n          "nanoid": "https://ga.jspm.io/npm:nanoid@3.3.6/index.browser.js",\n          "near-abi": "https://ga.jspm.io/npm:near-abi@0.1.1/lib/index.js",\n          "near-api-js": "https://ga.jspm.io/npm:near-api-js@2.1.4/lib/browser-index.js",\n          "near-api-js/lib/providers": "https://ga.jspm.io/npm:near-api-js@2.1.4/lib/providers/index.js",\n          "near-api-js/lib/utils": "https://ga.jspm.io/npm:near-api-js@2.1.4/lib/utils/index.js",\n          "near-api-js/lib/utils/key_pair": "https://ga.jspm.io/npm:near-api-js@2.1.4/lib/utils/key_pair.js",\n          "near-api-js/lib/utils/serialize": "https://ga.jspm.io/npm:near-api-js@2.1.4/lib/utils/serialize.js",\n          "node-fetch": "https://ga.jspm.io/npm:node-fetch@2.7.0/browser.js",\n          "o3": "https://ga.jspm.io/npm:o3@1.0.3/index.js",\n          "process": "https://ga.jspm.io/npm:@jspm/core@2.0.1/nodelibs/browser/process.js",\n          "qrcode": "https://ga.jspm.io/npm:qrcode@1.5.3/lib/browser.js",\n          "query-string": "https://ga.jspm.io/npm:query-string@7.1.3/index.js",\n          "rxjs": "https://ga.jspm.io/npm:rxjs@7.8.1/dist/esm5/index.js",\n          "safe-buffer": "https://ga.jspm.io/npm:safe-buffer@5.2.1/index.js",\n          "setprototypeof": "https://ga.jspm.io/npm:setprototypeof@1.2.0/index.js",\n          "sha1": "https://ga.jspm.io/npm:sha1@1.1.1/sha1.js",\n          "split-on-first": "https://ga.jspm.io/npm:split-on-first@1.1.0/index.js",\n          "statuses": "https://ga.jspm.io/npm:statuses@1.5.0/dev.index.js",\n          "strict-uri-encode": "https://ga.jspm.io/npm:strict-uri-encode@2.0.0/index.js",\n          "text-encoding-utf-8": "https://ga.jspm.io/npm:text-encoding-utf-8@1.0.2/lib/encoding.lib.js",\n          "toggle-selection": "https://ga.jspm.io/npm:toggle-selection@1.0.6/index.js",\n          "toidentifier": "https://ga.jspm.io/npm:toidentifier@1.0.1/index.js",\n          "tslib": "https://ga.jspm.io/npm:tslib@2.6.2/tslib.es6.mjs",\n          "tweetnacl": "https://ga.jspm.io/npm:tweetnacl@1.0.3/nacl-fast.js",\n          "u3": "https://ga.jspm.io/npm:u3@0.1.1/index.js",\n          "uri-js": "https://ga.jspm.io/npm:uri-js@4.4.1/dist/es5/uri.all.js",\n          "uuid4": "https://ga.jspm.io/npm:uuid4@2.0.3/browser.mjs"\n        },\n        "https://ga.jspm.io/npm:http-errors@1.8.1/": {\n          "depd": "https://ga.jspm.io/npm:depd@1.1.2/lib/browser/index.js"\n        }\n      }\n    }\n  </script>\n  <script type="module">\n    import { setupWalletSelector } from "@near-wallet-selector/core";\n    import { setupModal } from "@near-wallet-selector/modal-ui-js";\n    import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";\n    import { setupHereWallet } from "@near-wallet-selector/here-wallet";\n    import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";\n    import { setupSender } from "@near-wallet-selector/sender";\n\n    const selector = await setupWalletSelector({\n    network: "mainnet",\n    modules: [setupMyNearWallet(), setupHereWallet(), setupMeteorWallet(), setupSender()],\n    });\n\n    const modal = setupModal(selector, {\n        contractId: "social.near",\n    });\n\n    document.getElementById(\'open-walletselector-button\').addEventListener(\'click\', () => modal.show());\n\n    const viewer = document.querySelector(\'near-social-viewer\');\n    viewer.selector = selector;\n  </script>\n</html>\n';
