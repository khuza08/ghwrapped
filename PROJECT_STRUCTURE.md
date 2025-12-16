github-wrapped/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── github/
│   │   │       └── [username]/
│   │   │           ├── route.ts          # Main API route for GitHub Wrapped data
│   │   │           └── generate/
│   │   │               └── route.ts      # Alternative endpoint for generating data
│   │   ├── (auth)/                     # Optional auth wrapper if needed later
│   │   ├── globals.css                 # Global styles
│   │   ├── layout.tsx                  # Root layout
│   │   ├── page.tsx                    # Main page with username input
│   │   └── wrapped/
│   │       └── [username]/
│   │           └── page.tsx            # Wrapped result page
│   ├── components/
│   │   ├── GitHubWrapped/
│   │   │   ├── WrappedSlide.tsx        # Individual slide component
│   │   │   ├── SlideContainer.tsx      # Container for slide navigation
│   │   │   ├── SummarySlide.tsx        # Main summary slide
│   │   │   ├── CommitsSlide.tsx        # Commits visualization slide
│   │   │   ├── LanguagesSlide.tsx      # Languages slide
│   │   │   ├── ReposSlide.tsx          # Repositories slide
│   │   │   └── PersonalitySlide.tsx    # Personality summary slide
│   │   ├── UI/
│   │   │   ├── LoadingSpinner.tsx      # Loading component
│   │   │   ├── ErrorDisplay.tsx        # Error component
│   │   │   ├── ShareButton.tsx         # Share functionality
│   │   │   └── DownloadImage.tsx       # Image download utility
│   │   └── Layout/
│   │       └── Header.tsx              # Application header
│   ├── lib/
│   │   ├── github.ts                   # GitHub API utilities
│   │   ├── types.ts                    # TypeScript types
│   │   ├── utils.ts                    # General utility functions
│   │   └── constants.ts                # Application constants
│   ├── hooks/
│   │   └── useWrappedData.ts           # Custom hook for fetching wrapped data
│   └── utils/
│       └── date.ts                     # Date utilities for processing commit history
├── public/
│   └── favicon.ico
├── .env.local                          # Environment variables (not committed)
├── .env.example                        # Example environment variables
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md