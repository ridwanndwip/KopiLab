export const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const rng = (seed) => () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296)

const TOPICS = ['Rangkai dengan pesan sosial dan nada tradisional yang penuh makna','Secangkir kopi dari lereng gunung yang berkabut','Petani muda dan kebun kopi warisan kakek','Suara gamelan di sudut warung pagi hari','Cerita di balik biji kopi yang disangrai perlahan','Pasar subuh dan aroma rempah dari kampung','Perpustakaan kecil di desa yang tak pernah sepi','Anak sungai, perahu, dan lagu pengantar rindu','Warung kopi sebagai ruang bicara warga','Menenun kain sambil menjaga kisah leluhur','Jalan setapak menuju sekolah di atas bukit','Tukang sepeda tua dan pesan dari kota jauh','Kopi tubruk, obrolan hangat, dan hujan sore','Pesta panen yang menyatukan dua kampung','Relawan literasi dan buku yang berkeliling','Dalang muda menghidupkan wayang untuk anak-anak','Kebun komunitas di tengah kota padat','Resep nenek yang hampir terlupakan','Lomba layang-layang dan mimpi anak pesisir','Musik angklung di halaman balai desa','Pengrajin bambu dan masa depan kampung','Surat dari perantau untuk ibu di rumah','Festival lampion dan harapan yang menyala','Barista pertama dari pedalaman Flores','Menjaga hutan dengan cerita dan nyanyian','Pedagang keliling dan cerita tiap gang','Belajar membatik dari tetangga lama','Malam di rumah panggung dan dongeng bersama','Gotong royong membangun jembatan bambu','Pulang kampung: aroma kopi pertama setelah lama pergi']
const OPEN = ['Pagi itu kabut masih menggantung rendah di atas atap-atap rumah, dan kisah “{t}” baru saja dimulai.','Tak ada yang menyangka bahwa “{t}” akan menjadi bahan obrolan sepanjang musim.','Orang-orang di kampung itu selalu bilang, “{t}” bukan sekadar cerita, melainkan cara mereka mengingat.']
const BODY = ['Setiap orang membawa kisahnya sendiri, dan di meja kayu yang sudah licin itu semuanya dipertemukan.','Ibu-ibu menakar gula dengan perasaan, sementara anak-anak berlari membawa pesan dari satu rumah ke rumah lain.','Di kejauhan terdengar nada tradisional yang dimainkan pelan, seperti menolak terburu-buru.','Bapak tua di pojok warung mengaduk gelasnya sambil bercerita tentang masa ketika jalan masih berupa tanah merah.','Pelan-pelan, obrolan berubah menjadi rencana: membersihkan sungai, membuka kelas membaca, menanam lagi pohon yang tumbang.','Ada tawa, ada diam yang panjang, dan ada pertanyaan yang tidak harus dijawab hari itu juga.','Seorang anak muda mencatat semuanya di buku lusuh, takut ada yang terlewat.','Hujan turun tipis, dan aroma kopi yang baru diseduh memenuhi ruangan hingga ke teras.','Tak ada panggung, tak ada tepuk tangan, tetapi semua orang merasa sedang menyaksikan sesuatu yang penting.','Mereka belajar bahwa pesan sosial yang baik tidak selalu lahir dari pidato; kadang ia tumbuh dari kebiasaan kecil yang dijaga bersama.','Sore harinya, lampu-lampu dinyalakan satu per satu, dan kampung itu tampak seperti rangkaian bintang yang turun ke bumi.','Di sela kesibukan itu, seorang ibu menyelipkan nasihat: jangan lupa pulang, jangan lupa bersyukur.','Ketika matahari condong, bayangan orang-orang memanjang di jalan, bergandengan seperti barisan penari.','Waktu terasa melambat, memberi ruang bagi hal-hal yang selama ini terburu-buru dilewatkan.']
const END = ['Dan ketika gelas terakhir habis, mereka sadar: cerita ini belum selesai, ia hanya berpindah ke tangan berikutnya.','Malam turun, tetapi hangatnya tertinggal; “{t}” akan terus diceritakan, dari satu cangkir ke cangkir lain.']

