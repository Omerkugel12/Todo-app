import { Button } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@mui/material/TextField";

export function Filter({query,setQuery}) {

    return (
        <div className="filters">
            <form className="search-by-name">
                <label htmlFor="">search by title</label>
                <TextField type="search" value={query} placeholder="search by title" onChange={ev=>setQuery(ev.target.value)}
                    sx={{
                        "& input": {
                          color: "white", // Change font color here
                        },
                      }}
                      color="info"/>
                <Button variant="contained" >
                    <SearchIcon/>
                </Button>
            </form>
        </div>
    )
}