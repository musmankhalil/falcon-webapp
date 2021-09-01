import Hidden from '@material-ui/core/Hidden';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { setPlayerSearchText, openNewOrgDialog } from './store/playersSlice';

function PlayerHeader(props) {
	const dispatch = useDispatch();
	const searchText = useSelector(({ playerApp }) => playerApp.player.searchText);
	const mainTheme = useSelector(selectMainTheme);

	return (
		<div className="flex flex-1 items-center justify-between p-4 sm:p-24">
			<div className="flex flex-shrink items-center sm:w-224">
				<Hidden lgUp>
					<IconButton
						onClick={ev => {
							props.pageLayout.current.toggleLeftSidebar();
						}}
						aria-label="open left sidebar"
					>
						<Icon>menu</Icon>
					</IconButton>
				</Hidden>

				<div className="flex items-center">
					<Icon
						component={motion.span}
						initial={{ scale: 0 }}
						animate={{ scale: 1, transition: { delay: 0.2 } }}
						className="text-24 md:text-32"
					>
						account_box
					</Icon>
					<Typography
						component={motion.span}
						initial={{ x: -20 }}
						animate={{ x: 0, transition: { delay: 0.2 } }}
						delay={300}
						className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
					>
						Players
					</Typography>
					<Fab
						component={motion.div}
						initial={{ scale: 0 }}
						animate={{ scale: 1, transition: { delay: 0.6 } }}
						color="secondary"
						aria-label="add"
						className="absolute top-190 ltr:right-20 rtl:right-0 mx-16 -mb-28 z-999"
						style={{ top: '11rem' }}
						onClick={ev => dispatch(openNewOrgDialog())}
					>
						<Icon>add</Icon>
					</Fab>
				</div>
			</div>

			<div className="flex flex-1 items-end">

				{/* <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.6 } }}>
					{selectedItem && (
						<Breadcrumb
							selected={selectedItem}
							className="flex flex-1 ltr:pl-72 rtl:pr-72 pb-12 text-16 sm:text-24 font-semibold"
						/>
					)}
				</motion.div> */}
			</div>

			<div className="flex flex-1 items-center justify-center px-8 sm:px-12">
				<ThemeProvider theme={mainTheme}>
					<Paper
						component={motion.div}
						initial={{ y: -20, opacity: 0 }}
						animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
						className="flex p-4 items-center w-full max-w-512 h-48 px-16 py-4 shadow"
					>
						<Icon color="action">search</Icon>

						<Input
							placeholder="Search for anything"
							className="flex flex-1 px-16"
							disableUnderline
							fullWidth
							value={searchText}
							inputProps={{
								'aria-label': 'Search'
							}}
							onChange={ev => dispatch(setPlayerSearchText(ev))}
						/>
					</Paper>
				</ThemeProvider>
			</div>

		</div>
	);
}

export default PlayerHeader;
