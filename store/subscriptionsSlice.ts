import { createSlice, createAsyncThunk, ActionReducerMapBuilder } from "@reduxjs/toolkit";

/**
 * Async thunk to fetch all subscriptions from the API.
 * Uses standard fetch API targeting the Next.js edge route.
 */

export const fetchSubscriptions = createAsyncThunk(
  "subscriptions/fetch",
  async () => {
    const res = await fetch('/api/subscriptions');
    return res.json();
  }
);

export const addSubscription = createAsyncThunk(
  "subscriptions/add",
  async () => {
    // Backend creates a new 'active' subscription on POST
    const res = await fetch('/api/subscriptions', { method: 'POST' });
    return res.json();
  }
);

/**
 * Async thunk to cancel a subscription.
 * Accepts an optional 'id' to cancel a specific subscription.
 * If no id is provided, the backend cancels the first active subscription.
 */
export const cancelSubscription = createAsyncThunk(
  "subscriptions/cancel",
  async (id: string | undefined) => {
    // API was enhanced to handle specific IDs in the request body
    const res = await fetch('/api/subscriptions', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    return res.json();
  }
);

export type Subscription = {
  id: string;
  status: 'active' | 'cancelled';
};

export type SubscriptionsState = {
  data: Subscription[];
  loading: boolean;
};

const initialState: SubscriptionsState = {
  data: [],
  loading: false,
};

const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<SubscriptionsState>) => {
    builder
      .addCase(fetchSubscriptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(addSubscription.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(cancelSubscription.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.data.findIndex(s => s.id === action.payload.id);
          if (index !== -1) {
            state.data[index] = action.payload;
          }
        }
      });
  }
});

export default subscriptionsSlice.reducer;
