# Kopi Lab SPA (React + Vite + Tailwind)

Snippet GTM (`GTM-5CZM33JH`) dipasang **sekali** di `index.html`. Ganti ID bila perlu (2 tempat: script dan noscript).
Belum ada event dataLayer yang dipasang di kode (sengaja dikosongkan untuk dipasang sendiri). Titik awal: `src/lib/dl.js` (`usePage`, dipanggil tiap halaman, cocok untuk pageview virtual SPA). Panel inspector dataLayer (`src/DlPanel.jsx`) tetap aktif untuk melihat isi dataLayer.

## Deploy ke Netlify
Sudah ada `netlify.toml` (build: `npm run build`, publish: `dist`, plus redirect SPA). Import repo dari GitHub, tanpa setting tambahan.

## Jalankan lokal
npm install && npm run dev

## Deploy ke GitHub Pages
1. Buat repo, upload seluruh isi folder ini (tanpa node_modules), branch `main`.
2. Settings > Pages > Source: **GitHub Actions**.
3. Push; workflow `.github/workflows/deploy.yml` build dan publish otomatis. `404.html` dibuat otomatis agar URL langsung (refresh) tetap jalan.

## URL
/content/contentArticle/{slug} · /content/contentVideoArticle/{slug}
/simple_engagement/{carousel|text_subm|media_subm|audio_subm|puzzle}/{slug}
/simple_engagement/{text_subm|media_subm|audio_subm}/{slug}/thank_you
/games/{tap-cepat|memory|tebak-angka}/{slug} · /quiz/{kategori}/{slug}

## Mengedit konten
Semua di `src/data.js`. Cerita artikel dibuat otomatis dari kumpulan kalimat (placeholder); ID video YouTube ada di konstanta `YT`.
