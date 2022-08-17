import { Grid, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export default function LoginStep() {
    const methods = useFormContext();
    const { control, register, formState: { errors } } = methods;
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
                <Controller
                    name="emailAcesso"
                    control={control}
                    render={({ field: { value } }) => (
                        <TextField value={value}
                            error={errors[`emailAcesso`] ? true : false}
                            helperText={errors[`emailAcesso`]?.message?.toString()}
                            fullWidth
                            {...register("emailAcesso")}
                            label="Email"
                            type='email'
                            id="outlined-start-adornment" />
                    )}

                />
            </Grid>
            <Grid item xs={12} sm={12}>
                <Controller
                    name="password"
                    control={control}
                    render={({ field: { value } }) => (
                        <TextField value={value}
                            error={errors[`password`] ? true : false}
                            helperText={errors[`password`]?.message?.toString()}

                            fullWidth
                            {...register("password")}
                            label="Senha"
                            type='password'
                            id="outlined-start-adornment" />
                    )}

                />
            </Grid>
        </Grid>)
}