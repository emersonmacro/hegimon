import {
  VictoryChart,
  VictoryScatter,
  VictoryAxis,
  VictoryLine,
  VictoryVoronoiContainer,
  VictoryTooltip,
} from 'victory'

import { IOption } from '../../interfaces/IOption'

import { currencyFormatter } from '../../utils/Currency'

const COLORS = {
  axis: '#7C858F',
  background: '#263136',
  ethCallFill: '#509BC2',
  ethPutFill: '#3C738F',
  wbtcCallFill: '#7EBF8D',
  wbtcPutFill: '#5E8D69',
  dataStroke: '#BAD9E9',
  ethPriceLine: '#007bff',
  wbtcPriceLine: '#28a745',
}

interface IChartProps {
  asset: string
  data: IOption[]
  setActiveId: Function
  currentPrice: number | undefined
}

const Chart = ({ asset, data, setActiveId, currentPrice }: IChartProps) => {

  if (data.length === 0) {
    return <div>No results found</div>
  }

  const mappedData = data.map((d) => {
    return {
      x: parseFloat(d.strike),
      y: parseFloat(d.amount),
      id: d.id,
      type: d.type,
    }
  })

  const xDomain = [Math.min(...data.map(d => parseFloat(d.strike))), Math.max(...data.map(d => parseFloat(d.strike)))] as [number, number]
  const yDomain = [Math.min(...data.map(d => parseFloat(d.amount))), Math.max(...data.map(d => parseFloat(d.amount)))] as [number, number]

  const axisStyles = {
    axis: {stroke: COLORS.axis},
    tickLabels: {fill: COLORS.axis, fontSize: 10},
    axisLabel: {fill: COLORS.axis, fontSize: 12, padding: 30, fontFamily: 'Courier'},
    ticks: {stroke: COLORS.axis, strokeWidth: 4, strokeOpacity: 0.6},
  }

  return (
    <VictoryChart
      domain={{ x: xDomain, y: yDomain }}
      style={{
        background: { fill: COLORS.background },
      }}
      padding={{
        top: 5,
        bottom: 50,
        left: 40,
        right: 40,
      }}
      containerComponent={ <VictoryVoronoiContainer/> }
    >
      <VictoryAxis
        dependentAxis
        label="Size"
        style={ axisStyles }
      />
      <VictoryAxis
        label="Strike"
        style={ axisStyles }
      />
      <VictoryLine
        style={{
          data: {
            stroke: asset === 'ETH' ? COLORS.ethPriceLine : COLORS.wbtcPriceLine,
            strokeWidth: 0.5,
          }
        }}
        x={ () => currentPrice }
        labels={() => `Current Price: ${ currentPrice ? currencyFormatter.format(currentPrice) : '' }`}
        labelComponent={
          <VictoryTooltip
            style={{ fontSize: 10 }}
          />
        }
      />
      <VictoryScatter
        name="active-options"
        style={{
          data: {
            fill: ({datum}) => {
              if (asset === 'ETH') {
                return datum.type === 'CALL' ? COLORS.ethCallFill : COLORS.ethPutFill
              } else {
                return datum.type === 'CALL' ? COLORS.wbtcCallFill : COLORS.wbtcPutFill
              }
            },
            stroke: COLORS.dataStroke,
            strokeWidth: 0.5,
            fillOpacity: 0.85,
          }
        }}
        size={ 3 }
        data={ mappedData }
        events={[
          {
            target: 'data',
            eventHandlers: {
              onClick: () => {
                return [
                  {
                    target: 'data',
                    mutation: (props) => {
                      setActiveId(props.datum.id)
                    }
                  }
                ]
              },
              onMouseOver: () => {
                return [
                  {
                    target: 'data',
                    mutation: (props) => {
                      return {
                        style: {
                          fill: ({datum}: any) => {
                            if (asset === 'ETH') {
                              return datum.type === 'CALL' ? COLORS.ethCallFill : COLORS.ethPutFill
                            } else {
                              return datum.type === 'CALL' ? COLORS.wbtcCallFill : COLORS.wbtcPutFill
                            }
                          },
                          stroke: 'white',
                          strokeWidth: 0.8,
                          fillOpacity: 0.65,
                        }
                      }
                    }
                  }
                ]
              },
              onMouseOut: () => {
                return [
                  {
                    target: 'data',
                    mutation: (props) => {
                      return {
                        style: {
                          fill: ({datum}: any) => {
                            if (asset === 'ETH') {
                              return datum.type === 'CALL' ? COLORS.ethCallFill : COLORS.ethPutFill
                            } else {
                              return datum.type === 'CALL' ? COLORS.wbtcCallFill : COLORS.wbtcPutFill
                            }
                          },
                          stroke: COLORS.dataStroke,
                          strokeWidth: 0.5,
                          fillOpacity: 0.85,
                        }
                      }
                    }
                  }
                ]
              }
            }
          }
        ]}
      />
    </VictoryChart>
  )

}

export default Chart
