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
      default: `https://fonts.gstatic.com/s/firacode/v9/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_GNsFVfxN87gsj0.ttf`
    },
    sansSerif: {
      type: String,
      default: `https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UN_r8-VeJoCqeDjg.ttf`
    },
    serif: {
      type: String,
      default: `https://fonts.gstatic.com/s/vesperlibre/v13/bx6dNxyWnf-uxPdXDHUD_RdA-2ap0okKXKvPlw.ttf`
    }
  }
}
</script>