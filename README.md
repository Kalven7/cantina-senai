<h1 align="center" class="line-1 anim-typewriter">Cantina SENAI</h1> 

<h2 id="built_with">📝 Como rodar o projeto localmente:</h2>

Clone o repositório:
```sh
git clone https://github.com/Kalven7/cantina-senai.git
```

1) - Entre no projeto:
```sh
cd cantina-senai/
```

2) - Instale as dependencias do back-end:
```sh
npm i
```

3) - Entre no front-end e instale as dependencias:
```sh
cd cantinaservice/
npm i
```

4) - Rode o front-end (você deve estar no diretorio "/cantinaservice"):
```sh
npm run web
```

5) - Rode o back-end (você deve estar no diretório inicial):
```sh
npm run dev
```

6) - Crie um banco de dados em seu mysql workbench ou pela linha de comando

7) - Atualize as seguintes variáveis de ambiente do arquivo config.env (muito importante)
```dosini
PORT = 3000
MYSQL_HOST = localhost
MYSQL_USER = root # | seu user
MYSQL_PASSWORD = secret123 # | sua senha
MYSQL_DATABASE = cantinasenai # | o nome do seu banco de dados criado no passo anterior
JWT_SECRET = SENAI21
```


