import test from "node:test";
import assert from "node:assert/strict";

import { buildRssUrl, parseInput } from "../docs/lib.js";

const defaults = { hl: "ja", gl: "JP", ceid: "JP:ja" };

test("検索クエリを日本向け RSS URL に変換する", () => {
  const result = parseInput("生成AI 半導体", defaults);

  assert.deepEqual(result, {
    query: "生成AI 半導体",
    hl: "ja",
    gl: "JP",
    ceid: "JP:ja",
  });
  assert.equal(
    buildRssUrl(result),
    "https://news.google.com/rss/search?q=%E7%94%9F%E6%88%90AI+%E5%8D%8A%E5%B0%8E%E4%BD%93&hl=ja&gl=JP&ceid=JP%3Aja",
  );
});

test("Google ニュース検索 URL から検索条件を抽出する", () => {
  const result = parseInput(
    "https://news.google.com/search?q=%E7%94%9F%E6%88%90AI&hl=en-US&gl=US&ceid=US:en",
    defaults,
  );

  assert.deepEqual(result, {
    query: "生成AI",
    hl: "en-US",
    gl: "US",
    ceid: "US:en",
  });
});

test("URL にない地域設定は現在値を維持する", () => {
  const result = parseInput("https://news.google.com/search?q=AI", defaults);

  assert.deepEqual(result, { query: "AI", ...defaults });
});

test("空入力を拒否する", () => {
  assert.throws(() => parseInput("   ", defaults), /検索文字列または URL/);
});

test("不正な URL を拒否する", () => {
  assert.throws(() => parseInput("https://%", defaults), /正しい URL/);
});

test("Google ニュース以外の URL を拒否する", () => {
  assert.throws(
    () => parseInput("https://example.com/search?q=AI", defaults),
    /news\.google\.com/,
  );
});

test("通常の Google 検索 URL を拒否する", () => {
  assert.throws(
    () => parseInput("https://www.google.com/search?q=AI&tbm=nws", defaults),
    /news\.google\.com/,
  );
});

test("検索条件 q がない URL を拒否する", () => {
  assert.throws(
    () => parseInput("https://news.google.com/search?hl=ja", defaults),
    /q がありません/,
  );
});

test("対象外の Google ニュース URL を拒否する", () => {
  assert.throws(
    () => parseInput("https://news.google.com/home?q=AI", defaults),
    /検索結果 URL/,
  );
});

test("地域設定の形式を検証する", () => {
  assert.throws(
    () => buildRssUrl({ query: "AI", hl: "ja", gl: "JPN", ceid: "JP:ja" }),
    /国コード/,
  );
  assert.throws(
    () => buildRssUrl({ query: "AI", hl: "ja", gl: "JP", ceid: "JP-ja" }),
    /エディション/,
  );
});
