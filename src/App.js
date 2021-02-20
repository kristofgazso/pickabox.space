import logo from './logo.svg';
import './App.css';
import InfoBox from './component/InfoBox';
import Grid from '@material-ui/core/Grid';
import Fetch from './Fetch';

function App() {
  const boxes = [
    {image: "https://upload.wikimedia.org/wikipedia/commons/a/ad/A_coloured_voting_box_%28no_bg%29.svg",
      title: "Republic",
      text: 'A republic (Latin: res publica, meaning "public affair") is a form of government in which "power is held by the people and their elected representatives".[1] In republics, the country is considered a "public matter", not the private concern or property of the rulers. The primary positions of power within a republic are attained through democracy or a mix of democracy with oligarchy or autocracy rather than being unalterably occupied by any given family lineage or group. With modern republicanism, it has become the opposing form of government to a monarchy and therefore a modern republic has no monarch as head of state.',
      link: "https://en.wikipedia.org/wiki/Republic"
    },
    {image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Cowgirl_Creamery_Point_Reyes_-_Red_Hawk_cheese.jpg",
      title: "Cheese",
      text: "Cheese is a dairy product, derived from milk and produced in wide ranges of flavors, textures and forms by coagulation of the milk protein casein. It comprises proteins and fat from milk, usually the milk of cows, buffalo, goats, or sheep. During production, the milk is usually acidified and the enzymes of rennet (or bacterial enzymes with similar activity) are added to cause the milk proteins (casein) to coagulate. The solids (curd) are separated from the liquid (whey) and pressed into final form.[1] Some cheeses have aromatic molds on the rind, the outer layer, or throughout. Most cheeses melt at cooking temperature.",
      link: "https://en.wikipedia.org/wiki/Cheese"
    },
    {image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg",
      title: "NASA",
      text: "The National Aeronautics and Space Administration (NASA; /ˈnæsə/) is an independent agency of the U.S. federal government responsible for the civilian space program, as well as aeronautics and space research.[note 1]",
      link: "https://en.wikipedia.org/wiki/NASA"
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/en/c/c2/Amongus_wordmark.svg",
      title: "Among Us",
      text: "Among Us[d] is an online multiplayer social deduction game developed and published by American game studio Innersloth. It was released on iOS and Android devices in June 2018 and on Windows in November 2018, featuring cross-platform play between these platforms.[14] Among Us' first port was macOS, releasing on the software on November 16, 2020. The game was also released on the Nintendo Switch in December 2020, and has planned releases for the Xbox One and Xbox Series X and Series S in 2021.",
      link: "https://en.wikipedia.org/wiki/Among_Us"
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/en/b/bf/KFC_logo.svg",
      title: "KFC",
      text: `KFC (short for Kentucky Fried Chicken[6]) is an American fast food restaurant chain headquartered in Louisville, Kentucky, that specializes in fried chicken. It is the world's second-largest restaurant chain (as measured by sales) after McDonald's, with 22,621 locations globally in 150 countries as of December 2019.[7] The chain is a subsidiary of Yum! Brands, a restaurant company that also owns the Pizza Hut, Taco Bell, and WingStreet chains.`,
      link: "https://en.wikipedia.org/wiki/KFC"
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Python_logo_and_wordmark.svg",
      title: "Python (programming language)",
      text: `Python is an interpreted, high-level and general-purpose programming language. Python's design philosophy emphasizes code readability with its notable use of significant indentation. Its language constructs and object-oriented approach aim to help programmers write clear, logical code for small and large-scale projects.`,
      link: "https://en.wikipedia.org/wiki/Python_(programming_language)"
    },
  ]

  const renderBox = (box, index) => {
    return(
      <InfoBox data={box} key={index}></InfoBox>
    )
  }
  return (
    <div className="App">
      <Grid container spacing={3} justify="flex-end">
          {boxes.map(renderBox)}
          <Fetch />
      </Grid>
      
    </div>
  );
}

export default App;
