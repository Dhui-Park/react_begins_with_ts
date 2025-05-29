import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
    display: block; 
    padding: 20px;
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


interface CoinInterface {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string
}

function Coins() {
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async() => {
            const response = await fetch("https://api.coinpaprika.com/v1/coins");
            const json = await response.json();
            setCoins(json.slice(0, 30));
            setLoading(false);
        })();
    }, []);
    console.log(coins)
    return <Container>
        <Header>
            <Title>Coins</Title>
        </Header>
        {loading ? <Loader>Loading...</Loader> : <CoinsList>
            {coins.map(coin => <Coin key={coin.id}>
                <Link to={`/${coin.id}`}> 
                    {coin.name} &rarr;
                </Link>
            </Coin>)}
        </CoinsList>}
    </Container>
}

export default Coins;