<template>
	<div class="wrapper">
		<div class="wallpaper-outside"></div>
		<div class="wallpaper-outside-layer"></div>
		<div class="inner">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.wrapper {
	height: 100vh;
	position: relative;
	display: flex;
	.wallpaper-outside {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: url('https://images.guucdn.net/full/2017/04/19/fa14130db65d54a0b30989027d28c0262a22d8ad.jpg');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		filter: blur(3px);
		&-layer {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: #a342158d;
		}
	}
	.inner {
		margin: auto;
	}
}
</style>
