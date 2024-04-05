import { Container, HStack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../index";
import Loader from "./Loader";
import ExchangeCard from "./ExchangeCard";
import Error from "./Error";

function Exchanges() {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);

        setExchanges(data);
        setLoading(false);
      } catch (e) {
        setError(true);
        setLoading(false);
      }
    };
    fetchExchanges();
  }, []);

  if (error) <Error message={"Error While Fetching Exchanges"} />;

  return (
    <Container maxWidth={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchanges.map((coin) => (
              <ExchangeCard
                name={coin.name}
                img={coin.image}
                url={coin.url}
                rank={coin.trust_score_rank}
                key={coin.id}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
}

export default Exchanges;
