import { extractTextParts } from './content';

test('FYI: nostreamはeventsテーブルにIPが記録されていますを渡したらFYI: nostreamはeventsテーブルにIPが記録されていますになること', () => {
  const result = extractTextParts(
    'FYI: nostreamはeventsテーブルにIPが記録されています',
    [],
  );
  expect(result);
});
