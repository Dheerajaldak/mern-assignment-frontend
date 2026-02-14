'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { addSubscription, cancelSubscription, fetchSubscriptions, Subscription } from '../store/subscriptionsSlice';

export const SubscriptionsTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector(
    (state: RootState) => state.subscriptions
  );

  /**
   * Derived State: Redundant state has been removed from the Redux slice.
   * 'activeCount' is now calculated on the fly, ensuring it's always in sync with the data.
   */
  const activeCount = data.filter((s: Subscription) => s.status === 'active').length;

  useEffect(() => {
    // Fetch initial list of subscriptions on component mount
    dispatch(fetchSubscriptions());
  }, [dispatch]);

  const handleAdd = () => {
    dispatch(addSubscription());
  };

  const handleCancel = (id?: string) => {
    dispatch(cancelSubscription(id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3>Active subscriptions: {activeCount}</h3>
        <button
          id="add-subscription-btn"
          onClick={handleAdd}
          style={{ padding: '8px 16px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Add Subscription
        </button>
        <button
          id="cancel-latest-btn"
          onClick={() => handleCancel()}
          style={{ marginLeft: '10px', padding: '8px 16px', backgroundColor: '#ff4040', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Cancel Latest
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {data.map((s: Subscription) => (
          <li key={s.id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span>ID: {s.id} - <strong>{s.status}</strong></span>
            {s.status === 'active' && (
              <button
                id={`cancel-btn-${s.id}`}
                onClick={() => handleCancel(s.id)}
                style={{ padding: '4px 8px', fontSize: '12px' }}
              >
                Cancel This
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
