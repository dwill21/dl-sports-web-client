// Taken from https://gist.github.com/hucancode/5b495aabf75fc3b940df3e5f94d5b927
const flattenArray = (obj) => obj.map(flatten);
const flattenData = (obj) => flatten(obj.data);

const flattenAttributes = (obj) => {
  const attrs = {};
  for (const key in obj.attributes) {
    attrs[key] = flatten(obj.attributes[key]);
  }
  if (obj.id) {
    attrs.id = obj.id
  }
  return attrs;
}

const flatten = (obj) => {
  if (Array.isArray(obj)) {
    return flattenArray(obj);
  }
  if (obj?.data) {
    return flattenData(obj);
  }
  if (obj?.attributes) {
    return flattenAttributes(obj);
  }
  return obj;
}

export { flatten };
