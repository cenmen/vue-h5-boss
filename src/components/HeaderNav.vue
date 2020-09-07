<template>
  <div class="header">
      <div class="place-holder" :style="{height: setHeight + 'px'}"></div>
      <div class="content" :style="{height: setHeight + 'px', padding: setPadding}">
        <div class="left">
            <slot name="left"></slot>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class Header extends Vue {
    @Prop({type: Number, default: 50}) private setHeight?: number;
    @Prop({type: String, default: '0px 10px'}) private setPadding?: string;
}
</script>

<style lang="scss" scoped>
@mixin items-center {
    height: 100%;
    display: flex;
    align-items: center;
}
.header {
    .content {
        position: fixed;
        top: 0;
        width: calc(100% - 20px);
        background: #40E0D0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left{
            @include items-center()
        }
        .right{
            @include items-center()
        }
    }
}
</style>