<template>
  <div class="app-select" @blur="open = false">
    <div class="select" :class="{ '-open': open }" @click="open = !open">
      {{ selected[optionLabel] || placeholder }}
    </div>
    <div class="list" :class="{ '-hide': !open }">
      <div
        v-for="option in options"
        :key="option[optionValue]"
        :value="option[optionValue]"
        class="item"
        @click="selectOption(option)"
      >
        {{ option[optionLabel] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    optionValue: {
      type: String,
      default: 'value',
    },
    optionLabel: {
      type: String,
      default: 'label',
    },
    // eslint-disable-next-line vue/require-default-prop
    placeholder: {
      type: String,
      default: null,
    },
    default: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      open: false,
    }
  },
  computed: {
    selected() {
      return this.default ? this.default : {}
    },
  },
  methods: {
    selectOption(option) {
      this.open = false
      this.$emit('input', option[this.optionValue])
    },
  },
}
</script>

<style lang="scss" scoped>
.app-select {
  position: relative;
  outline: none;
  height: 30px;
  text-align: left;
  line-height: 30px;

  > .select {
    border: 1px solid $rs-theme-primary;
    border-radius: 4px;
    background-color: $rs-theme-background;
    cursor: pointer;
    padding-left: 1em;
    height: 32px;
    color: $rs-theme-on-surface;
    user-select: none;
  }
}

.app-select > .select::after {
  position: absolute;
  top: 14px;
  right: 1em;
  border: 5px solid $rs-theme-primary;
  border-color: $rs-theme-primary transparent transparent transparent;
  width: 0;
  height: 0;
  content: '';
}

.app-select > .list {
  position: absolute;
  right: 0;
  left: 0;
  z-index: 1;
  margin-top: 4px;
  border: 1px solid $rs-theme-primary;
  border-radius: 4px;
  background-color: $rs-theme-background;
  overflow: hidden;
  color: $rs-theme-background;

  > .item {
    cursor: pointer;
    padding-left: 8px;
    color: $rs-theme-on-surface;
    user-select: none;
  }

  > .item:hover {
    background-color: $color-gray-6;
  }
}

.app-select > .list.-hide {
  display: none;
}
</style>
