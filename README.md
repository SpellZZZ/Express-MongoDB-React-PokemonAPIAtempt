Project made with MongoDB, React and Express.

Verificated users can see data that comes from https://pokeapi.co/

Data that you input is validated during the registration process



## How to run
Create target folder, then run cmd and type 
```
git clode *repo link*
```
then prepare client
```
cd client
npm install
npm start 
```
server config
```
cd ..
cd server
npm install
```
now we have to create .env file and set JWTPRIVATEKEY, example:
![obraz](https://github.com/SpellZZZ/Express-MongoDB-React-PokemonAPIAttempt/assets/43863065/12a8e183-3abc-4307-9eac-4299a9c47696)
```
npm start
```

## JWT token
JWTs are commonly used for authentication and authorization in web applications, where they can store user information and permissions, which servers can read without needing to maintain session state.

We can use Postman to check generated JWT token

![obraz](https://github.com/SpellZZZ/Express-MongoDB-React-PokemonAPIAttempt/assets/43863065/165c0d7f-34de-4a1a-9977-5e799a64161d)

Result

![obraz](https://github.com/SpellZZZ/Express-MongoDB-React-PokemonAPIAttempt/assets/43863065/3ed4f9dd-48d8-46b3-a29a-c3fa82a73af1)









## Overview
Main screen with poks list that comes from api. 

![obraz](https://github.com/SpellZZZ/Express-MongoDB-React-PokemonAPIAttempt/assets/43863065/04d400be-e463-47a9-8eea-f14d5dba2b2c)


##  Selecting
After clicking on any picture, it is saved to your profile. There, you can see the difference between selected and not selected Pokémon.

![obraz](https://github.com/SpellZZZ/pokemon-api/assets/43863065/d928c300-e619-4963-921f-35cded5ee958)




## Login form

![obraz](https://github.com/SpellZZZ/Express-MongoDB-React-PokemonAPIAttempt/assets/43863065/8c2b0cfd-4c7b-4dd3-813b-af554d0ec7e0)
