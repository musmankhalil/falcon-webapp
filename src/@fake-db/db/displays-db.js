import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import mock from '../mock';

const displaysDB = {
	displays: [
		{
			id: '5725a680b3249760ea21de52',
			type: 'bus',
			name: 'M37-B1925',
			issue: 'error',
		},
		{
			id: '5725a680606588342058356d',
			type: 'bus',
			name: 'I65-MMC Indoor',
			issue: 'critical',
		},
		{
			id: '5725a680606s588342058356d',
			type: 'bus',
			name: 'I65-MMC Outdoor',
			issue: 'normal',
		}
	],
	user: [
		{
			id: '5725a6802d10e277a0f35724',
			name: 'John Doe',
			avatar: 'assets/images/avatars/profile.jpg',
			starred: [
				'5725a680ae1ae9a3c960d487',
				'5725a6801146cce777df2a08',
				'5725a680bbcec3cc32a8488a',
				'5725a680bc670af746c435e2',
				'5725a68009e20d0a9e9acf2a'
			],
			frequentDisplays: [
				'5725a6809fdd915739187ed5',
				'5725a68031fdbb1db2c1af47',
				'5725a680606588342058356d',
				'5725a680e7eb988a58ddf303',
				'5725a6806acf030f9341e925',
				'5725a68034cb3968e1f79eac',
				'5725a6801146cce777df2a08',
				'5725a680653c265f5c79b5a9'
			],
			groups: [
				{
					id: '5725a6802d10e277a0f35739',
					name: 'Friends',
					displayIds: ['5725a680bbcec3cc32a8488a', '5725a680e87cb319bd9bd673', '5725a6802d10e277a0f35775']
				},
				{
					id: '5725a6802d10e277a0f35749',
					name: 'Clients',
					displayIds: [
						'5725a680cd7efa56a45aea5d',
						'5725a68018c663044be49cbf',
						'5725a6809413bf8a0a5272b1',
						'5725a6803d87f1b77e17b62b'
					]
				},
				{
					id: '5725a6802d10e277a0f35329',
					name: 'Recent Workers',
					displayIds: [
						'5725a680bbcec3cc32a8488a',
						'5725a680653c265f5c79b5a9',
						'5725a6808a178bfd034d6ecf',
						'5725a6801146cce777df2a08'
					]
				}
			]
		}
	]
};

mock.onGet('/api/displays-app/displays').reply(config => {
	const { id } = config.params;
	let response = [];
	switch (id) {
		case 'frequent': {
			response = displaysDB.displays.filter(display => displaysDB.user[0].frequentDisplays.includes(display.id));
			break;
		}
		case 'starred': {
			response = displaysDB.displays.filter(display => displaysDB.user[0].starred.includes(display.id));
			break;
		}
		default: {
			response = displaysDB.displays;
		}
	}
	return [200, response];
});

mock.onGet('/api/displays-app/user').reply(config => {
	return [200, displaysDB.user[0]];
});

mock.onPost('/api/displays-app/add-display').reply(request => {
	const { display } = JSON.parse(request.data);
	const newDisplay = {
		...display,
		id: FuseUtils.generateGUID()
	};
	displaysDB.displays = [...displaysDB.displays, newDisplay];
	return [200, newDisplay];
});

mock.onPost('/api/displays-app/update-display').reply(request => {
	const { display } = JSON.parse(request.data);

	displaysDB.displays = displaysDB.displays.map(_display => {
		if (display.id === _display.id) {
			return display;
		}
		return _display;
	});

	return [200, display];
});

mock.onPost('/api/displays-app/remove-display').reply(request => {
	const { displayId } = JSON.parse(request.data);
	displaysDB.displays = displaysDB.displays.filter(display => displayId !== display.id);

	return [200, displayId];
});

mock.onPost('/api/displays-app/remove-displays').reply(request => {
	const { displayIds } = JSON.parse(request.data);
	displaysDB.displays = displaysDB.displays.filter(display => !displayIds.includes(display.id));
	return [200, displayIds];
});

mock.onPost('/api/displays-app/toggle-starred-display').reply(request => {
	const { displayId } = JSON.parse(request.data);
	displaysDB.user[0].starred = _.xor(displaysDB.user[0].starred, [displayId]);
	return [200, displayId];
});

mock.onPost('/api/displays-app/toggle-starred-displays').reply(request => {
	const { displayIds } = JSON.parse(request.data);
	displaysDB.user[0].starred = _.xor(displaysDB.user[0].starred, displayIds);
	return [200, displayIds];
});

mock.onPost('/api/displays-app/set-displays-starred').reply(request => {
	const { displayIds } = JSON.parse(request.data);

	displaysDB.user[0].starred = [...displaysDB.user[0].starred, ...displayIds];

	return [200, displayIds];
});

mock.onPost('/api/displays-app/set-displays-unstarred').reply(request => {
	const { displayIds } = JSON.parse(request.data);

	displaysDB.user[0].starred = displaysDB.user[0].starred.filter(displayId => !displayIds.includes(displayId));

	return [200, displayIds];
});
