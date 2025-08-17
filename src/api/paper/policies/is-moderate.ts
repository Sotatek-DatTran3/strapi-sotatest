/**
 * is-moderate policy
 */

export default (policyContext, config, { strapi }) => {
    // Add your own logic here.
    strapi.log.info('In is-moderate policy.');

    const canDoSomething = true;

    if (canDoSomething) {
      return true;
    }

    return false;
};
