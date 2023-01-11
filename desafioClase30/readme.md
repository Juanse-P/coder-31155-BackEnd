Comandos a ejecurtar: 
  ```
    nodemon app.js -p 8080 -m FORK
    nodemon app.js -p 8081 -m CLUSTER
  ```
  o simplemente 

  ```
    npm run dev
    npm run fork
    npm run cluster
  ```

  - Uso de forever 
  ```
        forever start app.js
        forever list
        lsof -i :8080
  ```
 - Procesos con PM2: 
  ```
    pm2 start app.js --name="ServerFORK" --watch -- 8080

    pm2 start app.js --name="ServerCLUSTER" --watch -i max -- 8081
  ```