# Вопросы для собеседования

## Разница между `preload`, `prefetch`, `preconnect` и `prerender`

### `preload`
Используется для предварительной загрузки критически важных ресурсов, которые нужны сразу после загрузки страницы.

**Пример:**
```html
<link rel="preload" href="/styles.css" as="style">
```

### `prefetch`
Загружает ресурсы, которые могут понадобиться в будущем, но не используются немедленно.

**Пример:**
```html
<link rel="prefetch" href="/next-page.html">
```

### `preconnect`
Устанавливает соединение с внешними ресурсами (DNS-запрос, TCP, TLS) до загрузки ресурсов.

**Пример:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
```

### `prerender`
Полностью загружает и рендерит страницу в фоновом режиме для мгновенного перехода.

**Пример:**
```html
<link rel="prerender" href="/next-page.html">
```

---

## Паттерн PRPL

`PRPL` — оптимизационная стратегия загрузки страниц:
- **Push** — отправка критических ресурсов (использует HTTP/2 push или preload);
- **Render** — быстрый рендеринг начального контента;
- **Pre-cache** — предзагрузка оставшихся ресурсов;
- **Lazy-load** — ленивый подгруз остальных частей страницы.

Применяется для улучшения производительности PWA и SPA.

---

## Разница между SSR, SSG и CSR

- **SSR (Server-Side Rendering)** – рендеринг на сервере перед отправкой пользователю.
  - Пример: Next.js SSR API.

- **SSG (Static Site Generation)** – генерация HTML на этапе билда.
  - Пример: Gatsby.

- **CSR (Client-Side Rendering)** – рендеринг на стороне клиента.
  - Пример: React SPA без SSR.

---

## Что такое Babel и для чего он нужен?

`Babel` — транспайлер, который преобразует код на современном JavaScript (ES6+) в старые версии для совместимости с браузерами.

**Пример:**
```js
const arrowFunc = () => console.log('Hello');
// Babel преобразует в:
var arrowFunc = function() { console.log('Hello'); };
```

---

## Разница между feature detection, feature inference и анализом user-agent

- **Feature detection** — проверка поддержки API перед его использованием.
  ```js
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(console.log);
  }
  ```

- **Feature inference** — предположение о поддержке одного API на основе другого (не всегда надёжно).
  ```js
  if (document.getElementById) { /* старый код */ }
  ```

- **Анализ user-agent** — проверка строки `User-Agent` для определения браузера (не рекомендуется).
  ```js
  if (navigator.userAgent.includes('Chrome')) { /* код для Chrome */ }
  ```

---

## Блокирующие и неблокирующие ресурсы

- **Блокирующие** — ресурсы, которые останавливают загрузку и рендеринг страницы (например, `<link rel="stylesheet">`).
- **Неблокирующие** — ресурсы, загружаемые асинхронно (например, `<script async>`).

**Оптимизация:**
```html
<link rel="stylesheet" href="styles.css" media="print" onload="this.onload=null;this.media='all';">
```

---

## Что такое DOM?

`DOM` (Document Object Model) — программный интерфейс для HTML/XML-документа, представляющий структуру страницы в виде дерева узлов.

**Пример работы с DOM:**
```js
const heading = document.getElementById('title');
heading.textContent = 'Новый заголовок';
```

---

## Когда происходят Reflow и Repaint?

- **Reflow** — пересчёт позиций и размеров элементов (например, изменение `width`).
- **Repaint** — перерисовка без изменения геометрии (например, изменение `color`).

**Избегаем лишних Reflow:**
```js
const el = document.getElementById('box');
el.style.cssText = 'width: 100px; height: 100px;';
```

---

## Что такое GraphQL?

`GraphQL` — язык запросов для API, позволяющий клиенту получать только нужные данные.

**Пример запроса:**
```graphql
query {
  user(id: "1") {
    name
    email
  }
}
```

**Ответ:**
```json
{
  "data": {
    "user": {
      "name": "Иван",
      "email": "ivan@example.com"
    }
  }
}
```

---

## Что такое JWT?

`JWT` (JSON Web Token) — формат токенов для аутентификации, состоящий из трёх частей: **Header**, **Payload**, **Signature**.

**Пример JWT:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjMsIm5hbWUiOiJKb2huIERvZSJ9.sflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

Используется для передачи данных между клиентом и сервером в безопасном виде.
