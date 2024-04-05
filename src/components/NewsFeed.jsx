// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Box, Text, Link, Image, Img } from "@chakra-ui/react";

// const NewsFeed = () => {
//   const [news, setNews] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const response = await axios.get(
//           "https://api.coingecko.com/api/v3/news"
//         );
//         setNews(response.data.data); // Adjust to access the 'data' key
//         console.log(response.data.data);
//         setError(null);
//       } catch (error) {
//         console.error("Error fetching news:", error);
//         setNews([]);
//         setError("An error occurred while fetching the news.");
//       }
//     };

//     fetchNews();

//     // Optionally, you can set up a timer to refresh the news feed periodically
//     // const intervalId = setInterval(fetchNews, 60000); // Refresh every 1 minute
//     // return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <Box>
//       <Text fontSize="xl" fontWeight="bold" mb="4">
//         Cryptocurrency News
//       </Text>
//       {error && <Text color="red.500">{error}</Text>}
//       {news.map((article) => (
//         <Box key={article.updated_at} mb="4">
//           <Text fontWeight="bold">
//             <Link href={article.url} isExternal>
//               {article.title}
//             </Link>
//           </Text>
//           <Text>{article.description}</Text>
//           {article.image && (
//             <>
//               {/* <Image src={article.thumb_2x} alt="Article Image" my="2" /> */}
//               <Img src={article.thumb_2x} />
//             </>
//           )}
//           <Text fontSize="sm" color="gray.500">
//             {new Date(article.published_at).toLocaleString()}
//           </Text>
//         </Box>
//       ))}
//     </Box>
//   );
// };

// export default NewsFeed;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Heading, Image, Text, Link } from "@chakra-ui/react";
import Loader from "./Loader";

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=923aaff0859e40269afb43ddd03e42d1"
        );
        setNews(response.data.articles);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
        setNews([]);
        setError("An error occurred while fetching the news.");
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box>
          <Heading as="h1" size="xl" mb="4">
            Cryptocurrency News
          </Heading>
          {error && <Text color="red.500">{error}</Text>}
          {news.map((article) => (
            <Box
              key={article.url}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p="4"
              mb="4"
              boxShadow="lg"
            >
              <Image src={article.urlToImage} alt={article.title} mb="4" />
              <Heading as="h2" size="lg" mb="2">
                {article.title}
              </Heading>
              <Text fontSize="sm" color="gray.500" mb="2">
                {article.publishedAt}
              </Text>
              <Text mb="4">{article.description}</Text>
              <Link href={article.url} isExternal color="blue.500">
                Read more
              </Link>
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

export default NewsFeed;
