const urlAPI='http://localhost:3000/tarefas'
let nomeTarefa=document.querySelector('#nomeTarefa')

async function  listarDados(){
    const tabela=document.querySelector('tbody')

    try{
        const response= await fetch(urlAPI)
        const data= await response.json()
        console.log("dados recebidos", data)
        for(let i=0;i<data.length;i++){
            const tr=document.createElement('tr')
            tr.innerHTML=   `
                            <td>${data[i].id}</td>
                            <td>${data[i].nome}</td>
                            <td>
                                <button class=" btn btn-sm btn-outline-warning"><i class='bx bx-edit'></i></button>
                                <button class=" btn btn-sm btn-outline-danger" onclick="xcluirTarefa(${data[i.id]})"><i class='bx bxs-trash'></i></button>

                                </td>
                            
                            `

            tabela.appendChild(tr)
        }


    }catch(error){
        console.log("Erro na solicitação:"+error.message)
    }
}
listarDados()

async function adicionarTarefa(){
    try{
        let nome=nomeTarefa.value
        await fetch(urlAPI,{
                                method:"POST",
                                headers:{"Content-type": "application/json"},
                                body: JSON.stringify({
                                                    nome:nome,   
                                                    })
                            })

    }catch(error){
        console.log("Erro de solicitação:"+error.message)
    }
}

async function excluirTarefa(idTarefa){
    await fetch(`http://localhost:3000/tarefas/${idTarefa}`,{method:'DELETE'})
    listarDados()
}