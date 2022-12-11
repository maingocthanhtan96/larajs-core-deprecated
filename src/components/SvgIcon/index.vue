<script lang="ts">
import { computed } from 'vue';
import { isExternal } from '@/utils';

export default {
  name: 'SvgIcon',
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '',
    },
    size: {
      type: [Number, String],
      default: '',
    },
    width: {
      type: String,
      default: '1em',
    },
    height: {
      type: String,
      default: '1em',
    },
    class: {
      type: String,
      default: '',
    },
  },
  setup(props: any) {
    const styleExternalIcon = computed(() => {
      return {
        mask: `url(${props.name}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${props.name}) no-repeat 50% 50%`,
      };
    });
    const svgClass = computed(() => `${props.class} svg-icon`);
    const hasExternal = computed(() => isExternal(props.name));
    const svgStyle = computed(() => {
      const { color, size } = props;
      const style: any = {};
      color && (style.color = color);
      size && (style.fontSize = typeof size === 'string' ? size : `${size}px`);

      return style;
    });

    return {
      hasExternal,
      styleExternalIcon,
      svgClass,
      svgStyle,
    };
  },
};
</script>

<template>
  <div v-if="hasExternal" :style="{ ...styleExternalIcon, svgStyle }" :class="svgClass" />
  <i v-else :class="svgClass" :style="svgStyle">
    <svg fill="currentColor" aria-hidden="true" :width="width" :height="height">
      <use :href="`#icon-${name}`" />
    </svg>
  </i>
</template>

<style lang="scss" scoped>
.svg-icon {
  vertical-align: -0.125em;
  line-height: 0;
  display: inline-block;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
