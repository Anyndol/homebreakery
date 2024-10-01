import { FormControl, Input, InputLabel } from "@mui/material";

export default function DetailInput({value, onChange, onFocus, fieldId, label, multiline = false, fullWidth = false, editing, width, numeric = false}){
    return (
        <FormControl variant="standard" fullWidth={fullWidth}>
            <InputLabel htmlFor={fieldId} shrink sx={{fontWeight:'bold', pt:'4px', fontSize:'18px', width}}>{label}</InputLabel>
            <Input 
                multiline={multiline}
                value={value} 
                onChange={onChange}
                onFocus={onFocus}
                disableUnderline={!editing}  
                id={fieldId} 
                fullWidth={fullWidth}
                type={numeric ? 'number': 'text'}
                sx={{fontSize:'16px', mt:'12px !important', width, "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000"}}} disabled={!editing} 
            />
        </FormControl>
    )
}