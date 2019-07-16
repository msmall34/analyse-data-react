export const NAMESPACES = {
  Param: "@param:",
  Result: "@result:",
};
const DEFAULT_ENGINE = sessionStorage;

export const setItem = (
  key,
  value,
  namespace = NAMESPACES.Param,
  engine = DEFAULT_ENGINE
) => engine.setItem(`${namespace}${key}`, JSON.stringify(value));

export const getItem = (
  key,
  namespace = NAMESPACES.Param,
  engine = DEFAULT_ENGINE
) => JSON.parse(engine.getItem(`${namespace}${key}`));
