<template>
  <div class="confirm-popup">
    <div class="message">{{ message }}</div>
    <div class="control">
      <rs-button v-if="!disableNgButton" class="btn -ng" @click="$emit('ng')">
        {{ ngButton }}
      </rs-button>
      <rs-button class="btn -ok" @click="$emit('ok')">
        {{ okButton }}
      </rs-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: '',
    },
    okButton: {
      type: String,
      default: 'はい',
    },
    ngButton: {
      type: String,
      default: 'いいえ',
    },
    disableNgButton: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.confirm-popup {
  background-color: #fff;
  padding: 40px;

  > .message {
    margin-bottom: 20px;
    text-align: center;
    font-size: 0.9rem;
  }

  > .control {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-top: 10px;
  }

  > .control > .btn {
    margin: 5px 0;
    &.-ok {
      @include rs-button-width(100%);
      @include rs-button-type(unelevated, dense);
    }
    &.-ng {
      @include rs-button-width(100%);
      @include rs-button-type(outlined, dense);
    }
  }
}
</style>
