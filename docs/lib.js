const GOOGLE_NEWS_HOST = "news.google.com";
const GOOGLE_NEWS_SEARCH_PATH = "/search";
const URL_LIKE_PATTERN = /^[a-z][a-z\d+.-]*:\/\//i;

export function parseInput(value, currentSettings) {
  const input = value.trim();

  if (!input) {
    throw new Error("検索文字列または URL を入力してください。");
  }

  if (!URL_LIKE_PATTERN.test(input)) {
    return { query: input, ...validateSettings(currentSettings) };
  }

  let url;
  try {
    url = new URL(input);
  } catch {
    throw new Error("正しい URL を入力してください。");
  }

  if (url.protocol !== "https:" || url.hostname !== GOOGLE_NEWS_HOST) {
    throw new Error("https://news.google.com の検索 URL を入力してください。");
  }

  if (url.pathname.replace(/\/$/, "") !== GOOGLE_NEWS_SEARCH_PATH) {
    throw new Error("Google ニュースの検索結果 URL を入力してください。");
  }

  const query = url.searchParams.get("q")?.trim();
  if (!query) {
    throw new Error("検索結果 URL に検索条件 q がありません。");
  }

  return {
    query,
    ...validateSettings({
      hl: url.searchParams.get("hl") || currentSettings.hl,
      gl: url.searchParams.get("gl") || currentSettings.gl,
      ceid: url.searchParams.get("ceid") || currentSettings.ceid,
    }),
  };
}

export function buildRssUrl(values) {
  const query = values.query.trim();
  if (!query) {
    throw new Error("検索文字列または URL を入力してください。");
  }

  const settings = validateSettings(values);
  const params = new URLSearchParams({ q: query, ...settings });

  return `https://${GOOGLE_NEWS_HOST}/rss/search?${params.toString()}`;
}

function validateSettings(settings) {
  const hl = settings.hl.trim();
  const gl = settings.gl.trim().toUpperCase();
  const ceid = settings.ceid.trim();

  if (!/^[a-z]{2,3}(?:-[A-Z]{2})?$/i.test(hl)) {
    throw new Error("言語コードは ja または en-US の形式で入力してください。");
  }
  if (!/^[A-Z]{2}$/.test(gl)) {
    throw new Error("国コードは JP のような2文字で入力してください。");
  }
  if (!/^[A-Z]{2}:[a-z]{2,3}(?:-[A-Z]{2})?$/i.test(ceid)) {
    throw new Error("エディションは JP:ja の形式で入力してください。");
  }

  return { hl, gl, ceid };
}
