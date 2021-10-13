import React, { useState } from "react";
import { useEffect, setState, state, Image} from "react";
import {InputGroup, Button, FormControl, Card, ListGroup, ListGroupItem, Navbar, Container, Table} from 'react-bootstrap';
import axios from 'axios';
import api_service from "../api_component";
import App from '../App'
import { render } from "@testing-library/react";

const Apx = () => {
  //atualizar em tempo real a tabela de cidades mais procuradas
  useEffect(() => {
    console.clear()
    //atualiza o estado do array com as cidades mais procuradas
    //dar valor as cidades:
    if (props_Cidades.length >= 6) {
      props_Cidades.sort((a, b) => {
        return a.index - b.index;
      })
      setCity1(props_Cidades[props_Cidades.length - 1].name)
      setCity2(props_Cidades[props_Cidades.length - 2].name)
      setCity3(props_Cidades[props_Cidades.length - 3].name)
      setCity4(props_Cidades[props_Cidades.length - 4].name)
      setCity5(props_Cidades[props_Cidades.length - 5].name)
    }
    console.log(props_Cidades)
  })

  /*Declarando: 
    weatherService = instanciando serviço da API OpenWeatherMap;
    declarando uma variável para ser a responsável por armazenar o input do usuário
    na caixa de texto da aplicação
  */
  const weatherService = new api_service()
  var city_value = ''

  //States
  const [getIcon, setGetIcon] = useState(String)
  const [cidade, setCidade] = useState(String)
  const [pais, setPais] = useState(String)
  const [temperatura, setTemperatura] = useState(String)
  const [umidade, setUmidade] = useState(String)
  var [cidades_procuradas, set_cidades_procuradas] = useState([])
  var [props_Cidades, setPropsCidades] = useState([{
    name: undefined,
    index: undefined,
  }])

  //variáveis para rankear as cidades com maiores índices de pesquisa
  var [most_searched_city1, setCity1] = useState(String)
  var [most_searched_city2, setCity2] = useState(String)
  var [most_searched_city3, setCity3] = useState(String)
  var [most_searched_city4, setCity4] = useState(String)
  var [most_searched_city5, setCity5] = useState(String)

  //converte Kelvin para Celsius
  const converter = (temp) => {
    var resultado = temp - 273.15;

    //para o resultado inicial não ficar -273.15 Celsius
    if (resultado == -273.15) { const resfinal = 0 
      return resfinal 
    }
    else { const resfinal = resultado.toFixed(0) 
      return resfinal } 
  } 
  
  /*verifica se a cudade que o usuário botar já existe no array de últimas cidades pesquisadas*/
  const verifica_Cidade_Array = (array_data, data) => {
    var isIncluded = array_data.includes(data)
    var name = data
    increment_Props(isIncluded, name)
  }

  //Função que usa como parâmetro a função acima
  //onde a mesma vê se ele foi ou não, assim usando o valor retornado em Boolean
  //para poder ver se inclui ele no array das cidades mais procuradas e adiciona um valor de frequência
  //ou se apenas procura ele no array e adiciona + 1 na frequência da cidade, fazendo ela subir ou diminuir
  //no raking de cidades mais procuradas
  const increment_Props = (bool, array_target_data_name) => {
    if (bool) {
      for (var i = 0; i < props_Cidades.length; i++) {
        if (array_target_data_name == props_Cidades[i].name) {
          props_Cidades[i].index++
        }
      }
    } else if (!bool) {
      setPropsCidades([...props_Cidades, {name: array_target_data_name, index: 1}])
    }
  }

  //Pega toda a informação baseada na chamada da API = OpenWeatherMap 
  const get_data = () => {
    weatherService.get_Info_Data(city_value).then((res) => {

      console.log(res.data)
      //Método para pegar Icon da página para incluir na foto
      setGetIcon(res.data.weather[0].icon)
      //método para setar a cidade
      setCidade(res.data.name)
      //método para setar o país
      setPais(res.data.sys.country)
      //Método para setar a temperatura
      setTemperatura(res.data.main.temp)
      //Método para setar umidade
      setUmidade(res.data.main.humidity)
      //Método para incluir a cidade na lista de últimas procuradas
      set_cidades_procuradas([...cidades_procuradas, res.data.name])
      //método para pesquisar a quantidade de vezes que o índice = cidade aparece na lista
      verifica_Cidade_Array(cidades_procuradas, res.data.name)

    }).catch((err) => {
      console.clear();
      console.log(err.message)
      alert('Cidade Não Encontrada: ' + err.message)
    })
  }
  
    //front end da página principal da aplicação
    return(
      //Componente de render;
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">
              <h3 class='title'>Climex App - Tech4Humans Teste - por: Gabriel Polli</h3>
            </Navbar.Brand>
            <img src={`http://openweathermap.org/img/wn/${getIcon}@2x.png`} width = '130px' height = '130px'></img>
          </Container>
        </Navbar>
        <div class='left-containter'>
          <Card style={{ width: '40rem' }}>
            <div class='input'>
              <InputGroup className="mb-3" onChange={(i) => {
                var atribuir = i.target.value;
                city_value = atribuir;
              }}>
                <FormControl
                  placeholder="Pesquise uma Cidade"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <Button variant="outline-secondary" id="button-addon2" onClick={get_data}>Pesquisar</Button>
              </InputGroup>
            </div>
            <Card.Body>
              <Card.Title>Cidade Selecionada: {cidade}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem><h4>País: {pais}</h4></ListGroupItem>
              <ListGroupItem><h4>Temperatura Atual: {converter(temperatura)}°C</h4></ListGroupItem>
              <ListGroupItem><h4>Umidade: {umidade}%</h4></ListGroupItem>
            </ListGroup>
          </Card>
        </div>
        <div class='right-table'>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th></th>
                <th>Últimas Cidades Pesquisadas</th>
                <th>Top 5 - Cidades mais buscadas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>{cidades_procuradas[cidades_procuradas.length - 1]}</td>
                <td>{most_searched_city1}</td>
              </tr>
              <tr>
                <td>2</td>
                <td>{cidades_procuradas[cidades_procuradas.length - 2]}</td>
                <td>{most_searched_city2}</td>
              </tr>
              <tr>
                <td>3</td>
                <td>{cidades_procuradas[cidades_procuradas.length - 3]}</td>
                <td>{most_searched_city3}</td>
              </tr>
              <tr>
                <td>4</td>
                <td>{cidades_procuradas[cidades_procuradas.length - 4]}</td>
                <td>{most_searched_city4}</td>
              </tr>
              <tr>
                <td>5</td>
                <td>{cidades_procuradas[cidades_procuradas.length - 5]}</td>
                <td>{most_searched_city5}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    );
}

export default Apx;