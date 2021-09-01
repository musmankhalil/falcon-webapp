import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const DevicesAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/devices/:productId/:productHandle?/:tab?',
			component: lazy(() => import('./device/Device'))
		},
		{
			path: '/apps/devices',
			component: lazy(() => import('./devices/Devices'))
		},
		{
			path: '/apps/devices',
			component: () => <Redirect to="/apps/devices" />
		}
	]
};

export default DevicesAppConfig;
