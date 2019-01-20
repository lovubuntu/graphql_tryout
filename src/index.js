const {GraphQLServer} = require('graphql-yoga');
const {prisma} = require('./generated/prisma-client');

const resolvers = {
	Query: {
		info: () => 'The information u r looking for',
		staticText: () => 'Static Text',
		feed: (root, args, context) => context.prisma.links()
	},

	Link: {
		id: (parent) => parent.id,
		description: (parent) => parent.description,
		url: (parent) => parent.url
	},

	Mutation: {
		post: (parent, args, context) => {
			const link = {
				description: args.description,
				url: args.url
			};
			return context.prisma.createLink(link);
		},

		update: (parent, args) => {
			const link = links.find(l => l.id === args.id);
			link.description = args.description;
			link.url = args.url;
			return link;
		},

		delete: (parent, args) => {
			const linkIndex = links.findIndex(l => l.id === args.id);
			console.log(linkIndex, args.id, parent, 'deleting', links);
			return linkIndex === -1 ? {} : links.splice(linkIndex, 1)[0];
		}
	}
}

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
	context: {prisma}
});

server.start(() => console.log('Here I come to world of graphql. Head to http://localhost:4000... Now!'));
