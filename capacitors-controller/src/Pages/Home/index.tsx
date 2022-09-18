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

export const labelOfChips = {
  online: "Online",
  offline: "Offline",
};

export const typesOfChips = {
  online: "success" as "success",
  offline: "error" as "error",
};

function Home() {
  function createData(mac: string, status: "online" | "offline") {
    return { mac, status };
  }

  const navigate = useNavigate();

  const rows = [
    createData("EE-88-B4-F2-8D-42", "online"),
    createData("EE-88-B4-F2-8D-42", "online"),
    createData("EE-88-B4-F2-8D-42", "online"),
    createData("EE-88-B4-F2-8D-42", "online"),
    createData("EE-88-B4-F2-8D-42", "offline"),
  ];

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Box display="flex" alignItems="center" justifyContent="space-between" color="#33467B" sx={{ pt: 16, pb: 4 }}>
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
              {rows.map((row) => (
                <TableRow
                  hover
                  key={row.mac}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 }, cursor: "pointer" }}
                  onClick={() => navigate(`/dashboard/${row.mac}`)}
                >
                  <TableCell component="th" scope="row">
                    {row.mac}
                  </TableCell>
                  <TableCell align="left">
                    <Box display="flex" alignItems="center">
                      <Chip color={typesOfChips[row.status]} label={labelOfChips[row.status]}></Chip>
                      <Typography variant="caption" ml={2} style={{ fontStyle: "italic" }} color="#303030" fontWeight={300}>
                        online desde 18h30
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default Home;
