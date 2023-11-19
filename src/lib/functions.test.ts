import { checkInput } from './functions';

test('note', async () => {
  const result = await checkInput(
    'note1kqlpxtrdkske75ay3njs30acvejp2uw8878hjlr74gmz43dttu5qxevv05',
  );
  console.log(result);
  expect(result);
});

test('naddr', async () => {
  const result = await checkInput(
    'nostr:naddr1qq2yyun0vd3k7unffehhxarj2e5kcmrpvajsygx82c306alln2swpt5myylaqctsjsyqwpjan9lfc28l3fn6ndnwr5psgqqqw4rs5eenxl',
  );
  console.log(result);
  expect(result);
});

test('適当', async () => {
  const result = await checkInput(
    'yyun0vd3k7unffehhxarj2e5kcmrpvajsygx82c306alln2swpt5myylaqctsjsyqwpjan9lfc28l3fn6ndnwr5psgqqqw4rs5eenxl',
  );
  console.log(result);
  expect(result);
});
