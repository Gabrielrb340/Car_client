import { Grid, InputLabel, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm, useFormContext } from "react-hook-form";


export default function DadosBasicosStep() {
    const methods = useFormContext(); 
    const {control,register,formState: { errors }} =methods;
    console.log(`inner`,methods.formState.errors)
    return (
        <Grid container spacing={2}>

            <Grid item xs={12} sm={4}>
           <Controller
                    name="nome"
                    control={control}
                    render={({ field: { value } }) => (
                        <TextField value={value} 
                        error={errors[`nome`]?true:false}
                        helperText={errors[`nome`]?.message?.toString()}

                        fullWidth
                        {...register("nome")}
                            label="Nome"
                            id="outlined-start-adornment" />
                    )}

                    />
            </Grid>
            <Grid item xs={12} sm={8}>
            <Controller
                    name="sobrenome"
                    control={control}
                    render={({ field: { value } }) => (
                        <TextField value={value} 
                        error={errors[`sobrenome`]?true:false}
                        helperText={errors[`sobrenome`]?.message?.toString()}
                        fullWidth
                        {...register("sobrenome")}
                            label="Sobrenome"
                            id="outlined-start-adornment" />
                    )}
                    />
            </Grid>
            <Grid item xs={12} sm={12}>
            <Controller
                    name="cpf"
                    control={control}
                    render={({ field: { value } }) => (
                        <TextField value={value} 
                        error={errors[`cpf`]?true:false}
                        helperText={errors[`cpf`]?.message?.toString()}
                        fullWidth
                        {...register("cpf")}
                            label="CPF"
                            id="outlined-start-adornment" />
                    )}
                    />
            </Grid>
            <Grid item xs={12} sm={4}>
            <Controller
                    name="dataNascimento"

                    control={control}
                    render={({ field: { value } }) => (
                        <TextField
                        fullWidth
                        error={errors[`dataNascimento`]?true:false}
                        helperText={errors[`dataNascimento`]?.message?.toString()}
                        InputLabelProps={{ shrink: true }}
                        {...register("dataNascimento")}
                        label="Data nascimento"
                        id="outlined-start-adornment"
                        type="date"
                    />
                    )}
                    />
               
            </Grid>
            <Grid item xs={12} sm={8}>
            <Controller
                    name="cidade"
                    control={control}
                    render={({ field: { value } }) => (
                        <TextField value={value} 
                        error={errors[`cidade`]?true:false}
                        helperText={errors[`cidade`]?.message?.toString()}
                        fullWidth
                        {...register("cidade")}
                            label="Cidade"
                            id="outlined-start-adornment" />
                    )}
                    />
            </Grid>
            <Grid item xs={12} sm={7}>
            <Controller
                    name="bairro"
                    control={control}
                    render={({ field: { value } }) => (
                        <TextField value={value} 
                        error={errors[`bairro`]?true:false}
                        helperText={errors[`bairro`]?.message?.toString()}
                        fullWidth
                        {...register("bairro")}
                            label="Bairro"
                            id="outlined-start-adornment" />
                    )}
                    />
            </Grid>
            <Grid item xs={12} sm={5}>
            <Controller
                    name="cep"
                    control={control}
                    render={({ field: { value } }) => (
                        <TextField value={value} 
                        error={errors[`cep`]?true:false}
                        helperText={errors[`cep`]?.message?.toString()}
                        fullWidth
                        {...register("cep")}
                            label="Cep"
                            id="outlined-start-adornment" />
                    )}
                    />
            </Grid>
            <Grid item xs={12} sm={9}>
            <Controller
                    name="rua"

                    control={control}
                    render={({ field: { value } }) => (
                        <TextField value={value} 
                        fullWidth
                        error={errors[`rua`]?true:false}
                        helperText={errors[`rua`]?.message?.toString()}
                        {...register("rua")}
                            label="Rua"
                            id="outlined-start-adornment" />
                    )}
                    />
            </Grid>
            <Grid item xs={12} sm={3}>
            <Controller
                    name="numero"

                    control={control}
                    render={({ field: { value } }) => (
                        <TextField value={value} 
                        fullWidth
                        error={errors[`numero`]?true:false}
                        helperText={errors[`numero`]?.message?.toString()}
                        {...register("numero")}
                            label="Numero"
                            id="outlined-start-adornment" />
                    )}
                    />
            </Grid>
        </Grid>);
}