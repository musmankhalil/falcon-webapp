import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const OrgsAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/orgs/:id',
			component: lazy(() => import('./OrgsApp'))
		},
		{
			path: '/apps/orgs',
			component: () => <Redirect to="/apps/orgs/all" />
		}
	]
};

export default OrgsAppConfig;
