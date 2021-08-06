function buscaPokemon(event, form) {
  event.preventDefault();

  const nomePoke = form.pkm_nome.value;
  const api = `https://pokeapi.co/api/v2/pokemon/${nomePoke}`;
  console.log(api);

  fetch(api)
    .then((response) => {
      if (response.status != 200) {
        console.log(response.status);
        throw new Error(alert("NOME DO POKEMON INVÁLIDO"));
      }
      return response.json();
    })

    .then((infoPoke) => {
      dataPoke(infoPoke);
    })

    .catch((Error) => {
      console.error(Error);
    });
}

function dataPoke(infoPoke) {
  const habilidades_list = infoPoke.abilities;
  console.log("lista de habilidades:", habilidades_list);

  const habilidades_gerais = infoPoke.abilities.reduce(
    (prev, curr) => prev.concat(curr.ability.name),
    []
  );
  console.log("habilidades gerais:", habilidades_gerais);

  const habilidades_secretas = abilityCheck(habilidades_gerais);
  const habilidades_normais = habilidades_gerais.slice(
    0,
    habilidades_gerais.length - 1
  );
  console.log("habilidades secretas:", habilidades_secretas);
  console.log("habilidades comuns:", habilidades_normais);

  let pokemon = {
    visual: infoPoke.sprites.front_default,
    nome: infoPoke.name,
    habilidades_gerais: infoPoke.abilities.reduce(
      (prev, curr) => prev.concat(curr.ability.name),
      []
    ),
    habilidades_secreta: abilityCheck(habilidades_gerais),
    habilidades_normais: habilidades_gerais.slice(
      0,
      habilidades_gerais.length - 1
    ),
    pokedexNum: infoPoke.id,
    altura: infoPoke.height * 10 + " cm",
    peso: infoPoke.weight / 10 + " kg",
  };

  TabelaPokeAdd(pokemon);
}

function TabelaPokeAdd(pokemon) {
  var tr = TabelaPokeTR(pokemon);
  var tbody = document.querySelector("#content_pkm");

  tbody.appendChild(tr);
}

function TabelaPokeTR(pokemon) {
  var tr = document.createElement("tr");
  tr.classList.add("pokes");

  const imagemP = imagemPoke(pokemon.visual);
  const nomeP = TabelaPokeTD(pokemon.nome);
  const noPokedex = TabelaPokeTD(pokemon.pokedexNum);
  const alturaP = TabelaPokeTD(pokemon.altura);
  const pesoP = TabelaPokeTD(pokemon.peso);
  const habilidades_comum = TabelaPokeTD(pokemon.habilidades_normais.join(" "));
  const habilidade_secreta = TabelaPokeTD(pokemon.habilidades_secreta);

  tr.appendChild(imagemP);
  tr.appendChild(nomeP);
  tr.appendChild(habilidades_comum);
  tr.appendChild(habilidade_secreta);
  tr.appendChild(noPokedex);
  tr.appendChild(alturaP);
  tr.appendChild(pesoP);

  return tr;
}

function TabelaPokeTD(info) {
  var td = document.createElement("td");
  td.textContent = info;

  return td;
}

function imagemPoke(link) {
  var td = document.createElement("td");
  var img = document.createElement("img");
  img.classList.add("img_poke");
  img.src = link;

  td.appendChild(img);
  return td;
}

function abilityCheck(habilidades_gerais) {
  if (habilidades_gerais.length > 1) {
    const hidden = habilidades_gerais[habilidades_gerais.length - 1];

    return hidden;
  }
}
