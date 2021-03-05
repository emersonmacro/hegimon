import { request, gql } from 'graphql-request'

import { IOption } from '../interfaces/IOption'
import { IPriceResponse } from '../interfaces/IPriceResponse'
import { IStats } from '../interfaces/IStats'

import { currencyFormatter } from '../utils/Currency'
import { currentTimestamp } from '../utils/Dates'

const COINGECKO_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,wrapped-bitcoin&vs_currencies=usd'
const GRAPHQL_URL = 'https://api.thegraph.com/subgraphs/name/ppunky/hegic-v888'

const getQuery = (skip = 0) => gql`
  query GetOptions {
    options(first: 100, skip: ${ skip }, where: { status: "ACTIVE" }) {
      id
      account
      symbol
      status
      strike
      amount
      lockedAmount
      timestamp
      block
      period
      expiration
      type
      premium
      settlementFee
      totalFee
      exercise_timestamp
      exercise_tx
      profit
      impliedVolatility
    }
  }
`

export const getOptionsData: () => Promise<IOption[]> = async () => {
  let optionsData: IOption[] = []
  let skipCounter = 0
  for (let i = 0; i < 100; i++) {
    const data = await request(GRAPHQL_URL, getQuery(skipCounter))
    optionsData = [...optionsData, ...data.options]
    if (data.options.length < 100) {
      break
    }
    skipCounter = skipCounter + 100
  }
  return optionsData
}

export const getPriceData: () => Promise<IPriceResponse> = async () => {
  return (await fetch(COINGECKO_URL)).json()
}

export const processData = (optionsData: IOption[], priceData: IPriceResponse | null): IOption[] => {
  if (priceData === null) {
    return []
  }
  return optionsData.map((option) => {
    // process expiration
    option._periodInDays = option.period! / 86400
    const now = currentTimestamp()
    option._remainingDays = (option.expiration - now) / 86400
    // process moneyness
    const referencePrice = option.symbol === 'ETH' ? priceData.ethereum.usd : priceData['wrapped-bitcoin'].usd
    if (option.type === 'CALL') {
      option._moneyness = referencePrice > parseFloat(option.strike!) ? 'ITM' : 'OTM'
    } else {
      option._moneyness = referencePrice < parseFloat(option.strike!) ? 'ITM' : 'OTM'
    }
    return option
  })
}

export const computeStats = (data: IOption[]): IStats => {
  const puts = data.filter((o) => o.type === 'PUT')
  const calls = data.filter((o) => o.type === 'CALL')
  const pcRatioRaw = puts.length / calls.length
  const pcRatio = Math.round((pcRatioRaw + Number.EPSILON) * 100) / 100
  const itm = data.filter((o) => o._moneyness === 'ITM')
  const otm = data.filter((o) => o._moneyness === 'OTM')
  const notional = data.reduce((sum, current) => {
    const amount = parseFloat(current.amount)
    const strike = parseFloat(current.strike)
    return (amount * strike) + sum
  }, 0)
  return {
    total: data.length,
    puts: puts.length,
    calls: calls.length,
    pcRatio,
    itm: itm.length,
    otm: otm.length,
    notional: currencyFormatter.format(notional),
  }
}

export const findOption = (activeId: string, ethData: IOption[], wbtcData: IOption[]): IOption | undefined => {
  const ethOption = ethData.find((o) => o.id === activeId)
  if (Boolean(ethOption)) {
    return ethOption
  }
  const wbtcOption = wbtcData.find((o) => o.id === activeId)
  return wbtcOption
}
