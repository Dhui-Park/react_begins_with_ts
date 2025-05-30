import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul`
  padding: 0px 20px;
`;

const Coin = styled.li`
  background-color: white;
  font-weight: bold;
  color: ${props => props.theme.accentColor};
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    transition: color 0.2s ease-in;
    display: flex; 
    padding: 20px;
    align-items: center;
  }
  &:hover {
    a {
      color: ${props => props.theme.textColor}
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.textColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
  margin-top: 30px;
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string
}

function Coins() {

  const { isLoading, data } = useQuery<ICoin[]>({
    queryKey: ["allCoins"],
    queryFn: fetchCoins
  });
  console.log(isLoading, data)
    return (
        <Container>
            <Header>
                <Title>Coins</Title>
            </Header>
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <CoinsList>
                    {data?.slice(0, 30).map((coin) => (
                        <Coin key={coin.id}>
                            <Link to={{ pathname: `/${coin.id}`, state: { name: coin.name }}}>
                                <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} />
                                {coin.name} &rarr;
                            </Link>
                        </Coin>
                    ))}
                </CoinsList>
            )}
        </Container>
    );
}

export default Coins;