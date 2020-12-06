## 360 Tooz

#### This is a program that gives you a GIF from the 360 product view on the Youtooz website product page.

### Requirements
 - Node.js 14+
 - NPM 6+
### Installation

After you cloned the repository run `npm install`
After that finishes, run the web server with:

```
npm run start
```

### How to use
Using an **API Client** such as [Postman](https://www.postman.com/) make a `GET` Request and in the body put this raw json data:
```
{
	"url": "https://youtooz.com/products/unus-annus-hourglass",
	"offset": "1",
	"quality": "10",
	"delay": "50"
}
```

`"url"` must be a link to the product page that you want to create the GIF of. 
*[Note: Some products such as Bruh Plush or RipNDip Hoodie do not work because they're 360 View is messed up or non existent]*
`"offset"` is the number of frames it skips (e. g 1 gets all the images, 2 gets every other image etc. ). *(Recommended: 1)*
`"quality"` is a number from 1 to 10 that represents how good quality the colors will be. *(Recommended: 10)*
`"delay"` is the time it takes to go from one frame to the next in milliseconds. *(Recommended: 50)*

### Licence
MIT
