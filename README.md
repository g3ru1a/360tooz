## 360 Tooz

#### This is a program that gives you a GIF from the 360 product view on the Youtooz website product page.

### Requirements
 - Node.js 14+
 - NPM 6+
### Installation

After you cloned the repository run `npm install`
After that finishes, run the web server with:

```
npm install -g 360tooz
```

### How to use
In a terminal window run
```
spintooz <url> [params]
```

`"url"` must be a link to the product page that you want to create the GIF of. 
*[Note: Some products such as Bruh Plush or RipNDip Hoodie do not work because they're 360 View is messed up or non existent]*

Params:

`--offset or -o <number>` is the number of frames it skips (e. g 1 gets all the images, 2 gets every other image etc. ). *(Default: 1)*

`--quality or -q <number>` is a number from 1 to 10 that represents how good quality the colors will be. *(Default: 10)*

`--delay or -d <number>` is the time it takes to go from one frame to the next in milliseconds. *(Default: 50)*

`--output or -O <path/to/dir>` Specifies where to save the gid, by default it saves it in the working directory. *(Default: './')*

`--default or -D` Skips checking for other parameters and uses all defaults.

### Licence
MIT
