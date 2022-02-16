import { createSelector } from 'reselect'

export const loaded = createSelector([
  (state) => state?.orders?.loaded,
],
  (loaded) => loaded
)

export const loading = createSelector([
  (state) => state?.orders?.loading,
],
  (loading) => loading
)

export const error = createSelector([
  (state) => state?.orders?.error,
],
  (error) => error
)

export const all = createSelector([
  (state) => state?.orders?.get?.all,
],
  (allOrders) => allOrders
)
