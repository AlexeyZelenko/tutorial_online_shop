<template>
  <div class="popup_wrapper" ref="popup_wrapper">
    <div class="v-popup">
      <div class="v-popup__header">
        <span>{{popupTitle}}</span>
        <span>
      <i
          class="material-icons"
          @click="closePopup"
          style="cursor: pointer"
      >
        close
      </i>
      </span>
      </div>
      <div class="v-popup__content">
        <slot></slot>
      </div>
      <div class="v-popup__footer">
        <button
            class="close_modal"
            @click="closePopup"
        >
          {{'Close' | localize}}
        </button>
        <button
            class="submit_btn"
            @click="rightBtnActions"
        >
          {{rightBtnTitle}}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        name: "v-popup",
        props: {
            popupTitle: {
              type: String,
              default: 'Popup name'
            },
            rightBtnTitle: {
                type: String,
                default: 'Ok'
            }
        },
        mounted() {
          let vm = this;
          document.addEventListener('click', function (item) {
            if (item.target === vm.$refs['popup_wrapper']) {
                vm.closePopup()
            }
            })
        },
        methods: {
            rightBtnActions() {
                this.$emit('rightBtnActions')
            },
            closePopup() {
                this.$emit('closePopup')
            }
        }
    }
</script>

<style lang="scss">
  .popup_wrapper {
    background: rgba(64,64,64, .4);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
  }
    &__header, &__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__content {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .submit_btn {
      padding: 8px;
      color: #ffffff;
      background: #26ae68;
      border-radius: 4px;
    }
    .close_modal {
      padding: 8px;
      color: #ffffff;
      background: red;
      border-radius: 4px;
    }
  }
</style>