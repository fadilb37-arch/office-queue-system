'use client'

import { Card, CardContent, Typography, Stack, Box } from '@mui/material'

const news = [
  "Predict the final top six",
  "Alan Shearer's Team of the Week",
  "Will PL have FIVE Champions League spots?",
  "PL stars pay tribute to Milner",
  "Latest player injuries"
]

export default function NewsList() {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Latest News
        </Typography>

        <Stack spacing={2}>
          {news.map((item, index) => (
            <Box
              key={index}
              display="flex"
              gap={2}
              alignItems="center"
              sx={{
                p: 1,
                borderRadius: 2,
                cursor: 'pointer'
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: 2
                }}
              />
                <Typography variant="body2" fontWeight="medium">
                  {item}
                </Typography>
              </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}