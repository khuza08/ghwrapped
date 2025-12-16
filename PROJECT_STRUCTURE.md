github-wrapped/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── github/[username]/route.ts      # API endpoint utama
│   │   ├── page.tsx                            # Halaman utama (modular)
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
│   │       ├── GitHubWrappedHeader.tsx         # Header halaman utama
│   │       ├── UsernameForm.tsx                # Form input username
│   │       ├── WrappedSidebar.tsx              # Sidebar saat Wrapped ditampilkan
│   │       ├── WrappedMainContent.tsx          # Konten utama Wrapped
│   │       ├── GitHubWrappedFooter.tsx         # Footer halaman utama
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