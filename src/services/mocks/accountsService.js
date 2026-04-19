import { accounts, totalCount } from './fixtures/accounts.js'

const MOCK_DELAY_MS = 300

export async function getAccounts(moderatorId) {
  // COPPA: reject requests from unauthenticated/unknown moderators
  if (!moderatorId) {
    return Promise.reject({ status: 403, message: 'Forbidden' })
  }
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY_MS))
  return { accounts, totalCount }
}
