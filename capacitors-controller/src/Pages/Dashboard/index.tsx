import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import Paper from "@mui/material/Paper";
import { RestartAlt } from "@mui/icons-material";
import Chip from "@mui/material/Chip";
import { labelOfChips, typesOfChips } from "../Home";
import Switch from "@mui/material/Switch";
import CardOfValue from "./CardOfValues";
import { useNavigate } from "react-router-dom";

interface ICapacitors {
  mac: string;
  status: "online" | "offline";
}

function Dashboard() {
  const [capacitors, setCapacitors] = useState({
    mac: "EE-88-B4-F2-8D-42",
    status: "online",
  } as ICapacitors);

  const [isOnDatabase, setisOnDatabase] = useState(true);

  const navigate = useNavigate();

  return (
    <Grid container spacing={2}>
      <Grid xs={12} sx={{ pt: 16, pb: 4 }}>
        <Box display="flex" alignItems="start" justifyContent="space-between" flexDirection="column">
          <Box display="flex" alignItems="center" sx={{ pb: 4, cursor: "pointer" }} onClick={() => navigate("/")}>
            <ArrowCircleLeftIcon sx={{ color: "#303030" }} />
            <Typography variant="body1" fontWeight={400} color="#303030" ml={1}>
              Voltar
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
            <Typography variant="h4" color="#33467B">
              <b>Dados do dispositivo</b>
            </Typography>
            <Box display="flex" alignItems="center">
              <RestartAlt sx={{ color: "#7B7B7B" }} />
              <Typography variant="body1" fontWeight={400} color="#7B7B7B" ml={1}>
                Atualizado às 19h
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid xs={12}>
        <Box width="100%">
          <Paper elevation={0} sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center" justifyContent="center">
                <Typography variant="body2" fontWeight={400} color="#7B7B7B" ml={1}>
                  <b>MAC</b> {capacitors.mac}
                </Typography>
                <Box display="flex" alignItems="center" ml={8}>
                  <Chip color={typesOfChips[capacitors.status]} label={labelOfChips[capacitors.status]}></Chip>
                  <Typography variant="caption" ml={2} style={{ fontStyle: "italic" }} color="#303030" fontWeight={300}>
                    online desde 18h30
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" fontWeight={400} color="#7B7B7B" ml={1}>
                <b>Banco de capacitores</b> <Switch checked={isOnDatabase} color="success" onChange={() => setisOnDatabase(!isOnDatabase)} />
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Grid>
      <Grid xs={12}>
        <Typography variant="h4" color="#33467B" mt={4} mb={4}>
          <b>Medição</b>
        </Typography>
      </Grid>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid xs={12} md={4} sx={{ p: 1 }}>
            <Paper elevation={5} sx={{ height: 245, background: "#33467B" }}>
              <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" height="100%">
                <Typography variant="subtitle1" color="#FFF" mb={1}>
                  FATOR DE POTÊNCIA
                </Typography>
                <Typography variant="h1" color="#FFF">
                  <b>0,67</b>
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <CardOfValue title="POTÊNCIA ATIVA" value={0.67} />
          <CardOfValue title="POTÊNCIA REATIVA" value={0.67} />
          <CardOfValue title="TENSÃO" value={0.67} />
          <CardOfValue title="CORRENTE" value={0.67} />
        </Grid>
      </Box>
    </Grid>
  );
}

export default Dashboard;
