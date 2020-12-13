<template>
  <div>
    <btn
      :is-disabled="loading"
      :label="loading ? 'Updating...' : 'Generate'"
      @click="updateFonts()"
      is-floating
    />
  </div>
</template>

<script>
import { getRandomInt, sanitizeUrl } from '@/scripts/utils'

import Btn from './Button'

export default {
  components: {
    Btn
  },

  data() {
    return {
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

      const newFonts = {
        monospace: this.getRandomFontFromCategory('monospace'),
        sansSerif: this.getRandomFontFromCategory('sansSerif'),
        serif: this.getRandomFontFromCategory('serif')
      }

      const monoFont = new FontFace('MonashMono', `url(${newFonts.monospace.file})`)
      const sansFont = new FontFace('MonashSans', `url(${newFonts.sansSerif.file})`)
      const serifFont = new FontFace('MonashSerif', `url(${newFonts.serif.file})`)

      Promise.all([
        monoFont.load(),
        sansFont.load(),
        serifFont.load()
      ])
        .then(() => {
          document.fonts.add(monoFont)
          document.fonts.add(sansFont)
          document.fonts.add(serifFont)
        })
        .catch((err) => {
          console.log('Could not update fonts', err)
        })
        .finally(() => {
          setTimeout(() => {
            this.$emit('updated')
            this.loading = false
          }, 500);
        })
    },

    /**
     * Get a random font file from category.
     * @param {string} category - The category key (handlised).
     */
    getRandomFontFromCategory(category) {
      const randomInt = getRandomInt(0, this.fonts[category].length)
      const key = Object.keys(this.fonts[category][randomInt].files)[0]

      return {
        family: this.fonts[category][randomInt].family,
        file: sanitizeUrl(this.fonts[category][randomInt].files[key])
      }
    },
  }
}
</script>