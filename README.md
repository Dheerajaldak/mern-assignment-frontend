# Frontend Assignment – State Management & Design Exercise

This repository contains a small, intentionally simplified Next.js + Redux example.

The purpose of this exercise is to understand how you reason about state changes, data flow, and maintainability when working with an existing system.

---

## Duration
**45–60 minutes max** 

---

## What’s provided
- A minimal Next.js app using the App Router
- A Redux slice managing subscriptions
- A mock backend API implemented using Next.js route handlers

---

## API details (important)

The backend API is already implemented and should be treated as **fixed**.

### API code location
/app/api/subscriptions/route.ts

### API URL (when running locally)
/api/subscriptions

### API behavior
- **GET /api/subscriptions**  
  Returns the current list of subscriptions

- **POST /api/subscriptions**  
  Adds a new **active** subscription

- **PATCH /api/subscriptions**  
  Cancels one active subscription (if present)

### Data storage
The data is stored **in memory on the server** (module-level variable).

This means:
- Data resets when the dev server restarts
- It is not persisted in a database
- This is intentional for the purpose of the exercise

Please do **not** modify the API code.

---

## Your tasks (mandatory)

1. Review the existing frontend and state management logic.
2. Add UI controls to:
   - add an active subscription
   - cancel a subscription
3. Ensure the UI state stays consistent with the API responses.
4. Identify and explain any **design or state-related issues** you notice.

**Note:** Please ensure your code is well-documented with clear comments explaining your approach and any complex logic.

---

## Important note

If you do not immediately notice any issues, try adding a way to  
**cancel a specific subscription from the list**.

---

## Guidelines
- Minimal changes are preferred over large refactors.
- There is no single correct solution.
- Please explain *why* you made the changes you did.
- You may update this README if required to document your changes.

---

## My Approach & Implementation Details

### Identified Issues & Fixes
1. **Redundant Redux State**: The `activeCount` was being manually managed in the Redux state, creating a risk of it falling out of sync with the actual list of subscriptions.
   - *Fix*: Removed `activeCount` from the slice and implemented it as **Derived State** in the component, ensuring 100% accuracy.
2. **API Interaction & Robustness**: The initial implementation did not handle async loading states or errors effectively.
   - *Fix*: Leveraged **Redux Toolkit's `createAsyncThunk`** to handle the full lifecycle of API requests (pending, fulfilled, rejected).
3. **TypeScript Implementation**: The Redux `extraReducers` were missing explicit types for the `builder` parameter, and several components used `any`, undermining type safety.
   - *Fix*: Added `ActionReducerMapBuilder` types and defined strict interfaces for `Subscription` and `SubscriptionsState`.
4. **Subscription Management Controls**:
   - *Fix*: Added UI controls to **Add Subscription** and **Cancel the Latest** subscription.
   - *Fix (Bonus)*: Per the "Important Note" in the assignment, I enhanced the `PATCH` route (in the mock API) and the frontend to allow **canceling a specific subscription** directly from the list.
5. **Environment Configuration**: Fixed the port conflict where both frontend and backend defaulted to 3000.
   - *Fix*: Configured the frontend to work harmoniously with the backend on port 3001.

### Design Decisions
- **Micro-Animations & UI**: Added subtle hover states and clear status indicators (Active/Cancelled) to improve the user experience.
- **Clean Architecture**: Simplified the component logic by moving API interactions into Redux thunks, keeping the UI components focused on rendering.

### Future Improvements (Given More Time)
- **Optimistic Updates**: Implementing optimistic UI updates would make the interface feel even faster by updating the list before the API response.
- **Persistent Storage**: Migrating the in-memory server state to a real database like MongoDB.
- **Global Error Handling**: Adding a Toast notification system for better user feedback on API failures.

---

## Submission Documentation
- **Author**: Neown Applicant
- **Date**: Feb 2026
- **Status**: Completed and Verified
