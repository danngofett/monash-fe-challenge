<template>
  <div class="container">
    <header>
      <h1 class="serif">Pyongyang Tours</h1>
    </header>

    <main>
      <div>
        <h2 class="serif">{{ content.intro.heading }}</h2>
        <p class="sans-serif">{{ content.intro.body }}</p>
      </div>

      <div>
        <h2 class="serif">{{ content.main.heading }}</h2>
        <p class="sans-serif">{{ content.main.body }}</p>
      </div>

      <div v-if="content.tours.items.length">
        <h2 class="serif">{{ content.tours.heading }}</h2>

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
      content: data,
      fonts: null,
      activeFonts: {
        monospace: 'http://fonts.gstatic.com/s/firacode/v9/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_GNsFVfxN87gsj0.ttf',
        sansSerif: 'http://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UN_r8-VeJoCqeDjg.ttf',
        serif: 'http://fonts.gstatic.com/s/crimsonpro/v13/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZ_G18OJE_VNWoyQ.ttf'
      }
    }
  },

  async mounted() {
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
        monospace: this.getRandomFileFromCategory('monospace'),
        sansSerif: this.getRandomFileFromCategory('sansSerif'),
        serif: this.getRandomFileFromCategory('serif'),
      }
    },

    /**
     * Get a random number between two ranges.
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
    getRandomFileFromCategory(category) {
      const randomInt = this.getRandomInt(0, this.fonts[category].length)
      const key = Object.keys(this.fonts[category][randomInt].files)[0]

      return this.fonts[category][randomInt].files[key]
    }
  }
}
</script>

<style>
:root {
  --colour_primary: #2c3e50;
  --colour_border: #d6d6d6;
  --colour_white: #ffffff;

  --spacing_s: 1rem;
  --spacing_m: 2rem;
  --spacing_l: 3rem;

  --layout_s: 6rem;
  --layout_m: 9rem;
  --layout-l: 12rem;

  --grid_gutter_s: 15px;
  --grid_gutter_m: 20px;
  --grid_gutter_l: 30px;
}

html {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: var(--colour_primary);
  font-size: 16px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: var(--layout_s) 0;
}

.container {
  max-width: 1366px;
  margin: 0 auto;
}

.button {
  appearance: none;
  background-color: var(--colour_primary);
  border: 1px solid var(--colour_primary);
  border-radius: 3px;
  color: var(--colour_white);
  cursor: pointer;
  outline: 0;
  padding: var(--spacing_s);
}

.button:hover {
  background-color: var(--colour_white);
  border-color: var(--colour_primary);
  color: var(--colour_primary);
}

.button.is-floating {
  position: fixed;
  right: var(--spacing_l);
  bottom: var(--spacing_l);
}

.sans-serif {
  font-family: 'SansSerif', sans-serif;
}

.serif {
  font-family: 'Serif', serif;
}

.monospace {
  font-family: 'Mono', monospace;
}
</style>
