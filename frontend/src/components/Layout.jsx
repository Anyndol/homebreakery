import { useContext } from "react"
import { AuthContext } from "../shared/AuthProvider"
import { AppBar, Avatar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
    const {userData, getProfile} = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" sx={{mb:4}}>
                <Toolbar>
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 2,
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'white',
                            textDecoration: 'none',
                        }}
                    >
                        Homebreakery!!
                    </Typography>
                    <Box sx={{ flexGrow: 1, display:'flex' }}>
                        <Button
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            onClick={() => navigate('/adversaries')}
                        >
                            Adversaries
                        </Button>
                        <Button
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            onClick={() => navigate('/species')}
                        >
                            Species
                        </Button>
                        {/*<Button
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            onClick={() => navigate('/callings')}
                        >
                            Callings
                        </Button>*/}
                        {userData ?
                            <Button
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                onClick={() => navigate('/mystuff')}
                            >
                                My stuff
                            </Button>
                            : <></>
                        }
                    </Box>
                    {userData ? <><Avatar alt={userData.global_name} src={`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}`} sx={{mr:1}} />{`Hello ${userData.global_name}!`}</> : <Button color="inherit" onClick={getProfile}>Login</Button>}
                </Toolbar>
            </AppBar>
            <Outlet/>
        </Box>
    )
}