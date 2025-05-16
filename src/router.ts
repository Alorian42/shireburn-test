import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'employee-list',
		component: () => import('./views/EmployeeList.vue'),
	},
	{
		path: '/create',
		name: 'create-employee-form',
		component: () => import('./views/EmployeeForm.vue'),
	},
	{
		path: '/edit/:id',
		name: 'edit-employee-form',
		component: () => import('./views/EmployeeForm.vue'),
	},
	{
		path: '/view/:id',
		name: 'view-employee-form',
		component: () => import('./views/EmployeeForm.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
