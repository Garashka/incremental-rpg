// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sample(array: any[]) {
  return array[Math.floor(Math.random() * array.length)];
}
