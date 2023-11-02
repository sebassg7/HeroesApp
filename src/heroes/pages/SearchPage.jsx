import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { getHeroesByName } from "../helpers";
import { HeroCard } from "../components";
import queryString from 'query-string';

export const SearchPage = () => {

const navigate = useNavigate();
const location = useLocation();

const {q =''}= queryString.parse(location.search)
const hereos = getHeroesByName(q);


const {searchText, onInputChange} = useForm({
  searchText: q,
});

  const onSearchSubmit = (event) =>{
    event.preventDefault();
    if(searchText.trim().length < 0) return; 

    navigate(`?q=${ searchText }`)
  };

  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={onSearchSubmit}>
            <input 
              type="text" 
              placeholder="Search a Hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />

          <button className="btn btn-outline-primary mt-1">
            Search
          </button>

          </form>

        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />

          <div className="alert alert-primary">
            Search a Hero 
          </div>

          <div className="alert alert-danger">
            There's a no here with <b>{q}</b>
          </div>
          {
            hereos.map(hero => 
              <HeroCard key={hero.id} {...hero}/>
              )
          }
          

        </div>
      </div>

      
    </>
  )
}
