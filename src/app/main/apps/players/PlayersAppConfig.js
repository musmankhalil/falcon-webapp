import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const PlayersAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/players',
			component: lazy(() => import('./PlayersApp'))
		},
		{
			path: '/apps/players',
			component: () => <Redirect to="/apps/player/all" />
		}
	]
};

export default PlayersAppConfig;
