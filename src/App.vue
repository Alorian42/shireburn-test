<template>
	<Header />
	<div class="container">
		<router-view />
	</div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
</script>

<style>
body {
	background-color: #b8b8b8;
}
</style>
