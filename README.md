# GitHub Wrapped

This project is inspired by Spotify Wrapped and [github-unwrapped by remotion-dev](https://github.com/remotion-dev/github-unwrapped).
I built a simpler version using Next.js App Router, currently not supported on mobile because it has lot of a complex layout.

Live at https://githubwrapped-nine.vercel.app/

## ✨ Features

* **Detailed commit analysis** 
* **Repository statistics** 
* **Most-used programming languages**
* **Developer personality profile**
* **Custom Background and Label**
* **Download results as images**

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/khuza08/ghwrapped.git 
cd ghwrapped
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create a `.env.local` file in the root directory and add your GitHub token:

```env
GITHUB_TOKEN=your_github_token_here
```

> **Note**: You can generate a token via:
> GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
>
> Required scopes:
>
> * `public_repo`
> * `read:user`

### 4️⃣ Run the development server

```bash
npm run dev
```

The app will be available at **[http://localhost:3000](http://localhost:3000)**.

## 🤝 Contributing

Contributions are welcome! 🚀

1. Fork the repository
2. Create your feature branch

   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes

   ```bash
   git commit -m "Add some amazing feature"
   ```
4. Push to the branch

   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request

## 📄 License

This project is licensed under the **MIT License**. <br>
See the [LICENSE](https://github.com/khuza08/ghwrapped/blob/main/LICENSE) file for more details.

✨ *Thankyou*
