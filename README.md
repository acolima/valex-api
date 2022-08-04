# Valex API

Valex is an API to manage Benefits Cards. It creates and recharges cards and processes purchases.


## Implemented features

- Create physical and virtual cards
- Activate, block and unblock a card
- Recharge a card
- Process purchases in Points of Sale and virtual purchases
- Delete a virtual card

## Technologies

<p>
  <img src='https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white' alt="Node"/>
  
  <img src='https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white' alt="PostgreSQL" />
  
  <img src='https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white' alt="Express" />
  
  <img src='https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white' alt='TypeScript' />
</p>

## How to run

1. Clone this repository

```
git clone git@github.com:acolima/valex-api.git
```

2. Go to the project directory

```
 cd valex-api
```

3. Install dependencies

```
npm i
```

4. Go to the database directory and run
```
cd database
bash ./create-database
cd ..
```

5. Create a `.env` file with the same structure of `.env.example` and change the values of the enviroment variables
```
DATABASE_URL={POSTGRES CONNECTION STRING}
PORT={PORT THAT YOU HAVE SETTLED}
```

6. Run project with

```
npm run dev
```

## Author

<img src='https://avatars.githubusercontent.com/acolima' width='150px'/>

<p>
  <a href='https://www.linkedin.com/in/ana-caroline-oliveira-lima/'>
    <img src='https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white' alt='LinkedIn' />
  </a>
  <a href='mailto:acolima@gmail.com'>
    <img src='https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white' alt='Gmail' />
  </a>
</p>
