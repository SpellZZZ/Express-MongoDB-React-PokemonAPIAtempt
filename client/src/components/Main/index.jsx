import styles from "./styles.module.css"
import axios from "axios"
import { useState, useEffect } from "react"
import './style.css';


var colors = {
	fire: '#FDDFDF',
	grass: 'green',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};
var main_types = Object.keys(colors);



function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerCaseName(string) {
  return string.toLowerCase();
}



	
	



const switchDiv = async (id) => {
  	var NAME = document.getElementById(id);

  if (NAME.className ==  styles.pokeCont) {
    NAME.className=styles.pokeContSel;

    try {
      const token = localStorage.getItem("token");
      if (token) {
        const config = {
          method: 'post',
          url: 'http://localhost:8080/api/user/addIdToDatabase/' + id,
          headers: { 'Content-Type': 'application/json', 'x-access-token': token }
        };
        const { data: res } = await axios(config);
        console.log(res);
      }
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        localStorage.removeItem("token");
        window.location.reload();
      }
    }
  } else {
    NAME.className=styles.pokeCont;

    try {
      const token = localStorage.getItem("token");
      if (token) {
        const config = {
          method: 'post',
          url: 'http://localhost:8080/api/user/removeIdFromDatabase/' + id,
          headers: { 'Content-Type': 'application/json', 'x-access-token': token }
        };
        const { data: res } = await axios(config);
        console.log(res);
      }
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        localStorage.removeItem("token");
        window.location.reload();
      }
    }
  }
};











const Main = () => {
    const [data, setData] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState({
        firstName: "",
        lastName: "",  
        email: ""
    })
	 const [selectedPoke, setSelectedPoke] = useState([]);
  const [displayPokemons, setDisplayPokemons] = useState(false);
  
  const [selectedIds, setSelectedIds] = useState([]);
  



    const eraseState = () => {
        setData([])
        setTitle("")
        setDescription({
            firstName: "",
            lastName: "",  
            email: ""
        })
    } 

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
		setDisplayPokemons(false);
    }




    const handleDelete = async (e) => {
        e.preventDefault()
        // Pobierz token z localStorage:
        const token = localStorage.getItem("token")
        // Jeśli jest token w localStorage:
        if (token) {
            try {
                const confirmDelete = window.confirm("Czy chcesz usunąć konto?");
                if (confirmDelete){
                // Konfiguracja zapytania asynchronicznego z tokenem w nagłówku:
                const config = {
                    method: 'delete',
                    url: 'http://localhost:8080/api/user',
                    headers: { 'Content-Type': 'application/json', 'x-access-token': token }
                }
                // Wysłanie żądania o usunięcie:
                await axios(config)
                // Usunięcie tokena
                eraseState()
                localStorage.removeItem("token")
                window.location.reload()
            }
            } catch (error) {
                if (error.response && error.response.status >= 400 &&error.response.status <= 500)
                {
                    localStorage.removeItem("token")
                    window.location.reload()
                }
            }
        }
		setDisplayPokemons(false);
    }





const selectPokemonThatAreSelectedInDB = async () => {
	

  try {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        method: 'get',
        url: 'http://localhost:8080/api/user/selectedIds',
        headers: { 'Content-Type': 'application/json', 'x-access-token': token }
      };
      const { data: res } = await axios(config);
      res.ids.forEach(async (id) => {
				var NAME = document.getElementById(id);
				NAME.className=styles.pokeContSel;
		});
	  
	  
	  
	  
    }
  } catch (error) {
    if (error.response && error.response.status >= 400 && error.response.status <= 500) {
      localStorage.removeItem("token");
      window.location.reload();
    }
  }
};





