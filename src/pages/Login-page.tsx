import { Button, Card, CardActions, CardContent, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import InscricaoService from "../service/inscricao.service";

const styles = {
  backgroundColor: 'tomato',
  borderRadius: '50%',
  width: '3em',
  height: '2.25em',
  textAlign: 'center',
  paddingTop: '0.75em',
  display: 'inline-block',
  marginRight: '0.5em',
  marginTop: '1em',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '1.5em',
  button: { minwidth: "100%" }
}



export default function LoginPage() {
  const [inputValue, setInputValue] = React.useState({login:'',pass:''});
  const navigate = useNavigate();
  const goToMain = () => {
    navigate('/main')
  }
  const login = async ()=>{
    console.log(inputValue);
    let result:any;
    await InscricaoService.login(inputValue).then(x=>{
      result= x.data;
    });
    if(result.id && result.token){
      localStorage.setItem("loggedId", result.id)
      localStorage.setItem("resultToken", result.token)

      goToMain()
    }
  }
  const handleChange = (event:any,inputName:string) => {
    event.persist();
    setInputValue((values) => ({
      ...values,
      [inputName]: event.target.value,
    }));
  };
  return (
    <Grid container
      direction="column"
      justifyContent="center"
      alignItems="center">
      <Card sx={{ minWidth: 275, maxWidth: 500 }}>
        <CardContent>
          <TextField fullWidth value={inputValue.login} onChange={(e)=>{handleChange(e,'login')}} margin="normal" label="Email" variant="outlined" />
          <TextField fullWidth value={inputValue.pass} onChange={(e)=>{handleChange(e,'pass')}} margin="normal" label="Senha" type="password" variant="outlined" />
        </CardContent>
        <CardActions>
          <Grid container
            direction="column"
            justifyContent="center"
            alignItems="center">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={login}
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid item>
              <Link to="/signin">Não tem uma conta?</Link>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
}