# To-Do API's
A system of to-do list

## Summary
This project is three equals api's, but with different technologies of a simple system that manage users and their to-do lists 

## Technologies

- Node
  - PNPM 
  - Typescript
  - Express
  - Prisma
  - JWT
- Spring
- Quarkus

## How to run
#### Requirements for all API's
- Database: Postgres
  <details>
  <summary>Using installed postgres</summary>
  
      Run the sql script that are in ./database/scripts to create the tables
  </details>
  <details>
  <summary>Using installed docker</summary>
  
  ```bash
  docker compose -f ./database/Docker-compose.yaml up -d
  ```
  </details>


- Run Node API
  <details>
  <summary>Using installed pnpm</summary>
  
  * Configure the .env in ./applications/node_ts/.env .There are one example of the required .env named as .env.example
  * Open the terminal and change for the application directory
    ```bash
    cd ./applications/node_ts
    ```
  * Install the application dependencies 
    ```bash
    pnpm install
    ```
  * Transpile the Typescript code to Javascript code
      ```bash
    pnpm clean
    pnpm build
    ```
  * Run the application
    ```bash
    pnpm start
    ```

  </details>
  <details>
  <summary>Using installed docker</summary>
  
  * Build the image application
    ```bash
    docker build -f ./applications/node_ts/dockerfile -t to-do-api-node-ts:latest .
    ```
    
  * <details>
    <summary>Running with the docker compose</summary>
    
    Replace the --ENVS-- with your own configurations, there are an example of necessary envs in ./applications/node_ts/.env.example and then paste this in ./database/docker-compose.yaml   
    ```
      api:
        image: to-do-api-node-ts:latest
        container_name: api_node
        ports:
          - "8080:8080"
        networks:
          - db-api
        environment:
        --ENVS--
    ```
    
    Then build the docker compose 
    ```bash
    docker compose -f ./database/Docker-compose.yaml up -d
    ```
    
    </details>    
  * <details>
    <summary>Running in isolated container</summary>
    
      * Configure the .env (It has an example in ./applications/node_ts/.env.example) and then run the application
      ```bash
      docker run --network db-api-network --env-file ./applications/node_ts/.env -p 8080:8080 to-do-api-node-ts:latest  
      ```

    </details>
    
  </details>
  

## Social Media

<a href="https://www.linkedin.com/in/carlos-eduardo-mattos-carvalho/" rel="Linkedin media">![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&logoWidth=20)</a>

<a href="https://github.com/Cadu7" rel="Linkedin media">![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white&logoWidth=20) </a>