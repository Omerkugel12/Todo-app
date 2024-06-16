export function Filter({query,setQuery}) {

    return (
        <div className="filters">
            <div>
                <label>search by title</label>
                <input type="search" value={query} placeholder="search by title" onChange={ev=>setQuery(ev.target.value)}/>
            </div>
        </div>
    )
}