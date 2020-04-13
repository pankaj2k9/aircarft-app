import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import CustomModal from "../utils/modal"

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}))

const cards = [
  { name: "London", code: "EGLW" },
  { name: "New York", code: "0NY6" },
  { name: "Tokyo", code: "RJTT" },
  { name: "Shanghai", code: "ZSPD" },
  { name: "Los Angeles", code: "KLAX" },
  { name: "Paris", code: "LFPG" },
  { name: "Beijing", code: "ZBAA" },
  { name: "Atlanta", code: "KATL" },
  { name: "Chicago", code: "KORD" },
  { name: "Bangkok", code: "VTBD" },
]

const Home = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [selectedId, setSelectedId] = useState("")

  const setOpenHandler = (isOpen) => {
    setOpen(isOpen)
  }

  const onClickHandler = (id) => {
    setOpen(true)
    setSelectedId(id)
  }

  return (
    <>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Top Airport By City
          </Typography>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card.code} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://source.unsplash.com/random"
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {card.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => onClickHandler(card.code)}
                  >
                    Airport
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <CustomModal cityId={selectedId} open={open} setOpen={setOpenHandler} />
      </Container>
    </>
  )
}

export default Home
