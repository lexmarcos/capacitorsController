import React from "react";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { RestartAlt } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { api } from "../../services/api";

interface IDevice {
  controller_id: string;
  in_error: boolean;
  error_info: {
    message: string | null;
    first_time_notified: string | null;
    last_time_notified: string | null;
  };
  last_measurement: {
    controller_id: string;
    power_factor: number;
    active_power: number;
    reactive_power: number;
    voltage: number;
    current: number;
    uptime: number;
    received_at: string;
  };
}

function Home() {
  const navigate = useNavigate();

  const getDevices = async () => {
    const res: IDevice[] = await api.get("/devices");
    return res;
  };

  const { data: devices } = useQuery("devices", getDevices, {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const generateDevicesList = () => {
    if(!devices) return null;
    return devices.map((row) => (
      <TableRow
        hover
        key={row.controller_id}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
          cursor: "pointer",
        }}
        onClick={() => navigate(`/dashboard/${row.controller_id}`)}
      >
        <TableCell component="th" scope="row">
          {row.controller_id}
        </TableCell>
        <TableCell align="left">
          <Box display="flex" alignItems="center">
            <Chip
              color={row.in_error ? "error" : "success"}
              label={row.in_error ? "Offline" : "Online"}
            ></Chip>
            <Typography
              variant="caption"
              ml={2}
              style={{ fontStyle: "italic" }}
              color="#303030"
              fontWeight={300}
            >
              Atualizado em: {new Date(row.last_measurement.received_at).toLocaleString()}
            </Typography>
          </Box>
        </TableCell>
      </TableRow>
    ))
  }

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          color="#33467B"
          sx={{ pt: 16, pb: 4 }}
        >
          <Typography variant="h4">
            <b>Selecione um dispositivo para visualizar as medições</b>
          </Typography>
          <Box display="flex" alignItems="center">
            <RestartAlt sx={{ color: "#7B7B7B" }} />
            <Typography variant="body1" fontWeight={400} color="#7B7B7B" ml={1}>
              Atualizado às 19h
            </Typography>
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Tabela com os capacitores">
            <TableHead>
              <TableRow>
                <TableCell>MAC</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {generateDevicesList()}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default Home;
