import knex from 'knex';

export const dbconn = knex({
	client: 'mysql2',
	connection: {
		host: '127.0.0.1',
		port: 3306,
		user: 'root',
		password: 'root',
		database: 'autenticador',
	},
});
