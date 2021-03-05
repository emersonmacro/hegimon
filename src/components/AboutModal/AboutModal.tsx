import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'

import './AboutModal.css'

interface IAboutModalProps {
  isOpen: boolean
  toggleModal: any
}

const AboutModal = ({ isOpen, toggleModal }: IAboutModalProps) => {

  return (
    <Modal
      fade={ false }
      isOpen={ isOpen }
      toggle={ toggleModal }
    >

      <ModalHeader
        className="modal-section"
      >
        About Hegimon
      </ModalHeader>

      <ModalBody
        className="modal-section"
      >

        <p>
          Hegimon is a data visualization tool for active option contracts on the Hegic v888 protocol.
        </p>

        <ul>
          <li>Light dots represent call options</li>
          <li>Dark dots represent put options</li>
          <li>Click on a dot to see details for that contract</li>
          <li>Notional = Strike * Amount</li>
        </ul>

        <br />

        <p className="text-center">
          Powered by <a href="https://www.hegic.co" target="_BLANK">Hegic</a>, <a href="https://www.coingecko.com/en/api" target="_BLANK">CoinGecko</a>, and <a href="https://thegraph.com" target="_BLANK">Graph Protocol</a>
        </p>

        <p className="text-center">
          Made by <a href="https://twitter.com/EmersonMacro" target="_BLANK">@EmersonMacro</a>
        </p>

        <p className="text-center">
          <a href="https://github.com/emersonmacro/hegimon" target="_BLANK">Source on Github</a>
        </p>

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

export default AboutModal
