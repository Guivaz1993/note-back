# note-back

Esse projeto foi criado para o esquenta do programa de formação da FCamara, um desafio elaborado pela Orange Juice
Essa API foi elaborada utilizando JavaScript

Foram utilizados para a elaboração do back-end os seguintes pacotes 
    "bcrypt": "^5.0.1",
    "cors": "^2.8.5",
    "dotenv": "^16.0.1",
    "express": "^4.18.1",
    "jsonwebtoken": "^8.5.1",
    "knex": "^2.2.0",
    "pg": "^8.8.0",
    "yup": "^0.32.11",
    "yup-locales": "^1.2.10"
    
A API está hospedada no Heroku com o link para acesso https://orange-note.herokuapp.com
No mesmo site está hospedado o banco de dados para a utilização da api

Está sendo utilizado variaveis de ambientes
Para o acesso ao banco de dados:
DB_HOST=host
DB_USER=user
DB_PASSWORD=password
DB_NAME=dbdn2e5am3d40g
Para a definição da porta da api:
PORT = 8000
Para a criptografar os dados na geração do token
TOKEN_SECRET=token

O repositório de front end está no seguinte link
https://github.com/Guivaz1993/note-front

Link do deploy para acesso 
https://gui-notes.vercel.app/
