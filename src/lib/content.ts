enum TextPartType {
  Text = 'text',
  URL = 'url',
  Emoji = 'emoji',
  Image = 'image',
  Newline = 'newline',
  Nostr = 'nostr',
  Space = 'space',
  Quote = 'quote',
}

export interface TextPart {
  content: string;
  type: TextPartType;
  url?: string;
  // marquee?: string;
  // beforeSpace?: number;
  number?: number;
  //afterSpace?: number;
}
const emojiRegex = /(:[^:\s]+:)/;

//const urlRegex = /(?:https?:\/\/[^\s"'<`:\].\)]+(?:\/[^\s"'<`:\].\)]*)?)(?!\S)/;
const urlRegex = /(https?:\/\/+[^\s"'<`\]\)]+[^\s"'<`:\].\)]+)/;
const imageRegex = /\.(?:jpg|jpeg|png|gif|webp)$/i;
// const marqueeInRegex = /(<marquee\b[^>]*>)/i;
// const marqueeOutRegex = /(<\/marquee>)/i;
const linesRegex = /(\r\n|\n|\r)/;
//const spaceRegex = /(\\s+)/;
//const spaceRegex = /(\s+)/;
// const nostrRegex = /(nostr:[A-Za-z0-9]+(?= |　))/;
const nostrRegex2 = /(nostr:[A-Za-z0-9]+)/; // 「+」を追加して1文字以上の文字列にマッチするように修正

const numberRegex = /(#\[\d+\])/i;

//const nostrRegex = /(nostr:[^ ]+(?= |　))/; //nostr:で始まって半角スペースか全角スペースまで
export async function extractTextParts(text: string, tags: string[][]) {
  //とりあえずタグに絵文字タグがある場合とない場合でわけておく（いらんかも
  const emoji = tags.filter((item) => item[0] === 'emoji');

  //console.log(emoji);
  let regexPatterns: string[] = [];

  if (emoji.length > 0) {
    regexPatterns.push(emojiRegex.source);
  }
  //regexPatterns.push(marqueeOutRegex.source);
  regexPatterns.push(nostrRegex2.source);
  regexPatterns.push(urlRegex.source);
  regexPatterns.push(imageRegex.source);
  //regexPatterns.push(marqueeInRegex.source);

  //regexPatterns.push(spaceRegex.source); //スペースで区切る
  //regexPatterns.push(marqueeRegex.source);
  regexPatterns.push(linesRegex.source);
  regexPatterns.push(numberRegex.source);
  const regex = new RegExp(regexPatterns.join('|'), 'g');

  const words: string[] = text.split(regex || ' ');

  //console.log(words);
  const parts: TextPart[] = [];
  //let marquee: number | undefined = undefined;
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
          //marquee: '',
        });

        parts.push({
          content: nostrContent,
          type: TextPartType.Nostr,
          url: nostrContent.slice(6),
          // marquee: '',
        });
      } else if (emoji.length > 0 && word.match(emojiRegex)) {
        const url = emoji.find((item) => `:${item[1]}:` === word)?.[2];
        if (url) {
          parts.push({
            content: word,
            type: TextPartType.Emoji,
            url: url,
            //  marquee: '',
          });
        } else {
          parts.push({
            content: word,
            type: TextPartType.Text,
            //  marquee: '',
          });
        }
      } else if (isValidUrl(word)) {
        if (word.match(urlRegex)) {
          if (word.match(imageRegex)) {
            parts.push({
              content: word,
              type: TextPartType.Image,
              // marquee: '',
            });
          } else {
            parts.push({
              content: word,
              type: TextPartType.URL,
              //   marquee: '',
            });
          }
        } else {
          parts.push({
            content: word,
            type: TextPartType.URL,
            //   marquee: '',
          });
        }
        // } else if (word.match(marqueeInRegex)) {
        //   marquee = index;
        //   parts.push({
        //     content: word,
        //     type: TextPartType.Text,
        //     marquee: "",
        //   });
        //   //   console.log(marquee);
        // } else if (word.match(marqueeOutRegex) && marquee != undefined) {
        //   //いんでっくすからいまのいんでっくすまでにmarquee要素を追加する

        //   //間に文字がなかったらおわり
        //   if (marquee + 1 !== index) {
        //     //marquee自体はマーキータグだから除外
        //     parts[marquee].content = "";

        //     //マーキーの中身
        //     //マーキーの中身の長さ
        //     let mlength = 0;
        //     for (let idx = marquee + 1; idx < index; idx++) {
        //       // console.log(parts[idx]);

        //       parts[idx].marquee = "marquee";
        //       if (mlength > 0) {
        //         parts[idx].beforeSpace = mlength;
        //       }
        //       if (parts[idx].content !== "") {
        //         mlength = strBytes(parts[idx].content) + mlength;
        //         // mlength = parts[idx].content.length + mlength;
        //       } else if (parts[idx].type === TextPartType.Newline) {
        //         console.log("改行");
        //         mlength = 0;
        //       }
        //     }
        //     //  console.log(mlength);

        //     //今のタグ自体はマーキーと自タグだから除外
        //     parts.push({
        //       content: "",
        //       type: TextPartType.Text,
        //       marquee: "",
        //     });
        //     //リセット
        //     marquee = undefined;
        //   }
      } else if (word.match(linesRegex)) {
        parts.push({
          content: 'Newline',
          type: TextPartType.Newline,
          //  marquee: '',
        });
        // } else if (word.match(spaceRegex)) {
        //   parts.push({
        //     content: '',
        //     type: TextPartType.Space,
        //     //  marquee: '',
        //   });
      } else if (word.match(numberRegex)) {
        parts.push({
          content: word,
          type: TextPartType.Quote,
          //  marquee: '',
          number: parseInt(word.slice(2, -1)),
        });
      } else {
        parts.push({
          content: word,
          type: TextPartType.Text,
          //  marquee: '',
        });
      }
      index++;
    }
  }

  console.log(parts);

  return parts;
}

// function strBytes(str: string) {
//   var length = 0;
//   for (var i = 0; i < str.length; i++) {
//     var c = str.charCodeAt(i);
//     if (
//       (c >= 0x0 && c < 0x81) ||
//       c === 0xf8f0 ||
//       (c >= 0xff61 && c < 0xffa0) ||
//       (c >= 0xf8f1 && c < 0xf8f4)
//     ) {
//       //ローマ字のスペース幅を2にする
//       length += 2;
//     } else {
//       //日本語のスペース幅を4にする
//       length += 4;
//     }
//   }
//   return length;
// }

function isValidUrl(string: string) {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  try {
    new URL(string);
    return urlRegex.test(string);
  } catch (err) {
    return false;
  }
}
