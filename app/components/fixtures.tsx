'use client'

import { Card, CardContent, Typography, Divider, Stack } from '@mui/material'

const fixtures = [
  "Wolves vs Aston Villa - 00:00",
  "Bournemouth vs Sunderland - 16:30",
  "Burnley vs Brentford - 19:00",
  "Liverpool vs West Ham - 19:00",
  "Newcastle vs Everton - 19:00",
  "Leeds vs Man City - 21:30"
]

export default function Fixtures() {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Premier League
        </Typography>

        <Stack spacing={2}>
          {fixtures.map((match, index) => (
            <div key={index}>
              <Typography variant="body2">{match}</Typography>
              {index !== fixtures.length - 1 && <Divider sx={{ mt: 1 }} />}
            </div>
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}