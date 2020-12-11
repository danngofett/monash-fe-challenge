<template>
  <div>
    <header>
      <h1>Pyongyang Tours</h1>
    </header>

    <main>
      <div>
        <h2>{{ content.intro.heading }}</h2>
        <p>{{ content.intro.body }}</p>
      </div>

      <div>
        <h2>{{ content.main.heading }}</h2>
        <p>{{ content.main.body }}</p>
      </div>

      <div v-if="content.tours.items.length">
        <h2>{{ content.tours.heading }}</h2>

        <div
          :key="tour.id"
          v-for="tour in content.tours.items"
        >
          <h3>{{ tour.name }}</h3>
          <p v-html="tour.body" />

          <table>
            <tbody>
              <tr>
                <th>No. People</th>
                <th
                  :key="index"
                  v-for="(priceList, index) in tour.price_lists[0].prices"
                >
                  {{ priceList.night }} nights
                </th>
              </tr>

              <tr
                :key="index"
                v-for="(priceList, index) in tour.price_lists"
              >
                <th>{{ priceList.size }}</th>
                <td
                  :key="index"
                  v-for="(item, index) in priceList.prices"
                >
                  €{{ item.price }}
                </td>
              </tr>
            </tbody>
          </table>

          <ul v-if="tour.additional.length">
            <li :key="index" v-for="(item, index) in tour.additional">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </main>

    <footer>
      {{ content.disclaimer }}
    </footer>
  </div>
</template>

<script>
import { data } from '@/assets/data/content.json'

export default {
  data() {
    return {
      content: data
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
