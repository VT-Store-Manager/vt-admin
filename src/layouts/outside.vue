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
		background-image: url('/img/default/bg_outside.webp');
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
			background-color: #3a3a3aa4;
		}
	}
	.inner {
		margin: auto;
	}
}
</style>
