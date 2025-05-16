<template>
	<div class="wrapper">
		<h1 class="company">Purple Cross Ltd</h1>
		<div class="user">
			<div class="user-name">Admin</div>
			<img
				class="user-image"
				src="https://randomuser.me/api/portraits/lego/1.jpg"
				alt="User Image"
			/>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped>
.wrapper {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 20px;
}

.company {
	font-size: 24px;
	font-weight: bold;
	color: #7c3aed;
}

.user {
	display: flex;
	align-items: center;
}

.user-name {
	margin-right: 10px;
	font-size: 18px;
	color: #4b5563;
}

.user-image {
	width: 40px;
	height: 40px;
	border-radius: 50%;
	overflow: hidden;
}
</style>
