import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import mock from '../mock';

const orgsDB = {
	orgs: [
		{
			id: "5e74c555",
			email: "arsilbbb@gmail.com",
			name: "hafeezsons",
			notes: "",
			password: "558155555",
			players: 0,
			accountStatus: 0,
			created: 1627992824,
			avatar: "assets/images/avatars/profile.jpg"
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
			frequentOrgs: [
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
					orgIds: ['5725a680bbcec3cc32a8488a', '5725a680e87cb319bd9bd673', '5725a6802d10e277a0f35775']
				},
				{
					id: '5725a6802d10e277a0f35749',
					name: 'Clients',
					orgIds: [
						'5725a680cd7efa56a45aea5d',
						'5725a68018c663044be49cbf',
						'5725a6809413bf8a0a5272b1',
						'5725a6803d87f1b77e17b62b'
					]
				},
				{
					id: '5725a6802d10e277a0f35329',
					name: 'Recent Workers',
					orgIds: [
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

mock.onGet('/api/orgs-app/orgs').reply(config => {
	const { id } = config.params;
	let response = [];
	switch (id) {
		case 'frequent': {
			response = orgsDB.orgs.filter(org => orgsDB.user[0].frequentOrgs.includes(org.id));
			break;
		}
		case 'starred': {
			response = orgsDB.orgs.filter(org => orgsDB.user[0].starred.includes(org.id));
			break;
		}
		default: {
			response = orgsDB.orgs;
		}
	}
	return [200, response];
});

mock.onGet('/api/orgs-app/user').reply(config => {
	return [200, orgsDB.user[0]];
});

mock.onPost('/api/orgs-app/add-org').reply(request => {
	const { org } = JSON.parse(request.data);
	const newOrg = {
		...org,
		id: FuseUtils.generateGUID()
	};
	orgsDB.orgs = [...orgsDB.orgs, newOrg];
	return [200, newOrg];
});

mock.onPost('/api/orgs-app/update-org').reply(request => {
	const { org } = JSON.parse(request.data);

	orgsDB.orgs = orgsDB.orgs.map(_org => {
		if (org.id === _org.id) {
			return org;
		}
		return _org;
	});

	return [200, org];
});

mock.onPost('/api/orgs-app/remove-org').reply(request => {
	const { orgId } = JSON.parse(request.data);
	orgsDB.orgs = orgsDB.orgs.filter(org => orgId !== org.id);

	return [200, orgId];
});

mock.onPost('/api/orgs-app/remove-orgs').reply(request => {
	const { orgIds } = JSON.parse(request.data);
	orgsDB.orgs = orgsDB.orgs.filter(org => !orgIds.includes(org.id));
	return [200, orgIds];
});

mock.onPost('/api/orgs-app/toggle-starred-org').reply(request => {
	const { orgId } = JSON.parse(request.data);
	orgsDB.user[0].starred = _.xor(orgsDB.user[0].starred, [orgId]);
	return [200, orgId];
});

mock.onPost('/api/orgs-app/toggle-starred-orgs').reply(request => {
	const { orgIds } = JSON.parse(request.data);
	orgsDB.user[0].starred = _.xor(orgsDB.user[0].starred, orgIds);
	return [200, orgIds];
});

mock.onPost('/api/orgs-app/set-orgs-starred').reply(request => {
	const { orgIds } = JSON.parse(request.data);

	orgsDB.user[0].starred = [...orgsDB.user[0].starred, ...orgIds];

	return [200, orgIds];
});

mock.onPost('/api/orgs-app/set-orgs-unstarred').reply(request => {
	const { orgIds } = JSON.parse(request.data);

	orgsDB.user[0].starred = orgsDB.user[0].starred.filter(orgId => !orgIds.includes(orgId));

	return [200, orgIds];
});
