import { Alert, Col, Row } from 'reactstrap'

import './AssetModule.css'

import { IOption } from '../../interfaces/IOption'
import { IStats } from '../../interfaces/IStats'

import { computeStats } from '../../utils/Data'

import Chart from '../Chart/Chart'

interface IAssetModuleProps {
  asset: string
  data: IOption[]
  setActiveId: Function
  currentPrice: number | undefined
}

const AssetModule = ({ asset, data, setActiveId, currentPrice }: IAssetModuleProps) => {
  
  const stats: IStats = computeStats(data)
  
  return (
    <>

      <div className="chart-container">
        <Chart
          asset={ asset }
          data={ data }
          setActiveId={ setActiveId }
          currentPrice={ currentPrice }
        />
      </div>

      <Alert
        color={ asset === 'ETH' ? 'primary' : 'success' }
        className="asset-alert"
      >
        <h5 className="text-center asset-header">
          { asset }
        </h5>
      </Alert>

      <Row className="stat-row">
        <Col>Active Contracts</Col>
        <Col className="text-right"><b>{ stats.total }</b></Col>
      </Row>

      <Row className="stat-row">
        <Col>Puts</Col>
        <Col className="text-right"><b>{ stats.puts }</b></Col>
      </Row>

      <Row className="stat-row">
        <Col>Calls</Col>
        <Col className="text-right"><b>{ stats.calls }</b></Col>
      </Row>

      <Row className="stat-row">
        <Col>Put/Call Ratio</Col>
        <Col className="text-right"><b>{ stats.pcRatio }</b></Col>
      </Row>

      <Row className="stat-row">
        <Col>ITM / OTM</Col>
        <Col className="text-right"><b>{ stats.itm } / { stats.otm }</b></Col>
      </Row>

      <Row className="stat-row">
        <Col>Total Notional</Col>
        <Col className="text-right"><b>{ stats.notional }</b></Col>
      </Row>

    </>
  )
}

export default AssetModule
