import _ from '@lodash';
import mock from '../mock';

const deviceDB = {
	products: [
		{
			id: '1',
			type: 'bus',
			name: 'M37-B1925',
			issue: 'error',
			handle: 'a-walk-amongst-friends-canvas-print',
			description:
				'Officia amet eiusmod eu sunt tempor voluptate laboris velit nisi amet enim proident et. Consequat laborum non eiusmod cillum eu exercitation. Qui adipisicing est fugiat eiusmod esse. Sint aliqua cupidatat pariatur mollit ad est proident reprehenderit. Eiusmod adipisicing laborum incididunt sit aliqua ullamco.',
			categories: ['Canvas Print', 'Nature'],
			tags: ['canvas-print', 'nature'],
			featuredImageId: 1,
			images: [
				{
					id: 0,
					url: 'assets/images/ecommerce/a-walk-amongst-friends.jpg',
					type: 'image'
				},
				{
					id: 1,
					url: 'assets/images/ecommerce/braies-lake.jpg',
					type: 'image'
				},
				{
					id: 2,
					url: 'assets/images/ecommerce/fall-glow.jpg',
					type: 'image'
				},
				{
					id: 3,
					url: 'assets/images/ecommerce/first-snow.jpg',
					type: 'image'
				},
				{
					id: 4,
					url: 'assets/images/ecommerce/lago-di-braies.jpg',
					type: 'image'
				},
				{
					id: 5,
					url: 'assets/images/ecommerce/lago-di-sorapis.jpg',
					type: 'image'
				},
				{
					id: 6,
					url: 'assets/images/ecommerce/never-stop-changing.jpg',
					type: 'image'
				},
				{
					id: 7,
					url: 'assets/images/ecommerce/reaching.jpg',
					type: 'image'
				},
				{
					id: 8,
					url: 'assets/images/ecommerce/morain-lake.jpg',
					type: 'image'
				},
				{
					id: 9,
					url: 'assets/images/ecommerce/yosemite.jpg',
					type: 'image'
				}
			],
			priceTaxExcl: 9.309,
			priceTaxIncl: 10.24,
			taxRate: 10,
			comparedPrice: 19.9,
			quantity: 3,
			sku: 'A445BV',
			width: '22cm',
			height: '24cm',
			depth: '15cm',
			weight: '3kg',
			extraShippingFee: 3.0,
			active: true
		},
		{
			id: '2',
			type: 'bus',
			name: 'I65-MMC Indoor',
			issue: 'critical',
			handle: 'a-walk-amongst-friends-canvas-print',
			description:
				'Officia amet eiusmod eu sunt tempor voluptate laboris velit nisi amet enim proident et. Consequat laborum non eiusmod cillum eu exercitation. Qui adipisicing est fugiat eiusmod esse. Sint aliqua cupidatat pariatur mollit ad est proident reprehenderit. Eiusmod adipisicing laborum incididunt sit aliqua ullamco.',
			categories: ['Canvas Print', 'Nature'],
			tags: ['canvas-print', 'nature'],
			featuredImageId: 1,
			images: [
				{
					id: 0,
					url: 'assets/images/ecommerce/a-walk-amongst-friends.jpg',
					type: 'image'
				},
				{
					id: 1,
					url: 'assets/images/ecommerce/braies-lake.jpg',
					type: 'image'
				},
				{
					id: 2,
					url: 'assets/images/ecommerce/fall-glow.jpg',
					type: 'image'
				},
				{
					id: 3,
					url: 'assets/images/ecommerce/first-snow.jpg',
					type: 'image'
				},
				{
					id: 4,
					url: 'assets/images/ecommerce/lago-di-braies.jpg',
					type: 'image'
				},
				{
					id: 5,
					url: 'assets/images/ecommerce/lago-di-sorapis.jpg',
					type: 'image'
				},
				{
					id: 6,
					url: 'assets/images/ecommerce/never-stop-changing.jpg',
					type: 'image'
				},
				{
					id: 7,
					url: 'assets/images/ecommerce/reaching.jpg',
					type: 'image'
				},
				{
					id: 8,
					url: 'assets/images/ecommerce/morain-lake.jpg',
					type: 'image'
				},
				{
					id: 9,
					url: 'assets/images/ecommerce/yosemite.jpg',
					type: 'image'
				}
			],
			priceTaxExcl: 9.309,
			priceTaxIncl: 10.24,
			taxRate: 10,
			comparedPrice: 19.9,
			quantity: 3,
			sku: 'A445BV',
			width: '22cm',
			height: '24cm',
			depth: '15cm',
			weight: '3kg',
			extraShippingFee: 3.0,
			active: true
		},
		{
			id: '3',
			type: 'bus',
			name: 'I65-MMC Outdoor',
			issue: 'normal',
			handle: 'a-walk-amongst-friends-canvas-print',
			description:
				'Officia amet eiusmod eu sunt tempor voluptate laboris velit nisi amet enim proident et. Consequat laborum non eiusmod cillum eu exercitation. Qui adipisicing est fugiat eiusmod esse. Sint aliqua cupidatat pariatur mollit ad est proident reprehenderit. Eiusmod adipisicing laborum incididunt sit aliqua ullamco.',
			categories: ['Canvas Print', 'Nature'],
			tags: ['canvas-print', 'nature'],
			featuredImageId: 1,
			images: [
				{
					id: 0,
					url: 'assets/images/ecommerce/a-walk-amongst-friends.jpg',
					type: 'image'
				},
				{
					id: 1,
					url: 'assets/images/ecommerce/braies-lake.jpg',
					type: 'image'
				},
				{
					id: 2,
					url: 'assets/images/ecommerce/fall-glow.jpg',
					type: 'image'
				},
				{
					id: 3,
					url: 'assets/images/ecommerce/first-snow.jpg',
					type: 'image'
				},
				{
					id: 4,
					url: 'assets/images/ecommerce/lago-di-braies.jpg',
					type: 'image'
				},
				{
					id: 5,
					url: 'assets/images/ecommerce/lago-di-sorapis.jpg',
					type: 'image'
				},
				{
					id: 6,
					url: 'assets/images/ecommerce/never-stop-changing.jpg',
					type: 'image'
				},
				{
					id: 7,
					url: 'assets/images/ecommerce/reaching.jpg',
					type: 'image'
				},
				{
					id: 8,
					url: 'assets/images/ecommerce/morain-lake.jpg',
					type: 'image'
				},
				{
					id: 9,
					url: 'assets/images/ecommerce/yosemite.jpg',
					type: 'image'
				}
			],
			priceTaxExcl: 9.309,
			priceTaxIncl: 10.24,
			taxRate: 10,
			comparedPrice: 19.9,
			quantity: 3,
			sku: 'A445BV',
			width: '22cm',
			height: '24cm',
			depth: '15cm',
			weight: '3kg',
			extraShippingFee: 3.0,
			active: true
		}
	]
};

