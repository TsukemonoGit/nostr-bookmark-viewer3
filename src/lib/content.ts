enum TextPartType {
  Text = "text",
  URL = "url",
  Emoji = "emoji",
  Image = "image",
}

export interface TextPart {
  content: string;
  type: TextPartType;
  url?: string;
}
const emojiRegex = /(:[^:\s]+:)/;
const urlRegex = /(https?:\/\/[^\s]+)/;
const imageRegex = /\.(?:jpg|jpeg|png|gif|webp)$/i;

//const marqueeRegex = /<marquee\b[^>]*>(.*?)<\/marquee>/;

export async function extractTextParts(
  text: string,
  tags: string[][],
) {
  //とりあえずタグに絵文字タグがある場合とない場合でわけておく（いらんかも
  const emoji = tags.filter((item) => item[0] === "emoji");
  // console.log(emoji);
  let regexPatterns: string[] = [];

  if (emoji.length > 0) {
    regexPatterns.push(emojiRegex.source);
  }
  regexPatterns.push(urlRegex.source);
  regexPatterns.push(imageRegex.source);

  const regex = new RegExp(regexPatterns.join("|"), "g");

  const words: string[] = text.split(regex);
  // console.log(words);
  const parts: TextPart[] = [];
  //分割された各ワードについて振り分け分けする
  for (const word of words) {
    if (word !== undefined) {
      if (word.match(emojiRegex)) {
        const url = emoji.find((item) => `:${item[1]}:` === word)?.[2];
        parts.push({
          content: word,
          type: TextPartType.Emoji,
          url: url,
        });
      } else if (word.match(urlRegex)) {
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
          type: TextPartType.Text,
        });
      }
    }
  }
  return parts;
}
