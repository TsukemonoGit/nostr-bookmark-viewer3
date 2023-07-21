import { extractTextParts } from './content';

test('FYI: nostreamはeventsテーブルにIPが記録されていますを渡したらFYI: nostreamはeventsテーブルにIPが記録されていますになること', () => {
  const result = extractTextParts(
    'FYI: nostreamはeventsテーブルにIPが記録されています',
    [],
  );
  expect(result);
});

test('bar: string', async () => {
  const result = await extractTextParts('bar: string', []);
  expect(result);
});

test('did:plc:ltazzlibzu4qn53vtsylhcbr', async () => {
  const result = await extractTextParts('did:plc:ltazzlibzu4qn53vtsylhcbr', []);
  expect(result);
});

test('nothello.studiokaiji.com', async () => {
  const result = await extractTextParts('nothello.studiokaiji.com', []);
  expect(result);
});

test('https://void.cat/d/WWFJntHqefiJNpvw6tykPg.webp', async () => {
  const result = await extractTextParts(
    'https://void.cat/d/WWFJntHqefiJNpvw6tykPg.webp',
    [],
  );
  expect(result);
});

// test('bar:', async () => {
//   const result = isValidUrl('bar:');
//   expect(result).toBe(false);
// });
