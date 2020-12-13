<template>
  <div class="container">
    <transition name="fade">
      <loader v-if="loading" />
    </transition>

    <header>
      <h1 class="serif">
        {{ content.title }}
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

    <font-loader
      @updating="loading = true"
      @updated="loading = false"
    />
  </div>
</template>

<script>
import { data } from '@/assets/data/content.json'

import FontLoader from './components/FontLoader'
import Loader from './components/Loader'
import TourCard from './components/TourCard'

export default {
  components: {
    FontLoader,
    Loader,
    TourCard
  },

  data() {
    return {
      content: data,
      loading: false
    }
  }
}
</script>
