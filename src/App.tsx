import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Spinner } from 'reactstrap'

import './App.css'

import { IOption } from './interfaces/IOption'
import { IPriceResponse } from './interfaces/IPriceResponse'

import { findOption, getOptionsData, getPriceData, processData } from './utils/Data'

import AboutModal from './components/AboutModal/AboutModal'
import AssetModule from './components/AssetModule/AssetModule'
import DetailsModal from './components/DetailsModal/DetailsModal'
import Navbar from './components/Navbar/Navbar'
import StatsModal from './components/StatsModal/StatsModal'

const App: React.FC = () => {

  const [ethData, setEthData] = useState<IOption[]>([])
  const [wbtcData, setWbtcData] = useState<IOption[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [priceData, setPriceData] = useState<IPriceResponse | null>(null)
  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState<boolean>(false)
  const [modalOption, setModalOption] = useState<IOption | null | undefined>(null)
  const [statsModalIsOpen, setStatsModalIsOpen] = useState<boolean>(false)
  const [aboutModalIsOpen, setAboutModalIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [hasError, setHasError] = useState<boolean>(false)

  const openDetailsModal = (option: IOption | undefined) => {
    setModalOption(option)
    setDetailsModalIsOpen(true)
  }

  const closeDetailsModal = () => {
    setModalOption(null)
    setDetailsModalIsOpen(false)
  }

  const toggleStatsModal = () => setStatsModalIsOpen(!statsModalIsOpen)
  const toggleAboutModal = () => setAboutModalIsOpen(!aboutModalIsOpen)

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getOptionsData()
        const _priceData = await getPriceData()
        const processedData = processData(data, _priceData)
        setEthData(processedData.filter((o) => o.symbol === 'ETH'))
        setWbtcData(processedData.filter((o) => o.symbol === 'WBTC'))
        setPriceData(_priceData)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
        setIsLoading(false)
        setHasError(true)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    if (Boolean(activeId)) {
      const option = findOption(activeId as string, ethData, wbtcData)
      openDetailsModal(option)
    } else {
      closeDetailsModal()
    }
  }, [activeId, ethData, wbtcData])

  return (
    <div>

      <Navbar
        toggleStatsModal={ toggleStatsModal }
        toggleAboutModal={ toggleAboutModal }
      />

      <Container fluid>

        { isLoading && (
          <div className="d-flex justify-content-center align-self-center spinner-spacing">
            <Spinner color="primary" />
          </div>
        ) }

        { !isLoading && hasError && (
          <h4 className="text-center spinner-spacing">Error loading data. Please try again.</h4>
        ) }

        { !isLoading && !hasError && (

          <Row className="top-row">

          <Col>
            <AssetModule
              asset="ETH"
              data={ ethData }
              setActiveId={ setActiveId }
              currentPrice={ priceData?.ethereum.usd }
            />
          </Col>

          <Col>
            <AssetModule
              asset="WBTC"
              data={ wbtcData }
              setActiveId={ setActiveId }
              currentPrice={ priceData?.['wrapped-bitcoin'].usd }
            />
          </Col>

          </Row>

        ) }

      </Container>

      <DetailsModal
        option={ modalOption }
        isOpen={ detailsModalIsOpen }
        toggleModal={ closeDetailsModal }
      />

      <StatsModal
        ethData={ ethData }
        wbtcData={ wbtcData }
        isOpen={ statsModalIsOpen }
        toggleModal={ toggleStatsModal }
      />

      <AboutModal
        isOpen={ aboutModalIsOpen }
        toggleModal={ toggleAboutModal }
      />

    </div>
  )
}

export default App