export function story(i, title) {
  const r = rng(i * 97 + 13), pick = (a) => a[Math.floor(r() * a.length)], t = title.toLowerCase()
  const paras = []
  for (let p = 0; p < 9; p++) {
    const s = p === 0 ? [pick(OPEN)] : []
    while (s.length < 4) { const x = pick(BODY); if (!s.includes(x)) s.push(x) }
    if (p === 8) s.push(pick(END))
    paras.push(s.join(' ').replaceAll('{t}', t))
  }
  return paras
}

const HUES = [222, 18, 160, 280, 45, 340, 190, 100]
export const hue = (i) => HUES[i % HUES.length]
const YT = ['jNQXAC9IVRw'] // GANTI dengan ID video YouTube kamu (11 karakter di URL ?v=...)

export const articles = TOPICS.map((t, i) => ({ kind: 'Artikel', title: t, slug: slugify(t), url: `/content/contentArticle/${slugify(t)}`, desc: story(i, t)[0].slice(0, 120) + '…', hue: hue(i), i }))
export const videos = TOPICS.map((_, i) => { const t = 'Dokumentasi: ' + TOPICS[(i + 11) % 30]; return { kind: 'Video', title: t, slug: slugify(t), url: `/content/contentVideoArticle/${slugify(t)}`, desc: 'Tonton videonya, lalu baca catatan lengkapnya.', hue: hue(i + 3), yt: YT[i % YT.length], i: i + 11 } })

export const CAROUSEL_TITLES = ['Mengenal Rantai Kopi dari Kebun ke Cangkir','Lima Alat Seduh Manual','Tradisi Minum Kopi Nusantara','Cara Mencicipi Kopi Seperti Barista','Kopi dan Lingkungan','Sejarah Singkat Kopi di Indonesia','Mengenal Profil Rasa Kopi','Tips Menyimpan Biji Kopi']
const SLIDE_BITS = ['Awal mula yang sederhana','Proses yang butuh kesabaran','Rahasia ada pada detail','Ragam cara tiap daerah','Mulai dari rumah, hari ini']
export const carousels = CAROUSEL_TITLES.map((t, i) => ({ type: 'carousel', kind: 'Carousel', title: t, slug: slugify(t), url: `/simple_engagement/carousel/${slugify(t)}`, desc: '5 slide singkat, geser untuk lanjut.', hue: hue(i), slides: SLIDE_BITS.map((b, k) => ({ h: b, p: `${t}: ${b.toLowerCase()}. Slide ${k + 1} dari 5 membahas bagian ini secara ringkas agar mudah diingat.` })) }))

const EVENTS = ['Lomba Cerita Kampung','Pameran Komunitas Kopi','Festival Literasi Desa','Kampanye Kebersihan Sungai','Pekan Budaya Nusantara']
const mk = (type, kind, names, desc) => names.map((t, i) => ({ type, kind, title: t, slug: slugify(t), url: `/simple_engagement/${type}/${slugify(t)}`, desc, event: EVENTS[i], hue: hue(i + 2) }))
export const textSubs = mk('text_subm', 'Kirim Tulisan', ['Kisah Kopi Pertamaku','Surat untuk Petani Kopi','Kenangan di Warung Kampung','Puisi Pendek tentang Pagi','Ide Perubahan untuk Kotaku'], 'Tulis ceritamu dan kirim untuk event pilihan.')
export const mediaSubs = mk('media_subm', 'Kirim Foto', ['Foto Cangkir Favorit','Foto Sudut Warung Kopi','Foto Kebun dan Petani','Foto Kegiatan Komunitas','Foto Kopi dan Senja'], 'Unggah fotomu dan ikut event pilihan.')
export const audioSubs = mk('audio_subm', 'Kirim Audio', ['Rekaman Suara Seduhan','Cerita Lisan Kampungku','Nyanyian Tradisi Daerah','Pesan Suara untuk Barista','Suara Pasar Pagi'], 'Unggah rekaman audiomu dan ikut event pilihan.')

