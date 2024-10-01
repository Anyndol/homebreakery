import { Box, SpeedDial, SpeedDialAction, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import MonsterIcon from '../assets/monster_icon.png';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../shared/AuthProvider";
import AdversaryTable from "../shared/AdversaryTable";
import SpeciesTable from "../shared/SpeciesTable";

export default function MyStuff() {
    const navigate = useNavigate();
    const {userData} = useContext(AuthContext);
    const [adversaryList, setAdversaryList] = useState([]);
    const [speciesList, setSpeciesList] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/adversaries?author=${userData.username}`, {method: 'GET'}).then(async (res)=> {
            let data = await res.json();
            setAdversaryList(data)
        });
        fetch(`${import.meta.env.VITE_API_URL}/species?author=${userData.username}`, {method: 'GET'}).then(async (res)=> {
            let data = await res.json();
            setSpeciesList(data)
        });
    }, []);

    return (
        <Box sx={{m: {md:2, xs: 1}}}>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                >
                    <SpeedDialAction
                        icon={<img style={{width:'16px'}} src={MonsterIcon}></img>}
                        onClick={() => navigate('/adversaries/new')}
                        tooltipTitle="Adversary"
                    />
                    {/*<SpeedDialAction
                        icon={<RecentActorsIcon/>}
                        tooltipTitle="Calling"
                    />*/}
                    <SpeedDialAction
                        icon={<AccessibilityIcon/>}
                        tooltipTitle="Species"
                        onClick={() => navigate('/species/new')}
                    />
            </SpeedDial>
            <Typography>Adversaries</Typography>
            <AdversaryTable adversaries={adversaryList} />
            <Typography sx={{mt: 6}}>Species</Typography>
            <SpeciesTable species={speciesList} />
        </Box>
    )
}