import { mutation, query } from './_generated/server';
import { ConvexError, v } from 'convex/values';
import { paginationOptsValidator } from 'convex/server';

export const create = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError('unauthorized');
    }

    return await ctx.db.insert('documents', {
      title: args.title ?? 'untitled document',
      ownerId: user.subject,
      initialContent: args.initialContent,
    });
  },
});

export const getDocuments = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    return await ctx.db.query('documents').paginate(args.paginationOpts);
  },
});
