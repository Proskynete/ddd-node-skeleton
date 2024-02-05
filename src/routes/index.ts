/* eslint-disable @typescript-eslint/no-var-requires */
import { Router } from 'express';
import { globSync } from 'glob';

export const registerRoutes = (router: Router) => {
  const routes = globSync(__dirname + '/**/*.route.*');
  routes.map(route => register(route, router));
};

const register = (routePath: string, router: Router) => {
  const route = require(routePath);
  route.register(router);
};
