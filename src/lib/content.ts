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
const emojiRegex = /:[\w_]+:/g;
export async function extractTextParts(
  text: string,
  tags: string[][],
): Promise<TextPart[]> {
  const textParts: TextPart[] = [];

  let remainingText = text;
  let match: RegExpExecArray | null;

  while ((match = emojiRegex.exec(remainingText)) !== null) {
    const emojiStartIndex = match.index;
    const textBeforeEmoji = remainingText.substring(0, emojiStartIndex);
    const emojiContent = match[0];
    const matchingTag = tags.find((tag) => `:${tag[1]}:` === emojiContent);
    if (matchingTag) {
      const emojiEndIndex = emojiStartIndex + emojiContent.length;

      if (textBeforeEmoji) {
        textParts.push({
          content: textBeforeEmoji,
          type: TextPartType.Text,
        });
      }

      textParts.push({
        content: emojiContent,
        type: TextPartType.Emoji,
        url: matchingTag[2],
      });

      remainingText = remainingText.substring(emojiEndIndex);
      emojiRegex.lastIndex = 0; // ループのために正規表現のインデックスをリセット

      continue; // 次の絵文字を探すためにループを継続
    }
  }

  let lastIndex = 0;
  for await (const match of getUrlMatches(remainingText)) {
    const urlStartIndex = match.index;
    const urlEndIndex = urlStartIndex + match[0].length;
    const textBeforeUrl = remainingText.substring(lastIndex, urlStartIndex);
    const url = match[0];
    const isImage = /\.(?:jpg|jpeg|png|gif|webp)$/i.test(url);
    const partType = isImage ? TextPartType.Image : TextPartType.URL;
    textParts.push({ content: textBeforeUrl, type: TextPartType.Text });
    textParts.push({ content: url, type: partType });
    lastIndex = urlEndIndex;
  }

  const remainingTextAfterUrls = remainingText.substring(lastIndex);
  if (remainingTextAfterUrls) {
    textParts.push({
      content: remainingTextAfterUrls,
      type: TextPartType.Text,
    });
  }
  console.log(textParts);
  return textParts;
}

async function* getEmojiMatches(
  text: string,
): AsyncIterableIterator<RegExpExecArray> {
  const emojiRegex = /:[\w_]+:/g;
  let match: RegExpExecArray | null;

  while ((match = emojiRegex.exec(text)) !== null) {
    yield match;
  }
}

async function* getUrlMatches(
  text: string,
): AsyncIterableIterator<RegExpExecArray> {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  let match: RegExpExecArray | null;

  while ((match = urlRegex.exec(text)) !== null) {
    yield match;
  }
}
