<template>
  <div class="account-info-popup">
    <div class="user">
      <div class="name">{{ loggedStaff.name }}</div>
      <div class="mail">{{ loggedStaff.email }}</div>
    </div>
    <div class="lists">
      <div class="list -logout" @click="logout">ログアウト</div>
    </div>
  </div>
</template>

<script>
import { pathified } from '@azoom/util'

const { $get } = pathified('loggedStaff')

export default {
  computed: {
    loggedStaff: $get('/loggedStaff'),
  },
  methods: {
    logout() {
      this.$nuxt.$emit('hidePopup')
      // TODO
    },
  },
}
</script>

<style lang="scss" scoped>
.account-info-popup {
  position: fixed;
  top: 0;
  right: 0;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.04);
  background-color: #fff;
  width: 180px;

  > .user {
    border-bottom: 1px solid #eee;
    cursor: default;
    padding: 10px 20px;
  }
  > .user > .name {
    padding-bottom: 3px;
    color: #000;
    font-size: 0.9rem;
  }
  > .user > .mail {
    color: #999;
    font-size: 0.7rem;
  }
  > .lists {
    display: flex;
    flex-direction: column;
  }
  > .lists > .list {
    cursor: pointer;
    padding: 20px;
    color: #000;
    font-size: 0.9rem;
  }
  > .lists > .list:hover {
    transition: 0.2s;
    color: #f8f8f8;
  }
}
</style>
