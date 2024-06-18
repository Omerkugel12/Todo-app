import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import RefreshIcon from "@mui/icons-material/Refresh";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

export function Filter({
  query,
  setQuery,
  setFilterByIsComplete,
  setSearchParams,
}) {
  return (
    <div className="filters">
      <form className="search-by-name">
        <label htmlFor="">search by title</label>
        <TextField
          type="search"
          value={query}
          id="q"
          placeholder="search by title"
          onChange={(ev) =>
            setSearchParams((prev) => {
              prev.set("query", ev.target.value);
              return prev;
            })
          }
          sx={{
            "& input": {
              color: "white", // Change font color here
            },
          }}
          color="info"
        />
        <Button variant="contained">
          <SearchIcon />
        </Button>
      </form>
      <div className="filters-buttons">
        <button onClick={() => setFilterByIsComplete("all")}>
          All{<RefreshIcon />}
        </button>
        <button onClick={() => setFilterByIsComplete("active")}>
          Actives{<CheckBoxOutlineBlankIcon />}
        </button>
        <button onClick={() => setFilterByIsComplete("complete")}>
          Completed{<CheckBoxIcon />}
        </button>
      </div>
    </div>
  );
}