const EMOJI = [['☕','🫘','🥛','🍯','🍪','🧁','🍰','🥐'],['🌱','🌿','🍃','🌳','🌴','🌵','🍀','🌾'],['🎵','🎶','🥁','🎸','🎹','🎺','🎻','🪘'],['🌞','🌙','⭐','☁️','🌧️','🌈','⚡','❄️'],['🐘','🦜','🐢','🐒','🦎','🐠','🦋','🐝']]
export const puzzles = ['Susun Menu Kafe','Susun Kebun Hijau','Susun Alat Musik','Susun Langit dan Cuaca','Susun Satwa Nusantara'].map((t, i) => ({ type: 'puzzle', kind: 'Puzzle', title: t, slug: slugify(t), url: `/simple_engagement/puzzle/${slugify(t)}`, desc: 'Geser kotak sampai urut 1–8. Mudah!', hue: hue(i + 5), emoji: EMOJI[i] }))
export const simple = [...carousels, ...textSubs, ...mediaSubs, ...audioSubs, ...puzzles]

export const games = [
  { id: 'tap-cepat', kind: 'Game', title: 'Tap Cepat: 10 Detik', desc: 'Seberapa banyak kamu bisa tap dalam 10 detik?', hue: 45 },
  { id: 'memory', kind: 'Game', title: 'Memory Kopi: Cari Pasangan', desc: 'Buka kartu, temukan semua pasangan.', hue: 160 },
  { id: 'tebak-angka', kind: 'Game', title: 'Tebak Angka 1–20', desc: 'Semakin sedikit tebakan, semakin tinggi skor.', hue: 280 },
].map((g) => ({ ...g, slug: slugify(g.title), url: `/games/${g.id}/${slugify(g.title)}` }))

