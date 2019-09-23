import { generatePath } from 'react-router-dom';

// TODO: This is an example routes
interface BaseRoutes {
  list: string;
  edit: string | ((id: number) => string);
}

const baseRoutes: BaseRoutes = {
  list: '/',
  edit: '/:id',
};

interface SwitchRoutes extends BaseRoutes {}

export const switchRoutes: SwitchRoutes = {
  ...baseRoutes,
};

interface LinkRoutes extends BaseRoutes {
  edit: (id: number) => string;
}

export const linkRoutes: LinkRoutes = {
  ...baseRoutes,
  edit: id => generatePath(baseRoutes.edit, { id }),
};
