import mock from '../mock';

const fileManagerDB = {
	files: [
		{
			id: '1',
			name: 'System logs',
			type: 'document',
			owner: 'Emily Bennett',
			size: '52 Kb',
			modified: 'July 8, 2017',
			opened: 'July 8, 2017',
			created: 'July 8, 2017',
			extention: '',
			location: 'My Files > Documents',
			offline: true,
			preview: 'assets/images/etc/sample-file-preview.jpg'
		},
		{
			id: '2',
			name: 'Prices',
			type: 'spreadsheet',
			owner: 'Emily Bennett',
			size: '27 Mb',
			modified: 'July 8, 2017',
			opened: 'July 8, 2017',
			created: 'July 8, 2017',
			extention: '',
			location: 'My Files > Documents',
			offline: true,
			preview: 'assets/images/etc/sample-file-preview.jpg'
		}
	]
};

mock.onGet('/api/file-manager-app/files').reply(config => {
	return [200, fileManagerDB.files];
});
