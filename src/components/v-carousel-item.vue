<template>
	<div class="v-carousel-item">
		<img :src=" require('@/assets/images/' + item_data.img)">
		<slot></slot>
	</div>
</template>

<script>
  export default {
    name: "vCarouselItem",
    data: () => ({

    }),
    // components: {},
    methods: {},
    computed: {},
    watch: {},
    props: {
        item_data: {
            type: Object,
						default: () => {}
        }
    },
		mounted() {
    }
  }
</script>
