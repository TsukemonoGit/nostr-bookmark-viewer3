enum TextPartType {
  Text = 'text',
  URL = 'url',
  Emoji = 'emoji',
  Image = 'image',
  Newline = 'newline',
  Nostr = 'nostr',
  Space = 'space',
  Quote = 'quote',
  Hashtag='hashtag'
}

export interface TextPart {
  content: string;
  type: TextPartType;
  url?: string;

  number?: number;
}
const emojiRegex = /(:[^:\s]+:)/;

const urlRegex = /(https?:\/\/+[^\s"'<`\]\)]+[^\s"'<`:\].\)]+)/;
const imageRegex = /\.(?:jpg|jpeg|png|gif|webp)$/i;

const linesRegex = /(\r\n|\n|\r)/;

const nostrRegex2 = /(nostr:[A-Za-z0-9]+)/; // 「+」を追加して1文字以上の文字列にマッチするように修正

const numberRegex = /(#\[\d+\])/i;
//const hashtagRegex = /(#[A-Za-z0-9|\p{Hiragana}|\p{Katakana}|\p{Han}]+)/;

export async function extractTextParts(text: string, tags: string[][]) {
  //とりあえずタグに絵文字タグがある場合とない場合でわけておく（いらんかも
  const emoji = tags.filter((item) => item[0] === 'emoji');
  //  const emojiPatterns = tags.map(tag => `:${tag[1]}:`).join('|');
  // const emojiRegex = new RegExp(`(${emojiPatterns})`, 'u');

  const hashTag = tags.filter((item) => item[0] === 't');
   // タグを長さの降順で並び替え
  hashTag.sort((a, b) => b[1].length - a[1].length);
  const hashTagPatterns = hashTag.map(tag => `#${tag[1]}`).join('|');
  const hashtagRegex = new RegExp(`(${hashTagPatterns})`, 'u');
  //console.log(emoji);
  let regexPatterns: string[] = [];

  if (emoji.length > 0) {
    regexPatterns.push(emojiRegex.source);
  }
  if (hashTag.length > 0) {
   regexPatterns.push(hashtagRegex.source);
}
  regexPatterns.push(nostrRegex2.source);
  regexPatterns.push(urlRegex.source);
  regexPatterns.push(imageRegex.source);

  regexPatterns.push(linesRegex.source);
  regexPatterns.push(numberRegex.source);
 

  const regex = new RegExp(regexPatterns.join('|'), 'g');

  const words: string[] = text.split(regex || ' ');

  //console.log(words);
  const parts: TextPart[] = [];

  //分割された各ワードについて振り分け分けする
  let index = 0;

  for (let word of words) {
    if (word !== undefined) {
      //console.log(word);
      if (word.match(nostrRegex2)) {
        const index = word.indexOf('nostr:');
        const textContent = word.slice(0, index);
        const nostrContent = word.slice(index);

        parts.push({
          content: textContent,
          type: TextPartType.Text,
        });

        parts.push({
          content: nostrContent,
          type: TextPartType.Nostr,
          url: nostrContent.slice(6),
        });
      } else if (emoji.length > 0 && word.match(emojiRegex)) {
        const url = emoji.find((item) => `:${item[1]}:` === word)?.[2];
        if (url) {
          parts.push({
            content: word,
            type: TextPartType.Emoji,
            url: url,
          });
        } else {
          parts.push({
            content: word,
            type: TextPartType.Text,
          });
        }
      } else if (isValidUrl(word)) {
        if (word.match(urlRegex)) {
          if (word.match(imageRegex)) {
            parts.push({
              content: word,
              type: TextPartType.Image,
            });
          } else {
            parts.push({
              content: word,
              type: TextPartType.URL,
            });
          }
        } else {
          parts.push({
            content: word,
            type: TextPartType.URL,
          });
        }
      }
       else if (word.match(linesRegex)) {
        parts.push({
          content: 'Newline',
          type: TextPartType.Newline,
        });
      } else if (word.match(numberRegex)) {
        parts.push({
          content: word,
          type: TextPartType.Quote,

          number: parseInt(word.slice(2, -1)),
        });
      }  else if (hashTag.length>0 && word.match(hashtagRegex)) {
        const tag = hashTag.find((item) => `#${item[1]}` === word);
        if (tag) {
           parts.push({
              content: word,
              type: TextPartType.Hashtag,
            });
          } else {
            parts.push({
              content: word,
              type: TextPartType.Text,
            });
          
        }
      }else {
        parts.push({
          content: word,
          type: TextPartType.Text,
        });
      }
      index++;
    }
  }

  //console.log(parts);

  return parts;
}

function isValidUrl(string: string) {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  try {
    new URL(string);
    return urlRegex.test(string);
  } catch (err) {
    return false;
  }
}
