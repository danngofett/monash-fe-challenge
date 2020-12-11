<template>
  <div>
    <component :is="`style`">
      @font-face {
        font-family: 'SansSerif';
        src: url({{ sansSerif }})
      }

      @font-face {
        font-family: 'Serif';
        src: url({{ serif }})
      }

      @font-face {
        font-family: 'Monospace';
        src: url({{ monospace }})
      }
    </component>
  </div>
</template>

<script>
export default {
  props: {
    monospace: {
      type: String,
      default: `http://fonts.gstatic.com/s/jetbrainsmono/v1/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjPVmUsaaDhw.ttf`
    },
    sansSerif: {
      type: String,
      default: `http://fonts.gstatic.com/s/actor/v10/wEOzEBbCkc5cO3ekXygtUMIO.ttf`
    },
    serif: {
      type: String,
      default: `http://fonts.gstatic.com/s/dmserifdisplay/v4/-nFnOHM81r4j6k0gjAW3mujVU2B2K_d709jy92k.ttf`
    }
  }
}
</script>