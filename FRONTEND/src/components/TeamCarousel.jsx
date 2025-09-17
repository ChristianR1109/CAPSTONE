import { Carousel } from "react-bootstrap";

const teams = [
  { name: "Atalanta", logo: "link_logo" },
  { name: "Bologna", logo: "link_logo" },
  { name: "Cagliari", logo: "link_logo" },
  { name: "Como", logo: "link_logo" },
  { name: "Cremonese", logo: "link_logo" },
  { name: "Fiorentina", logo: "link_logo" },
  { name: "Genoa", logo: "link_logo" },
  { name: "Verona", logo: "link_logo" },
  { name: "Inter", logo: "link_logo" },
  { name: "Juventus", logo: "link_logo" },
];

const chunkArray = (arr, size) => arr.reduce((acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]), []);

const TeamCarousel = () => {
  const chunks = chunkArray(teams, 5);

  return (
    <Carousel indicators={false}>
      {chunks.map((chunk, i) => (
        <Carousel.Item key={i}>
          <div className="d-flex justify-content-center gap-3">
            {chunk.map((team, idx) => (
              <div key={idx} className="text-center text-white">
                <img src={team.logo} alt={team.name} style={{ height: "60px" }} />
                <h6>{team.name}</h6>
              </div>
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default TeamCarousel;
