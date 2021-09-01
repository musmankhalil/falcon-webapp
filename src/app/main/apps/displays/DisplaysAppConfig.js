import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const DisplaysAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/displays/:id',
			component: lazy(() => import('./DisplaysApp'))
		},
		{
			path: '/apps/displays',
			component: () => <Redirect to="/apps/displays/all" />
		}
	]
};

export default DisplaysAppConfig;
