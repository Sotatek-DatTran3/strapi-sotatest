/**
 * paper controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::paper.paper",
  ({ strapi }) => ({
    async findOne(ctx) {
      const { id } = ctx.params;

      const result = await strapi.service("api::paper.paper").findOne(id, {
        populate: {
          author: {
            fields: ["username", "email"],
          },
        },
      });

      const sanitizedEntity = await this.sanitizeOutput(result, ctx);

      return this.transformResponse(sanitizedEntity);
    },
  })
);
