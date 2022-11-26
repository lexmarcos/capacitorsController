import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import Paper from "@mui/material/Paper";
import { RestartAlt } from "@mui/icons-material";
import Chip from "@mui/material/Chip";
import Switch from "@mui/material/Switch";
import CardOfValue from "./CardOfValues";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/api";
import { useMutation, useQuery } from "react-query";

interface ILastMeasurement {
  controller_id: string;
  power_factor: number;
  active_power: number;
  reactive_power: number;
  voltage: number;
  current: number;
  uptime: number;
  received_at: string;
  bank_status: string;
}

function Dashboard() {
  const [isOnBank, setisOnBank] = useState(true);

  const navigate = useNavigate();
  const params = useParams();

  const getDevices = async () => {
    const res: ILastMeasurement = await api.get(
      `/devices/measurements/${params.id}/latest`
    );
    return res;
  };

  const setBank = async () => {
    const res: ILastMeasurement = await api.post(
      `/devices/disable_bank`,
      { controller_id: params.id, status: isOnBank ? "disabled" : "enabled" },
    );
    return res;
  };

  const { data: lastMeasurement } = useQuery("device", getDevices, {
    onSuccess: (data) => {
      setisOnBank(data.bank_status === "enabled");
    }
  });
  const setBankType = useMutation("bankType", setBank, {
    onSuccess: (data) => {
      setisOnBank(false); //todo: fix this
    },
  });

  if (!lastMeasurement?.controller_id) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        height="100%"
      >
        <Typography variant="h2" color="#33467B">
          <b>Não foi possível identifcar esse capacitor</b>
        </Typography>
      </Box>
    );
  }

  function subtractSeconds(numOfSeconds: number, date = new Date()) {
    date.setMilliseconds(date.getMilliseconds() - numOfSeconds);

    return date;
  }

  return (
    <Grid container spacing={2}>
      <Grid xs={12} sx={{ pt: 16, pb: 4 }}>
        <Box
          display="flex"
          alignItems="start"
          justifyContent="space-between"
          flexDirection="column"
        >
          <Box
            display="flex"
            alignItems="center"
            sx={{ pb: 4, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <ArrowCircleLeftIcon sx={{ color: "#303030" }} />
            <Typography variant="body1" fontWeight={400} color="#303030" ml={1}>
              Voltar
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Typography variant="h4" color="#33467B">
              <b>Dados do dispositivo</b>
            </Typography>
            <Box display="flex" alignItems="center">
              <RestartAlt sx={{ color: "#7B7B7B" }} />
              <Typography
                variant="body1"
                fontWeight={400}
                color="#7B7B7B"
                ml={1}
              >
                Atualizado em:{" "}
                {new Date(lastMeasurement.received_at).toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid xs={12}>
        <Box width="100%">
          <Paper elevation={0} sx={{ p: 3 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <Typography
                  variant="body2"
                  fontWeight={400}
                  color="#7B7B7B"
                  ml={1}
                >
                  <b>MAC</b> {lastMeasurement.controller_id}
                </Typography>
                <Box display="flex" alignItems="center" ml={8}>
                  {/* // TODO colocar o status de online no objeto do get e passar aqui */}
                  {/* <Chip color={'typesOfChips[capacitors.status]'} label={'labelOfChips[capacitors.status]'}></Chip> */}
                  <Typography
                    variant="caption"
                    ml={2}
                    style={{ fontStyle: "italic" }}
                    color="#303030"
                    fontWeight={300}
                  >
                    online desde{" "}
                    {subtractSeconds(lastMeasurement.uptime).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="body2"
                fontWeight={400}
                color="#7B7B7B"
                ml={1}
              >
                <b>Banco de capacitores</b>{" "}
                <Switch
                  checked={isOnBank}
                  color="success"
                  onChange={() => setBankType.mutate()}
                />
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
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                height="100%"
              >
                <Typography variant="subtitle1" color="#FFF" mb={1}>
                  FATOR DE POTÊNCIA
                </Typography>
                <Typography variant="h1" color="#FFF">
                  <b>{lastMeasurement.power_factor.toFixed(2)}</b>
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <CardOfValue
            title="POTÊNCIA ATIVA (W)"
            value={lastMeasurement.active_power.toFixed(2)}
          />
          <CardOfValue
            title="POTÊNCIA REATIVA (VAR)"
            value={lastMeasurement.reactive_power.toFixed(2)}
          />
          <CardOfValue
            title="TENSÃO (V)"
            value={lastMeasurement.voltage.toFixed(2)}
          />
          <CardOfValue
            title="CORRENTE (A)"
            value={lastMeasurement.current.toFixed(2)}
          />
        </Grid>
      </Box>
    </Grid>
  );
}

export default Dashboard;
