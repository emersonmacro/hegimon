export const formatTimestamp = (timestamp: number): string => {
  const dateObject = new Date(timestamp * 1000)
  return `${ dateObject.getMonth() + 1 }/${ dateObject.getDate() }/${ dateObject.getFullYear() }`
}

export const currentTimestamp = (): number => Math.floor(Date.now() / 1000)