const handleDisplaySelectedPokemons = async () => {

	  const pokemonContainer = document.querySelector(".pokemonBox");
		pokemonContainer.innerHTML = "";
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        method: 'get',
        url: 'http://localhost:8080/api/user/selectedIds',
        headers: { 'Content-Type': 'application/json', 'x-access-token': token }
      };
      const { data: res } = await axios(config);
      res.ids.forEach(async (id) => {
	  
			  try {
			  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
			  const data = response.data;

			  const poke_types = data.types.map((type) => type.type.name);
			  const type = main_types.find((type) => poke_types.indexOf(type) > -1);
			  const color = colors[type];

			  const element = document.createElement("div");
			  element.id = data.id;
			  element.style.backgroundColor = color;
			  element.className = selectedPoke.includes(data.id) ? styles.pokeContSel : styles.pokeCont;
			  element.onclick = () => switchDiv(data.id);

			  const pokePicture = document.createElement("div");
			  pokePicture.className = styles.pokePicture;

			  const img = document.createElement("img");
			  img.src = data.sprites.other["official-artwork"].front_default;
			  img.alt = "Pokemon name";

			  pokePicture.appendChild(img);

			  const idText = document.createElement("div");
			  idText.className = styles.idText;
			  idText.innerHTML = `<p>Id: ${data.id}</p>`;

			  const h3 = document.createElement("h3");
			  h3.innerText = capitalizeFirstLetter(data.name);

			  element.appendChild(pokePicture);
			  element.appendChild(idText);
			  element.appendChild(h3);

			  pokemonContainer.appendChild(element);
			} catch (err) {
			  console.log("Pokemon not found", err);
			}
	  
	  
	  
	  });
	  
	  
	  
	  
    }
  } catch (error) {
    if (error.response && error.response.status >= 400 && error.response.status <= 500) {
      localStorage.removeItem("token");
      window.location.reload();
    }
  }
  
  selectPokemonThatAreSelectedInDB();
};

















const handleDisplayPokemons = async (e) => {
	
	
	
	
  const pokemonContainer = document.querySelector(".pokemonBox");
pokemonContainer.innerHTML = "";
  const fetchPokemon = async (id) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = response.data;

      const poke_types = data.types.map((type) => type.type.name);
      const type = main_types.find((type) => poke_types.indexOf(type) > -1);
      const color = colors[type];

      const element = document.createElement("div");
      element.id = data.id;
      element.style.backgroundColor = color;
      element.className = selectedPoke.includes(data.id) ? styles.pokeContSel : styles.pokeCont;
      element.onclick = () => switchDiv(data.id);

      const pokePicture = document.createElement("div");
      pokePicture.className = styles.pokePicture;

      const img = document.createElement("img");
      img.src = data.sprites.other["official-artwork"].front_default;
      img.alt = "Pokemon name";

      pokePicture.appendChild(img);

      const idText = document.createElement("div");
      idText.className = styles.idText;
      idText.innerHTML = `<p>Id: ${data.id}</p>`;

      const h3 = document.createElement("h3");
      h3.innerText = capitalizeFirstLetter(data.name);

      element.appendChild(pokePicture);
      element.appendChild(idText);
      element.appendChild(h3);

      pokemonContainer.appendChild(element);
    } catch (err) {
      console.log("Pokemon not found", err);
    }
  };

  const fetchAllPokemons = async () => {
    const promises = [];
    for (let i = 1; i <= 100; i++) {
      promises.push(fetchPokemon(i));
    }
    await Promise.all(promises);

  };

  await fetchAllPokemons();
  
  
  selectPokemonThatAreSelectedInDB();
};
       
    return (
        <div className={styles.main_container}>
            <h1>MySite</h1>
            <nav className={styles.navbar}>
			    <button className={styles.white_btn} onClick={handleDisplayPokemons}>
                    Wyświetl wszystkie
                </button>
				<button className={styles.white_btn} onClick={handleDisplaySelectedPokemons}>
					Wyświetl wybrane 
				</button>
                <button className={styles.white_btn} onClick={handleDelete}>
                    Usuń konto
                </button>
                <button className={styles.white_btn} onClick={handleLogout}>
                    Logout
                </button>

            </nav>

			 {<div className="pokemonBox">{/* ... */}</div>}

        </div>


    )
}

export default Main
