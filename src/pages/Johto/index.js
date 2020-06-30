import React, { useState, useEffect } from 'react';
import { Container, Row } from 'reactstrap';
import {
    Card, CardImg, CardText, CardTitle
  } from 'reactstrap';

import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

import axios from 'axios';

export default function Johto() {
    const [ pokemon, setPokemon ] = useState([]);

    async function getPokemon() {
        let pokemons = [];

        for (let i = 152; i <= 251; i++) {
            pokemons.push({url: `https://pokeapi.co/api/v2/pokemon/${i}/`});
        }
        
        
        const promises = pokemons.map(async (pokeUrl) => {
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
        // style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
        <Container fluid="lg" >
            <Row>
            <Link to="/">
                <Button color="primary">Shinydex - Kanto</Button>
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
            <h1>ShinyDex - Johto</h1>
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
    )
}