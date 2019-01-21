async function feed(parent, args, context) {
	const where = args.filter ? {
		OR: [
			{url_contains: args.filter},
			{description_contains: args.filter}
		]
	} : {};
	const links = await context.prisma.links({
		where,
		skip: args.skip,
		first: args.first,
		orderBy: args.orderBy
	});
	const count = await context.prisma
		.linksConnection({where})
		.aggregate()
		.count();
	return {
		count,
		links
	}
}

module.exports = {
	feed
}