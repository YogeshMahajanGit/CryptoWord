import React, { useState, useEffect } from "react";
import { Select, Box, Flex, Image, Text } from "@chakra-ui/react";
import axios from "axios";

const MarketCap = () => {
  const [coins, setCoins] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc"); // Default sorting order is descending

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_" +
            sortOrder +
            "&per_page=100&page=1&sparkline=false",
          {
            timeout: 5000, // Timeout in milliseconds
          }
        );
        setCoins(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [sortOrder]);

  return (
    <Box maxW="800px" mx="auto" mt="4">
      <Select mb="4" onChange={(e) => setSortOrder(e.target.value)}>
        <option value="desc">Sort by Market Cap Desc</option>
        <option value="asc">Sort by Market Cap Asc</option>
      </Select>
      <Flex flexWrap="wrap">
        {coins.map((coin) => (
          <Box
            key={coin.id}
            borderWidth="1px"
            borderRadius="lg"
            p="4"
            m="2"
            width={{ base: "100%", sm: "45%", md: "30%" }}
          >
            <Image
              src={coin.image}
              alt={coin.name}
              boxSize="50px"
              mx="auto"
              mb="2"
            />
            <Text fontWeight="bold" fontSize="lg" textAlign="center">
              {coin.name}
            </Text>
            <Text fontSize="sm" textAlign="center" color="gray.500">
              {coin.symbol.toUpperCase()}
            </Text>
            <Text fontSize="md" textAlign="center">
              ${coin.current_price}
            </Text>
            <Text fontSize="sm" textAlign="center">
              Market Cap: ${coin.market_cap}
            </Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default MarketCap;
