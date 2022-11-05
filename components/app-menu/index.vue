<template>
  <div class="app-menu">
    <ul ref="siteMenu" class="menu-list">
      <li
        v-for="(item, i) in menuItems"
        :key="`menu-${i}`"
        class="item"
        @click.stop="handleRedirect(item.name, i)"
      >
        <div class="text">
          {{ item.text }}
        </div>
      </li>
      <div class="menu-slider">
        <hr class="line" :style="getStylesLine" />
      </div>
    </ul>
  </div>
</template>

<script>
const menuItems = [
  {
    name: 'kbs',
    text: 'Tư Vấn',
  },
  {
    name: 'search',
    text: 'Tìm Kiếm',
  },
]

export default {
  name: 'AppMenu',
  data() {
    return {
      positionLeft: 0,
      sliderSize: 0,
      activeItemIndex: null,
      menuItems,
    }
  },
  computed: {
    menuLineMarginLeft() {
      return `${this.positionLeft}px`
    },
    getStylesLine() {
      return [
        { width: `${this.sliderSize}px` },
        { 'margin-left': this.menuLineMarginLeft },
      ]
    },
    route() {
      return this.$route.name
    },
  },
  watch: {
    activeItemIndex: {
      handler(val) {
        setTimeout(() => {
          this.setUnderlinePosition(val)
        }, 200)
      },
      immediate: true,
    },
    route(val) {
      if (!this.menuItems.some(obj => obj.name === val)) {
        this.activeItemIndex = null
      }
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      for (const i in this.menuItems) {
        if (this.menuItems[i].name === this.route) {
          setTimeout(() => {
            this.activeItemIndex = i
          }, 200)
          break
        }
      }
    },

    setUnderlinePosition(index) {
      const listMenuItem = this.$refs.siteMenu.childNodes
      this.sliderSize = listMenuItem[index]?.clientWidth
      this.positionLeft = listMenuItem[index]?.offsetLeft
    },

    handleRedirect(name, i) {
      if (this.route !== name) {
        this.activeItemIndex = i
        this.$router.push({ name })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.app-menu {
  display: flex;
  justify-content: space-between;
  margin-left: 50px;
  padding: 0 40px;
  height: 48px;
}

.menu-list {
  display: flex;
  position: relative;
  align-items: center;
  margin: 0;
  padding: 0;
  height: 100%;
  list-style: none;

  > .item {
    display: flex;
    position: relative;
    align-items: center;
    cursor: pointer;
    padding: 0 16px;
    height: 100%;
    text-align: center;
    line-height: 19px;
    font-size: 14px;
  }

  > .item::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    opacity: 0;
    background: $rs-theme-primary;
    content: '';
    pointer-events: none;
  }

  > .item:hover::before {
    opacity: 0.3;
    background: #8c5ce4;
  }

  > .item > .text {
    position: relative;
  }

  > .menu-slider {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
  }
}

.menu-slider {
  > .line {
    transition: margin 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), width 0.3s;
    margin: 0;
    border: 0;
    border-radius: 2px;
    background: #ddd;
    width: 100%;
    height: 3px;
  }
}
</style>
