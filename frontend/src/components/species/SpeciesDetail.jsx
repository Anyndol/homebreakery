import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../shared/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import { Box, FormControl, IconButton, Input, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import AbilityNamePlate from "../adversaries/AbilityNamePlate";
import AddIcon from '@mui/icons-material/Add';

export default function SpeciesDetail(){
    const [data, setData] = useState({
        name: 'New species',
        size: 'Medium',
        abilities: []
    });
    const {userData} = useContext(AuthContext);
    const {id} = useParams();
    const [editing, setEditing] = useState(id === 'new');
    const navigate = useNavigate();

    useEffect(() => {
        if(id !== 'new') {
            fetch(`${import.meta.env.VITE_API_URL}/species?id=${id}`, {method: 'GET'}).then(async (res)=> {
                let species = await res.json();
                setData(species);
            });
        }
    }, [id]);


    return (
        <Box sx={{m: {md:2, xs:0}, display:'flex', flexDirection: 'column', rowGap: 2}}>
            {editing && <Box sx={{ml:'auto'}}>
                <IconButton onClick={() => {
                    fetch(`${import.meta.env.VITE_API_URL}/species`, {method: 'POST', headers: new Headers({'content-type': 'application/json'}), credentials: 'include', body:JSON.stringify(data)}).then(async (res)=> {setEditing(false);});
                }}><SaveIcon/></IconButton>
            </Box>}
            {!editing && data.author === userData?.username && <Box sx={{ml:'auto'}}>
                <IconButton onClick={() => {
                    setEditing(true);
                }}><EditIcon/></IconButton>
                <IconButton onClick={() => {
                    if(confirm('Are you sure you want to delete this?'))
                        fetch(`${import.meta.env.VITE_API_URL}/species?id=${id}`, {method: 'DELETE', credentials:'include'}).then(async (res)=> {navigate('/adversaries')});
                }}><DeleteIcon/></IconButton>
            </Box>}

            <Box>
                <Input
                    value={data?.name ?? ""} 
                    onChange={e => setData((prev) => ({...prev, name: e.target.value}))}
                    disableUnderline={!editing}
                    inputProps={{
                        style:{fontSize:'1.5rem'}
                    }}
                    id={"name"} 
                    sx={{ml:'6px', fontSize:'16px', mt:'0px', "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000"}}} disabled={!editing} 
                />
                {!editing && <Typography sx={{whiteSpace:'nowrap'}} fontWeight={'bold'}>{data?.size} species</Typography>}
                {editing &&
                    <Select
                        label={"Size"}
                        value={data?.size ?? 'Medium'} 
                        onChange={(e) => setData((prev) => ({...prev, size: e.target.value}))} 
                        disableUnderline={!editing}
                        variant="standard"
                        sx={{ml:'8px', width:'140px', height:'39px'}}
                    >
                        <MenuItem value={'Small'}>Small</MenuItem>
                        <MenuItem value={'Medium'}>Medium</MenuItem>
                        <MenuItem value={'Large'}>Large</MenuItem>
                    </Select>
                }
            </Box>
            <FormControl variant="standard">
                <InputLabel htmlFor={"description"} shrink sx={{fontWeight:'bold', pt:'4px', fontSize:'18px'}}>Description</InputLabel>
                <Input
                    multiline
                    rows={3}
                    value={data?.description ?? ""} 
                    onChange={e => setData((prev) => ({...prev, description: e.target.value}))}
                    disableUnderline={!editing}
                    id={"description"} 
                    sx={{fontSize:'16px', mt:'12px !important', "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000"}}} disabled={!editing} 
                />
            </FormControl>
            <Box sx={{display:'flex', width:'100%', columnGap: 4}}>
                <FormControl variant="standard" fullWidth>
                    <InputLabel htmlFor={"physiology"} shrink sx={{fontWeight:'bold', pt:'4px', fontSize:'18px'}}>Physiology</InputLabel>
                    <Input
                        multiline
                        rows={2}
                        value={data?.physiology ?? ""} 
                        onChange={e => setData((prev) => ({...prev, physiology: e.target.value}))}
                        disableUnderline={!editing}
                        id={"physiology"} 
                        sx={{fontSize:'16px', mt:'12px !important', "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000"}}} disabled={!editing} 
                    />
                </FormControl>
                <FormControl variant="standard" fullWidth>
                    <InputLabel htmlFor={"demeanor"} shrink sx={{fontWeight:'bold', pt:'4px', fontSize:'18px'}}>Demeanor</InputLabel>
                    <Input
                        multiline
                        rows={2}
                        value={data?.demeanor ?? ""} 
                        onChange={e => setData((prev) => ({...prev, demeanor: e.target.value}))}
                        disableUnderline={!editing}
                        id={"demeanor"} 
                        sx={{fontSize:'16px', mt:'12px !important', "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000"}}} disabled={!editing} 
                    />
                </FormControl>
            </Box>
            <Box sx={{display:'flex', width:'100%', columnGap: 4}}>
                <FormControl variant="standard" fullWidth>
                    <InputLabel htmlFor={"outlook"} shrink sx={{fontWeight:'bold', pt:'4px', fontSize:'18px'}}>Outlook</InputLabel>
                    <Input
                        multiline
                        rows={2}
                        value={data?.outlook ?? ""} 
                        onChange={e => setData((prev) => ({...prev, outlook: e.target.value}))}
                        disableUnderline={!editing}
                        id={"outlook"} 
                        sx={{fontSize:'16px', mt:'12px !important', "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000"}}} disabled={!editing} 
                    />
                </FormControl>
                <FormControl variant="standard" fullWidth>
                    <InputLabel htmlFor={"history"} shrink sx={{fontWeight:'bold', pt:'4px', fontSize:'18px'}}>History</InputLabel>
                    <Input
                        multiline
                        rows={2}
                        value={data?.history ?? ""} 
                        onChange={e => setData((prev) => ({...prev, history: e.target.value}))}
                        disableUnderline={!editing}
                        id={"history"} 
                        sx={{fontSize:'16px', mt:'12px !important', "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000"}}} disabled={!editing} 
                    />
                </FormControl>
            </Box>
            <Box sx={{display:'flex', width:'100%', columnGap: 4}}>
                <FormControl variant="standard" fullWidth>
                    <InputLabel htmlFor={"adventurers"} shrink sx={{fontWeight:'bold', pt:'4px', fontSize:'18px'}}>Adventurers</InputLabel>
                    <Input
                        multiline
                        rows={2}
                        value={data?.adventurers ?? ""} 
                        onChange={e => setData((prev) => ({...prev, adventurers: e.target.value}))}
                        disableUnderline={!editing}
                        id={"adventurers"} 
                        sx={{fontSize:'16px', mt:'12px !important', "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000"}}} disabled={!editing} 
                    />
                </FormControl>
                <FormControl variant="standard" fullWidth>
                    <InputLabel htmlFor={"typicalNames"} shrink sx={{fontWeight:'bold', pt:'4px', fontSize:'18px'}}>Typical names</InputLabel>
                    <Input
                        multiline
                        rows={2}
                        value={data?.typicalNames ?? ""} 
                        onChange={e => setData((prev) => ({...prev, typicalNames: e.target.value}))}
                        disableUnderline={!editing}
                        id={"typicalNames"} 
                        sx={{fontSize:'16px', mt:'12px !important', "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000"}}} disabled={!editing} 
                    />
                </FormControl>
            </Box>
            <Box sx={{ml: 'auto'}}>
                <IconButton onClick={() => setData(prev => ({...prev, abilities: [...prev.abilities, {name: 'New Ability '+prev.abilities.filter(ab => ~ab.name.indexOf('New Ability')).length, level: 'I', description: '', mechanics: '', id: crypto.randomUUID() }]}))}><AddIcon/></IconButton>
            </Box>
            {data.abilities?.map((a) => (
                <Box>
                    <AbilityNamePlate id={a.id} level={a.level} name={a.name} editing={editing}
                        updateData={setData}
                        onRemove={() => {
                            setData((prev) => ({...prev, abilities: prev.abilities.filter((ab) => ab.id !== a.id)}))
                        }}
                    />
                    <Box sx={{display:'flex', flexGrow: 1, columnGap: 6}}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor={a.id+"description"} shrink sx={{fontWeight:'bold', pt:'4px', fontSize:'18px'}}>Description</InputLabel>
                            <Input 
                                multiline
                                rows={3}
                                fullWidth
                                value={a.description ?? ""} 
                                onChange={(e) => setData(prev => {
                                    const abilities = [...prev.abilities];
                                    const abilityIndex = prev.abilities.findIndex(ab => ab.id === a.id);
                                    abilities[abilityIndex].description = e.target.value;
                                    return {...prev, abilities};
                                })} 
                                disableUnderline={!editing}
                                id={a.id+"description"} 
                                sx={{fontSize:'16px', mt:'12px !important', "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000"}}} disabled={!editing} 
                            />
                        </FormControl>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor={a.id+"mechanics"} shrink sx={{fontWeight:'bold', pt:'4px', fontSize:'18px'}}>Mechanics</InputLabel>
                            <Input 
                                multiline
                                fullWidth
                                rows={3}
                                value={a.mechanics ?? ""} 
                                onChange={(e) => setData(prev => {
                                    const abilities = [...prev.abilities];
                                    const abilityIndex = prev.abilities.findIndex(ab => ab.id === a.id);
                                    abilities[abilityIndex].mechanics = e.target.value;
                                    return {...prev, abilities};
                                })} 
                                disableUnderline={!editing}
                                id={a.id+"mechanics"} 
                                sx={{fontSize:'16px', mt:'12px !important', "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000"}}} disabled={!editing} 
                            />
                        </FormControl>
                    </Box>
                </Box>
            ))}
        </Box>
    )
}