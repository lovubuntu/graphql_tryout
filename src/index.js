const {GraphQLServer} = require('graphql-yoga');
const {links} = require('./links');

const typeDefs = `
	type Query {
		info: String!
		staticText: String
		feed: [Link!]!
	}

	type Link {
		id: ID!
		description: String!
		url: String
	}
`;

const resolvers = {
	Query: {
		info: () => 'The information u r looking for',
		staticText: () => 'Static Text',
		feed: () => links
	},

	Link: {
		id: (parent) => parent.id,
		description: (parent) => parent.description,
		url: (parent) => parent.url
	}
}

const server = new GraphQLServer({
	typeDefs,
	resolvers
});

server.start(() => console.log('Here I come to world of graphql. Head to http://localhost:4000... Now!'));
