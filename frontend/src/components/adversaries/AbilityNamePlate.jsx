import { Box, IconButton, Input, MenuItem, Select, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function AbilityNamePlate({id, level, name, onClick, editing = false, onRemove, updateData}) {
    return (
        <Box sx={{background:"linear-gradient(86deg, rgba(253,237,215,1) 0%, rgba(251,213,231,1) 100%)", display:'flex', alignItems:'center', borderRadius: '0px 16px 16px 0px', pt:'6px', pb:'6px', cursor:onClick ? 'pointer' : 'inherit'}} onClick={onClick}>
            {!editing && <Typography color={'#f47925'} fontWeight={'bold'} fontSize='18px' sx={{ml:'12px', textTransform:'uppercase'}}>{name}</Typography>}
            {editing && <Input 
                value={name ?? ''} 
                onChange={(e) => updateData(prev => {
                    const abilities = [...prev.abilities];
                    const abilityIndex = prev.abilities.findIndex(ab => ab.id === id);
                    abilities[abilityIndex].name = e.target.value;
                    return {...prev, abilities};
                })} 
                disableUnderline={!editing}  
                fullWidth
                inputProps={{style:{textTransform: editing ? 'inherit' : 'uppercase'}}}
                id={"reskin"} 
                sx={{"& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "white"}, color:'#f47925', fontWeight:'bold', pl:'24px', letterSpacing:'1px'}} disabled={!editing} 
            />}
            {!editing && <Typography color={'#f47925'} fontWeight={'bold'} fontSize='14px' 
                sx={{ml:'12px', textTransform:'uppercase', border:'2px solid', borderRadius:'4px 4px 4px 4px', height:'18px', width:'18px', textAlign:'center', display:'flex', alignItems:'center', justifyContent:'center'}}
            >
                {level}
            </Typography>}
            {editing && 
                <Select
                    value={level}
                    onChange={(e) => updateData(prev => {
                        const abilities = [...prev.abilities];
                        const abilityIndex = prev.abilities.findIndex(ab => ab.id === id);
                        abilities[abilityIndex].level = e.target.value;
                        return {...prev, abilities};
                    })} 
    
                    disableUnderline={!editing}  
                    variant="standard"
                    inputProps={{style:{textTransform: editing ? 'inherit' : 'uppercase'}}}
                    sx={{ml:'12px', textTransform:'uppercase', border:'2px solid', borderRadius:'4px 4px 4px 4px', height:'24px', width:'48px', textAlign:'center', display:'flex', alignItems:'center', justifyContent:'center', color:'#f47925', fontWeight: 'bold'}}
                >
                    <MenuItem value={'B'}>B</MenuItem>
                    <MenuItem value={'A'}>A</MenuItem>
                    <MenuItem value={'L'}>L</MenuItem>
                    <MenuItem value={'I'}>I</MenuItem>
                    <MenuItem value={'M'}>M</MenuItem>
                </Select>
            }
            {editing &&
                <IconButton sx={{ml:'auto'}} onClick={onRemove}>
                    <CloseIcon sx={{color:'#d32f2f'}} />
                </IconButton>
            }
        </Box>
    )
}