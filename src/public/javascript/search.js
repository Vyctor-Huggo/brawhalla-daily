function filterDropdown() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toUpperCase();
    const dropdown = document.getElementById('dropdownMenu');
    const links = dropdown.getElementsByTagName('a');

    for (let i = 0; i < links.length; i++) {
        const txtValue = links[i].textContent || links[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            links[i].style.display = "";
        } else {
            links[i].style.display = "none";
        }
    }

    // Exibe o menu apenas se houver texto na pesquisa
    dropdown.style.display = input.value ? "block" : "none";
}

function selectCharacter(name) {
    const input = document.getElementById('searchInput');
    const dropdown = document.getElementById('dropdownMenu');
    
    // Atualiza o valor do input com o nome selecionado
    input.value = name;

    // Esconde o dropdown
    dropdown.style.display = "none";
}