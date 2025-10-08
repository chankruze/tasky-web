type ExtractRouteParams<T extends string> =
  T extends `${string}:${string}/${infer Rest}`
    ? [string, ...ExtractRouteParams<`/${Rest}`>]
    : T extends `${string}:${string}`
    ? [string]
    : [];

const defineRoute = <T extends string>(template: T) => {
  type Params = ExtractRouteParams<T>;

  return {
    template,
    path: (...args: Params) => {
      const keys = template.match(/:[^/]+/g) || [];
      if (keys.length !== args.length) {
        throw new Error(
          `Expected ${keys.length} argument(s) for route "${template}", but got ${args.length}`
        );
      }
      return keys.reduce((acc, key, i) => acc.replace(key, args[i]), template);
    },
  };
};

const routes = {
  root: "/",
  tasks: {
    index: "/tasks",
    task: {
      index: defineRoute("/tasks/:taskId"),
    },
  },
  settings: {
    index: "/settings",
    general: "/settings/general",
    advanced: "/settings/advanced",
    about: "/settings/about",
  },
};

export default routes;