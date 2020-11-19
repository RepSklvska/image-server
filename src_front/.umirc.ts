import {defineConfig} from 'umi';

export default defineConfig({
	nodeModulesTransform: {
		type: 'none',
	},
	dva: {},
	routes: [
		{path: '/', component: '@/pages/index'},
	],
});
