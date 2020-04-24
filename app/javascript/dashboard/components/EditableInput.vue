<template>
  <input
    type="text"
    v-if="editable"
    v-model="inputValue"
    @blur="editable = false"
    @keyup.esc="editable = false"
    @keyup.enter="
      updateContact({ [field]: inputValue });
      editable = false;
    "
    v-focus
  />
  <div v-else>
    <span
      @click="
        editable = true;
        inputValue = value;
      "
    >
      {{ value }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [Number, String],
    },
    field: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      editable: false,
      inputValue: '',
    };
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
        el.select();
      },
    },
  },
  methods: {
    updateContact(changes) {
      this.$store.dispatch('contacts/update', {
        ...changes,
        id: this.id,
      });

      this.$store.dispatch('updateConvSender', {
        ...changes,
        id: this.id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  display: block;
}
span {
  cursor: pointer;
}
</style>
