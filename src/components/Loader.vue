<template>
  <div class="loader">
    <span class="h3 visually-hidden">
      Loading...
    </span>

    <pulse />
  </div>
</template>

<script>
import Pulse from './Pulse'

export default {
  components: {
    Pulse
  }
}
</script>

<style scoped>
.loader {
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
}
</style>
