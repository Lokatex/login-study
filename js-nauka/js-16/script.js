// Fetch - Function used for making http requests to fetch resources.
//         (JSON style data, images, files)
//          Simplifies asynchronous adta ferching in JavaScript and
//          used for inreracting with APIs to retrieve and send
//          data asynchronusly over the web.
//          fetch(url, {options})

fetchData();

async function fetchData() {
    const errorMessage = document.getElementById("error-message");
    const imgElement = document.getElementById("pokemonSprite");

    try {
      const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

      if (!response.ok) {
        throw new Error("Could not fetch resource");
      }

      const data = await response.json();

      if (!data.sprites || !data.sprites.front_default) {
        throw new Error("Pokemon not found");
      }

      const pokemonSprite = data.sprites.front_default;

      imgElement.src = pokemonSprite;
      imgElement.style.display = "block";
      errorMessage.style.display = "none";
    } catch (error) {
      console.error(error);
      imgElement.style.display = "none";
      errorMessage.style.display = "block";
    }
  }