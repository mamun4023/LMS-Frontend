# Firebase Integration Documentation

## Overview
This document describes how Firebase is integrated into the LMS Frontend project
for authentication and data management.

---

## Firebase Services Used
- Firebase Authentication (Email & Password)
- Cloud Firestore
- (Future Work) Firebase Hosting

---

## Project Setup

### 1. Firebase Project
- Created a Firebase project from Firebase Console
- Enabled Email/Password authentication
- Created Firestore database in test mode

---

## Environment Configuration

Create a `.env` file:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## Firebase Initialization

```ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

---

## Authentication Flow

### Signup
- Registers user using Firebase Auth
- Creates user profile in Firestore
- Assigns role (admin, librarian, student)

### Signin
- Authenticates user
- Fetches Firestore profile
- Redirects based on role

---

## Role Management

Admin Emails:
- admin@lms.com

Librarian Emails:
- librarian@lms.com
- library@lms.com

Default role: student

---

## Firestore CRUD Operations

### Create
```ts
createUserProfile(uid, data);
```

### Read
```ts
getUserProfile(uid);
```

### Update
```ts
updateUserProfile(uid, { phone: "01800000000" });
```

### Delete
```ts
deleteUserProfile(uid);
```

---

## Task Completion Status

| Task | Status |
|-----|--------|
| Firebase Basics | Completed |
| Project Configuration | Completed |
| SDK Integration | Completed |
| Authentication | Completed |
| Firestore CRUD | Completed |
| Hosting | Future Work |

---

## Conclusion
Firebase authentication and Firestore database integration is complete with
role-based access and full CRUD support.
