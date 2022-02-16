import { createSelector } from 'reselect'

// Reserve
export const isReserveLoaded = createSelector([(state) => state?.operations?.reserve?.loaded],
  (loaded) => loaded)
export const isReserveLoading = createSelector([(state) => state?.operations?.reserve?.loading],
  (loading) => loading)
export const reserveError = createSelector([(state) => state?.operations?.reserve?.error],
  (error) => error)
export const lastReserved = createSelector([(state) => state?.operations?.reserve?.res],
  (lastReserved) => lastReserved)

// Release
export const isReleaseLoaded = createSelector([(state) => state?.operations?.release?.loaded],
  (loaded) => loaded)
export const isReleaseLoading = createSelector([(state) => state?.operations?.release?.loading],
  (loading) => loading)
export const releaseError = createSelector([(state) => state?.operations?.release?.error],
  (error) => error)
export const lastReleased = createSelector([(state) => state?.operations?.release?.res],
  (lastReleased) => lastReleased) 

// Refund
export const isRefundLoaded = createSelector([(state) => state?.operations?.refund?.loaded],
  (loaded) => loaded)
export const isRefundLoading = createSelector([(state) => state?.operations?.refund?.loading],
  (loading) => loading)
export const refundError = createSelector([(state) => state?.operations?.refund?.error],
  (error) => error)
export const lastRefunded = createSelector([(state) => state?.operations?.refund?.res],
  (lastRefunded) => lastRefunded) 

// Capture
export const isCaptureLoaded = createSelector([(state) => state?.operations?.capture?.loaded],
  (loaded) => loaded)
export const isCaptureLoading = createSelector([(state) => state?.operations?.capture?.loading],
  (loading) => loading)
export const captureError = createSelector([(state) => state?.operations?.capture?.error],
  (error) => error)
export const lastCaptured = createSelector([(state) => state?.operations?.capture?.res],
  (lastCaptured) => lastCaptured) 