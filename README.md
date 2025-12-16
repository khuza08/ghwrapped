# GitHub Wrapped

GitHub Wrapped adalah aplikasi web produksi-ready yang terinspirasi dari Spotify Wrapped, tetapi untuk pengguna GitHub. Aplikasi ini menganalisis aktivitas publik pengguna GitHub selama setahun terakhir dan menghasilkan ringkasan menarik tentang kontribusi mereka.

## Fitur

- 📊 Analisis komit terperinci (jumlah, hari paling aktif, waktu produktif, streak terpanjang)
- 🌐 Statistik repositori (jumlah, jumlah bintang, jumlah fork)
- 💻 Profil bahasa pemrograman paling sering digunakan
- 👤 Profil kepribadian pengembang (tipe jadwal coding, gaya aktivitas)
- 📈 Visualisasi interaktif dan animasi
- 📱 Tampilan mobile responsif dan 🖥️ tampilan desktop lebar dengan layout horizontal
- 🔄 Pembagian hasil yang mudah
- 🖼️ Fungsi download hasil sebagai gambar
- 📱 Pengalaman story/slide untuk navigasi intuitif
- 🎨 Tema monokrom elegan dengan skema warna abu-abu yang konsisten
- 🎨 Desain yang menyesuaikan lebar layar untuk pengalaman optimal di semua perangkat

## Teknologi

- **Frontend**: Next.js (App Router)
- **Backend**: Next.js API Routes
- **Styling**: Tailwind CSS
- **Visualisasi**: Recharts
- **Animasi**: Framer Motion
- **GitHub API**: Menggunakan token aplikasi untuk mengakses data publik

## Arsitektur

```
github-wrapped/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── github/[username]/route.ts      # API endpoint utama
│   │   ├── page.tsx                            # Halaman utama
│   │   └── layout.tsx                          # Layout aplikasi
│   ├── components/
│   │   ├── GitHubWrapped/                      # Komponen untuk hasil Wrapped
│   │   │   ├── SummarySlide.tsx
│   │   │   ├── CommitsSlide.tsx
│   │   │   ├── LanguagesSlide.tsx
│   │   │   ├── ReposSlide.tsx
│   │   │   ├── PersonalitySlide.tsx
│   │   │   ├── CommitChart.tsx
│   │   │   └── SlideContainer.tsx
│   │   └── UI/                                 # Komponen UI umum
│   │       ├── LoadingSpinner.tsx
│   │       ├── ErrorDisplay.tsx
│   │       ├── ShareButton.tsx
│   │       ├── DownloadImage.tsx
│   │       └── AnimatedCounter.tsx
│   ├── lib/
│   │   ├── github.ts                           # Utilitas GitHub API
│   │   ├── types.ts                            # Definisi tipe TypeScript
│   │   ├── utils.ts                            # Utilitas umum
│   │   ├── constants.ts                        # Konstanta aplikasi
│   │   └── errors.ts                           # Manajemen error
│   ├── hooks/
│   │   └── useWrappedData.ts                   # Custom hook untuk data
│   └── utils/
│       └── date.ts                             # Utilitas tanggal
├── public/
├── .env.local                                  # Token GitHub (tidak disertakan di repo)
├── package.json
└── README.md
```

## Instalasi

1. Clone repository:
```bash
git clone <repository-url>
cd github-wrapped
```

2. Install dependensi:
```bash
npm install
```

3. Siapkan environment variable:
   - Buat file `.env.local` di root direktori
   - Tambahkan GitHub token:
```env
GITHUB_TOKEN=your_github_token_here
```

   > Catatan: Token bisa dibuat di GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) dengan izin `public_repo` dan `read:user`.

4. Jalankan aplikasi:
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000` (atau port lain jika 3000 sedang digunakan).

## Penggunaan

1. Buka aplikasi di browser
2. Masukkan username GitHub
3. Klik "Generate My Wrapped"
4. Jelajahi hasil Wrapped kamu melalui slide-slide yang menarik
5. Navigasi antar slide dengan tombol Previous/Next atau indikator titik
6. Bagikan atau download hasilnya

## API Routes

- `GET /api/github/[username]` - Mengambil dan menganalisis data GitHub pengguna

## Kontribusi

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/amazing-feature`)
3. Commit perubahan (`git commit -m 'Add some amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

## Lisensi

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgments

- Project ini menggunakan Next.js App Router untuk arsitektur server-side rendering
- Terinspirasi dari Spotify Wrapped untuk pengalaman pengguna
- GitHub API untuk data publik
- Recharts untuk visualisasi data
- Framer Motion untuk efek animasi