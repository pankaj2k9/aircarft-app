import React, { useEffect, useState, useCallback } from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import { getArrivals, getDepreture, getFlightInfo } from "../helper/api"

const getModalStyle = () => {
  const top = "20%"
  const left = "35%"

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    top: "20%",
    left: "35%",
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

const CustomModal = (props) => {
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  const [diffeenceBetweenTime, setDiffeenceBetweenTime] = useState(10)
  const [arrivalData, setArrivalData] = useState()
  const [depratureData, setDepratureData] = useState()
  const [flightInfo, setFlightInfo] = useState()
  const { setOpen, open, cityId } = props
  const requestData = {
    code: cityId,
    start: Math.round(new Date().getTime() / 1000),
    end: Math.round(new Date().getTime() / 1000) + diffeenceBetweenTime * 60,
  }

  const getArrivalByAirport = useCallback(() => {
    getArrivals({ ...requestData }).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setArrivalData(data)
      }
    })
  }, [requestData])

  const getDepratureByAirport = useCallback(() => {
    getDepreture({ ...requestData }).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setDepratureData(data)
      }
    })
  }, [requestData])

  const getFlightInfoData = useCallback(() => {
    const icao24code = arrivalData && arrivalData[0] && arrivalData[0].icao24
    getFlightInfo({ ...requestData, code: icao24code }).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setFlightInfo(data)
      }
    })
  }, [arrivalData, requestData])

  useEffect(() => {
    getArrivalByAirport()
    getDepratureByAirport()
    getFlightInfoData()
  }, [cityId, getArrivalByAirport, getDepratureByAirport, getFlightInfoData])

  const onSelectHandler = (event) => {
    setDiffeenceBetweenTime(event.target.value)
    getArrivalByAirport()
    getDepratureByAirport()
  }

  const handleClose = () => {
    setOpen(false)
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">flight Details</h2>
      <p>Slected Time</p>
      <select defaultValue={diffeenceBetweenTime} onChange={onSelectHandler}>
        <option value={10}> 10 min</option>
        <option value={15}>15 min</option>
        <option value={20}>20 min</option>
        <option value={30}>30min</option>
      </select>
    </div>
  )

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  )
}

CustomModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  cityId: PropTypes.string.isRequired,
}

export default CustomModal
