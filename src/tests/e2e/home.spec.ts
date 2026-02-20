import { test, expect } from '@playwright/test';

test.describe('ホームページ', () => {
  test('ページが正しく表示される', async ({ page }) => {
    await page.goto('/');

    // ヘッダーが表示されている
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(
      page.getByRole('heading', { name: /next starter/i })
    ).toBeVisible();

    // メインコンテンツが表示されている
    await expect(page.getByRole('main')).toBeVisible();

    // フッターが表示されている
    await expect(page.getByRole('contentinfo')).toBeVisible();
  });

  test('スキップリンクが機能する', async ({ page }) => {
    await page.goto('/');

    const skipLink = page.locator('.skip-link');

    // スキップリンクにフォーカスを当てる
    await skipLink.focus();
    await expect(skipLink).toBeFocused();

    // フォーカス時にスキップリンクが可視化される
    await expect(skipLink).toBeVisible();

    // Enterでメインコンテンツにジャンプ
    await page.keyboard.press('Enter');

    // メインコンテンツにフォーカスが移動
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeFocused();
  });

  test('ナビゲーションリンクが機能する', async ({ page }) => {
    await page.goto('/');

    // ナビゲーションが表示されている
    const nav = page.getByRole('navigation', { name: /メインナビゲーション/i });
    await expect(nav).toBeVisible();

    // リンクがクリック可能
    const userLink = page.getByRole('link', { name: /ユーザー/i });
    await expect(userLink).toBeVisible();
  });
});

test.describe('アクセシビリティ', () => {
  test('キーボードナビゲーションが機能する', async ({ page, browserName }) => {
    await page.goto('/');

    // WebKitではOption+TabでリンクにもTabフォーカスが当たる
    const tabKey = browserName === 'webkit' ? 'Alt+Tab' : 'Tab';

    // bodyにフォーカスを移してからTabキーで順番に要素を移動できる
    await page.locator('body').click();
    await page.keyboard.press(tabKey); // スキップリンク
    await page.keyboard.press(tabKey); // ユーザーリンク
    await page.keyboard.press(tabKey); // 検索リンク

    // フォーカス状態が視覚的に確認できる
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('ARIAランドマークが正しく設定されている', async ({ page }) => {
    await page.goto('/');

    // ランドマークロールが存在する
    await expect(page.getByRole('banner')).toBeVisible(); // header
    await expect(page.getByRole('navigation')).toBeVisible(); // nav
    await expect(page.getByRole('main')).toBeVisible(); // main
    await expect(page.getByRole('contentinfo')).toBeVisible(); // footer
  });
});
