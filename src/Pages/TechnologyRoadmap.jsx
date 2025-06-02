import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useBreakpointValue,
  Card,
  CardBody,
  Divider,
  Tag,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Stack,
  VStack,
  HStack,
  Flex,
  useColorMode,
  useColorModeValue,
  Progress,
  Badge,
  IconButton,
  Tooltip,
  Wrap,
  WrapItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Avatar,
  Heading,
  SimpleGrid
} from '@chakra-ui/react';
import {
  FaCode,
  FaLaptopCode,
  FaJava,
  FaMobileAlt,
  FaExternalLinkAlt,
  FaMoon,
  FaSun,
  FaChartLine,
  FaBook,
  FaVideo,
  FaServer,
  FaDatabase,
  FaReact,
  FaNodeJs,
  FaGitAlt
} from 'react-icons/fa';
import { GiProgression, GiSpiderWeb } from 'react-icons/gi';
import { SiJavascript, SiTypescript, SiNextdotjs, SiGraphql, SiDocker } from 'react-icons/si';
import { Line, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
  RadialLinearScale,
  Colors
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend,
  Filler,
  RadialLinearScale,
  Colors
);

const roadmapData = {
  web: [
    {
      id: 1,
      title: "HTML & CSS Fundamentals",
      duration: "2-3 weeks",
      description: "Master the core building blocks of web development including semantic HTML, CSS selectors, box model, and responsive design principles.",
      status: "beginner",
      resources: [
        { name: "HTML Crash Course", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML", type: "course" },
        { name: "CSS Tricks Guide", url: "https://css-tricks.com/guides/", type: "article" },
        { name: "Flexbox Froggy", url: "https://flexboxfroggy.com/", type: "interactive" }
      ],
      date: "Phase 1",
      progress: 20,
      difficulty: 2,
      popularity: 95,
      skills: ["Semantic HTML", "CSS Selectors", "Flexbox", "Responsive Design"],
      icon: <GiSpiderWeb size="24px" />
    },
    {
      id: 2,
      title: "JavaScript Essentials",
      duration: "3-4 weeks",
      description: "Learn JavaScript fundamentals including variables, functions, DOM manipulation, and ES6+ features like arrow functions and destructuring.",
      status: "beginner",
      resources: [
        { name: "JavaScript.info", url: "https://javascript.info/", type: "course" },
        { name: "Eloquent JavaScript", url: "https://eloquentjavascript.net/", type: "book" },
        { name: "JavaScript30 Challenge", url: "https://javascript30.com", type: "course" }
      ],
      date: "Phase 1",
      progress: 35,
      difficulty: 3,
      popularity: 90,
      skills: ["Variables & Scope", "Functions", "DOM Manipulation", "ES6+"],
      icon: <SiJavascript size="24px" />
    },
    {
      id: 3,
      title: "Frontend Development",
      duration: "4-6 weeks",
      description: "Build interactive UIs with modern frameworks like React, Vue or Angular. Learn component architecture and state management.",
      status: "intermediate",
      resources: [
        { name: "React Official Docs", url: "https://reactjs.org/docs/getting-started.html", type: "article" },
        { name: "Frontend Masters", url: "https://frontendmasters.com", type: "course" },
        { name: "React Projects", url: "https://github.com/alan2207/bulletproof-react", type: "project" }
      ],
      date: "Phase 2",
      progress: 55,
      difficulty: 4,
      popularity: 88,
      skills: ["React/Vue/Angular", "Component Design", "State Management", "Hooks"],
      icon: <FaReact size="24px" />
    },
    {
      id: 4,
      title: "Backend Development",
      duration: "5-7 weeks",
      description: "Learn server-side programming with Node.js, Express, databases, and API design. Understand authentication and security.",
      status: "intermediate",
      resources: [
        { name: "Node.js Docs", url: "https://nodejs.org/en/docs/", type: "article" },
        { name: "Express Guide", url: "https://expressjs.com/", type: "course" },
        { name: "Database Design", url: "https://www.prisma.io/dataguide", type: "article" }
      ],
      date: "Phase 2",
      progress: 70,
      difficulty: 5,
      popularity: 85,
      skills: ["Node.js", "REST APIs", "Databases", "Authentication"],
      icon: <FaServer size="24px" />
    },
    {
      id: 5,
      title: "Fullstack Applications",
      duration: "6-8 weeks",
      description: "Combine frontend and backend skills to build complete applications. Learn deployment, CI/CD, and performance optimization.",
      status: "advanced",
      resources: [
        { name: "Fullstack Open", url: "https://fullstackopen.com/en/", type: "course" },
        { name: "Next.js Docs", url: "https://nextjs.org/docs", type: "article" },
        { name: "Testing Library", url: "https://testing-library.com/", type: "article" }
      ],
      date: "Phase 3",
      progress: 85,
      difficulty: 6,
      popularity: 82,
      skills: ["Fullstack Architecture", "Deployment", "Testing", "Performance"],
      icon: <SiNextdotjs size="24px" />
    },
    {
      id: 6,
      title: "Advanced Concepts",
      duration: "8-10 weeks",
      description: "Master advanced topics like TypeScript, GraphQL, WebSockets, Docker, and microservices architecture.",
      status: "expert",
      resources: [
        { name: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/", type: "book" },
        { name: "GraphQL Tutorial", url: "https://graphql.org/learn/", type: "course" },
        { name: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer", type: "article" }
      ],
      date: "Phase 4",
      progress: 95,
      difficulty: 8,
      popularity: 78,
      skills: ["TypeScript", "GraphQL", "Docker", "Microservices"],
      icon: <SiDocker size="24px" />
    }
  ]
};

const TechnologyRoadmap = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const techTabs = Object.keys(roadmapData);

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const accentColor = useColorModeValue('teal.500', 'teal.300');

  const getIcon = (tech) => {
    switch(tech) {
      case 'web': return <FaLaptopCode />;
      case 'frontend': return <FaCode />;
      case 'java': return <FaJava />;
      case 'ios': return <FaMobileAlt />;
      default: return <FaCode />;
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    onOpen();
  };

  const getLineChartData = (data) => {
    const labels = data.map(item => item.title);
    const difficultyData = data.map(item => item.difficulty * 10);
    const popularityData = data.map(item => item.popularity);
    
    return {
      labels,
      datasets: [
        {
          label: 'Difficulty (1-10)',
          data: difficultyData,
          borderColor: '#E53E3E',
          backgroundColor: 'rgba(229, 62, 62, 0.1)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#E53E3E',
          pointRadius: 6,
          pointHoverRadius: 8
        },
        {
          label: 'Popularity (%)',
          data: popularityData,
          borderColor: '#38B2AC',
          backgroundColor: 'rgba(56, 178, 172, 0.1)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#38B2AC',
          pointRadius: 6,
          pointHoverRadius: 8
        }
      ]
    };
  };

  const getRadarChartData = (item) => {
    return {
      labels: item.skills,
      datasets: [
        {
          label: 'Skill Coverage',
          data: [5, 7, 6, 8], // These would be dynamic in a real app
          backgroundColor: 'rgba(72, 187, 120, 0.2)',
          borderColor: 'rgba(72, 187, 120, 0.8)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(72, 187, 120, 1)'
        }
      ]
    };
  };

  return (
    <Box width="100%" p={isMobile ? 2 : 8} bg={bgColor} minH="100vh">
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h1" size="xl" bgGradient={`linear(to-r, ${accentColor}, blue.500)`} bgClip="text">
          Web Development Roadmap
        </Heading>
        <IconButton
          icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
          aria-label="Toggle dark mode"
          variant="ghost"
          fontSize="xl"
        />
      </Flex>
      
      <Tabs 
        index={tabIndex} 
        onChange={setTabIndex}
        variant={isMobile ? "scrollable" : "line"}
        isFitted={!isMobile}
        mb={6}
        colorScheme="teal"
      >
        <TabList>
          {techTabs.map((tech) => (
            <Tab key={tech} fontWeight="medium" fontSize="md">
              <Box as="span" mr={2}>{getIcon(tech)}</Box>
              {tech.charAt(0).toUpperCase() + tech.slice(1)}
            </Tab>
          ))}
        </TabList>
      </Tabs>
      
      <Divider mb={6} borderColor={borderColor} />
      
      <Box mb={8} p={4} bg={cardBg} borderRadius="xl" boxShadow="md" borderWidth="1px" borderColor={borderColor}>
        <Text fontSize="xl" fontWeight="bold" mb={4} display="flex" alignItems="center">
          <FaChartLine style={{ marginRight: '8px' }} />
          Learning Progression Analysis
        </Text>
        <Box h={isMobile ? "200px" : "300px"}>
          <Line 
            data={getLineChartData(roadmapData[techTabs[tabIndex]])} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    font: {
                      size: 14
                    },
                    padding: 20
                  }
                },
                tooltip: {
                  backgroundColor: colorMode === 'dark' ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)',
                  titleColor: colorMode === 'dark' ? 'white' : 'black',
                  bodyColor: colorMode === 'dark' ? 'white' : 'black',
                  borderColor: borderColor,
                  borderWidth: 1,
                  padding: 12,
                  usePointStyle: true
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: borderColor
                  },
                  ticks: {
                    color: colorMode === 'dark' ? 'gray.300' : 'gray.600'
                  }
                },
                x: {
                  grid: {
                    color: borderColor
                  },
                  ticks: {
                    color: colorMode === 'dark' ? 'gray.300' : 'gray.600'
                  }
                }
              }
            }}
          />
        </Box>
      </Box>
      
      <Box mb={6}>
        <Text fontSize="lg" fontWeight="semibold" mb={4}>
          Roadmap Overview
        </Text>
        <SimpleGrid columns={isMobile ? 1 : 3} spacing={4} mb={6}>
          <StatCard 
            title="Total Phases" 
            value="4" 
            icon={<GiProgression />} 
            colorScheme="blue" 
          />
          <StatCard 
            title="Estimated Duration" 
            value="6-9 months" 
            icon={<FaChartLine />} 
            colorScheme="teal" 
          />
          <StatCard 
            title="Skills Covered" 
            value="24+" 
            icon={<FaCode />} 
            colorScheme="purple" 
          />
        </SimpleGrid>
      </Box>
      
      {isMobile ? (
        <MobileRoadmapView 
          data={roadmapData[techTabs[tabIndex]]} 
          onItemClick={handleItemClick}
        />
      ) : (
        <DesktopRoadmapView 
          data={roadmapData[techTabs[tabIndex]]} 
          onItemClick={handleItemClick}
        />
      )}
      
      <ItemDetailModal 
        isOpen={isOpen} 
        onClose={onClose} 
        item={selectedItem} 
        colorMode={colorMode}
        getRadarChartData={getRadarChartData}
      />
    </Box>
  );
};

