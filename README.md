# Kopi Lab: situs latihan Google Tag Manager

Situs statis (HTML/CSS/JS biasa). Tidak perlu build.

## Pasang container GTM
Cari `GTM-XXXXXXX` di keempat file `.html` (2 tempat per file) dan ganti dengan ID container kamu.

## Deploy
1. Upload isi folder ini ke repository GitHub.
2. Di Netlify: Add new site > Import from Git, pilih repo. Build command kosong, publish directory `/`.

## Peta video ke komponen
| Video | Komponen |
|---|---|
| 5-6 | Snippet GTM di `<head>` dan `<body>` semua halaman |
| 10-12 | Semua halaman, lihat Built-in dan User-Defined Variables |
| 13, 17 | Tag Google Tag GA4 + variabel Constant Measurement ID |
| 15 | `kontak.html` (form) dan `terima-kasih.html` -> `generate_lead` |
| 16 | Page Path `/produk`, `/kontak`, `/terima-kasih.html` |
| 18-19 | Semua elemen: Click ID, Classes, Text, URL |
| 20 | `#btn-daftar`, `#btn-beli`, `#btn-unduh`, `#btn-bagikan`, `.btn-primary` |
| 21 | Link internal (`#link-produk`) dan eksternal (`.ext`, `#link-ga`) |
| 22 | `#btn-error` -> trigger JavaScript Error |
| 23 | Bagian `#sec-scroll` ke bawah -> Scroll Depth |
| 24 | `#promo-banner`, `#newsletter-box` -> Element Visibility |
| 25-27 | `pageType`, `user.profil.kota` (nested) pada Data Layer awal |
| 28 | `klik_cta`, `tambah_keranjang` (nested `ecommerce.items`) |
| 29 | `#custom-html-target` |
| 31 | Export container lalu import ke container baru |

## Contoh Custom HTML (Video 29)
```html
<script>
  document.getElementById('custom-html-target').textContent = 'Ditulis oleh tag GTM pada ' + new Date().toLocaleTimeString();
</script>
```

Panel `dataLayer` di kanan bawah hanya alat bantu belajar. Hapus `app.js` bagian panel bila tidak diperlukan.