mock.onGet('/api/m-devices-app/products').reply(() => {
	return [200, deviceDB.products];
});

mock.onPost('/api/m-devices-app/remove-products').reply(request => {
	const { productIds } = JSON.parse(request.data);
	deviceDB.products = deviceDB.products.filter(product => !productIds.includes(product.id));
	return [200, productIds];
});

mock.onPost('/api/m-devices-app/remove-product').reply(request => {
	const { id } = JSON.parse(request.data);
	deviceDB.products = deviceDB.products.filter(product => id !== product.id);
	return [200, id];
});

mock.onGet('/api/m-devices-app/product').reply(request => {
	const { productId } = request.params;
	const response = _.find(deviceDB.products, { id: productId });
	return [200, response];
});

mock.onPost('/api/m-devices-app/product/save').reply(request => {
	const data = JSON.parse(request.data);
	let product = null;

	deviceDB.products = deviceDB.products.map(_product => {
		if (_product.id === data.id) {
			product = data;
			return product;
		}
		return _product;
	});

	if (!product) {
		product = data;
		deviceDB.products = [...deviceDB.products, product];
	}

	return [200, product];
});

mock.onGet('/api/m-devices-app/orders').reply(() => {
	return [200, deviceDB.orders];
});

mock.onPost('/api/m-devices-app/remove-orders').reply(request => {
	const { orderIds } = JSON.parse(request.data);
	deviceDB.orders = deviceDB.orders.filter(order => !orderIds.includes(order.id));
	return [200, orderIds];
});

mock.onGet('/api/m-devices-app/order').reply(request => {
	const { orderId } = request.params;
	const response = _.find(deviceDB.orders, { id: orderId });
	return [200, response];
});
