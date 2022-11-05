<template>
  <div class="search-page">Search Page</div>
</template>

<script>
export default {
  name: 'SearchPage',

  data() {
    return {}
  },

  computed: {},
  watch: {},
  created() {},

  mounted() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.branch-page {
  margin: 10px 0;
  font-family: $material-icons-font-path;
  > .search {
    margin-bottom: 20px;
    max-width: 1000px;
  }

  > .more-action > .download-button {
    user-select: none;
    margin-left: auto;
    border-radius: 4px;
    background: $rs-theme-primary;
    cursor: pointer;
    padding: 0 10px;
    height: 25px;
    line-height: 25px;
    color: $rs-theme-surface;
    font-size: 12px;

    &.-disabled {
      background: $color-gray-3;
      cursor: default;
    }
  }
}

.more-action {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}

.switch-mode {
  display: flex;
  align-items: center;
  margin-left: 20px;
  > .switch {
    margin-right: 5px;
  }
  > .label {
    color: $color-gray-1;
    font-size: 12px;
  }
  > .icon.-editkpi {
    margin-right: 4px;
    color: $rs-theme-primary;
    font-size: 18px;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
