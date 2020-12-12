<template>
  <div class="tour-card">
    <p class="tour-card__meta monospace">
      id: {{ tour.id }}
    </p>

    <h3 class="tour-card__heading serif">
      {{ tour.name }}
    </h3>

    <p
      class="sans-serif"
      v-html="tour.body"
    />

    <div class="tour-card__table-wrapper">
      <table class="tour-card__table">
        <tbody>
          <tr>
            <th
              class="sans-serif"
              width="100"
            >
              No. People
            </th>

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
            <th
              class="sans-serif"
              width="100"
            >
              {{ priceList.size }}
            </th>

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
    </div>

    <ul
      class="sans-serif"
      v-if="tour.additional.length"
    >
      <li
        :key="index"
        v-for="(item, index) in tour.additional"
      >
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

<style lang="scss">
.tour-card {
  border: thin solid var(--color_border);
  border-radius: 3px;
  padding: var(--spacing_s);

  &__meta {
    margin: 0 0 0.5em;
    font-size: 12px;

    + .tour-card__heading {
      margin-top: 0;
    }
  }

  &__table-wrapper {
    overflow-x: auto;
  }

  &__table {
    border-collapse: collapse;
    font-size: 14px;
    line-height: 1;
    min-width: 400px;
    width: 100%;

    th {
      background-color: var(--color_primary);
      color: var(--color_white);
      text-align: left;
    }

    th,
    td {
      padding: 0.75em 1em;
    }

    tr {
      border-bottom: thin solid var(--color_border);

      &:nth-of-type(even) {
        background-color: rgba(0, 0, 0, 0.1);
      }

      &:last-of-type {
        border-bottom: 2px solid var(--color_primary);
      }
    }
  }

  + .tour-card {
    margin-top: var(--spacing_s);
  }
}

</style>