import { Button, Container, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../index";
import Loader from "./Loader";
import CoinCard from "./CoinCard";
import Error from "./Error";

function Coins() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  function handlePage(page) {
    setPage(page);
    setLoading(true);
  }

  const btns = new Array(132).fill(1);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [currency, page]);

  if (error) <Error message={"Error While Feching coins"} />;

  return (
    <Container maxWidth={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio colorScheme="red" value={"inr"}>
                ₹ INR
              </Radio>
              <Radio colorScheme="red" value={"usd"}>
                $ USD
              </Radio>
              <Radio colorScheme="red" value={"eur"}>
                € EUR
              </Radio>
            </HStack>
          </RadioGroup>

          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((coin) => (
              <CoinCard
                id={coin.id}
                name={coin.name}
                img={coin.image}
                price={coin.current_price}
                symbol={coin.symbol}
                currencySymbol={currencySymbol}
                key={coin.id}
              />
            ))}
          </HStack>

          <HStack
            w={"full"}
            overflow={"auto"}
            p={"8"}
            sx={{
              "&::-webkit-scrollbar": {
                width: "16px",
                borderRadius: "8px",
                backgroundColor: `rgba(0, 0, 0, 0.05)`,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: `rgba(0, 0, 0, 0.08)`,
              },
            }}
          >
            {btns.map((item, index) => (
              <Button
                key={index}
                bgColor={"blackAlpha.900"}
                color={"white"}
                onClick={() => handlePage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
}

export default Coins;
