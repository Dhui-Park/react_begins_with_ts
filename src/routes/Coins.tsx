import styled from "styled-components";

    const Container = styled.div`
        padding: 0px 20px;
    `;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color : white,
  color: ${props => props.theme.bgColor};
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.textColor};
  
`;

const coins = [
    {
        id: "btc-bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        rank: 1,
        is_new: false,
        is_active: true,
        type: "coin",
    },
    {
        id: "eth-ethereum",
        name: "Ethereum",
        symbol: "ETH",
        rank: 2,
        is_new: false,
        is_active: true,
        type: "coin",
    },
    {
        id: "xrp-xrp",
        name: "XRP",
        symbol: "XRP",
        rank: 3,
        is_new: false,
        is_active: true,
        type: "coin",
    },
    {
        id: "bch-bitcoin-cash",
        name: "Bitcoin Cash",
        symbol: "BCH",
        rank: 4,
        is_new: false,
        is_active: true,
        type: "coin",
    }
]

function Coins() {
    return <Container>
        <Header>
            <Title>Coins</Title>
        </Header>
        <CoinsList>
            {coins.map(coin => <Coin key={coin.id}>{coin.name}</Coin>)}
        </CoinsList>
    </Container>
}

export default Coins;