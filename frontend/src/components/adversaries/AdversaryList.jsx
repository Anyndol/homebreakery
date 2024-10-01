import { Box, Button, MenuItem, Paper, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import AdversaryTable from "../../shared/AdversaryTable";

export default function AdversaryList() {
    const [filters, setFilters] = useState({});
    const [list, setList] = useState([]);

    const search = () => {
        let baseUrl = `${import.meta.env.VITE_API_URL}/adversaries?`;
        let firstParam = true;

        Object.keys(filters).forEach(key => {
            if(filters[key] != null){
                if(!firstParam)
                    baseUrl += '&'
                baseUrl += `${key}=${filters[key]}`
                firstParam = false;
            }
        });
        fetch(baseUrl, {method: 'GET'}).then(async (res)=> {
            let data = await res.json();
            setList(data);
        });
    }

    useEffect(() => {
        search();
    }, []);

    return (
        <>
            <Paper sx={{m: 1, p: 1}} elevation={1}>
                <Box sx={{display:'flex', flexGrow: 1, justifyContent:'center', columnGap: 2}}>
                    <TextField
                        label="Name"
                        value={filters.name}
                        onChange={(e) => setFilters(prev => ({...prev, name:e.target.value}))}
                    />
                    <TextField
                        label="Author"
                        value={filters.author}
                        onChange={(e) => setFilters(prev => ({...prev, author:e.target.value}))}
                    />
                    <Select
                        value={filters.menace} 
                        onChange={(e) => setFilters(prev => ({...prev, menace:e.target.value}))}
                        variant="standard"
                        sx={{width:'144px'}}
                    >
                        <MenuItem value={''}>NONE</MenuItem>
                        <MenuItem value={0}>MOOK</MenuItem>
                        <MenuItem value={1}>BOSS</MenuItem>
                        <MenuItem value={2}>MEGA BOSS</MenuItem>
                        <MenuItem value={3}>COLOSSAL</MenuItem>
                    </Select>
                </Box>
                <Box sx={{display:'flex', flexGrow: 1, justifyContent:'center', mt: 2}}>
                    <Button onClick={search} variant="contained">Filter</Button>
                </Box>
            </Paper>
            <AdversaryTable adversaries={list} />
        </>
    )
}