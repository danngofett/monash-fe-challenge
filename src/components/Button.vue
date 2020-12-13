<template>
  <button
    class="button"
    :class="classes"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'btn',

  props: {
    label: {
      type: String,
      default: 'Button'
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    isFloating: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classes() {
      return [
        { 'is-disabled': this.isDisabled },
        { 'is-floating': this.isFloating }
      ]
    }
  }
}
</script>

<style lang="scss">
.button {
  appearance: none;
  background-color: var(--color_primary);
  border: 1px solid var(--color_primary);
  border-radius: 3px;
  color: var(--color_white);
  cursor: pointer;
  outline: 0;
  padding: var(--spacing_s);

  &:hover {
    background-color: var(--color_white);
    border-color: var(--color_primary);
    color: var(--color_primary);
  }

  &.is-floating {
    position: fixed;
    right: var(--spacing_l);
    bottom: var(--spacing_l);
  }

  &.is-disabled {
    background-color: var(--color_grey);
    border-color: var(--color_border);
    color: var(--color_primary);
    pointer-events: none;
  }
}
</style>