<template>
	<div class="v-carousel-item">
<!--		<img :src="(item.arrayImages[0])">-->
		<slot>
			<img
					style="width: 300px; height: 600px"
					:src="(item_data)" alt=""
			>
		</slot>
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
