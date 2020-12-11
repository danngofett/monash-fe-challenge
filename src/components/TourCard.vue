<template>
  <div class="tour-card">
    <h3 class="serif">{{ tour.name }}</h3>
      <p class="sans-serif" v-html="tour.body" />

      <table>
        <tbody>
          <tr>
            <th class="sans-serif">No. People</th>
            <th
              :key="index"
              v-for="(priceList, index) in tour.price_lists[0].prices"
              class="sans-serif"
            >
              {{ priceList.night }} nights
            </th>
          </tr>

          <tr
            :key="index"
            v-for="(priceList, index) in tour.price_lists"
          >
            <th class="sans-serif">{{ priceList.size }}</th>
            <td
              :key="index"
              v-for="(item, index) in priceList.prices"
              class="sans-serif"
            >
              €{{ item.price }}
            </td>
          </tr>
        </tbody>
      </table>

      <ul class="sans-serif" v-if="tour.additional.length">
        <li :key="index" v-for="(item, index) in tour.additional">
          {{ item }}
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  props: {
    tour: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
.tour-card {
  border: 1px solid var(--colour_border);
  border-radius: 3px;
  padding: var(--spacing_m);
}

.tour-card + .tour-card {
  margin-top: var(--spacing_m);
}
</style>