import { Box, Typography } from "@mui/material";

export default function SectionPlate({name}) {
    return (
        <Box sx={{background:"linear-gradient(90deg, rgba(249,165,55,1) 20%, rgba(238,40,129,1) 100%)", display:'flex', alignItems:'center', borderRadius: '0px 16px 16px 0px', pt:'6px', pb:'6px', width:'100%'}}>
            <Typography color={'white'} fontWeight={'bold'} fontSize='18px' sx={{ml:'12px', textTransform:'uppercase'}}>{name}</Typography>
        </Box>
    )
}