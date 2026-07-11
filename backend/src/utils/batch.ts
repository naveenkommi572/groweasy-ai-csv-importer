export function createBatches<T>(
  data: T[],
  batchSize: number = 20
): T[][] {
  const batches: T[][] = [];

  for (let i = 0; i < data.length; i += batchSize) {
    batches.push(data.slice(i, i + batchSize));
  }

  return batches;
}