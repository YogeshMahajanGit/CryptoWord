import { Box, Spinner, VStack } from "@chakra-ui/react";

function Loader() {
  return (
    <VStack h={"90vh"} justifyContent={"center"}>
      <Box transform={"scale(3)"}>
        <Spinner
          thickness="3px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    </VStack>
  );
}

export default Loader;
