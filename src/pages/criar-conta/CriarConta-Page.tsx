import { CssBaseline, AppBar, Toolbar, Typography, Container, Paper, Box, Button, Grid, Divider } from "@mui/material";
import Joi from "joi";
import React from "react";
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UsuarioService from "../../service/UsuarioService";
import DadosBasicosStep from "./steps/dados-basicos-component";
import LoginStep from "./steps/login-step";
import VeiculoStep from "./steps/veiculo-step";

const steps = ['Dados basicos', 'Dados de acesso', 'Veiculo'];

const styles = {
  divider: {
    margin: '20px'
  }
}

function getContent(step: number) {
  switch (step) {
    case 0:
      return <DadosBasicosStep />;
    case 1:
      return <LoginStep />;
    case 2:
      return <VeiculoStep />;
    default:
      throw new Error('Unknown step');
  }
}

const schema = Joi.object({
  nome: Joi.string().min(2).required(),
  sobrenome: Joi.string().required(),
  cpf: Joi.string().required(),
  dataNascimento: Joi.string().required(),
  bairro: Joi.string().required(),
  cep: Joi.string().required(),
  rua: Joi.string().required(),
  numero: Joi.string().required(),
  cidade: Joi.string().required(),
  emailAcesso: Joi.string().required(),
  password: Joi.string().required(),
  fabricante: Joi.string().required(),
  modelo: Joi.string().required(),
  placa: Joi.string().required(),
  ano: Joi.string().required(),

});

const resolver = (data: any, validationContext: any) => {
  const { error, value: values } = schema.validate(data, {
    abortEarly: false
  });

  console.log(`teste`, {
    values: error ? {} : values,
    errors: error
      ? error.details.reduce((previous, currentError) => {
        return {
          ...previous,
          [currentError.path[0]]: currentError
        };
      }, {})
      : {}
  })

  return {
    values: error ? {} : values,
    errors: error
      ? error.details.reduce((previous, currentError) => {
        return {
          ...previous,
          [currentError.path[0]]: currentError
        };
      }, {})
      : {}
  };
};
export default function CriarContaPage() {
  const navigate = useNavigate();
  const methods = useForm({ resolver: resolver });
  const { handleSubmit } = methods;
  const { enqueueSnackbar } = useSnackbar();

  const goToLogin = () => {
    navigate('/login')
  }
  const handleNext = async (dados: any) => {
    await UsuarioService.criarUsuarioInscricao(dados).then(x => {
      if (x.data.success) {
        console.log(x.data.success)
        enqueueSnackbar('Conta criada com sucesso', {
          variant: 'success', anchorOrigin: {
              vertical: 'top',
              horizontal: 'right'
          }
      })
        goToLogin();
      }
    });

  };

  return (
    <div >
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Cadastro
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <form onSubmit={handleSubmit((e) => { handleNext(e) })}>
            <FormProvider {...methods} >
              <React.Fragment >
                {getContent(0)}
              </React.Fragment>
              <Divider style={styles.divider}>Dados de acesso</Divider>
              {/*Login */}
              <React.Fragment >
                <Grid spacing={1}>
                  <FormProvider {...methods} >
                    {getContent(1)}
                  </FormProvider>
                </Grid>
              </React.Fragment>
              {/*Veiculo */}
              <Divider style={styles.divider}>Veiculo</Divider>
              <React.Fragment >
                <FormProvider {...methods} >
                  {getContent(2)}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      type='submit'
                      sx={{ mt: 3, ml: 1 }}
                    >
                      Criar Conta
                    </Button>
                  </Box>
                </FormProvider>
              </React.Fragment>
            </FormProvider>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