const StatCard = ({ title, value, icon, colorScheme }) => {
  return (
    <Card bg={`${colorScheme}.100`} borderLeftWidth="4px" borderLeftColor={`${colorScheme}.500`}>
      <CardBody>
        <HStack>
          <Box p={2} bg={`${colorScheme}.500`} borderRadius="md" color="white">
            {icon}
          </Box>
          <Box>
            <Text fontSize="sm" color="gray.600">{title}</Text>
            <Text fontSize="xl" fontWeight="bold">{value}</Text>
          </Box>
        </HStack>
      </CardBody>
    </Card>
  );
};

const DesktopRoadmapView = ({ data, onItemClick }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  return (
    <VStack spacing={6} align="stretch">
      {data.map((item, index) => (
        <Flex key={item.id} direction="row" align="center" justify="space-between">
          <Box flex={1} maxW="120px" textAlign="center">
            <Text fontSize="sm" color="gray.500" fontWeight="medium">{item.date}</Text>
            <Badge colorScheme="teal" mt={1} px={2} py={1} borderRadius="full">
              {item.duration}
            </Badge>
          </Box>
          
          <Box flex={1} mx={4}>
            <Card 
              variant="outline" 
              boxShadow="md" 
              bg={cardBg}
              borderLeftWidth="4px"
              borderLeftColor={getStatusColor(item.status)}
              _hover={{ 
                bg: hoverBg, 
                transform: 'translateY(-4px)',
                boxShadow: 'lg'
              }}
              transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
              cursor="pointer"
              onClick={() => onItemClick(item)}
              h="100%"
            >
              <CardBody>
                <HStack spacing={3}>
                  <Box p={2} bg={`${getStatusColor(item.status)}.100`} borderRadius="md" color={`${getStatusColor(item.status)}.600`}>
                    {item.icon}
                  </Box>
                  <Box flex={1}>
                    <HStack>
                      <Text fontSize="lg" fontWeight="bold">{item.title}</Text>
                      <StatusTag status={item.status} />
                    </HStack>
                    <Progress 
                      value={item.progress} 
                      size="sm" 
                      colorScheme={getStatusColor(item.status)} 
                      my={2} 
                      borderRadius="full"
                    />
                    <Text mb={2} fontSize="sm">{item.description}</Text>
                    <Wrap>
                      {item.resources.slice(0, 3).map((resource, idx) => (
                        <WrapItem key={idx}>
                          <Badge 
                            colorScheme={resource.type === 'article' ? 'blue' : resource.type === 'course' ? 'green' : 'orange'}
                            variant="subtle"
                            px={2}
                            py={1}
                            borderRadius="md"
                            fontSize="xs"
                          >
                            {resource.type === 'article' ? <FaBook size="0.8em" /> : 
                             resource.type === 'course' ? <FaVideo size="0.8em" /> : 
                             <FaCode size="0.8em" />}
                            <Box as="span" ml={1}>{resource.name}</Box>
                          </Badge>
                        </WrapItem>
                      ))}
                    </Wrap>
                  </Box>
                </HStack>
              </CardBody>
            </Card>
          </Box>
          
          <Box flex={1} maxW="200px">
            <SkillPreview skills={item.skills.slice(0, 3)} />
          </Box>
        </Flex>
      ))}
    </VStack>
  );
};

