$(document).ready(function() {
    $('#searchInput').on('input', function() {
        const searchTerm = $(this).val();
        $.ajax({
            url: '/search', // Rota que irá lidar com a pesquisa
            method: 'POST',
            data: { term: searchTerm },
            success: function(data) {
                $('#results').html(data);
                console.log(data)
            }
        });
    });
});