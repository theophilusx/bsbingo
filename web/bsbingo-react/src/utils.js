export function partition(size, data) {
  let result = [];
  let group = [];
  for (let i = 0; i < data.length; i++) {
    group.push(data[i]);
    if (group.length % size === 0) {
      result.push(group);
      group = [];
    }
  }
  if (group.length) {
    result.push(group);
  }
  return result;
}
