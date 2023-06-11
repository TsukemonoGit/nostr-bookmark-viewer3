enum TextPartType {
  Text = "text",
  URL = "url",
  Emoji = "emoji",
  Image = "image",
  Newline = "newline",
}

export interface TextPart {
  content: string;
  type: TextPartType;
  url?: string;
  marquee?: string;
  beforeSpace?: number;
  afterSpace?: number;
}
const emojiRegex = /(:[^:\s]+:)/;
const urlRegex = /(https?:\/\/[^\s":]+)/;
const imageRegex = /\.(?:jpg|jpeg|png|gif|webp)$/i;
const marqueeRegex = /(<marquee\b[^>]*>.*?<\/marquee>)/i;
const marqueeInRegex = /(<marquee\b[^>]*>)/i;
const marqueeOutRegex = /(<\/marquee>)/i;
const linesRegex = /(\r\n|\n|\r)/;

export async function extractTextParts(
  text: string,
  tags: string[][],
) {
  //とりあえずタグに絵文字タグがある場合とない場合でわけておく（いらんかも
  const emoji = tags.filter((item) => item[0] === "emoji");
  console.log(emoji);
  let regexPatterns: string[] = [];

  if (emoji.length > 0) {
    regexPatterns.push(emojiRegex.source);
  }
  regexPatterns.push(urlRegex.source);
  regexPatterns.push(imageRegex.source);
  regexPatterns.push(marqueeInRegex.source);
  regexPatterns.push(marqueeOutRegex.source);
  //regexPatterns.push(marqueeRegex.source);

  regexPatterns.push(linesRegex.source);
  const regex = new RegExp(regexPatterns.join("|"), "g");

  const words: string[] = text.split(regex);

  console.log(words);
  const parts: TextPart[] = [];
  let marquee: number | undefined = undefined;
  //分割された各ワードについて振り分け分けする
  let index = 0;
  //for (const word of words,index) {
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (word !== undefined) {
      if (emoji.length > 0 && word.match(emojiRegex)) {
        const url = emoji.find((item) => `:${item[1]}:` === word)?.[2];
        if (url) {
          parts.push({
            content: word,
            type: TextPartType.Emoji,
            url: url,
            marquee: "",
          });
        } else {
          parts.push({
            content: word,
            type: TextPartType.Text,
            marquee: "",
          });
        }
      } else if (word.match(urlRegex)) {
        if (word.match(imageRegex)) {
          parts.push({
            content: word,
            type: TextPartType.Image,
            marquee: "",
          });
        } else {
          parts.push({
            content: word,
            type: TextPartType.URL,
            marquee: "",
          });
        }
      } else if (word.match(marqueeInRegex)) {
        marquee = index;
        parts.push({
          content: word,
          type: TextPartType.Text,
          marquee: "",
        });
        console.log(marquee);
      } else if (word.match(marqueeOutRegex) && marquee != undefined) {
        //いんでっくすからいまのいんでっくすまでにmarquee要素を追加する

        //間に文字がなかったらおわり
        if (marquee + 1 !== index) {
          //marquee自体はマーキータグだから除外
          parts[marquee].content = "";

          //マーキーの中身
          //マーキーの中身の長さ
          let mlength = 0;
          for (let idx = marquee + 1; idx < index; idx++) {
            console.log(parts[idx]);

            parts[idx].marquee = "marquee";
            if (mlength > 0) {
              parts[idx].beforeSpace = mlength;
            }
            mlength = parts[idx].content.length;
          }
          console.log(mlength);
          for (let idx = marquee + 1; idx < index; idx++) {
            if (parts[idx].beforeSpace === undefined) {
              parts[idx].beforeSpace = 0;
            }
            parts[idx].afterSpace = parts[index - 1].content.length +
              parts[index - 1].beforeSpace - parts[idx].beforeSpace -
              parts[idx].content.length;
          }

          //今のタグ自体はマーキーと自タグだから除外
          parts.push({
            content: "",
            type: TextPartType.Text,
            marquee: "",
          });
          //リセット
          marquee = undefined;
        }
      } else if (word.match(linesRegex)) {
        parts.push({
          content: "",
          type: TextPartType.Newline,
          marquee: "",
        });
      } else {
        parts.push({
          content: word,
          type: TextPartType.Text,
          marquee: "",
        });
      }
      index++;
    }
  }
  console.log(parts);
  return parts;
}
