import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import {
    Card, CardImg, CardText, CardTitle
  } from 'reactstrap';


import axios from 'axios';
import { Button } from 'reactstrap';


function App() {
  const [ pokemon, setPokemon ] = useState([]);

  async function getPokemon() {
      const pokemons = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
      
      const promises = pokemons.data.results.map(async (pokeUrl) => {
          const result = await axios.get(pokeUrl.url).then((rp) => rp.data);
          return result;
      });

      const pokeData = await Promise.all(promises);

      setPokemon(pokeData);
  }
  
  
  useEffect(() => {
      getPokemon();
  }, []);
  
  
  return (
    <>
      <Container fluid="lg" >
        <Row>
          <Link to="/johto">
            <Button color="primary">Shinydex - Johto</Button>
          </Link>
          <Link to="/hoenn">
            <Button color="warning">Shinydex - Hoenn</Button>
          </Link>
          <Link to="/sinnoh">
            <Button color="danger">Shinydex - Sinnoh</Button>
          </Link>
          <Link to="/unova">
            <Button color="success">Shinydex - Unova</Button>
          </Link>
          <Link to="/kalos">
            <Button color="secondary">Shinydex - Kalos</Button>
          </Link>
        </Row>
        <h1>ShinyDex - Kanto</h1>
        <Row md="12">
            
            {
                pokemon.map(data =>  {   
                    return(                                                                                  
                        <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }} className="col-md-4 col-sm-12">                                                                  
                            <CardImg variant="top" src={data.sprites.front_shiny} />
                            <CardTitle>#{data.id} - {data.name}</CardTitle>
                            <CardText></CardText>                                                    
                        </Card>
                    );
                })
            }
            
        </Row>  
      </Container>
    </>
  );
}

export default App;
