# OpenRouter API Setup Guide

## Overview
The app now uses **OpenRouter** with **Claude 3.5 Sonnet** for AI-powered content generation:
- **Extract Nuggets**: AI analyzes research and generates 3 viral hooks
- **Generate Screenplay**: AI creates a 5-scene screenplay with full production details
- **Validate Screenplay**: AI validates screenplay against 10 viral success metrics

---

## Setup Steps

### Step 1: Get Your OpenRouter API Key
1. Go to https://openrouter.ai/keys
2. Sign up or log in
3. Create a new API key
4. Copy your API key

### Step 2: Add API Key to .env
Edit `app/.env` and replace the placeholder:

```env
# BEFORE
OPENROUTER_API_KEY=sk-or-your-api-key-here

# AFTER (paste your actual key)
OPENROUTER_API_KEY=sk-or-xxxxxxxxxxxxx
```

### Step 3: Install Dependencies
```bash
cd app
npm install
```

### Step 4: Run Development Environment
**Terminal 1 - Dev Server (API)**
```bash
cd app
node dev-server.js
# Should see: 🚀 Development API server running on http://localhost:3001
```

**Terminal 2 - Vite Dev Server**
```bash
cd app
npm run dev
# Should see: VITE v... ready in ... ms
```

### Step 5: Test in Browser
1. Open http://localhost:3000
2. Go to Phase 1: Input
3. Fill in research content (min 200 characters)
4. Click "Extract Nuggets" - AI will extract 3 hooks
5. Continue through phases and test "Generate Screenplay" and validation

---

## What Each API Does

### Extract Nuggets (`/api/extract-nuggets`)
**Input**: Research content  
**Output**: 3 compelling viral hooks with:
- Hook title (e.g., "Shocking Fact")
- Why it works (psychological principle)
- The actual hook message
- Why viewers care
- Proof/evidence

**Model**: Claude 3.5 Sonnet  
**Cost**: ~$0.001-0.002 per request

### Generate Screenplay (`/api/generate-screenplay`)
**Input**: Topic, research insights, length  
**Output**: 5-scene screenplay with:
- Scene details (timing, dialogue, action)
- Camera work (shot, angle, movement)
- Actor direction (expression, energy, pace)
- Visual and audio specifications
- Edit markers

**Model**: Claude 3.5 Sonnet  
**Cost**: ~$0.003-0.005 per request

### Validate Screenplay (`/api/validate-screenplay`)
**Input**: 5-scene screenplay  
**Output**: Validation against 10 metrics:
- Hook attention capture
- Visual pacing
- Dialogue authenticity
- CTA clarity
- Emotional arc
- Platform pacing
- Problem clarity
- Actionability
- Sound-off compatibility
- Viral patterns

**Model**: Claude 3.5 Sonnet  
**Cost**: ~$0.002-0.003 per request

---

## Pricing Estimate

With OpenRouter's Claude 3.5 Sonnet pricing:
- **Extract Nuggets**: ~$0.001 per user session
- **Generate Screenplay**: ~$0.004 per screenplay
- **Validate Screenplay**: ~$0.002 per validation

**Total per complete user journey**: ~$0.007 (less than 1 cent!)

---

## Troubleshooting

### "Cannot reach backend server"
- Make sure `dev-server.js` is running on port 3001
- Check that `OPENROUTER_API_KEY` is set in `.env`
- Verify .env file exists in `app/` folder

### "API key not configured"
- Check that `OPENROUTER_API_KEY=sk-or-xxxxx` is in `app/.env`
- Make sure there are no quotes around the key
- Restart dev-server after changing .env

### "OpenRouter API error: 401"
- Your API key is invalid or expired
- Get a fresh key from https://openrouter.ai/keys

### API timeout (>30s)
- OpenRouter API might be slow
- Claude 3.5 Sonnet should respond in 5-10s
- Check internet connection

---

## Environment Variables

| Variable | Required | Default | Purpose |
|----------|----------|---------|---------|
| `OPENROUTER_API_KEY` | Yes | - | OpenRouter API authentication |
| `VITE_API_URL` | No | `/api` | API base URL for frontend |

---

## Next Steps

1. ✅ Add your OpenRouter API key to `.env`
2. ✅ Start both servers (dev-server + vite)
3. ✅ Test Extract Nuggets with real AI
4. ✅ Test Screenplay generation
5. ✅ Test Validation
6. 📊 Monitor API costs at https://openrouter.ai/activity
7. 🚀 Deploy to production with same .env setup

---

## Notes

- OpenRouter uses Claude 3.5 Sonnet by default
- All API calls are async (non-blocking)
- Error messages show specific API issues
- Data persists to localStorage after generation
- Each phase auto-saves form data
