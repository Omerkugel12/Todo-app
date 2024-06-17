import { Button } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@mui/material/TextField";
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

export function Filter({query,setQuery,setFilterByIsComplete}) {

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
            <div>
                <button onClick={()=>setFilterByIsComplete('all')} >All{<RefreshIcon/>}</button>
                <button onClick={()=>setFilterByIsComplete('active')}>Actives{<CheckBoxOutlineBlankIcon/>}</button>
                <button onClick={()=>setFilterByIsComplete('complete')}>Completed{<CheckBoxIcon/>}</button>
            </div>
        </div>
    )
}