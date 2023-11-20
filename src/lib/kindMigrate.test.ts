import { kindMigrate } from './kindMigrate';

test('note', async () => {
  const result = await kindMigrate(
    '84b0c46ab699ac35eb2ca286470b85e081db2087cdef63932236c397417782f5',
  );
  console.log(result);
  expect(result);
});
