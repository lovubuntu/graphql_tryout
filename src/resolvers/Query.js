async function feed(parent, args, context) {
	const where = args.filter ? {
		OR: [
			{url_contains: args.filter},
			{description_contains: args.filter}
		]
	} : {};
	return await context.prisma.links({
		where,
		skip: args.skip,
		first: args.first,
		orderBy: args.orderBy
	});
}

module.exports = {
	feed
}