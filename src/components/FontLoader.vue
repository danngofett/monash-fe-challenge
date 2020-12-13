<template>
  <div>
    <btn
      :is-disabled="loading"
      :label="loading ? 'Updating...' : 'Generate'"
      @click="updateFonts()"
      is-floating
    />

    <component :is="`style`">
      @font-face {
        font-family: 'SansSerif';
        src: url({{ activeFonts.sansSerif.file }})
      }

      @font-face {
        font-family: 'Serif';
        src: url({{ activeFonts.serif.file }})
      }

      @font-face {
        font-family: 'Monospace';
        src: url({{ activeFonts.monospace.file }})
      }
    </component>
  </div>
</template>

<script>
import Btn from './Button'
import FontFaceObserver from 'fontfaceobserver'

const sansSerifFont = new FontFaceObserver('SansSerif')
const serifFont = new FontFaceObserver('Serif')
const monospaceFont = new FontFaceObserver('Monospace')

export default {
  components: {
    Btn
  },

  data() {
    return {
      activeFonts: {
        monospace: {
          file: 'https://fonts.gstatic.com/s/firacode/v9/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_GNsFVfxN87gsj0.ttf',
          family: 'Fira Code'
        },
        sansSerif: {
          file: 'https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UN_r8-VeJoCqeDjg.ttf',
          family: 'Open Sans'
        },
        serif: {
          file: 'https://fonts.gstatic.com/s/vesperlibre/v13/bx6dNxyWnf-uxPdXDHUD_RdA-2ap0okKXKvPlw.ttf',
          family: 'Vesper Libre'
        }
      },
      fonts: null,
      loading: false
    }
  },

  async mounted() {
    /**
     * Fetch fonts on load, filter and sort based on category.
     * - Store in data for ease of reference.
     */
    const fonts = await this.getFonts()
    this.fonts = {
      serif: fonts.items.filter((item) => item.category === 'serif'),
      sansSerif: fonts.items.filter((item) => item.category === 'sans-serif'),
      monospace: fonts.items.filter((item) => item.category === 'monospace')
    }
  },

  methods: {
    /**
     * Fetch fonts from Google and return the full response.
     */
    async getFonts() {
      return fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCcXyx1feYWbdWz4g2Vpf_eOSIgl9Qb9Ms')
        .then((response) => {
          if (response.status !== 200) {
            console.log(`Could not fetch fonts from Google: ${response.status}` )
            return
          }

          return response.json()
        })
        .catch((err) => {
          console.error('Fetch error: ', err)
        })
    },

    /**
     * Use fonts stored in data, and replace in embedded scripts.
     */
    updateFonts() {
      this.$emit('updating')
      this.loading = true

      this.activeFonts = {
        monospace: this.getRandomFontFromCategory('monospace'),
        sansSerif: this.getRandomFontFromCategory('sansSerif'),
        serif: this.getRandomFontFromCategory('serif')
      }

      Promise.all([
        sansSerifFont.load(),
        serifFont.load(),
        monospaceFont.load()
      ]).then(() => {
        setTimeout(() => {
          this.$emit('updated')
          this.loading = false
        }, 1000)
      })
    },

    /**
     * Get a random number between two ranges.
     * @param {integer} min - Min limit threshold.
     * @param {integer} max - Max limit threshold.
     */
    getRandomInt(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min) + min)
    },

    /**
     * Get a random font file from category.
     * @param {string} category - The category key (handlised).
     */
    getRandomFontFromCategory(category) {
      const randomInt = this.getRandomInt(0, this.fonts[category].length)
      const key = Object.keys(this.fonts[category][randomInt].files)[0]

      return {
        family: this.fonts[category][randomInt].family,
        file: this.sanitizeUrl(this.fonts[category][randomInt].files[key])
      }
    },

    /**
     * Sanitise URL request url with https.
     * @param {string} url - The url string of the font file.
     */
    sanitizeUrl(url) {
      return url.replace(/^http:\/\//i, 'https://')
    }
  }
}
</script>