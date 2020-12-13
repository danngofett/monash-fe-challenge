<template>
  <div class="container">
    <transition name="fade">
      <loader v-if="loading" />
    </transition>

    <header>
      <h1 class="serif">
        Pyongyang Tours
      </h1>
    </header>

    <main>
      <div>
        <h2 class="serif">
          {{ content.intro.heading }}
        </h2>

        <p
          class="sans-serif"
          v-html="content.intro.body"
        />
      </div>

      <div>
        <h2 class="serif">
          {{ content.main.heading }}
        </h2>

        <p
          class="sans-serif"
          v-html="content.main.body"
        />
      </div>

      <div v-if="content.tours.items.length">
        <h2 class="serif">
          {{ content.tours.heading }}
        </h2>

        <tour-card
          :key="tour.id"
          v-for="tour in content.tours.items"
          :tour="tour"
        />
      </div>
    </main>

    <btn
      :is-disabled="loading"
      :label="loading ? 'Updating...' : 'Generate'"
      @click="updateFonts()"
      is-floating
    />

    <font-loader
      :monospace="activeFonts.monospace"
      :sans-serif="activeFonts.sansSerif"
      :serif="activeFonts.serif"
    />
  </div>
</template>

<script>
import { data } from '@/assets/data/content.json'

import Btn from './components/Button'
import FontLoader from './components/FontLoader'
import Loader from './components/Loader'
import TourCard from './components/TourCard'

export default {
  components: {
    Btn,
    FontLoader,
    Loader,
    TourCard
  },

  data() {
    return {
      activeFonts: {
        monospace: 'https://fonts.gstatic.com/s/firacode/v9/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_GNsFVfxN87gsj0.ttf',
        sansSerif: 'https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UN_r8-VeJoCqeDjg.ttf',
        serif: 'https://fonts.gstatic.com/s/vesperlibre/v13/bx6dNxyWnf-uxPdXDHUD_RdA-2ap0okKXKvPlw.ttf'
      },
      content: data,
      loading: false,
      fonts: null
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
      this.loading = true

      this.activeFonts = {
        monospace: this.getRandomFontFromCategory('monospace'),
        sansSerif: this.getRandomFontFromCategory('sansSerif'),
        serif: this.getRandomFontFromCategory('serif'),
      }

      // Simulating a fake loader based on completed request of new fonts loading in.
      setTimeout(() => {
        this.loading = false
      }, 1000);
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

      return this.sanitizeUrl(this.fonts[category][randomInt].files[key])
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
