import { useContext, useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import AdversaryNamePlate from "./AdversaryNamePlate";
import { Box, Divider, FormControl, IconButton, Input, InputLabel, MenuItem, Paper, Select, styled, Tab, Tabs, Typography } from "@mui/material";
import DetailInput from "../../shared/DetailInput";
import SectionPlate from "./SectionPlate";
import AddIcon from '@mui/icons-material/Add';
import AbilityNamePlate from "./AbilityNamePlate";
import SaveIcon from '@mui/icons-material/Save';
import { AuthContext } from "../../shared/AuthProvider";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AdversaryDetail() {
    const [data, setData] = useState({
        name: 'New Adversary',
        description: '',
        habitat: '',
        communication: '',
        tactics: '',
        indicators: '',
        rolePlayingNotes: '',
        customization: '',
        reskin: '',
        yield: '',
        notes: '',
        moodTable: '',
        attack: 0,
        hearts: 0,
        defense: 0,
        speed: 0,
        might: 0,
        deftness: 0,
        grit: 0,
        insight: 0,
        aura: 0,
        type: '',
        size: '',
        allegiance: '',
        image: '',
        areaMap: '',
        rank: 0,
        menace: 0,
        abilities: [],
        yields: ''
    });
    const {userData} = useContext(AuthContext);
    const {id} = useParams();
    const [editing, setEditing] = useState(id === 'new');
    const [currentTab, setCurrentTab] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if(id !== 'new') {
            fetch(`${import.meta.env.VITE_API_URL}/adversaries?id=${id}`, {method: 'GET'}).then(async (res)=> {
                let adv = await res.json();
                setData(adv);
            });
        }
    }, [id]);

    const CombatValueInput = useMemo(() => ({value, onChange}) => (
        <Input 
            disableUnderline={!editing}
            inputProps={{style:{textAlign:'center'}}}
            sx={{fontSize:'16px', fontWeight:'bold', width:'24px', "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000"}, height:'24px'}} disabled={!editing}
            value={value}
            onChange={onChange}
        />
    ), [editing]);
    
    return (
        <Box sx={{m: {md:2, xs:0}, display:'flex', flexDirection: 'column', rowGap: 2}}>
            {editing && <Box sx={{ml:'auto'}}>
                <IconButton onClick={() => {
                    fetch(`${import.meta.env.VITE_API_URL}/adversary`, {method: 'POST', headers: new Headers({'content-type': 'application/json'}), credentials: 'include', body:JSON.stringify(data)}).then(async (res)=> {setEditing(false);});
                }}><SaveIcon/></IconButton>
            </Box>}
            {!editing && data.author === userData?.username && <Box sx={{ml:'auto'}}>
                <IconButton onClick={() => {
                    setEditing(true);
                }}><EditIcon/></IconButton>
                <IconButton onClick={() => {
                    if(confirm('Are you sure you want to delete this?'))
                        fetch(`${import.meta.env.VITE_API_URL}/adversary?id=${id}`, {method: 'DELETE', credentials:'include'}).then(async (res)=> {navigate('/adversaries')});
                }}><DeleteIcon/></IconButton>
            </Box>}
            <AdversaryNamePlate rank={data.rank} name={data.name} menace={data.menace} updateData={setData} editing={editing} />
            {/** COMBAT VALUES **/}
            <Box sx={{display:'flex', width:'100%', flexWrap: 'wrap', columnGap: '6px', rowGap: '6px', justifyContent:'center'}}>
                <Box sx={{width:'300px'}}>
                    <Typography sx={{backgroundColor:'#4f4b4c', color:'white', fontSize:'14px', p:'6px', fontWeight:'bold'}}>COMBAT VALUES</Typography>
                    <Box sx={{display:'flex', backgroundColor:'#f3f1f1', mt:'4px', p:'6px', height:'66px'}}>
                        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'50%'}}>
                            <CombatValueInput 
                                value={editing ? data?.attack ?? "" : `+${data.attack ?? 0}`} 
                                onChange={e => {
                                    if(!isNaN(+e.target.value))
                                        setData((prev) => ({...prev, attack: e.target.value}))
                                }}
                            />
                            <Typography>ATTACK</Typography>
                        </Box>
                        <Divider orientation="vertical" flexItem sx={{backgroundColor:'black', mt:'8px', mb:'8px'}}/>
                        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'50%'}}>
                            <CombatValueInput 
                                value={editing ? data?.hearts ?? "" : `${data.hearts ?? 0}`} 
                                onChange={e => {
                                    if(!isNaN(+e.target.value))
                                        setData((prev) => ({...prev, hearts: e.target.value}))
                                }}
                            />
                            <Typography>HEARTS</Typography>
                        </Box>
                    </Box>
                    <Divider sx={{backgroundColor:'black', mr:'12px', ml:'12px'}}/>
                    <Box sx={{display:'flex', backgroundColor:'#f3f1f1', p:'6px', height:'65px'}}>
                        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'50%'}}>
                            <CombatValueInput 
                                value={editing ? data?.defense ?? "" : `${data.defense ?? 0}`} 
                                onChange={e => {
                                    if(!isNaN(+e.target.value))
                                        setData((prev) => ({...prev, defense: e.target.value}))
                                }}
                            />
                            <Typography>DEFENSE</Typography>
                        </Box>
                        <Divider orientation="vertical" flexItem sx={{backgroundColor:'black', mt:'8px', mb:'8px'}}/>
                        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'50%'}}>
                            {editing && 
                                <Select 
                                    value={data.speed} 
                                    onChange={(e) => setData((prev) => ({...prev, speed:e.target.value}))} 
                                    disableUnderline={!editing}  
                                    fullWidth
                                    variant="standard"
                                    inputProps={{style:{textAlign:'center'}}}
                                    sx={{"& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "black"}, color:'black', fontWeight:'bold', fontSize:'14px', textAlign:'center'}} disabled={!editing} 
                                >
                                    <MenuItem value={0}>Slow</MenuItem>
                                    <MenuItem value={1}>Average</MenuItem>
                                    <MenuItem value={2}>Fast</MenuItem>
                                    <MenuItem value={3}>Very Fast</MenuItem>
                                </Select>
                            }
                            {!editing && <Typography fontSize={'14px'} fontWeight={'bold'}>{data.speed === 0 ? 'Slow' : data.speed === 1 ? 'Average' : data.speed === 2 ? 'Fast' : 'Very Fast'}</Typography>}
                            <Typography>SPEED</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{width:'300px'}}>
                    <Typography sx={{color:'white', fontSize:'14px', p:'6px', fontWeight:'bold', backgroundColor:'#4f4b4c'}}>APTITUDES / TRAITS</Typography>
                    <Box sx={{backgroundColor:'#f3f1f1', mt:'4px', p:'6px', pl:'32px', display:'flex', height:'132px'}}>
                        <Box sx={{textAlign:'right', display:'flex', flexDirection:'column'}}>
                            <CombatValueInput 
                                value={editing ? data?.might ?? "" : `${data.might ?? 0}`} 
                                onChange={e => {
                                    if(!isNaN(+e.target.value))
                                        setData((prev) => ({...prev, might: e.target.value}))
                                }}
                            />
                            <CombatValueInput 
                                value={editing ? data?.deftness ?? "" : `${data.deftness ?? 0}`} 
                                onChange={e => {
                                    if(!isNaN(+e.target.value))
                                        setData((prev) => ({...prev, deftness: e.target.value}))
                                }}
                            />
                            <CombatValueInput 
                                value={editing ? data?.grit ?? "" : `${data.grit ?? 0}`} 
                                onChange={e => {
                                    if(!isNaN(+e.target.value))
                                        setData((prev) => ({...prev, grit: e.target.value}))
                                }}
                            />
                            <CombatValueInput 
                                value={editing ? data?.insight ?? "" : `${data.insight ?? 0}`} 
                                onChange={e => {
                                    if(!isNaN(+e.target.value))
                                        setData((prev) => ({...prev, insight: e.target.value}))
                                }}
                            />
                            <CombatValueInput 
                                value={editing ? data?.aura ?? "" : `${data.aura ?? 0}`} 
                                onChange={e => {
                                    if(!isNaN(+e.target.value))
                                        setData((prev) => ({...prev, aura: e.target.value}))
                                }}
                            />
                        </Box>
                        <Box sx={{ml:'16px'}}>
                            <Typography fontSize={'16px'} fontWeight={'bold'}>MIGHT</Typography>
                            <Typography fontSize={'16px'} fontWeight={'bold'}>DEFT.</Typography>
                            <Typography fontSize={'16px'} fontWeight={'bold'}>GRIT</Typography>
                            <Typography fontSize={'16px'} fontWeight={'bold'}>INSIGHT</Typography>
                            <Typography fontSize={'16px'} fontWeight={'bold'}>AURA</Typography>
                        </Box>
                        <Box sx={{display:'flex', flexDirection:'column', rowGap:'6px', alignItems:'center', justifyContent:'center', ml:'auto', mr:'8px'}}>
                            <Box sx={{backgroundColor:'#e6e5e5', height:'18px', width:'72px'}}><Box sx={{background: 'linear-gradient(90deg, rgba(240,89,74,1) 0%, rgba(234,38,41,1) 100%)', height:'100%', width:`${data.might*100/20}%`}}/></Box>
                            <Box sx={{backgroundColor:'#e6e5e5', height:'18px', width:'72px'}}><Box sx={{background: 'linear-gradient(90deg, rgba(245,144,33,1) 0%, rgba(240,94,39,1) 100%)', height:'100%', width:`${data.deftness*100/20}%`}}/></Box>
                            <Box sx={{backgroundColor:'#e6e5e5', height:'18px', width:'72px'}}><Box sx={{background: 'linear-gradient(90deg, rgba(136,196,65,1) 0%, rgba(62,179,74,1) 100%)', height:'100%', width:`${data.grit*100/20}%`}}/></Box>
                            <Box sx={{backgroundColor:'#e6e5e5', height:'18px', width:'72px'}}><Box sx={{background: 'linear-gradient(90deg, rgba(41,166,222,1) 0%, rgba(11,116,185,1) 100%)', height:'100%', width:`${data.insight*100/20}%`}}/></Box>
                            <Box sx={{backgroundColor:'#e6e5e5', height:'18px', width:'72px'}}><Box sx={{background: 'linear-gradient(90deg, rgba(128,92,166,1) 0%, rgba(103,49,141,1) 100%)', height:'100%', width:`${data.aura*100/20}%`}}/></Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{width:'300px'}}>
                    <Typography sx={{color:'white', fontSize:'14px', p:'6px', fontWeight:'bold', backgroundColor:'#4f4b4c'}}>ADVERSARY INFO</Typography>
                    <Box sx={{backgroundColor:'#f3f1f1', mt:'4px', display:'flex', height:'132px'}}>
                        <Box sx={{display:'flex', ml:'12px', flexDirection:'column', justifyContent:'center'}}>
                            <Typography fontWeight={"bold"} sx={{height:'33%', display:'flex', alignItems:'center'}}>TYPE</Typography>
                            <Typography fontWeight={"bold"} sx={{height:'33%', display:'flex', alignItems:'center'}}>SIZE</Typography>
                            <Typography fontWeight={"bold"} sx={{height:'33%', display:'flex', alignItems:'center'}}>ALLEGIANCE</Typography>
                            
                        </Box>
                        <Box sx={{display:'flex', ml:'12px', flexDirection:'column', justifyContent:'center'}}>
                            <Input 
                                value={editing ? data?.type ?? "" : `${data.type ?? ""}`} 
                                onChange={e => {
                                    setData((prev) => ({...prev, type: e.target.value}))
                                }}
                                disableUnderline={!editing}
                                multiline
                                sx={{fontSize:'16px', "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000"}}} disabled={!editing} 
                            />
                            <Input 
                                value={editing ? data?.size ?? "" : `${data.size ?? ""}`} 
                                onChange={e => {
                                    setData((prev) => ({...prev, size: e.target.value}))
                                }}
                                disableUnderline={!editing}
                                multiline
                                sx={{fontSize:'16px', "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000"}}} disabled={!editing} 
                            />
                            <Input 
                                value={editing ? data?.allegiance ?? "" : `${data.allegiance ?? ""}`} 
                                onChange={e => {
                                    setData((prev) => ({...prev, allegiance: e.target.value}))
                                }}
                                disableUnderline={!editing}
                                multiline
                                sx={{fontSize:'16px', "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000"}}} disabled={!editing} 
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
            
            <Box sx={{display:'flex', flexDirection: 'column', rowGap: 2}}>
                <Tabs value={currentTab} onChange={(_e, nv) => setCurrentTab(nv)}>
                    <Tab label="Behaviour"/>
                    <Tab label="Info"/>
                    <Tab label="Abilities"/>                   
                </Tabs>
                {currentTab === 0 && <>
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
                    <Box sx={{width:'100%', display:'flex', flexDirection:'column', rowGap:'12px',mt:'12px', mr:'6px', columnCount:2, columnFill:'auto', flexWrap: 'wrap'}}>
                        <DetailInput 
                            value={data?.habitat ?? ""} 
                            onChange={(e) => setData((prev) => ({...prev, habitat: e.target.value}))}
                            label={"Habitat"}
                            multiline
                            editing={editing}
                            fieldId={"habitat"}
                        />
                        <DetailInput
                            value={data?.communication ?? ""} 
                            onChange={(e) => setData((prev) => ({...prev, communication: e.target.value}))}
                            label={"Communication"}
                            multiline
                            editing={editing}
                            fieldId={"communication"}
                        />
                        <DetailInput 
                            value={data?.tactics ?? ""} 
                            onChange={(e) => setData((prev) => ({...prev, tactics: e.target.value}))}
                            label={"Tactics"}
                            multiline
                            editing={editing}
                            fieldId={"tactics"}
                        />
                        <DetailInput 
                            value={data?.indicators ?? ""} 
                            onChange={(e) => setData((prev) => ({...prev, indicators: e.target.value}))}
                            label={"Indicators"}
                            multiline
                            editing={editing}
                            fieldId={"indicators"}
                        />
                        <DetailInput 
                            value={data?.rolePlayingNotes ?? ""} 
                            onChange={(e) => setData((prev) => ({...prev, rolePlayingNotes: e.target.value}))}
                            label={"Role Playing Notes"}
                            multiline
                            editing={editing}
                            fieldId={"roleplaying"}
                        />
                        <DetailInput 
                            value={data?.customization ?? ""} 
                            onChange={(e) => setData((prev) => ({...prev, customization: e.target.value}))}
                            label={"Customization"}
                            multiline
                            editing={editing}
                            fieldId={"customization"}
                        />
                    </Box>
                </>}
                {currentTab === 1 && <Box sx={{width:'100%', display:'flex', flexDirection: 'column', rowGap:'6px'}}>
                    <SectionPlate name={"Yields"} />
                    <Input 
                        multiline
                        value={data.yields ?? ''} 
                        onChange={(e) => setData((prev) => ({...prev, yields: e.target.value}))} 
                        disableUnderline={!editing}  
                        fullWidth
                        sx={{fontSize:'16px', "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000"}}} disabled={!editing} 
                    />
                    <SectionPlate name={"Mood table"} />
                    <Input 
                        multiline
                        value={data.moodTable ?? ''} 
                        onChange={(e) => setData((prev) => ({...prev, moodTable: e.target.value}))} 
                        disableUnderline={!editing}  
                        fullWidth
                        sx={{fontSize:'16px', "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000"}}} disabled={!editing} 
                    />
                    <SectionPlate name={"Reskin"} />
                    <Input 
                        multiline
                        value={data.reskin ?? ''} 
                        onChange={(e) => setData((prev) => ({...prev, reskin: e.target.value}))} 
                        disableUnderline={!editing}  
                        fullWidth
                        sx={{fontSize:'16px', "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000"}}} disabled={!editing} 
                    />
                    <SectionPlate name={"Notes"} />
                    <Input 
                        multiline
                        value={data.notes ?? ''} 
                        onChange={(e) => setData((prev) => ({...prev, notes: e.target.value}))} 
                        disableUnderline={!editing}  
                        fullWidth
                        sx={{fontSize:'16px', "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000"}}} disabled={!editing} 
                    />
                </Box>}
                {currentTab === 2 && <Box sx={{width:'100%', display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{ml: 'auto'}}>
                        <IconButton onClick={() => setData(prev => ({...prev, abilities: [...prev.abilities, {name: 'New Ability '+prev.abilities.filter(ab => ~ab.name.indexOf('New Ability')).length, level: 'B', description: '', mechanics: '', id: crypto.randomUUID() }]}))}><AddIcon/></IconButton>
                    </Box>
                        {data.abilities.map((a) => (
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
                </Box>}
            </Box>
        </Box>
    )
}