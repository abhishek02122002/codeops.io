import {
  Box,
  Text,
  VStack,
  HStack,
  Image,
  useColorMode,
  Link as ChakraLink,
  IconButton,
  Tag,
  Badge,
  Flex,
  useBreakpointValue,
  SimpleGrid,
  Tooltip,
  Avatar,
  Divider,
  Skeleton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMedium, FaBookmark, FaRegBookmark, FaShare, FaHeart, FaRegHeart, FaComment } from "react-icons/fa";
import { FiExternalLink, FiClock, FiUser } from "react-icons/fi";
import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Articles with enhanced metadata
const articles = [
  {
    id: 1,
    title: "10 JavaScript Tricks Only Advanced Developers Know About",
    excerpt: "Uncover hidden JavaScript features that can elevate your coding game.",
    content: `JavaScript, a dynamic and versatile language, offers a treasure trove of features often overlooked... [Full content would be here]`,
    mediumLink: "https://medium.com/@vitaliykorzenkoua/the-most-difficult-javascript-interview-question-405cdbdd75eb",
    image: "/blog-images/blog-img.png",
    author: "Jane Developer",
    authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    readTime: "5 min read",
    date: "May 15, 2023",
    tags: ["JavaScript", "Advanced", "Web Development"],
    likes: 1245,
    comments: 42,
    isTrending: true,
    isBookmarked: false
  },
  {
    id: 2,
    title: "Five Things Vibe Coders Should Know",
    excerpt: "Essential knowledge for developers focusing on developer experience.",
    content: `And it underlines a bit of a problem with vibe coding... [Full content would be here]`,
    mediumLink: "https://medium.com/user-experience-design-1/five-things-vibe-coders-should-know-from-a-software-engineer-b2adb410a2c6",
    image: "/blog-images/blog-img-third.png",
    author: "Alex Engineer",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    readTime: "4 min read",
    date: "June 2, 2023",
    tags: ["DX", "Engineering", "Best Practices"],
    likes: 892,
    comments: 18,
    isTrending: false,
    isBookmarked: false
  },
  {
    id: 3,
    title: "Building an AI-Powered Football Commentator",
    excerpt: "Generate commentary using AI and open-source football data.",
    content: `In this tutorial, we'll build an AI system that... [Full content would be here]`,
    mediumLink: "https://medium.com/better-programming/building-an-ai-powered-football-commentator-6dbff5af9a88",
    image: "/blog-images/blog-img-second.png",
    author: "Sam AI",
    authorAvatar: "https://randomuser.me/api/portraits/men/75.jpg",
    readTime: "8 min read",
    date: "June 10, 2023",
    tags: ["AI", "Sports", "OpenAI"],
    likes: 2103,
    comments: 87,
    isTrending: true,
    isBookmarked: false
  }
];

