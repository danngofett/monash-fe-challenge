/**
* Get a random number between two ranges.
* @param {integer} min - Min limit threshold.
* @param {integer} max - Max limit threshold.
*/
export function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

/**
 * Sanitise URL request url with https.
 * @param {string} url - The url string of the font file.
 */
export function sanitizeUrl(url) {
  return url.replace(/^http:\/\//i, 'https://')
}

export default {
  getRandomInt,
  sanitizeUrl
}