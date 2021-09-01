import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import OrgDialog from './PlayersDialog';
import PlayerHeader from './PlayersHeader';
import PlayerList from './PlayersList';
// import PlayerSidebarContent from './PlayerSidebarContent';
import reducer from './store';
import { getPlayer } from './store/playersSlice';
import { getUserData } from './store/userSlice';

function PlayerApp(props) {
	const dispatch = useDispatch();

	const pageLayout = useRef(null);
	const routeParams = useParams();

	useDeepCompareEffect(() => {
		dispatch(getPlayer(routeParams));
		dispatch(getUserData());
	}, [dispatch, routeParams]);

	return (
		<>
			<FusePageSimple
				classes={{
					contentWrapper: 'p-0 sm:p-24 h-full',
					content: 'flex flex-col h-full',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
					wrapper: 'min-h-0'
				}}
				header={<PlayerHeader pageLayout={pageLayout} />}
				content={<PlayerList />}
				// leftSidebarContent={<PlayerSidebarContent />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
			<OrgDialog />
		</>
	);
}

export default withReducer('playerApp', reducer)(PlayerApp);
