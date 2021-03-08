import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from 'reactstrap'

import './DetailsModal.css'

import { IOption } from '../../interfaces/IOption'

import { currencyFormatter } from '../../utils/Currency'
import { formatTimestamp } from '../../utils/Dates'

interface IDetailsModalProps {
  option: IOption | null | undefined
  isOpen: boolean
  toggleModal: any
}

const DetailsModal = ({ option, isOpen, toggleModal }: IDetailsModalProps) => {

  if (!option) {
    return null
  }

  const notional = parseFloat(option.amount) * parseFloat(option.strike)
  const accountUrl = `https://etherscan.io/address/${ option.account }`
  const blockUrl = `https://etherscan.io/block/${ option.block }`

  return (
    <Modal
      fade={ false }
      isOpen={ isOpen }
      toggle={ toggleModal }
    >

      <ModalHeader
        className="modal-section"
      >
        { option.id }
      </ModalHeader>

      <ModalBody
        className="modal-section"
      >

        <Row>
          <Col>ID</Col>
          <Col className="text-right"><b>{ option.id }</b></Col>
        </Row>

        <Row>
          <Col>Underlying</Col>
          <Col className="text-right"><b>{ option.symbol }</b></Col>
        </Row>

        <Row>
          <Col>Type</Col>
          <Col className="text-right"><b>{ option.type }</b></Col>
        </Row>

        <Row>
          <Col>Amount</Col>
          <Col className="text-right"><b>{ option.amount }</b></Col>
        </Row>

        <Row>
          <Col>Strike</Col>
          <Col className="text-right"><b>{ currencyFormatter.format(parseFloat(option.strike)) }</b></Col>
        </Row>

        <Row>
          <Col>Notional</Col>
          <Col className="text-right"><b>{ currencyFormatter.format(notional) }</b></Col>
        </Row>

        <Row>
          <Col>Moneyness</Col>
          <Col className="text-right"><b>{ option._moneyness }</b></Col>
        </Row>

        <Row>
          <Col>Timestamp</Col>
          <Col className="text-right"><b>{ formatTimestamp(option.timestamp) }</b></Col>
        </Row>

        <Row>
          <Col>Expiration</Col>
          <Col className="text-right"><b>{ formatTimestamp(option.expiration) }</b></Col>
        </Row>

        <Row>
          <Col>Duration</Col>
          <Col className="text-right"><b>{ option._periodInDays }</b></Col>
        </Row>

        <Row>
          <Col>Days until Expiration</Col>
          <Col className="text-right"><b>{ option._remainingDays?.toFixed(2) }</b></Col>
        </Row>

        <Row>
          <Col>Premium</Col>
          <Col className="text-right"><b>{ option.premium }</b></Col>
        </Row>

        <Row>
          <Col>Settlement Fee</Col>
          <Col className="text-right"><b>{ option.settlementFee }</b></Col>
        </Row>

        <Row>
          <Col>Total Fee</Col>
          <Col className="text-right"><b>{ option.totalFee }</b></Col>
        </Row>

        <Row>
          <Col>Account</Col>
          <Col className="text-right">
            <a href={ accountUrl } target="_BLANK"  rel="noreferrer" className="link">
              <b>{ option.account }</b>
            </a>
          </Col>
        </Row>

        <Row>
          <Col>Block</Col>
          <Col className="text-right">
            <a href={ blockUrl } target="_BLANK" rel="noreferrer">
              <b>{ option.block }</b>
            </a>
          </Col>
        </Row>

        <Row>
          <Col>Locked Amount</Col>
          <Col className="text-right"><b>{ option.lockedAmount }</b></Col>
        </Row>

        <Row>
          <Col>Implied Volatility</Col>
          <Col className="text-right"><b>{ option.impliedVolatility }</b></Col>
        </Row>

        <Row>
          <Col>Status</Col>
          <Col className="text-right"><b>{ option.status }</b></Col>
        </Row>

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

export default DetailsModal
