$(()=>{
    $("#paras").load('http://localhost:3000/para');

    $("#adicionar").click(function(e){
        e.preventDefault();
        $("#paras").append('<tr><td>'+$('#descricao').val()+'</td></tr>');
        ajaxPost();
        $('#descricao').val("")
    })
    $(document).on('click','.remove',function (e) { 
        e.preventDefault();
        $(this).closest('tr').remove();
        ajaxGet($(this).val()); 

    }); 

    function ajaxPost(texto,success,error){ 
        $.ajax({
            type:"POST",
            processData:false,
            contentType: false,
            url: "http://localhost:3000/ficheiro/guarda",
            data: new FormData($("#myFichForm")[0]),
            //dataType: "json",
            success: success,
            error: error
        })
    }
    
    function ajaxGet(id){   
    $.ajax({
        url: 'http://localhost:3000/ficheiro/apaga',
        type: 'GET',
        contentType: "application/json",
        data: {
            id: id, 
        },
        success: function(data) {
            console.log('form submitted.' + data);
        }
      });
    }
})