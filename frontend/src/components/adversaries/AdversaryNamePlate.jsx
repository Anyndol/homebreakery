import { Box, Input, MenuItem, Select, Typography } from "@mui/material";

export default function AdversaryNamePlate({rank, menace, name, editing, updateData}) {
    return (
        <Box sx={{display:'flex', alignItems:'center', width:'100%'}}>
            <Box
                sx={{
                background: "linear-gradient(90deg, rgba(249,165,55,1) 20%, rgba(238,40,129,1) 100%)", 
                width:'100%',
                borderRadius: '0px 16px 16px 0px',
                display:'flex',
                alignItems:'center',
                pt:'6px',
                pb:'6px',
                pr:'6px'
            }}>
                <Input 
                    value={name ?? ''} 
                    onChange={(e) => updateData(prev => ({...prev, name:e.target.value}))} 
                    disableUnderline={!editing}  
                    fullWidth
                    inputProps={{style:{textTransform: editing ? 'inherit' : 'uppercase'}}}
                    id={"reskin"} 
                    sx={{"& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "white"}, color:'white', fontWeight:'bold', pl:'24px', letterSpacing:'1px'}} disabled={!editing} 
                />
                <Box sx={{display:'flex', backgroundColor:'white', borderRadius:'8px 8px 8px 8px', p:'2px'}}>
                    {editing && 
                        <Select 
                            value={menace} 
                            onChange={(e) => updateData(prev => ({...prev, menace:e.target.value}))} 
                            disableUnderline={!editing}  
                            fullWidth
                            variant="standard"
                            inputProps={{style:{textTransform: editing ? 'inherit' : 'uppercase'}}}
                            sx={{"& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "white"}, color:'white', fontWeight:'bold', pl:'6px', pr:'8px', letterSpacing:'1px', borderRadius:'8px 0px 0px 8px', backgroundColor:'#ee1e7b'}} disabled={!editing} 
                        >
                            <MenuItem value={0}>MOOK</MenuItem>
                            <MenuItem value={1}>BOSS</MenuItem>
                            <MenuItem value={2}>MEGA BOSS</MenuItem>
                            <MenuItem value={3}>COLOSSAL</MenuItem>
                        </Select>
                    }
                    {!editing &&
                        <Typography sx={{
                            color:'white',
                            ml:'auto',
                            fontWeight:'bold',
                            whiteSpace:'nowrap',
                            backgroundColor:'#ee1e7b',
                            borderRadius:'8px 0px 0px 8px',
                            pl:'6px',
                            pr:'8px',
                            display:'flex',
                            alignItems:'center'
                        }}>
                            {menace === 3 ? 'COLOSSAL' : menace === 2 ? 'MEGA BOSS' : menace === 1 ? 'BOSS' : 'MOOK'}
                        </Typography>
                    }
                    <Input 
                        value={editing ? rank ?? '' : `Rank ${rank}`} 
                        onChange={(e) => updateData(prev => ({...prev, rank:e.target.value}))} 
                        disableUnderline={!editing}  
                        inputProps={{style:{textTransform: editing ? 'inherit' : 'uppercase', textAlign:'center'}}}
                        id={"reskin"} 
                        sx={{"& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#283ba0"}, color:'#283ba0', fontWeight:'bold', pl:'4px', pr:'4px', width:'75px'}} disabled={!editing} 
                    />
                </Box>
            </Box>
        </Box>
    )
}