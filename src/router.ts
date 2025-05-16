import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'Employee List',
		component: () => import('./views/EmployeeList.vue'),
	},
	{
		path: '/create',
		name: 'Create Employee Form',
		component: () => import('./views/EmployeeForm.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
