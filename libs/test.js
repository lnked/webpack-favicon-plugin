'use strict';

const path = require('path');
const favicons = require('favicons');
const writeFile = require('write');

function FaviconWebpackPlugin(options) {
    const dist = 'dist';
    const source = options.logo;

    const configuration = {
        prefix: 'fav-[hash:5]/',
        appName: null,                  // Your application's name. `string`
        appDescription: null,           // Your application's description. `string`
        developerName: null,            // Your (or your developer's) name. `string`
        developerURL: null,             // Your (or your developer's) URL. `string`
        background: "#fff",             // Background colour for flattened icons. `string`
        theme_color: "#fff",            // Theme color for browser chrome. `string`
        path: "/result",                // Path for overriding default icons path. `string`
        display: "standalone",          // Android display: "browser" or "standalone". `string`
        orientation: "portrait",        // Android orientation: "portrait" or "landscape". `string`
        start_url: "/?homescreen=1",    // Android start application's URL. `string`
        version: "1.0",                 // Your application's version number. `number`
        logging: false,                 // Print logs to console? `boolean`
        online: false,                  // Use RealFaviconGenerator to create favicons? `boolean`
        preferOnline: false,            // Use offline generation, if online generation has failed. `boolean`
        icons: {
            android: true,               // Create Android homescreen icon. `boolean` or `{ offset, background, shadow }`
            appleIcon: false,            // Create Apple touch icons. `boolean` or `{ offset, background }`
            appleStartup: false,         // Create Apple startup images. `boolean` or `{ offset, background }`
            coast: false,                // Create Opera Coast icon with offset 25%. `boolean` or `{ offset, background }`
            favicons: false,             // Create regular favicons. `boolean`
            firefox: false,              // Create Firefox OS icons. `boolean` or `{ offset, background }`
            windows: false,              // Create Windows 8 tile icons. `boolean` or `{ background }`
            yandex: false                // Create Yandex browser icon. `boolean` or `{ background }`
        }
    };

    const config = Object.assign(configuration, options);

    const callback = function (error, response) {
        if (error) {
            console.log(error.status);  // HTTP error code (e.g. `200`) or `null`
            console.log(error.name);    // Error name e.g. "API Error"
            console.log(error.message); // Error description e.g. "An unknown error has occurred"
            return;
        }

        response.images.forEach((icon) => {
            // console.log(icon, icon.name, icon.contents);
            writeFile(path.resolve(__dirname, dist, icon.name), icon.contents, function(err) {
                if (err) console.log(err);
            });
        });

        // console.log('images: ', response.images);   // Array of { name: string, contents: <buffer> }
        // console.log('files: ', response.files);    // Array of { name: string, contents: <string> }
        // console.log('html: ', response.html);     // Array of strings (html elements)
    };

    console.log(source)

    favicons(source, configuration, callback);
}

FaviconWebpackPlugin({
    logo: 'example/favicon.svg',
    prefix: 'fav-[hash:5]/',
    emitStats: false,
    statsFilename: 'iconstats-[hash].json',
    persistentCache: true,
    inject: true,
    background: '#673ab8',
    title: 'React starter',

    appName: null,                  // Your application's name. `string` 
    appDescription: null,           // Your application's description. `string` 
    developerName: null,            // Your (or your developer's) name. `string` 
    developerURL: null,             // Your (or your developer's) URL. `string` 
    background: "#fff",             // Background colour for flattened icons. `string` 
    theme_color: "#fff",            // Theme color for browser chrome. `string` 
    path: "/",                      // Path for overriding default icons path. `string` 
    display: "standalone",          // Android display: "browser" or "standalone". `string` 
    orientation: "portrait",        // Android orientation: "portrait" or "landscape". `string` 
    start_url: "/?homescreen=1",    // Android start application's URL. `string` 
    version: "1.0",                 // Your application's version number. `number` 
    logging: false,                 // Print logs to console? `boolean` 
    online: false,                  // Use RealFaviconGenerator to create favicons? `boolean` 
    preferOnline: false,            // Use offline generation, if online generation has failed. `boolean` 
    icons: {
        android: true,              // Create Android homescreen icon. `boolean` or `{ offset, background, shadow }` 
        appleIcon: true,            // Create Apple touch icons. `boolean` or `{ offset, background }` 
        appleStartup: true,         // Create Apple startup images. `boolean` or `{ offset, background }` 
        coast: { offset: 25 },      // Create Opera Coast icon with offset 25%. `boolean` or `{ offset, background }` 
        favicons: true,             // Create regular favicons. `boolean` 
        firefox: true,              // Create Firefox OS icons. `boolean` or `{ offset, background }` 
        windows: true,              // Create Windows 8 tile icons. `boolean` or `{ background }` 
        yandex: true                // Create Yandex browser icon. `boolean` or `{ background }` 
    }
    // icons: {
    //     firefox: true,
    //     android: true,
    //     favicons: true,
    //     appleIcon: true,
    //     // opengraph: false,
    //     appleStartup: false,
    //     coast: false, // { offset: 25 },
    //     // twitter: false,
    //     yandex: false,
    //     windows: true
    // }
});

// const md5File = require('md5-file')
 
// /* Async usage */
// md5File('LICENSE.md', (err, hash) => {
//   if (err) throw err
 
//   console.log(`The MD5 sum of LICENSE.md is: ${hash}`)
// })
 
// /* Sync usage */
// const hash = md5File.sync('LICENSE.md')
// console.log(`The MD5 sum of LICENSE.md is: ${hash}`)

// const md5File = require('md5-file/promise')
 
// md5File('LICENSE.md').then(hash => {
//   console.log(`The MD5 sum of LICENSE.md is: ${hash}`)
// })

// FaviconWebpackPlugin.prototype.apply = function(compiler) {
//     // Specifies webpack's event hook to attach itself.
//     compiler.plugin('webpacksEventHook', function(compilation /* Manipulates webpack internal instance specific data. */, callback) {
//         console.log("This is an example plugin!!!");

//         // Invokes webpack provided callback after functionality is complete.
//         callback();
//     });

//     // Setup callback for accessing a compilation:
//     compiler.plugin("compilation", function(compilation) {

//         // Now setup callbacks for accessing compilation steps:
//         compilation.plugin("optimize", function() {
//             console.log("Assets are being optimized.");
//         });
//     });

//     compiler.plugin("emit", function(compilation, callback) {

//         // Do something async...
//         setTimeout(function() {
//             console.log("Done with async work...");
//             callback();
//         }, 1000);

//     });

//     compiler.plugin('emit', function(compilation, callback) {
//         // Create a header string for the generated file:
//         var filelist = 'In this build:\n\n';

//         // Loop through all compiled assets,
//         // adding a new line item for each filename.
//         for (var filename in compilation.assets) {
//             filelist += ('- '+ filename +'\n');
//         }

//         // Insert this list into the webpack build as a new file asset:
//         compilation.assets['filelist.md'] = {
//             source: function() {
//                 return filelist;
//             },
//             size: function() {
//                 return filelist.length;
//             }
//         };

//         callback();
//     });

//     compiler.plugin('done', function() {
//         console.log('FaviconWebpackPlugin: Hello World!');
//     });
// };

module.exports = FaviconWebpackPlugin;
