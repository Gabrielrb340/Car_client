import { BottomNavigation, BottomNavigationAction, Box, Button, Card, CardContent, CardHeader, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import Joi from "joi";
import { Controller, useForm } from "react-hook-form";
import MenuComponent from "../../component/menu.component";
import UsuarioService from "../../service/UsuarioService";
import { useSnackbar } from 'notistack';
import AddIcon from '@mui/icons-material/Add';
import AcidenteService from "../../service/acidente.service";
function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];
const UserTable = (props: any) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500, maxWidth: 500 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
const Menu = (props: any) => {
    return (
        <Box sx={{ width: 500 }}>

            <BottomNavigation sx={{ width: 500 }}>
                <BottomNavigationAction
                    label="Adicionar envolvido"
                    value="Adicionar envolvido"
                    icon={<AddIcon />}
                />
            </BottomNavigation >
        </Box>
    )

}
export default function AcidentePage() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleClick = () => {
        enqueueSnackbar('I love hooks');
    };
    const schema = Joi.object({
        nomeEnvolvido: Joi.string().min(2).required(),
        sobrenomeEnvolvido: Joi.string().required(),
        cpfEnvolvido: Joi.string().required(),
        bairro: Joi.string().required(),
        cep: Joi.string().required(),
        rua: Joi.string().required(),
        cidade: Joi.string().required(),
        motivo: Joi.string().required(),
        dataAcidente: Joi.date().required()
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
    const addAcidente = async (e: any) => {
        let id = localStorage.getItem("loggedId");
        let token = localStorage.getItem("resultToken");
        if (id && token) {
            await AcidenteService.criarAcidente(e, id, token).then(x => {
                if (x.data) {
                    enqueueSnackbar('Acidente criado com sucesso', {
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
        <Card sx={{ width: 600, minWidth: 275, maxWidth: 600, marginTop: '20%' }}>
            <CardContent>
                <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                    <Grid component='form' container spacing={2} onSubmit={handleSubmit(async (e) => { await addAcidente(e) })}>
                        <Grid item xs={12} sm={7} >
                            <Controller
                                name="motivo"
                                control={control}
                                render={({ field: { value } }) => (
                                    <TextField value={value}
                                        error={errors[`motivo`] ? true : false}
                                        helperText={errors[`motivo`]?.message?.toString()}

                                        fullWidth
                                        {...register("motivo")}
                                        label="Motivo"
                                        id="outlined-start-adornment" />
                                )}

                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Controller
                                name="dataAcidente"
                                control={control}
                                render={({ field: { value } }) => (
                                    <TextField
                                        fullWidth
                                        error={errors[`dataAcidente`] ? true : false}
                                        helperText={errors[`dataAcidente`]?.message?.toString()}
                                        InputLabelProps={{ shrink: true }}
                                        {...register("dataAcidente")}
                                        label="Data Acidente"
                                        id="outlined-start-adornment"
                                        type="date"
                                    />
                                )}
                            />

                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <Controller
                                name="nomeEnvolvido"
                                control={control}
                                render={({ field: { value } }) => (
                                    <TextField value={value}
                                        error={errors[`nomeEnvolvido`] ? true : false}
                                        helperText={errors[`nomeEnvolvido`]?.message?.toString()}

                                        fullWidth
                                        {...register("nomeEnvolvido")}
                                        label="Nome Envolvido"
                                        id="outlined-start-adornment" />
                                )}

                            />
                        </Grid>

                        <Grid item xs={12} sm={8}>
                            <Controller
                                name="sobrenomeEnvolvido"
                                control={control}
                                render={({ field: { value } }) => (
                                    <TextField value={value}
                                        error={errors[`sobrenomeEnvolvido`] ? true : false}
                                        helperText={errors[`sobrenomeEnvolvido`]?.message?.toString()}
                                        fullWidth
                                        {...register("sobrenomeEnvolvido")}
                                        label="Sobrenome Envolvido"
                                        id="outlined-start-adornment" />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} >
                            <Controller
                                name="cpfEnvolvido"
                                control={control}
                                render={({ field: { value } }) => (
                                    <TextField value={value}
                                        error={errors[`cpfEnvolvido`] ? true : false}
                                        helperText={errors[`cpfEnvolvido`]?.message?.toString()}

                                        fullWidth
                                        {...register("cpfEnvolvido")}
                                        label="Cpf Envolvido"
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
                        <Grid item xs={12} sm={12}>
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
                            <Button
                                variant="contained"
                                type='submit'
                                sx={{ mt: 3, ml: 1 }}
                            >
                                Criar
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </CardContent>
        </Card>
    </div>)
}