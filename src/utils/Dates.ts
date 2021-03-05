import moment from 'moment'

export const formatTimestamp = (timestamp: number): string => {
  return moment.unix(timestamp).format('MM/DD/YYYY')
}

export const currentTimestamp = (): number => {
  return moment().unix()
}
