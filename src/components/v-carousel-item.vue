<template>
	<div class="v-carousel-item">
		<slot>
			<img
					style="width: 300px;"
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
    props: {
        item_data: {
            type: Object,
						default: () => {}
        }
    },
  }
</script>