// Format soal: [pertanyaan, [pilihan A-D], indeks jawaban benar]
const Q = {
  'Kuis Kopi Dasar': ['kopi', [['Biji kopi sebenarnya adalah bagian dari…',['Daun','Buah (biji dalam buah ceri)','Akar','Bunga'],1],['Jenis kopi yang dikenal manis dan asam lembut?',['Arabika','Robusta','Liberika','Excelsa'],0],['Alat seduh manual dari Jepang yang kerucut?',['French press','V60','Moka pot','Aeropress'],1],['Proses mengubah biji hijau menjadi cokelat disebut?',['Sangrai','Fermentasi','Giling','Seduh'],0],['Kopi tubruk disajikan dengan…',['Disaring kertas','Ampas ikut di gelas','Diberi susu busa','Dingin'],1]]],
  'Kuis Budaya Nusantara': ['budaya', [['Alat musik bambu yang digoyang?',['Angklung','Sasando','Kolintang','Rebab'],0],['Kain tradisional dengan lilin malam?',['Batik','Ulos','Songket','Tenun ikat'],0],['Wayang kulit berasal dari pulau…',['Jawa','Sumatra','Papua','Kalimantan'],0],['Tarian Saman berasal dari…',['Aceh','Bali','Maluku','Sulawesi'],0],['Rumah Gadang adalah rumah adat…',['Minangkabau','Dayak','Toraja','Betawi'],0]]],
  'Kuis Geografi Indonesia': ['geografi', [['Ibu kota Indonesia saat ini?',['Jakarta','Bandung','Surabaya','Medan'],0],['Gunung tertinggi di Indonesia?',['Puncak Jaya','Rinjani','Semeru','Kerinci'],0],['Pulau terbesar di Indonesia?',['Kalimantan','Jawa','Sumatra','Sulawesi'],0],['Selat yang memisahkan Jawa dan Sumatra?',['Sunda','Bali','Makassar','Malaka'],0],['Danau Toba terletak di…',['Sumatra Utara','Jawa Barat','Bali','NTT'],0]]],
  'Kuis Sains Seru': ['sains', [['Planet terdekat dari Matahari?',['Merkurius','Venus','Mars','Bumi'],0],['Gas yang dihirup manusia untuk bernapas?',['Oksigen','Nitrogen','Helium','Karbon dioksida'],0],['Air membeku pada suhu…',['0°C','10°C','50°C','100°C'],0],['Hewan yang termasuk mamalia?',['Paus','Hiu','Penyu','Kadal'],0],['Tumbuhan membuat makanan lewat…',['Fotosintesis','Respirasi','Evaporasi','Kondensasi'],0]]],
  'Kuis Dasar Web Analytics': ['analytics', [['GTM adalah singkatan dari…',['Google Tag Manager','Global Tracking Module','Google Traffic Meter','Gateway Tag Map'],0],['Tempat data event disimpan sebelum dikirim ke tag?',['dataLayer','localStorage','cookie jar','sitemap'],0],['Apa itu “conversion” di analytics?',['Aksi bernilai yang diselesaikan user','Jumlah halaman','Kecepatan situs','Warna tombol'],0],['Mode untuk menguji tag sebelum publish di GTM?',['Preview','Export','Workspace','Versioning'],0],['GA4 berbasis model data…',['Event','Pageview saja','Sesi saja','Hit tunggal'],0]]],
  'Kuis Sejarah Indonesia': ['sejarah', [['Proklamasi kemerdekaan dibacakan tahun…',['1945','1928','1950','1965'],0],['Sumpah Pemuda diikrarkan tahun…',['1928','1908','1945','1955'],0],['Presiden pertama Indonesia?',['Soekarno','Soeharto','Habibie','Hatta'],0],['Kerajaan yang membangun Borobudur?',['Syailendra','Majapahit','Sriwijaya','Mataram Islam'],0],['Konferensi Asia-Afrika digelar di…',['Bandung','Jakarta','Yogyakarta','Surabaya'],0]]],
  'Kuis Musik Tradisional': ['musik', [['Alat musik petik dari Nusa Tenggara Timur?',['Sasando','Angklung','Suling','Gendang'],0],['Gamelan banyak dimainkan di…',['Jawa dan Bali','Papua','Aceh','Riau'],0],['Tifa berasal dari…',['Maluku dan Papua','Jawa','Sumatra','Bali'],0],['Kolintang terbuat dari…',['Kayu','Kaca','Logam tipis','Plastik'],0],['Alat musik gesek khas Minang dan Jawa?',['Rebab','Gong','Kendang','Saron'],0]]],
  'Kuis Teknologi Sehari-hari': ['teknologi', [['HTML dipakai untuk…',['Struktur halaman web','Mengirim email','Menyimpan foto','Mengedit video'],0],['Framework JavaScript buatan Meta?',['React','Laravel','Django','Flask'],0],['Singkatan URL?',['Uniform Resource Locator','Universal Route Link','User Router Layer','Unit Resource List'],0],['Git dipakai untuk…',['Kontrol versi kode','Desain grafis','Hosting video','Membuat database'],0],['Hosting statis gratis dari GitHub?',['GitHub Pages','Gmail','Docs','Drive'],0]]],
}
export const quizzes = Object.entries(Q).map(([t, [cat, qs]]) => ({ kind: 'Quiz', title: t, cat, slug: slugify(t), url: `/quiz/${cat}/${slugify(t)}`, desc: '5 pertanyaan pilihan ganda.', hue: hue(t.length), questions: qs.map(([q, o, a]) => ({ q, o, a })) }))

export const all = [...articles, ...videos, ...simple, ...games, ...quizzes]
export const shuffle = (a) => [...a].sort(() => Math.random() - 0.5)
