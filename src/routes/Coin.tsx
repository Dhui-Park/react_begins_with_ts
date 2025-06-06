import { Link, Route, Switch, useLocation, useParams, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

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
  padding: 30px 0px;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  left: 0px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${props => props.theme.textColor};
  font-size: 24px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverViewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 20px 0px;
  gap: 10px;
`;

const Tab = styled.span<{isActive: boolean}>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${props => !props.isActive ? props.theme.secondAccentColor : props.theme.textColor};
  padding: 7px 0px;
  border-radius: 10px;
  border: 1px solid ${props => props.theme.textColor};
  a {
    display: block;
  }
  color: ${props => !props.isActive ? props.theme.textColor : props.theme.secondAccentColor};
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.textColor};
  text-align: center;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
  margin-top: 30px;
`;

interface RouteParams {
    coinId: string;
}

interface RouteState {
    name: string;
}

interface InfoData {
    name: string;
    id: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}


interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        }
    };
}

interface ICoinProps {
  isDark: boolean;
}

function Coin({ isDark }: ICoinProps) {
    // const [loading, setLoading] = useState(true);
    const { coinId } = useParams<RouteParams>();
    const { state } = useLocation<RouteState>();
    const priceMatch = useRouteMatch("/:coinId/price");
    const chartMatch = useRouteMatch("/:coinId/chart");

    const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>({
      queryKey: ["info", coinId],
      queryFn: () => fetchCoinInfo(coinId)
    });
    const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>({
      queryKey: ["tickers", coinId], 
      queryFn: () => fetchCoinTickers(coinId),
      refetchInterval: 5000,
    });
    
    const loading = infoLoading || tickersLoading;

    
    return <Container>
      <Helmet>
        <title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</title>
      </Helmet>
      <Header>
        <BackButton onClick={() => window.history.back()}>Coins</BackButton>
        <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
      </Header>
    {loading ? (
        <Loader>Loading...</Loader>
    ) : (
        <>
          <Overview>
            <OverViewItem>
                <span>Rank:</span>
                <span>{infoData?.rank}</span>
            </OverViewItem>
            <OverViewItem>
                <span>Symbol:</span>
                <span>{infoData?.symbol}</span>
            </OverViewItem>
            <OverViewItem>
                <span>Price:</span>
                <span>{tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverViewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverViewItem>
                <span>Total Supply:</span>
                <span>{tickersData?.total_supply.toLocaleString()}</span>
            </OverViewItem>
            <OverViewItem>
                <span>Max Supply:</span>
                <span>{tickersData?.max_supply.toLocaleString()}</span>
            </OverViewItem>
          </Overview>

          <Tabs>
            <Tab isActive={priceMatch !== null}>
                <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
            <Tab isActive={chartMatch !== null}>
                <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/:coinId/price`}>
                <Price />
            </Route>
            <Route path={`/:coinId/chart`}>
                <Chart coinId={coinId} isDark={isDark} />
            </Route>
          </Switch>
        </>
    ) }
    
</Container>;
}

export default Coin; 