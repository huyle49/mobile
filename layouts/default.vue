<template>
  <div class="default-layout">
    <rs-app-layout class="app-layout">
      <rs-app-layout-content class="content">
        <rs-app-bar class="app-bar" fixed>
          <rs-app-bar-title class="title">
            <span class="link" @click="handleRedirectHomePage">
              {{ title }}
            </span>
          </rs-app-bar-title>
          <app-menu />
          <rs-app-bar-tool class="actions">
            <rs-app-bar-item
              v-for="(action, index) in actions"
              :key="index"
              class="action"
              :class="'-' + action.icon"
              @click="executeAction(index)"
            />
            <rs-app-bar-item>
              <indicator-component />
            </rs-app-bar-item>
            <rs-app-bar-item>
              <account-component />
            </rs-app-bar-item>
          </rs-app-bar-tool>
        </rs-app-bar>
        <div class="app-main">
          <nuxt ref="page" />
        </div>
      </rs-app-layout-content>
    </rs-app-layout>

    <popup-component
      v-if="popup.component"
      :mask="popup.mask"
      :custom-positions="popup.customPositions"
      @close="$emit('hidePopup')"
    >
      <component
        :is="popup.component"
        ref="popupComponent"
        v-bind="popup.properties"
      />
    </popup-component>
  </div>
</template>

<script>
import { pathified } from '@azoom/util'
const { $get } = pathified('layout')

export default {
  layoutContent: {
    title: 'NHÓM 17 KBS',
  },
  data() {
    return {
      popup: {},
    }
  },
  computed: {
    title: $get('title'),
    actions: $get('actions'),
  },
  created() {
    this.$nuxt.$on('showPopup', popup => {
      this.popup = popup
      if (this.popup.on) {
        this.$nextTick(() => {
          Object.entries(this.popup.on).forEach(([eventName, listener]) => {
            this.$refs.popupComponent.$on(eventName, listener)
          })
        })
      }
    })
    this.$nuxt.$on('hidePopup', () => {
      this.popup = {}
    })
  },
  methods: {
    executeAction(actionIndex) {
      this.$nuxt.$emit(this.actions[actionIndex].name)
    },
    handleRedirectHomePage() {
      if (this.$route.name !== 'branch') {
        this.$router.push({ name: 'branch' })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@rsmdc/appbar/rs-app-bar';
@import '@rsmdc/top-app-bar/rs-top-app-bar';
@import '@rsmdc/list/rs-list';

.app-layout {
  @include rs-app-bar-type(dense);

  z-index: 3;
}

.app-bar > .title > .link {
  cursor: pointer;
  color: #fff;
  &:active {
    color: #fff;
  }
}

.app-main {
  padding: 0 1.5%;
}

::v-deep .rs-app-bar .row .section {
  padding: 0 !important;
}
</style>
