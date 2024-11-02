'use client'
import React from "react"

import { Grid } from "@mui/material"

import EarningReports from "./ticket/EarningReports"
import SupportTracker from "./ticket/SupportTracker"

const DashboardTicket = () => {
  return (
    <React.Fragment>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <EarningReports />
        </Grid>
        <Grid item xs={12} md={6}>
          <SupportTracker />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default DashboardTicket
