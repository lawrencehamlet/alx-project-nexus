# Firestore Security Rules Deployment Guide

## Overview
Two rule files are provided:
- `firestore.rules` - Development rules (permissive, for testing)
- `firestore.rules.production` - Production rules (strict, requires authentication)

## Current Rules (Development)

### Polls Collection (`/polls/{pollId}`)
- **Read**: Public (anyone can read)
- **Create**: Public (anyone can create polls)
- **Update**: Allowed if poll structure is valid and votes only increase
- **Delete**: Public (⚠️ restrict in production!)

### Features
- Validates poll structure (title, description, options)
- Ensures 2-10 options per poll
- Validates option structure (id, label, votes)
- Prevents vote count from decreasing

## Production Rules

### Polls Collection
- **Read**: Public
- **Create**: Authenticated users only, must set `createdBy` to their UID
- **Update**: 
  - Owners can update metadata
  - Anyone can vote (increment votes only)
- **Delete**: Owners only

### Vote Tracking
- Optional `/votes/{voteId}` collection to prevent duplicate votes
- `voteId` format: `{pollId}_{userId}` or `{pollId}_{sessionId}`
- Votes are immutable once created

## Deployment Steps

### Option 1: Firebase Console (Easiest)
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Firestore Database** → **Rules**
4. Copy contents from `firestore.rules` (or `firestore.rules.production`)
5. Paste into the rules editor
6. Click **Publish**

### Option 2: Firebase CLI
1. Install Firebase CLI (if not already):
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project (first time only):
   ```bash
   cd C:\Users\Lawrence Bayode\Desktop\alx-project-nexus\webapp
   firebase init firestore
   ```
   - Select your Firebase project
   - Accept default `firestore.rules` file
   - Accept default `firestore.indexes.json` file

4. Deploy rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

### Option 3: GitHub Actions (Automated)
Add to `.github/workflows/deploy-firestore.yml`:
```yaml
name: Deploy Firestore Rules

on:
  push:
    branches: [main]
    paths:
      - 'webapp/firestore.rules'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install -g firebase-tools
      - run: firebase deploy --only firestore:rules --token ${{ secrets.FIREBASE_TOKEN }}
```

## Testing Rules

### Local Emulator
1. Install Firebase emulators:
   ```bash
   firebase emulators:start --only firestore
   ```

2. Update your `.env.local`:
   ```
   NEXT_PUBLIC_FIREBASE_USE_EMULATOR=true
   ```

3. Update `src/lib/firebase.ts`:
   ```typescript
   import { connectFirestoreEmulator } from "firebase/firestore";
   
   if (process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATOR === 'true') {
     connectFirestoreEmulator(db, 'localhost', 8080);
   }
   ```

### Rules Playground
1. Go to Firebase Console → Firestore → Rules
2. Click **Rules Playground** tab
3. Test read/write operations with different authentication states

## Migration Checklist

### When Moving to Production:
- [ ] Switch from `firestore.rules` to `firestore.rules.production`
- [ ] Add `createdBy` field to poll creation in `src/lib/polls.ts`:
  ```typescript
  export async function createPoll(data: Omit<Poll, "id"> & { id?: string }, userId: string)
  ```
- [ ] Implement Firebase Authentication
- [ ] Update API routes to verify auth tokens
- [ ] Add vote tracking to prevent duplicates
- [ ] Test all CRUD operations with authenticated/unauthenticated users
- [ ] Remove public delete permissions

## Security Best Practices

1. **Never expose admin credentials** in client-side code
2. **Validate all input** on both client and server
3. **Use Firebase Authentication** for user management
4. **Rate limit** API endpoints (use Cloud Functions or middleware)
5. **Monitor Firestore usage** in Firebase Console
6. **Set up billing alerts** to prevent unexpected charges
7. **Review rules regularly** and test edge cases

## Common Issues

### Issue: "Missing or insufficient permissions"
**Solution**: Check if user is authenticated and rules allow the operation

### Issue: Rules not updating
**Solution**: 
- Clear browser cache
- Redeploy rules: `firebase deploy --only firestore:rules`
- Check for syntax errors in rules file

### Issue: Emulator connection failed
**Solution**: 
- Ensure emulator is running: `firebase emulators:start`
- Check port 8080 is not in use
- Verify `connectFirestoreEmulator` is called before any Firestore operations

## Support
- [Firestore Security Rules Documentation](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)
- [Rules Language Reference](https://firebase.google.com/docs/rules/rules-language)
