import { Button, Card, CardContent, Container, Grid, TextField } from "@mui/material";
import Joi from "joi";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import MenuComponent from "../../component/menu.component";
import UsuarioService from "../../service/UsuarioService";
import { useSnackbar } from 'notistack';

export default function PerfilPage() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleClick = () => {
        enqueueSnackbar('I love hooks');
    };
    const schema = Joi.object({
        nome: Joi.string().min(2).required(),
        sobrenome: Joi.string().required(),
        bairro: Joi.string().required(),
        cep: Joi.string().required(),
        rua: Joi.string().required(),
        numero: Joi.string().required(),
        cidade: Joi.string().required(),

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

    const methods = useForm({ resolver: resolver });
    const { control, register, formState: { errors }, handleSubmit } = methods;
    const atualizarPerfil = async (e: any) => {
        let id = localStorage.getItem("loggedId");
        let token = localStorage.getItem("resultToken");
        if (id && token) {
            await UsuarioService.atualizarDados(e, id, token).then(x => {
                if (x.data.success) {
                    enqueueSnackbar('Atualizado com sucesso', {
                        variant: 'success', anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right'
                        }
                    });

                }

            });
        }
    }

    return (<div>
        <MenuComponent></MenuComponent>
        <Card sx={{ minWidth: 275, maxWidth: 500,marginTop: '20%' }}>
            <CardContent>
                <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>

                    <Grid component='form' container spacing={2}  onSubmit={handleSubmit(async (e) => { await atualizarPerfil(e) })}>

                        <Grid item xs={12} sm={4} >
                            <Controller
                                name="nome"
                                control={control}
                                render={({ field: { value } }) => (
                                    <TextField value={value}
                                        error={errors[`nome`] ? true : false}
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
                                        error={errors[`sobrenome`] ? true : false}
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
                                name="cidade"
                                control={control}
                                render={({ field: { value } }) => (
                                    <TextField value={value}
                                        error={errors[`cidade`] ? true : false}
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
                                        error={errors[`bairro`] ? true : false}
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
                                        error={errors[`cep`] ? true : false}
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
                                        error={errors[`rua`] ? true : false}
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
                                        error={errors[`numero`] ? true : false}
                                        helperText={errors[`numero`]?.message?.toString()}
                                        {...register("numero")}
                                        label="Numero"
                                        id="outlined-start-adornment" />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Button
                                variant="contained"
                                type='submit'
                                sx={{ mt: 3, ml: 1 }}
                            >
                                Atualizar
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </CardContent>
        </Card>
    </div>)
}