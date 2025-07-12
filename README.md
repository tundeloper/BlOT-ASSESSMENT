# 📊 Finance Digest – Maon Technology Ltd Assessment

A responsive finance news digest web application built using **Next.js** and **Tailwind CSS**, created as part of the Senior Frontend Engineer assessment for Maon Technology Ltd.

---

## 🚀 Features

- ✅ Fetches **general market news** from the [Finnhub API](https://finnhub.io/docs/api/market-news).
- 🖼️ Displays each news item with:
  - Thumbnail image
  - Headline
  - Source
  - Formatted date
- 🌐 Clicking a news item opens the full article in a **new browser tab**.
- 📱 Fully **responsive design** for mobile, tablet, and desktop.
- ⚠️ Graceful **error handling** for API failures.
- ⏳ Displays a loading state while fetching data.
- 🧪 (Optional) Unit tests included with React Testing Library and Jest.

---

## 🧑‍💻 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **HTTP Client:** Native `fetch` (or [Axios](https://axios-http.com/) if preferred)
- **Date Formatting:** [date-fns](https://date-fns.org/)
- **Image Optimization:** `next/image`

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/finance-digest.git
cd finance-digest

# Install dependencies
npm install

# Create environment variable file
cp .env.local
```
and add this
NEXT_PUBLIC_FINNHUB_API_KEY=crals9pr01qhk4bqotb0crals9pr01qhk4bqotbg
NEXT_PUBLIC_FINNHUB_BASE_URL=https://finnhub.io/api/v1
