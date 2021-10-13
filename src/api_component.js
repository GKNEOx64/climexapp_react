import axios from 'axios'

/*Classe responsável por fazer a comunicação do front end com o back-end da 
aplicação baseada em Axios para puxar a informação requisitada pelo usuário*/
class api_service {
     get_Info_Data(cidade) {
        const key = 'fe7e952ee3f94066e7040dc59bd51404'
        return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}`)
     }
}

export default api_service