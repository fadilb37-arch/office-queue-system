'use client'

import { supabase } from '@/lib/supabase'
import { useState } from 'react'

import { Box, Container, Grid, Button, Typography } from '@mui/material'
import Navbar from "./components/navbar"
import Hero from "./components/hero"
import NewsList from "./components/newslist"
import Fixtures from "./components/fixtures"

export default function Home() {

  return (
  <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
    <Navbar />

    <Container sx={{ py: 6 }}>
        <Grid container spacing={4}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Hero />
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Box display="flex" flexDirection="column" gap={4}>
            <NewsList />
            <Fixtures />
          </Box>
        </Grid>
      </Grid>
    </Container>
  </Box>
  )
}
