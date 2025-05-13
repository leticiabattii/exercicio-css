const botaoBuscar = document.getElementById('botao-buscar');
const campoEntrada = document.getElementById('entrada');
const divErro = document.getElementById('erro');

botaoBuscar.addEventListener('click', async () => {
    const buscar = campoEntrada.value.toLowerCase().trim();
    if (!buscar) {
        return;
    }

    try {
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${buscar}`);
        if (!resposta.ok) throw new Error('Pokemon não encontrado!');
        const dados = await resposta.json();

        document.getElementById('nome').textContent = dados.name;
        document.getElementById('numero').textContent = `#${dados.id}`;
        document.getElementById('imagem').src = dados.sprites.front_default;
        document.getElementById('peso').textContent = `${dados.weight / 10} kg`; 
        document.getElementById('altura').textContent = `${dados.height / 10} m`; 

        const habilidades = document.getElementById("habilidades");
        habilidades.innerHTML = '';
        dados.abilities.forEach(abilityInfo => {
            const habilidade = abilityInfo.ability.name;
            habilidades.innerHTML += habilidade.charAt(0).toUpperCase() + habilidade.slice(1) + ', ';
        });

        const estatisticas = document.getElementById("estatisticas");
        estatisticas.innerHTML = '';
        dados.stats.forEach(stat => {
            estatisticas.innerHTML += `${stat.stat.name.toUpperCase()}: ${stat.base_stat}, `;
        });

        const tipos = document.getElementById("tipo");
        tipos.innerHTML = '';
        dados.types.forEach(tipoInfo => {
            const tipo = tipoInfo.type.name;
            const chip = document.createElement('span');
            chip.className = 'chip-tipo';
            chip.textContent = tipo;
            chip.style.backgroundColor = corDoTipo(tipo);
            tipos.appendChild(chip);
        });

        divErro.textContent = '';

    } catch (error) {
        divErro.textContent = error.message;
    }

    function corDoTipo(tipo) {
        const cores = {
            fire: "#f94144",
            water: "#577590",
            grass: "#43aa9b",
            electric: "#f9c74f",
            bug: "#98be6d",
            normal: "#adb5bd",
            poison: "#9d4edd",
            ground: "#74a261",
            psychic: "#f72585",
            fighting: "#d00000",
            rock: "#6c584c",
            ghost: "#8339ec",
            dragon: "#3a06a3",
            dark: "#2d3145",
            ice: "#a8dac0",
            fairy: "#ffafcc",
            flying: "#48cae4",
            steel: "#8d9ae0"
        };
        return cores[tipo] || "#ddd"; 
    }
});
