import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from 'reactstrap'

import './StatsModal.css'

import { IOption } from '../../interfaces/IOption'
import { IStats } from '../../interfaces/IStats'

import { computeStats } from '../../utils/Data'

interface IStatsModalProps {
  ethData: IOption[]
  wbtcData: IOption[]
  isOpen: boolean
  toggleModal: any
}

const StatsModal = ({ ethData, wbtcData, isOpen, toggleModal }: IStatsModalProps) => {

  const ethStats: IStats = computeStats(ethData)
  const wbtcStats: IStats = computeStats(wbtcData)
  const totalStats: IStats = computeStats([...ethData, ...wbtcData])

  return (
    <Modal
      size="lg"
      fade={ false }
      isOpen={ isOpen }
      toggle={ toggleModal }
    >

      <ModalHeader
        className="modal-section"
      >
        Total Stats
      </ModalHeader>

      <ModalBody
        className="modal-section"
      >

        <Table borderless>
          <thead>
            <tr>
              <th className="table-text"></th>
              <th className="table-text text-right">ETH</th>
              <th className="table-text text-right">WBTC</th>
              <th className="table-text text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="table-text">Active Contracts</td>
              <td className="table-text text-right">{ ethStats.total }</td>
              <td className="table-text text-right">{ wbtcStats.total }</td>
              <td className="table-text text-right">{ totalStats.total }</td>
            </tr>
            <tr>
              <td className="table-text">Puts</td>
              <td className="table-text text-right">{ ethStats.puts }</td>
              <td className="table-text text-right">{ wbtcStats.puts }</td>
              <td className="table-text text-right">{ totalStats.puts }</td>
            </tr>
            <tr>
              <td className="table-text">Calls</td>
              <td className="table-text text-right">{ ethStats.calls }</td>
              <td className="table-text text-right">{ wbtcStats.calls }</td>
              <td className="table-text text-right">{ totalStats.calls }</td>
            </tr>
            <tr>
              <td className="table-text">Put/Call Ratio</td>
              <td className="table-text text-right">{ ethStats.pcRatio }</td>
              <td className="table-text text-right">{ wbtcStats.pcRatio }</td>
              <td className="table-text text-right">{ totalStats.pcRatio }</td>
            </tr>
            <tr>
              <td className="table-text">ITM / OTM</td>
              <td className="table-text text-right">{ ethStats.itm } / { ethStats.otm }</td>
              <td className="table-text text-right">{ wbtcStats.itm } / { wbtcStats.otm }</td>
              <td className="table-text text-right">{ totalStats.itm } / { totalStats.otm }</td>
            </tr>
            <tr>
              <td className="table-text">Total Notional</td>
              <td className="table-text text-right">{ ethStats.notional }</td>
              <td className="table-text text-right">{ wbtcStats.notional }</td>
              <td className="table-text text-right">{ totalStats.notional }</td>
            </tr>
          </tbody>
        </Table>

      </ModalBody>

      <ModalFooter
        className="modal-section"
      >
        <Button
          outline
          size="sm"
          color="secondary"
          onClick={ () => toggleModal() }
        >
          Close
        </Button>
      </ModalFooter>

    </Modal>
  )

}

export default StatsModal
