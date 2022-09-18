import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";

interface ICardOfValuesProps {
  title: string;
  value: number;
}

function CardOfValue({ title, value }: ICardOfValuesProps) {
  return (
    <Grid xs={12} md={2} sx={{ p: 1 }}>
      <Paper elevation={5} sx={{ height: 245 }}>
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" height="100%">
          <Typography variant="subtitle1" color="#33467B" mb={4} mt={-3}>
            {title}
          </Typography>
          <Typography variant="h2" color="#33467B">
            <b>{value}</b>
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
}

export default CardOfValue;
