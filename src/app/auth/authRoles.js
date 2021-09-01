/**
 * Authorization Roles
 */
const authRoles = {
	admin: ['admin'],
	orgAdmin: ['admin'],
	staff: ['admin', 'staff'],
	user: ['admin', 'staff', 'user'],
	onlyGuest: []
};

export default authRoles;
