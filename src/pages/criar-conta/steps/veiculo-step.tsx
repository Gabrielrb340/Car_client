import { Grid, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export default function VeiculoStep() {
    const methods = useFormContext();
    const { control, register, formState: { errors } } = methods;
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Controller
                    name="fabricante"
                    control={control}
                    render={({ field: { value } }) => (
                        <TextField value={value}
                            error={errors[`fabricante`] ? true : false}
                            helperText={errors[`fabricante`]?.message?.toString()}

                            fullWidth
                            {...register("fabricante")}
                            label="Fabricante"
                            type='text'
                            id="outlined-start-adornment" />
                    )}

                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Controller
                    name="modelo"
                    control={control}
                    render={({ field: { value } }) => (
                        <TextField value={value}
                            error={errors[`modelo`] ? true : false}
                            helperText={errors[`modelo`]?.message?.toString()}

                            fullWidth
                            {...register("modelo")}
                            label="Modelo"
                            type='text'
                            id="outlined-start-adornment" />
                    )}

                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Controller
                    name="ano"
                    control={control}
                    render={({ field: { value } }) => (
                        <TextField
                            fullWidth
                            {...register("ano")}
                            error={errors[`ano`] ? true : false}
                            helperText={errors[`email`]?.message?.toString()}

                            label="Ano"
                            id="outlined-start-adornment"
                            type="number"
                        />
                    )}

                />

            </Grid>
            <Grid item xs={12} sm={6}>
                <Controller
                    name="placa"
                    control={control}
                    render={({ field: { value } }) => (
                        <TextField value={value}
                            error={errors[`placa`] ? true : false}
                            helperText={errors[`placa`]?.message?.toString()}

                            fullWidth
                            {...register("placa")}
                            label="Placa"
                            type='text'
                            id="outlined-start-adornment" />
                    )}

                />
            </Grid>

        </Grid>);
}