import React from "react"

import { Grid } from "@mui/material"

import RadarSalesChart from "./maintenance/RadarSalesChart"
import EarningReportsWithTabs from "./maintenance/EarningReportsWithTabs"

const DashboardMaintenance = () => {
  return (
    <React.Fragment>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={8}>
          <EarningReportsWithTabs />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <RadarSalesChart />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default DashboardMaintenance
