acp = "!f() { git add . && git commit -m \"$@\" && git push; }; f"


git acp "Commit Message"



GET http://localhost:3000/api/planets to retrieve all planets.
GET http://localhost:3000/api/planets/1 to retrieve a planet by ID.
POST http://localhost:3000/api/planets with JSON body {"name": "Venus"} to create a new planet.
PUT http://localhost:3000/api/planets/1 with JSON body {"name": "New Earth"} to update an existing planet.
DELETE http://localhost:3000/api/planets/1 to delete a planet by ID.