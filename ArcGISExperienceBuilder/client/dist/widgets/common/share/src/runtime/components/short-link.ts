import { urlUtils } from 'jimu-core';
export default class ShortLink {
  static DEBUG = false;
  static BITLY_URL = 'https://arcg.is/prod/shorten';

  static fetchShortLink = (href: string): Promise<any> => {
    const promise = new Promise((resolve, reject) => {
      let uri = href;//location.href;
      uri = encodeURIComponent(uri); //encode long url
      uri = urlUtils.updateQueryStringParameter(ShortLink.BITLY_URL, 'longUrl', uri); //DO NOT encode BITLY_URL+param
      uri = urlUtils.updateQueryStringParameter(uri, 'f', 'json');

      fetch(uri).then(response => response.json())
        .then(json => {
          const shrotLink = json.data.url;

          if (ShortLink.DEBUG) {
            console.log('A:long_url==>' + json.data.long_url);
            console.log('B:s_url==>' + shrotLink);
          }

          resolve(shrotLink);
        })
        .catch(error => {
          console.log('Share: short-link, Fetch Error: ', error);

          reject(href);
        });
    })
    return promise;
  }
}