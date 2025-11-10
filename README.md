# Movies API Proxy - Vercel Serverless

This is a serverless function that acts as a proxy to bypass Cloudflare protection.

## 🚀 Quick Deploy to Vercel

### Method 1: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
cd vercel-project
vercel --prod
```

### Method 2: Using Vercel Dashboard

1. Go to https://vercel.com
2. Click "New Project"
3. Import this folder
4. Deploy

## 📝 After Deployment

You'll get a URL like: `https://your-project.vercel.app`

Your API endpoint will be: `https://your-project.vercel.app/api/movies`

## 🔧 Update Android App

Change BASE_URL in `RetrofitClient.java`:

```java
private static final String BASE_URL = "https://your-project.vercel.app/api/";
```

Change endpoint in `ApiService.java`:

```java
@GET("movies")
Call<MoviesResponse> getMovies();
```

## 🧪 Test

Open in browser: `https://your-project.vercel.app/api/movies`

## ⚠️ Note

This proxy will still face Cloudflare protection if the original API has it enabled.

**Best solution:** Disable Cloudflare on your API endpoint or use a subdomain without Cloudflare.
