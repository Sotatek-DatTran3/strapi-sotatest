import { Core } from "@strapi/strapi";

export default (config: any, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx, next) => {
    const user = ctx.state.user;
    const entryId = ctx.params.id;

    let entry;
    if (entryId) {
      entry = await strapi
        .service("api::paper.paper")
        .findOne(entryId, { populate: ["author"] });
    }

    if (!entry || !entry.author || user.id !== entry.author.id) {
      ctx.unauthorized("You are not the owner of this entry hehe");
      return;
    }

    await next();
  };
};
