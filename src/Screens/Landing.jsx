import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Login from "./../Components/Login";

const Landing = () => {
  return (
    <div>
      <Grid container spacing={2} sx={{ height: "90vh" }}>
        <Grid
          item
          xs={0}
          sm={6}
          md={5}
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              m: {
                xs: 1,
                sm: 4,
              },
              p: {
                sm: 2,
              },
            }}
          >
            <Typography
              variant="h2"
              gutterBottom
              component="div"
              color="primary"
            >
              Messaging
            </Typography>
            <Typography variant="h3" gutterBottom component="div">
              Simplified
            </Typography>
            <Typography variant="h5" gutterBottom component="div">
              Login • Add Contacts • Start Chatting
            </Typography>
            <Button sx={{ mt: 1 }} variant="contained">
              <Login signInMessage="Get Started" />
            </Button>
          </Box>
        </Grid>
        <Grid
          item
          xs={0}
          sm={6}
          md={7}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></Grid>
      </Grid>
    </div>
  );
};

export default Landing;
