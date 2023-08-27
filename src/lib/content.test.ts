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

test('<marquee>:partypowawave:</marquee>\n<marquee>:partypowawave:</marquee>\n<marquee>:partypowawave:</marquee>\n<marquee>:partypowawave:</marquee>\n', async () => {
  const result = await extractTextParts(
    '<marquee>:partypowawave:</marquee>\n<marquee>:partypowawave:</marquee>\n<marquee>:partypowawave:</marquee>\n<marquee>:partypowawave:</marquee>\n',
    [['emoji','partypowawave','url']],
  );
  expect(result);
});


test('test#もの画像\ntest', async () => {
  const result = await extractTextParts('test #もの画像\ntest', [['t','もの画像']]);
  expect(result);
});

test('test#もの画像\ntest', async () => {
  const result = await extractTextParts('#迷言画像\nhttps://void.cat/d/F7q5SRwRFLvEetJ9aJ2Vr9.png', [ [
            "e",
            "825b4681a55c1ad020b7cfbd558a37a62c4f5b7f67ec996f826efeb841dd7f9d",
            "",
            "reply"
        ],
        [
            "t",
            "迷言画像"
        ]]);
  expect(result);
});


test('test#もの画像\ntest', async () => {
  const result = await extractTextParts('ガーリックはだめ。\n#foodstr #catstr\n\nhttps://i.nostrimg.com/298746629d0e1576b294ec3f78a3f2fd8fe7e9c3f1828557a370e525a694574f/file.jpg\n\nhttps://i.nostrimg.com/f2c6e58421e1b8de127468d467a0b38de672df05b5b3e14dedf07bb81d38de4d/file.jpg\n\nhttps://i.nostrimg.com/d4b436ec9ca756f1e453ab3cc13d8ebf73abe220d0da7d891aab5774e0bb4372/file.jpg', [[
        
            "t",
            "foodstr"
        ],
        [
            "t",
            "foodstr"
        ],
        [
            "t",
            "catstr"
        ],
        [
            "t",
            "catstr"
        ],
        [
            "r",
            "https://i.nostrimg.com/298746629d0e1576b294ec3f78a3f2fd8fe7e9c3f1828557a370e525a694574f/file.jpg"
        ],
        [
            "r",
            "https://i.nostrimg.com/f2c6e58421e1b8de127468d467a0b38de672df05b5b3e14dedf07bb81d38de4d/file.jpg"
        ],
        [
            "r",
            "https://i.nostrimg.com/d4b436ec9ca756f1e453ab3cc13d8ebf73abe220d0da7d891aab5774e0bb4372/file.jpg"
        ]]);
  expect(result);
});



test('test#もの画像\ntest', async () => {
  const result = await extractTextParts('#823art #823chanart #illust #illustration \n記念日なので念願のホールカーキ丸かじりしちゃうやぶみちゃん https://cdn.nostr.build/i/3a2090d9ecdf2a0c526f3de01f58f0643802753ab376c927453ba7b17d199a4f.png', [   [
            "imeta",
            "url https://cdn.nostr.build/i/3a2090d9ecdf2a0c526f3de01f58f0643802753ab376c927453ba7b17d199a4f.png",
            "blurhash erO;C_nhtkR5i_yskWozkDaynga#RPozbckXRPV@oej?adf,ogj]j[",
            "dim 2048x2048"
        ],
        [
            "t",
            "823art"
        ],
        [
            "t",
            "823chanart"
        ],
        [
            "t",
            "illust"
        ],
        [
            "t",
            "illustration"
        ]]);
  expect(result);
});