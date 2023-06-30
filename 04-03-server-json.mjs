import { createServer } from "node:http";

const server = createServer((request, response) => {
  console.log("request received");

  response.statusCode = 200;
  response.setHeader("Content-Type", "application/json");

  const marsData = {
    planet: "Mars",
    distanceFromSun: "227.9 million km",
    diameter: "6,779 km",
    moons: ["Phobos", "Deimos"],
    hasWater: false,
    hasAtmosphere: true
  };

  response.end(JSON.stringify(marsData));
});

server.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});