const Articles = () => {
  const { colorMode } = useColorMode();
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
  const [likedArticles, setLikedArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleBookmark = (articleId) => {
    if (bookmarkedArticles.includes(articleId)) {
      setBookmarkedArticles(bookmarkedArticles.filter(id => id !== articleId));
    } else {
      setBookmarkedArticles([...bookmarkedArticles, articleId]);
    }
  };

  const toggleLike = (articleId) => {
    if (likedArticles.includes(articleId)) {
      setLikedArticles(likedArticles.filter(id => id !== articleId));
    } else {
      setLikedArticles([...likedArticles, articleId]);
    // In a real app, you'd also increment the like count on the server
    // articles.find(a => a.id === articleId).likes += 1;
    }
  };

  const openArticleModal = (article) => {
    setSelectedArticle(article);
    onOpen();
  };

  const shareArticle = (article) => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: article.mediumLink,
      }).catch(console.error);
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(article.mediumLink);
      alert('Link copied to clipboard!');
    }
  };

  const bgGradient = colorMode === "light" 
    ? "linear(to-r, blue.50, purple.50)"
    : "linear(to-r, gray.900, gray.800)";

  return (
    <Box
      minHeight="100vh"
      bg={bgGradient}
      color={colorMode === "light" ? "gray.800" : "white"}
      p={{ base: 4, md: 8 }}
      transition="all 0.3s ease-in-out"
    >
      {/* Header with animated gradient */}
      <Box textAlign="center" mb={10}>
        <Text
          as={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          fontSize={{ base: "3xl", md: "5xl" }}
          fontWeight="extrabold"
          mb={4}
          bgGradient="linear(to-r, blue.400, purple.600, pink.500)"
          bgClip="text"
        >
          Discover Tech Articles
        </Text>
        <Text
          fontSize={{ base: "md", md: "lg" }}
          color={colorMode === "light" ? "gray.600" : "gray.400"}
          maxW="2xl"
          mx="auto"
        >
          Curated collection of the best technical articles from around the web
        </Text>
      </Box>

      {/* Filter tabs */}
      <Flex
        justify="center"
        mb={8}
        overflowX="auto"
        pb={2}
        sx={{
          '&::-webkit-scrollbar': {
            height: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            bg: colorMode === 'light' ? 'gray.300' : 'gray.600',
            borderRadius: '3px',
          },
        }}
      >
        <HStack spacing={4}>
          {['All', 'Trending', 'JavaScript', 'AI', 'Engineering', 'React'].map((tag) => (
            <Tag
              key={tag}
              size="lg"
              variant="subtle"
              colorScheme={tag === 'All' ? 'purple' : 'gray'}
              cursor="pointer"
              _hover={{ transform: 'scale(1.05)' }}
              transition="all 0.2s"
            >
              {tag}
            </Tag>
          ))}
        </HStack>
      </Flex>

      {/* Articles grid */}
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={6}
        mb={10}
      >
        <AnimatePresence>
          {articles.map((article) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5 }}
            >
              {isLoading ? (
                <SkeletonArticle />
              ) : (
                <ArticleCard
                  article={article}
                  colorMode={colorMode}
                  isMobile={isMobile}
                  isBookmarked={bookmarkedArticles.includes(article.id)}
                  isLiked={likedArticles.includes(article.id)}
                  onBookmark={toggleBookmark}
                  onLike={toggleLike}
                  onShare={shareArticle}
                  onOpenModal={openArticleModal}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </SimpleGrid>

      {/* Featured article (only on desktop) */}
      {!isMobile && (
        <Box mb={10}>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Featured Article
          </Text>
          {isLoading ? (
            <SkeletonFeatured />
          ) : (
            <FeaturedArticle 
              article={articles[0]} 
              colorMode={colorMode} 
              onOpenModal={openArticleModal}
            />
          )}
        </Box>
      )}

      {/* Article modal */}
      {selectedArticle && (
        <ArticleModal
          isOpen={isOpen}
          onClose={onClose}
          article={selectedArticle}
          colorMode={colorMode}
          isLiked={likedArticles.includes(selectedArticle.id)}
          isBookmarked={bookmarkedArticles.includes(selectedArticle.id)}
          onLike={toggleLike}
          onBookmark={toggleBookmark}
          onShare={shareArticle}
        />
      )}
    </Box>
  );
};

const ArticleCard = ({ 
  article, 
  colorMode, 
  isMobile, 
  isBookmarked, 
  isLiked, 
  onBookmark, 
  onLike, 
  onShare,
  onOpenModal
}) => {
  return (
    <Box
      bg={colorMode === "light" ? "white" : "gray.800"}
      border="1px solid"
      borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
      borderRadius="xl"
      overflow="hidden"
      boxShadow="md"
      position="relative"
      transition="all 0.3s ease"
      _hover={{
        boxShadow: "xl",
        transform: "translateY(-5px)"
      }}
    >
      {article.isTrending && (
        <Badge 
          position="absolute" 
          top={2} 
          right={2} 
          colorScheme="pink"
          zIndex={1}
        >
          Trending
        </Badge>
      )}

      <Box 
        h="200px" 
        overflow="hidden"
        cursor="pointer"
        onClick={() => onOpenModal(article)}
      >
        <Image
          src={article.image}
          alt={article.title}
          w="100%"
          h="100%"
          objectFit="cover"
          transition="transform 0.5s ease"
          _hover={{ transform: "scale(1.05)" }}
        />
      </Box>

      <Box p={5}>
        <Flex justify="space-between" align="center" mb={3}>
          <HStack spacing={2}>
            {article.tags.slice(0, 2).map((tag) => (
              <Tag 
                key={tag} 
                size="sm" 
                variant="subtle" 
                colorScheme={getTagColor(tag)}
              >
                {tag}
              </Tag>
            ))}
          </HStack>
          <Text fontSize="sm" color="gray.500">
            {article.date}
          </Text>
        </Flex>

        <Text
          fontSize="xl"
          fontWeight="bold"
          mb={2}
          cursor="pointer"
          onClick={() => onOpenModal(article)}
          _hover={{ color: "purple.500" }}
        >
          {article.title}
        </Text>

        <Text
          fontSize="md"
          color={colorMode === "light" ? "gray.600" : "gray.300"}
          mb={4}
        >
          {article.excerpt}
        </Text>

        <Flex justify="space-between" align="center">
          <HStack spacing={2}>
            <Avatar
              size="sm"
              name={article.author}
              src={article.authorAvatar}
            />
            <Text fontSize="sm">{article.author}</Text>
          </HStack>

          <HStack spacing={3}>
            <Tooltip label={isLiked ? "Unlike" : "Like"}>
              <IconButton
                icon={isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
                variant="ghost"
                size="sm"
                aria-label="Like article"
                onClick={(e) => {
                  e.stopPropagation();
                  onLike(article.id);
                }}
              />
            </Tooltip>
            <Text fontSize="sm">{article.likes}</Text>
          </HStack>
        </Flex>

        <Divider my={4} />

        <Flex justify="space-between" align="center">
          <HStack spacing={2}>
            <FiClock size="14px" />
            <Text fontSize="sm">{article.readTime}</Text>
          </HStack>

          <HStack spacing={2}>
            <Tooltip label={isBookmarked ? "Remove bookmark" : "Bookmark"}>
              <IconButton
                icon={isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                variant="ghost"
                size="sm"
                aria-label="Bookmark article"
                onClick={(e) => {
                  e.stopPropagation();
                  onBookmark(article.id);
                }}
              />
            </Tooltip>
            <Tooltip label="Share">
              <IconButton
                icon={<FaShare />}
                variant="ghost"
                size="sm"
                aria-label="Share article"
                onClick={(e) => {
                  e.stopPropagation();
                  onShare(article);
                }}
              />
            </Tooltip>
            <ChakraLink href={article.mediumLink} isExternal onClick={(e) => e.stopPropagation()}>
              <IconButton
                icon={<FiExternalLink />}
                variant="ghost"
                size="sm"
                aria-label="Open on Medium"
              />
            </ChakraLink>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};

const FeaturedArticle = ({ article, colorMode, onOpenModal }) => {
  return (
    <Box
      bg={colorMode === "light" ? "white" : "gray.800"}
      border="1px solid"
      borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
      borderRadius="xl"
      overflow="hidden"
      boxShadow="lg"
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      transition="all 0.3s ease"
      _hover={{
        boxShadow: "xl",
        transform: "translateY(-3px)"
      }}
    >
      <Box 
        flex="1" 
        minH="300px"
        cursor="pointer"
        onClick={() => onOpenModal(article)}
      >
        <Image
          src={article.image}
          alt={article.title}
          w="100%"
          h="100%"
          objectFit="cover"
        />
      </Box>

      <Box flex="1" p={6}>
        <Badge colorScheme="purple" mb={3}>
          Featured
        </Badge>
        
        <Text
          fontSize="2xl"
          fontWeight="bold"
          mb={3}
          cursor="pointer"
          onClick={() => onOpenModal(article)}
          _hover={{ color: "purple.500" }}
        >
          {article.title}
        </Text>

        <Text
          fontSize="lg"
          color={colorMode === "light" ? "gray.600" : "gray.300"}
          mb={4}
        >
          {article.excerpt}
        </Text>

        <Flex align="center" mb={4}>
          <Avatar
            size="md"
            name={article.author}
            src={article.authorAvatar}
            mr={3}
          />
          <Box>
            <Text fontWeight="medium">{article.author}</Text>
            <Text fontSize="sm" color="gray.500">
              {article.date} · {article.readTime}
            </Text>
          </Box>
        </Flex>

        <HStack spacing={2} mb={4}>
          {article.tags.map((tag) => (
            <Tag 
              key={tag} 
              size="md" 
              variant="subtle" 
              colorScheme={getTagColor(tag)}
            >
              {tag}
            </Tag>
          ))}
        </HStack>

        <Flex justify="space-between" align="center">
          <HStack spacing={4}>
            <HStack spacing={1}>
              <FaHeart color="red" />
              <Text>{article.likes}</Text>
            </HStack>
            <HStack spacing={1}>
              <FaComment />
              <Text>{article.comments}</Text>
            </HStack>
          </HStack>

          <ChakraLink href={article.mediumLink} isExternal>
            <Button
              rightIcon={<FiExternalLink />}
              colorScheme="purple"
              variant="outline"
              size="sm"
            >
              Read on Medium
            </Button>
          </ChakraLink>
        </Flex>
      </Box>
    </Box>
  );
};

const ArticleModal = ({ 
  isOpen, 
  onClose, 
  article, 
  colorMode, 
  isLiked, 
  isBookmarked, 
  onLike, 
  onBookmark, 
  onShare 
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
      <ModalOverlay bg="blackAlpha.600" />
      <ModalContent 
        bg={colorMode === "light" ? "white" : "gray.800"}
        borderRadius="2xl"
        overflow="hidden"
      >
        <ModalHeader>
          <Flex justify="space-between" align="center">
            <Text fontSize="2xl" fontWeight="bold" maxW="80%">
              {article.title}
            </Text>
            <HStack spacing={2}>
              <IconButton
                icon={isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                variant="ghost"
                aria-label="Bookmark article"
                onClick={() => onBookmark(article.id)}
              />
              <IconButton
                icon={<FaShare />}
                variant="ghost"
                aria-label="Share article"
                onClick={() => onShare(article)}
              />
              <ModalCloseButton position="relative" top={0} right={0} />
            </HStack>
          </Flex>
        </ModalHeader>
        
        <ModalBody px={6} py={0} maxH="70vh" overflowY="auto">
          <Flex mb={6} align="center">
            <Avatar
              size="md"
              name={article.author}
              src={article.authorAvatar}
              mr={3}
            />
            <Box>
              <Text fontWeight="medium">{article.author}</Text>
              <Text fontSize="sm" color="gray.500">
                {article.date} · {article.readTime}
              </Text>
            </Box>
          </Flex>

          <Image
            src={article.image}
            alt={article.title}
            w="100%"
            h="300px"
            objectFit="cover"
            borderRadius="lg"
            mb={6}
          />

          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.content}
          </ReactMarkdown>
        </ModalBody>

        <ModalFooter>
          <Flex justify="space-between" w="100%" align="center">
            <HStack spacing={4}>
              <Button
                leftIcon={isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
                variant="ghost"
                onClick={() => onLike(article.id)}
              >
                {isLiked ? 'Liked' : 'Like'} ({article.likes})
              </Button>
              <Button leftIcon={<FaComment />} variant="ghost">
                Comments ({article.comments})
              </Button>
            </HStack>
            <ChakraLink href={article.mediumLink} isExternal>
              <Button
                rightIcon={<FaMedium />}
                colorScheme="purple"
              >
                Read Full Article
              </Button>
            </ChakraLink>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const SkeletonArticle = () => {
  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="md"
    >
      <Skeleton h="200px" />
      <Box p={5}>
        <Skeleton h="20px" w="40%" mb={3} />
        <Skeleton h="24px" w="80%" mb={2} />
        <Skeleton h="16px" w="100%" mb={4} />
        <Skeleton h="16px" w="60%" mb={4} />
        <Flex justify="space-between">
          <Skeleton h="32px" w="32px" borderRadius="full" />
          <Skeleton h="20px" w="40px" />
        </Flex>
      </Box>
    </Box>
  );
};

const SkeletonFeatured = () => {
  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="lg"
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
    >
      <Skeleton flex="1" minH="300px" />
      <Box flex="1" p={6}>
        <Skeleton h="24px" w="80px" mb={3} />
        <Skeleton h="32px" w="90%" mb={3} />
        <Skeleton h="20px" w="100%" mb={4} />
        <Skeleton h="20px" w="80%" mb={4} />
        <Flex align="center" mb={4}>
          <Skeleton h="40px" w="40px" borderRadius="full" mr={3} />
          <Box>
            <Skeleton h="16px" w="100px" mb={1} />
            <Skeleton h="14px" w="150px" />
          </Box>
        </Flex>
        <HStack spacing={2} mb={4}>
          <Skeleton h="24px" w="60px" borderRadius="full" />
          <Skeleton h="24px" w="80px" borderRadius="full" />
          <Skeleton h="24px" w="70px" borderRadius="full" />
        </HStack>
        <Flex justify="space-between">
          <HStack spacing={4}>
            <Skeleton h="20px" w="40px" />
            <Skeleton h="20px" w="40px" />
          </HStack>
          <Skeleton h="36px" w="140px" borderRadius="md" />
        </Flex>
      </Box>
    </Box>
  );
};

const getTagColor = (tag) => {
  const colors = {
    'JavaScript': 'yellow',
    'Advanced': 'purple',
    'Web Development': 'blue',
    'DX': 'teal',
    'Engineering': 'orange',
    'Best Practices': 'green',
    'AI': 'pink',
    'Sports': 'red',
    'OpenAI': 'cyan',
    'React': 'blue',
    'Trending': 'pink'
  };
  return colors[tag] || 'gray';
};

export default Articles;