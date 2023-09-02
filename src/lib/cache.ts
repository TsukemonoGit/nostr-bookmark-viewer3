// Service Workerから画像を取得するための関数
export async function getUserIcon(url: string, path: string): Promise<string> {
  const urlParts = new URL(url);
  const imagePath = urlParts.origin + urlParts.pathname; // ドメインとパス部分を結合

  //console.log(imagePath);
  const imageName = generateCacheName(imagePath);

  const cache = await caches.open('user-icon-cache-v1');
  const response = await cache.match(`${path}/usericon/${imageName}`);

  if (response) {
    //console.log(response);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } else {
    try {
      // キャッシュされていない場合は、元のURLにリクエストしてキャッシュに保存
      const fetchResponse = await fetch(imagePath);

      if (fetchResponse.ok) {
        cache.put(`${path}/usericon/${imageName}`, fetchResponse.clone());
        const blob = await fetchResponse.blob();
        return URL.createObjectURL(blob);
      } else {
        // もしリクエストが失敗した場合は、元のURLを返す
        return imagePath;
      }
    } catch (error) {
      // CORSエラーなどでリクエストが失敗した場合は、元のURLを返す
      return imagePath;
    }
  }
}

function generateCacheName(url: string) {
  // URLをハッシュ化して一意なキャッシュ名を生成
  const hash = generateHash(url);
  const extension = getFileExtension(url);
  return `image-${hash}.${extension}`;
}

function generateHash(input: string) {
  // ここではシンプルに文字列をハッシュ化する例を示しますが、実際のアプリケーションではより強力なハッシュ関数を使用することが推奨されます。
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash;
}

function getFileExtension(url: string) {
  // URLからファイルの拡張子を取得
  const segments = url.split('.');
  return segments[segments.length - 1];
}
