<template>
  <button
    type="submit"
    :disabled="disabled"
    class="send-button"
    @click="onClick"
  >
    <i
      v-if="!loading"
      :style="`background-color: #5D49C7`"
      class="ion-android-send icon-holder"
    ></span>
    <spinner v-else size="small" />
  </button>
</template>

<script>
import Spinner from 'shared/components/Spinner.vue';

export default {
  components: {
    Spinner,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function,
      default: () => {},
    },
    color: {
      type: String,
      default: '#5D49C7',
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '~widget/assets/scss/variables.scss';

.send-button {
  background: transparent;
  border: 0;
  cursor: pointer;
  position: relative;
  padding-right: $space-smaller;

  .icon-holder {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: $font-size-big;
    font-weight: $font-weight-medium;
  }
}
</style>
