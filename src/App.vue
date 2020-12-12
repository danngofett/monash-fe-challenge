<template>
  <div class="container">
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

    <button
      class="button is-floating"
      @click="updateFonts()"
    >
      Generate
    </button>

    <font-loader
      :monospace="activeFonts.monospace"
      :sans-serif="activeFonts.sansSerif"
      :serif="activeFonts.serif"
    />
  </div>
</template>

<script>
import { data } from '@/assets/data/content.json'

import FontLoader from './components/FontLoader'
import TourCard from './components/TourCard'

export default {
  components: {
    FontLoader,
    TourCard
  },

  data() {
    return {
      activeFonts: {
        monospace: '',
        sansSerif: '',
        serif: ''
      },
      content: data,
      fonts: null
    }
  },

  async mounted() {
    /**
     * Fetch fonts on load, filter and sort based on category.
     * - Store in data for ease of reference.
     */
    this.fonts = await this.getFonts()
      .then((response) => {
        return {
          serif: response.items.filter((item) => item.category === 'serif'),
          sansSerif: response.items.filter((item) => item.category === 'sans-serif'),
          monospace: response.items.filter((item) => item.category === 'monospace')
        }
      }).catch((error) => {
        console.log('Could not find fonts', error)
      })
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
      this.activeFonts = {
        monospace: this.getRandomFontFromCategory('monospace'),
        sansSerif: this.getRandomFontFromCategory('sansSerif'),
        serif: this.getRandomFontFromCategory('serif'),
      }
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

      return this.fonts[category][randomInt].files[key]
    }
  }
}
</script>
