const {GraphQLServer} = require('graphql-yoga');
const {links} = require('./links');

let currentId = 1;

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
	},

	Mutation: {
		post: (parent, args) => {
			const link = {
				id: ++currentId,
				description: args.description,
				url: args.url
			};
			links.push(link);
			return link;
		},

		update: (parent, args) => {
			const link = links.find(l => l.id === args.id);
			link.description = args.description;
			link.url = args.url;
			return link;
		}
	}
}

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers
});

server.start(() => console.log('Here I come to world of graphql. Head to http://localhost:4000... Now!'));
