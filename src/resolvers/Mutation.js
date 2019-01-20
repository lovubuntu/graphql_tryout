const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {APP_SECRET, getUserId} = require('../utils');

async function signup(parent, args, context, info) {
	const password = await bcrypt.hash(args.password, 10);
	const user = await context.prisma.createUser({...args, password});
	const token = jwt.sign({userId: user.id}, APP_SECRET);
	return {
		token,
		user
	}
}

async function login(parent, args, context, info) {
	const user = await context.prisma.user({email: args.email});
	if (!user) {
		throw new Error('No User found');
	}

	const validPassword = bcrypt.compare(args.password, user.password);
	if(!validPassword) {
		throw new Error('Invalid password');
	}

	const token = jwt.sign({userId: user.id}, APP_SECRET);
	return {
		token,
		user
	}
}

function post(parent, args, context) {
	const userId = getUserId(context);
	const link = {
		description: args.description,
		url: args.url,
		postedBy: {connect: {id: userId}}
	};
	return context.prisma.createLink(link);
};

function update(parent, args) {
	const link = context.prisma.link({id: args.id});
	link.description = args.description;
	link.url = args.url;
	return link;
};

function deletePost(parent, args) {
	const linkIndex = links.findIndex(l => l.id === args.id);
	console.log(linkIndex, args.id, parent, 'deleting', links);
	return linkIndex === -1 ? {} : links.splice(linkIndex, 1)[0];
}

module.exports = {
	post,
	update,
	deletePost,
	signup,
	login
}
