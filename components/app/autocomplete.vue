<template>
  <div
    v-if="options"
    v-click-outside="close"
    class="app-autocomplete"
    @click.stop="toggle()"
  >
    <span v-if="label" class="label">{{ label }}</span>
    <input
      v-if="!isShow"
      ref="input"
      class="input"
      type="text"
      readonly
      aria-readonly="false"
      autocomplete="off"
      :placeholder="placeholder"
      :value="selected.label"
      @blur="close()"
      @click.stop="toggle()"
    />

    <input
      v-else
      ref="input"
      v-model="filterValue"
      class="input"
      type="text"
      aria-readonly="false"
      autocomplete="off"
      :placeholder="placeholder"
      @blur="close()"
      @click.stop="toggle()"
      @input="handleInput"
    />

    <div
      v-show="isShow && filterOptions.length > 0"
      :class="{ show: isShow }"
      class="option-group"
      :style="listOptionStyle"
    >
      <div
        v-for="(option, index) in filterOptions"
        :key="`option-${index}`"
        ref="option"
        :style="optionStyle"
        :class="{ selected: selected.value === option.value }"
        class="option"
        @mousedown="selectOption(option)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppAutoComplete',
  props: {
    value: {
      type: [String, Number],
      default: null,
    },
    options: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: '',
    },
    maxItem: {
      type: Number,
      default: 6,
    },
    optionFilterProp: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selected: {},
      isShow: false,
      optionStyle: {},
      observer: null,
      filterValue: '',
      isSearching: false,
      selectedValues: '',
    }
  },
  computed: {
    filterOptions() {
      if (this.filterValue.length > 0 && this.isSearching) {
        return this.options.filter(item => {
          const searchBy = item[this.optionFilterProp]
            ? item[this.optionFilterProp].toLowerCase()
            : ''
          const search = this.filterValue.toLowerCase()
          return searchBy.includes(search)
        })
      }

      return this.options
    },
    listOptionStyle() {
      return {
        'max-height': 41 * this.maxItem + 16 + 'px',
      }
    },
    isInputUpdated() {
      return this.selected.value && this.selected.value !== this.selectedValues
    },
  },
  watch: {
    value: {
      handler(val) {
        this.selectedValues = val
      },
      immediate: true,
    },
    selectedValues: {
      handler(val) {
        if (val) {
          const match = this.filterOptions.find(option => option.value === val)
          this.selected = match || {}
          this.filterValue = match?.label || ''
          this.$emit('selected', match?.value)
        } else {
          this.selected = {}
        }
      },
      immediate: true,
    },
    // Watch list options when delay loading
    filterOptions: {
      handler(val) {
        if (this.selectedValues) {
          this.selected =
            val.find(option => option.value === this.selectedValues) || {}
        }
      },
    },
  },
  mounted() {
    this.initObserver()
  },
  destroyed() {
    this.observer?.unobserve(this.$refs.input)
  },
  methods: {
    selectOption(option) {
      this.selected = option
      this.selectedValues = this.selected.value
      this.isShow = false

      this.$emit('input', this.selectedValues)
    },
    toggle() {
      this.isShow = !this.isShow
    },
    close() {
      if (!this.selected.value) {
        this.selected = {}
      }
      this.isShow = false
      this.isSearching = false
    },
    handlerResize() {
      this.optionStyle = {
        width: this.$refs.input?.clientWidth + 'px',
      }
    },
    initObserver() {
      const vm = this

      this.observer = new ResizeObserver(vm.handlerResize).observe(
        vm.$refs.input
      )
    },
    handleInput() {
      this.isSearching = true
    },
  },
}
</script>

<style lang="scss" scoped>
.app-autocomplete {
  display: block;
  position: relative;
  z-index: 4;
  cursor: pointer;
  width: $select-width;

  &::after {
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translateY(-50%);
    color: $rs-theme-primary;
    font-family: $icon-font;
    font-size: 30px;
    content: 'arrow_drop_down';
  }

  > .label {
    position: absolute;
    top: 0;
    left: 10px;
    transform: translateY(-50%);
    z-index: 3;
    background-color: $rs-theme-surface;
    padding: 0 5px;
    font-size: 10px;
    pointer-events: none;
  }

  > .input {
    display: block;
    position: relative;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    outline: none;
    border: 1px solid $select-border;
    border-radius: 4px;
    cursor: pointer;
    padding-right: 42px;
    padding-left: 16px;
    width: 100%;
    height: $select-height;
    line-height: 1.8;
    color: $select-color;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    font-weight: 400;
  }

  .input ::placeholder {
    color: $select-placeholder-color;
  }

  > .option-group {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
  }
}

.option-group {
  display: block;
  transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid $select-border;
  border-radius: 4px;
  box-shadow: 0 -8px 34px 0 rgba(0, 0, 0, 0.05);
  background-color: $select-background;
  padding: 8px 0;
  overflow: auto;
  overflow-x: hidden;
  will-change: box-shadow;

  &.show {
    animation-name: fade, slide;
    animation-duration: 200ms, 400ms;
    animation-timing-function: linear, cubic-bezier(0.23, 1, 0.32, 1);
    animation-delay: 200ms, 0;
    animation-fill-mode: forwards;
  }

  > .option {
    display: flex;
    position: relative;
    flex: 1 1 100%;
    align-items: center;
    outline: 0;
    background-color: $select-background;
    cursor: pointer;
    padding: 8px 16px;
    text-decoration: none;
    line-height: 25px;
    letter-spacing: normal;
    color: $select-color;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    font-weight: 400;
  }

  > .option:hover {
    background-color: $select-hover-background;
  }

  > .option.selected {
    background-color: $rs-theme-primary;
    color: $select-active-color;
  }
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slide {
  0% {
    margin-top: -10px;
  }
  100% {
    margin-top: 0;
  }
}
</style>