const MobileRoadmapView = ({ data, onItemClick }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  return (
    <VStack spacing={4}>
      {data.map((item) => (
        <Card 
          key={item.id} 
          w="100%" 
          bg={cardBg}
          borderLeftWidth="4px"
          borderLeftColor={getStatusColor(item.status)}
          onClick={() => onItemClick(item)}
          cursor="pointer"
        >
          <CardBody>
            <HStack spacing={3}>
              <Box p={2} bg={`${getStatusColor(item.status)}.100`} borderRadius="md" color={`${getStatusColor(item.status)}.600`}>
                {item.icon}
              </Box>
              <Box>
                <HStack>
                  <Text fontWeight="bold">{item.title}</Text>
                  <StatusTag status={item.status} />
                </HStack>
                <HStack mt={1} mb={2}>
                  <Text fontSize="xs" color="gray.500">{item.date}</Text>
                  <Badge colorScheme="teal" fontSize="xs">{item.duration}</Badge>
                </HStack>
                <Progress 
                  value={item.progress} 
                  size="xs" 
                  colorScheme={getStatusColor(item.status)} 
                  borderRadius="full"
                />
              </Box>
            </HStack>
          </CardBody>
        </Card>
      ))}
    </VStack>
  );
};

const SkillPreview = ({ skills }) => {
  return (
    <VStack align="start" spacing={1}>
      {skills.map((skill, index) => (
        <HStack key={index} spacing={2}>
          <Box w="8px" h="8px" borderRadius="full" bg="teal.500" />
          <Text fontSize="sm" color="gray.600">{skill}</Text>
        </HStack>
      ))}
    </VStack>
  );
};

