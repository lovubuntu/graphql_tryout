const {GraphQLServer} = require('graphql-yoga');
const {prisma} = require('./generated/prisma-client');
const resolvers = require('./resolvers');

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
	context: request => {
		return {
			prisma,
			...request
		};
	}
});

server.start(() => console.log('Here I come to world of graphql. Head to http://localhost:4000... Now!'));
