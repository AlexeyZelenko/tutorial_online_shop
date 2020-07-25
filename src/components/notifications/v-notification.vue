<template>
  <div class="v-notifications">
    <transition-group
      name="v-transition-animate"
      class="messages_list"
    >
      <div
          class="v-notifications__content"
          v-for="message in messages"
          :key="message.id"
          :class="message.icon"
      >
        <div class="content__text">
          <span>{{message.name}}</span>
          <i class="material-icons">{{message.icon}}</i>
        </div>
        <div class="content__buttons">
          <button v-if="rightButton.length">{{rightButton}}</button>
          <button v-if="leftButton.length">{{leftButton}}</button>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
    export default {
    name: "v-notifications",
    methods: {
        hideNotification() {
            let vm = this;
            if (this.messages.length) {
                setTimeout (function () {
                    vm.messages.splice(vm.messages.length - 1, 1)
                }, vm.timeout)
            }
        }
    },
    watch: {
    messages() {
          this.hideNotification()
      }
    },
    mounted() {
        this.hideNotification()
    },

    props: {
      messages: {
          type: Array,
          default: () => {
              return []
          }
      },
      rightButton: {
          type: String,
          default: ''
      },
      leftButton: {
          type: String,
          default: ''
      },
      timeout: {
          type: Number,
          default: 3000
      }
    }
    }
</script>

<style lang="scss">
  .v-notifications {
    position: fixed;
    top: 80px;
    right: 16px;
    z-index: 10;
    flex-direction: column-reverse;
    /*&__messages_list {*/
    /*  display: flex;*/
    /*  flex-direction: column-reverse*/
    /*}*/
    &__content {
      padding: 16px;
      border-radius: 4px;
      color: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      margin-bottom: 16px;
      background: #016a6a;
      &.error {
        background: red;
      }
      &.warning {
        background: orange;
      }
      &.check_circle {
        background: green;
      }
      .content {
        &__text {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      }
    }
    .material-icons {
      margin: 10px;
    }
  }
  .v-transition-animate {
    &-enter {
      transform: translateX(120px);
      opacity: 0;
    }
    &-enter-active {
      transition: all .6s ease;
    }
    &-enter-to {
      opacity: 1;
    }

    &-leave {
      height: 50px;
      opacity: 1;
    }
    &-leave-active {
      transition: transform .6s ease, opacity .6s, height .6s .2s;
    }
    &-leave-to {
      height: 0;
      transform: translateX(120px);
      opacity: 0;
    }

    &-move {
      transition: transform .6s ease;
    }
  }
</style>