const ItemDetailModal = ({ isOpen, onClose, item, colorMode, getRadarChartData }) => {
  if (!item) return null;
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent bg={bgColor} borderRadius="xl">
        <ModalHeader>
          <HStack spacing={3}>
            <Box p={2} bg={`${getStatusColor(item.status)}.100`} borderRadius="md" color={`${getStatusColor(item.status)}.600`}>
              {item.icon}
            </Box>
            <Box>
              <Heading size="md">{item.title}</Heading>
              <HStack mt={1}>
                <StatusTag status={item.status} />
                <Badge colorScheme="purple">{item.duration}</Badge>
                <Text fontSize="sm" color="gray.500">{item.date}</Text>
              </HStack>
            </Box>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Stack spacing={6}>
            <Box>
              <Text fontWeight="semibold" mb={2}>Description:</Text>
              <Text>{item.description}</Text>
            </Box>
            
            <Box>
              <Text fontWeight="semibold" mb={2}>Progress:</Text>
              <Progress 
                value={item.progress} 
                size="lg" 
                colorScheme={getStatusColor(item.status)} 
                borderRadius="full"
                hasStripe
                isAnimated
              />
              <Text textAlign="right" mt={1} fontSize="sm" color="gray.500">
                {item.progress}% completed
              </Text>
            </Box>
            
            <Box>
              <Text fontWeight="semibold" mb={3}>Skills Covered:</Text>
              <Box h="250px">
                <Radar 
                  data={getRadarChartData(item)} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      r: {
                        angleLines: {
                          color: borderColor
                        },
                        grid: {
                          color: borderColor
                        },
                        pointLabels: {
                          color: colorMode === 'dark' ? 'gray.300' : 'gray.600'
                        },
                        ticks: {
                          backdropColor: 'transparent',
                          color: colorMode === 'dark' ? 'gray.300' : 'gray.600'
                        }
                      }
                    },
                    plugins: {
                      legend: {
                        display: false
                      }
                    }
                  }}
                />
              </Box>
            </Box>
            
            <Box>
              <Text fontWeight="semibold" mb={3}>Resources:</Text>
              <SimpleGrid columns={[1, 2]} spacing={3}>
                {item.resources.map((resource, idx) => (
                  <Card key={idx} variant="outline" borderColor={borderColor}>
                    <CardBody p={3}>
                      <HStack spacing={3}>
                        <Avatar 
                          size="sm" 
                          icon={resource.type === 'article' ? <FaBook /> : 
                                resource.type === 'course' ? <FaVideo /> : 
                                <FaCode />}
                          bg={resource.type === 'article' ? 'blue.500' : 
                              resource.type === 'course' ? 'green.500' : 
                              'orange.500'}
                        />
                        <Box flex={1}>
                          <Text fontWeight="medium">{resource.name}</Text>
                          <Text fontSize="sm" color="gray.500" textTransform="capitalize">
                            {resource.type}
                          </Text>
                        </Box>
                        <IconButton
                          icon={<FaExternalLinkAlt />}
                          size="sm"
                          as="a"
                          href={resource.url}
                          target="_blank"
                          aria-label="Open resource"
                          variant="ghost"
                          colorScheme="blue"
                        />
                      </HStack>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </Box>
            
            <SimpleGrid columns={[1, 2, 3]} spacing={3} mt={2}>
              <Tooltip label="Difficulty level (1-10)">
                <Card variant="outline" borderColor={borderColor}>
                  <CardBody>
                    <HStack>
                      <Box color="red.500">
                        <GiProgression size="20px" />
                      </Box>
                      <Box>
                        <Text fontSize="sm" color="gray.500">Difficulty</Text>
                        <Text fontWeight="bold">{item.difficulty}/10</Text>
                      </Box>
                    </HStack>
                  </CardBody>
                </Card>
              </Tooltip>
              
              <Tooltip label="Popularity among developers">
                <Card variant="outline" borderColor={borderColor}>
                  <CardBody>
                    <HStack>
                      <Box color="teal.500">
                        <FaChartLine size="18px" />
                      </Box>
                      <Box>
                        <Text fontSize="sm" color="gray.500">Popularity</Text>
                        <Text fontWeight="bold">{item.popularity}%</Text>
                      </Box>
                    </HStack>
                  </CardBody>
                </Card>
              </Tooltip>
              
              <Tooltip label="Key skills you'll acquire">
                <Card variant="outline" borderColor={borderColor}>
                  <CardBody>
                    <HStack>
                      <Box color="purple.500">
                        <FaCode size="18px" />
                      </Box>
                      <Box>
                        <Text fontSize="sm" color="gray.500">Skills</Text>
                        <Text fontWeight="bold">{item.skills.length}+</Text>
                      </Box>
                    </HStack>
                  </CardBody>
                </Card>
              </Tooltip>
            </SimpleGrid>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const StatusTag = ({ status }) => {
  const colorScheme = getStatusColor(status);
  
  return (
    <Tag 
      colorScheme={colorScheme} 
      fontWeight="bold" 
      size="sm"
      px={2}
      py={1}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Tag>
  );
};

const getStatusColor = (status) => {
  switch(status) {
    case "beginner": return "green";
    case "intermediate": return "blue";
    case "advanced": return "yellow";
    case "expert": return "purple";
    default: return "gray";
  }
};

export default TechnologyRoadmap;