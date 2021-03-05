export interface IOption {
  // fields from Hegic subgraph
  id: string
  account: string
  symbol: string
  status: string
  strike: string
  amount: string
  lockedAmount: string
  timestamp: number
  block: string
  period: number
  expiration: number
  type: string
  premium: string
  settlementFee: string
  totalFee: string
  exercise_timestamp: any
  exercise_tx: any
  profit: any
  impliedVolatility: string
  // fields calculated by hegimon
  _periodInDays?: number
  _remainingDays?: number
  _moneyness?: string
}
