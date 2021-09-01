import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import DisplayDialog from './DisplayDialog';
import DisplaysHeader from './DisplaysHeader';
import DisplaysList from './DisplaysList';
import DisplaysSidebarContent from './DisplaysSidebarContent';
import reducer from './store';
import { getDisplays } from './store/displaysSlice';
import { getUserData } from './store/userSlice';

function DisplaysApp(props) {
	const dispatch = useDispatch();

	const pageLayout = useRef(null);
	const routeParams = useParams();

	useDeepCompareEffect(() => {
		dispatch(getDisplays(routeParams));
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
				header={<DisplaysHeader pageLayout={pageLayout} />}
				content={<DisplaysList />}
				// leftSidebarContent={<DisplaysSidebarContent />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
			<DisplayDialog />
		</>
	);
}

export default withReducer('displaysApp', reducer)(DisplaysApp);
