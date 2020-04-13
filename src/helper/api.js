const USERNAME = "pankaj2k9"
const PASSWORD = "5369122d"

const customHeaders = new Headers()

customHeaders.append(
  "Authorization",
  `Basic ${btoa(`${USERNAME}:${PASSWORD}`)}`
)

export const getArrivals = ({ code, start, end }) => {
  return fetch(
    `https://opensky-network.org/api/flights/arrival?airport=${code}&begin=${start}&end=${end}`,
    {
      method: "GET",
      headers: { ...customHeaders, "Access-Control-Allow-Origin": "*" },
    }
  )
    .then((response) => {
      return response.json()
    })
    .catch((err) => console.log(err))
}

export const getDepreture = ({ code, start, end }) => {
  return fetch(
    `https://opensky-network.org/api/flights/departure?airport=${code}&begin=${start}&end=${end}`,
    {
      method: "GET",
      headers: { ...customHeaders, "Access-Control-Allow-Origin": "*" },
    }
  )
    .then((response) => {
      return response.json()
    })
    .catch((err) => console.log(err))
}

export const getFlightInfo = ({ code, start, end }) => {
  return fetch(
    `https://opensky-network.org/api/flights/aircraft?icao24=${code}&begin=${start}&end=${end}`,
    {
      method: "GET",
      headers: { ...customHeaders, "Access-Control-Allow-Origin": "*" },
    }
  )
    .then((response) => {
      return response.json()
    })
    .catch((err) => console.log(err))
}
