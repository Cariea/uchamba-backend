# Table of contents

- [Table of contents](#table-of-contents)
- [Endpoints](#endpoints)
  - [Admin Only](#admin-only)
    - [Users](#users)
      - [**DELETE** /users/\<id\>](#delete-usersid)
      - [Responses](#responses)
    - [Languages](#languages)
      - [**POST** /languages](#post-languages)
      - [Responses](#responses-1)
      - [**PUT** /languages/\<languageID\>](#put-languageslanguageid)
      - [Responses](#responses-2)
      - [**DELETE** /languages/\<languageID\>](#delete-languageslanguageid)
      - [Responses](#responses-3)
    - [Careers](#careers)
      - [**POST** /careers](#post-careers)
      - [Responses](#responses-4)
      - [**PUT** /careers/\<CareerID\>](#put-careerscareerid)
      - [Responses](#responses-5)
      - [**DELETE** /careers/\<CareerID\>](#delete-careerscareerid)
      - [Responses](#responses-6)
    - [Hard Skills](#hard-skills)
      - [**POST** /hard-skills](#post-hard-skills)
      - [Responses](#responses-7)
      - [**PUT** /hard-skills/\<HardSkillID\>](#put-hard-skillshardskillid)
      - [Responses](#responses-8)
      - [**DELETE** /hard-skills/\<HardSkillID\>](#delete-hard-skillshardskillid)
      - [Responses](#responses-9)
    - [Soft Skills](#soft-skills)
      - [**POST** /soft-skills](#post-soft-skills)
      - [Responses](#responses-10)
      - [**PUT** /soft-skills/\<SoftSkillID\>](#put-soft-skillssoftskillid)
      - [Responses](#responses-11)
      - [**DELETE** /soft-skills/\<SoftSkillID\>](#delete-soft-skillssoftskillid)
      - [Responses](#responses-12)
  - [User Priviledges](#user-priviledges)
    - [Languages](#languages-1)
      - [**GET** All /languages/all](#get-all-languagesall)
      - [**GET** Paginated /languages](#get-paginated-languages)
      - [**GET** By id/languages/\<LanguageID\>](#get-by-idlanguageslanguageid)
    - [Careers](#careers-1)
      - [**GET** All /careers/all](#get-all-careersall)
      - [**GET** Paginated /careers](#get-paginated-careers)
      - [**GET**  By id /careers/\<CareerID\>](#get--by-id-careerscareerid)
    - [Hard Skills](#hard-skills-1)
      - [**GET** All /hskills/all](#get-all-hskillsall)
      - [**GET** Paginated /hskills](#get-paginated-hskills)
      - [**GET**  By id /hskills/\<HardSkillID\>](#get--by-id-hskillshardskillid)
    - [Soft Skills](#soft-skills-1)
      - [**GET** All /sskills/all](#get-all-sskillsall)
      - [**GET** Paginated /sskills](#get-paginated-sskills)
      - [**GET**  By id /sskills/\<SoftSkillID\>](#get--by-id-sskillssoftskillid)
  - [User Token for Updating Profile](#user-token-for-updating-profile)
  - [Public](#public)
      - [**GET** Generar CV /generar-cv/\<user-id\>](#get-generar-cv-generar-cvuser-id)
    - [Auth](#auth)
      - [**POST** Login /auth/login](#post-login-authlogin)
    - [Users](#users-1)
      - [**GET** All /users/all](#get-all-usersall)
      - [**GET** Paginated /users?page=\<number\>\&size=\<number\>](#get-paginated-userspagenumbersizenumber)
      - [**GET** Detailed /users/\<id\>](#get-detailed-usersid)
    - [Projects](#projects)
      - [**GET Detailed** /projects/user/\<user-id\>/project/\<project-id\>](#get-detailed-projectsuseruser-idprojectproject-id)

---

# Endpoints

---

## Admin Only

### Users

#### <span id='admin-only-user-delete' style='color:red'>**DELETE** /users/\<id></span>

#### <span style='color:#753A9A'>Responses</span>
- <span style="color:#23A559">**200** - Success</span>
```json
{
  "message": "Usuario eliminado correctamente"
}
```
- <span style="color:red">**404** - Not found</span>
```json
{
  "message": "No se pudo encontrar el registro de id: <userId>",
  "statusCode": 404
}
```
[<span style='color:orange'>Volver</span>](#table-of-contents)

### Languages
#### <span id='admin-only-languages-post' style='color:orange'>**POST** /languages</span>
- <span style="color:#9992F4">Body</span>
```json
{
  "name": "Español"
}
```
#### <span style="color:#9992F4">Responses</span>
- <span style="color:#23A559">**200** - Success</span>
```json
{
  "languageId": 49,
  "name": "Latin",
  "createdAt": "18/12/2023 - 08:20 PM"
}
```
- <span style="color:red">**401** - Unauthorized</span>
```json
{
  "message": "Error al decodificar el token"
}
```
- <span style="color:red">**500** - Internal Server Error</span>
```json
{
  "message": "Key (name)=(Latin) already exists."
}
```
#### <span id='admin-only-languages-put' style='color:#9992F4'>**PUT** /languages/\<languageID></span>
- <span style="color:#9992F4">Body</span>
```json
{
  "name": "klingon"
}
```
#### <span style="color:#9992F4">Responses</span>
- <span style="color:#23A559">**200** - Success</span>
```json
{
  "name": "Idioma modificado correctamente"
}
```
- <span style="color:red">**404** - Unauthorized</span>
```json
{
  "message": "No se encuentra el idioma de id <languageId>"
}
```
- <span style="color:red">**500** - Internal Server Error</span>
```json
{
  "message": "Key (name)=(Latin) already exists."
}
```
#### <span id='admin-only-languages-delete' style='color:red'>**DELETE** /languages/\<languageID></span>
#### <span style="color:#9992F4">Responses</span>
- <span style="color:#23A559">**200** - Success</span>
```json
{
  "name": "Idioma eliminado correctamente"
}
```
- <span style="color:red">**404** - Not Found</span>
```json
{
  "message": "No se encuentra el idioma de id <languageId>"
}
```
[<span style='color:orange'>Volver</span>](#table-of-contents)

### Careers
#### <span id='admin-only-careers-post' style='color:orange'>**POST** /careers</span>
- <span style="color:#9992F4">Body</span>
```json
{
  "name": "Telecomunicaciones"
}
```
#### <span style="color:#9992F4">Responses</span>
- <span style="color:#23A559">**200** - Success</span>
```json
{
  "ucareerId": 10,
  "name": "Telecomunicaciones"
}
```
- <span style="color:red">**401** - Unauthorized</span>
```json
{
  "message": "Error al decodificar el token"
}
```
- <span style="color:red">**400** - Bad Request</span>
```json
{
  "message": "Ya existe una carrera con este nombre"
}
```
#### <span id='admin-only-careers-put' style='color:#9992F4'>**PUT** /careers/\<CareerID></span>
- <span style="color:#9992F4">Body</span>
```json
{
  "name": "klingon"
}
```
#### <span style="color:#9992F4">Responses</span>
- <span style="color:#23A559">**200** - Success</span>
```json
{
  "name": "Carrera modificado correctamente"
}
```
- <span style="color:red">**401** - Unauthorized</span>
```json
{
  "message": "Error al decodificar el token"
}

```
- <span style="color:red">**404** - Bad request</span>
```json
{
  "message": "No se encontro la carrera de id <careerId>"
}
```
#### <span id='admin-only-careers-delete' style='color:red'>**DELETE** /careers/\<CareerID></span>
#### <span style="color:#9992F4">Responses</span>
- <span style="color:#23A559">**200** - Success</span>
```json
{
  "name": "Carrera de la UCAB eliminada correctamente"
}
```
- <span style="color:red">**404** - Not Found</span>
```json
{
  "message": "No se pudo encontrar el registro de id: <CareerID>"
}
```
[<span style='color:orange'>Volver</span>](#table-of-contents)
### Hard Skills
#### <span id='admin-only-hskills-post' style='color:orange'>**POST** /hard-skills</span>
- <span style="color:#9992F4">Body</span>
```json
{
  "name": "Arduino"
}
```
#### <span style="color:#9992F4">Responses</span>
- <span style="color:#23A559">**200** - Success</span>
```json
{
  "hardSkillId": 16,
  "name": "Arduino",
  "createdAt": "18/12/2023 - 09:12 PM"
}
```
- <span style="color:red">**401** - Unauthorized</span>
```json
{
  "message": "Error al decodificar el token"
}
```
- <span style="color:red">**500** - Internal Server Error</span>
```json
{
  "message": "Key (name)=(Arduino) already exists."
}
```
#### <span id='admin-only-hskills-put' style='color:#9992F4'>**PUT** /hard-skills/\<HardSkillID></span>
- <span style="color:#9992F4">Body</span>
```json
{
  "name": "Cobol"
}
```
#### <span style="color:#9992F4">Responses</span>
- <span style="color:#23A559">**200** - Success</span>
```json
{
  "name": "Skill modificado correctamente"
}
```
- <span style="color:red">**401** - Unauthorized</span>
```json
{
  "message": "Error al decodificar el token"
}

```
- <span style="color:red">**404** - Bad request</span>
```json
{
  "message": "No se encontro el Skill de id: <HSkill>"
}
```
#### <span id='admin-only-hskills-delete' style='color:red'>**DELETE** /hard-skills/\<HardSkillID></span>
#### <span style="color:#9992F4">Responses</span>
- <span style="color:#23A559">**200** - Success</span>
```json
{
  "name": "Skill eliminado correctamente"
}
```
- <span style="color:red">**404** - Not Found</span>
```json
{
  "message": "No se encontro el Skill de id: <HSkill>"
}
```
[<span style='color:orange'>Volver</span>](#table-of-contents)
### Soft Skills
#### <span id='admin-only-sskills-post' style='color:orange'>**POST** /soft-skills</span>
- <span style="color:#9992F4">Body</span>
```json
{
  "name": "Liderazgo"
}
```
#### <span style="color:#9992F4">Responses</span>
- <span style="color:#23A559">**200** - Success</span>
```json
{
  "softSkillId": 19,
  "name": "Liderazgo",
  "createdAt": "18/12/2023 - 10:12 PM"
}
```
- <span style="color:red">**401** - Unauthorized</span>
```json
{
  "message": "Error al decodificar el token"
}
```
- <span style="color:red">**500** - Internal Server Error</span>
```json
{
  "message": "Key (name)=(Liderazgo) already exists."
}
```
#### <span id='admin-only-sskills-put' style='color:#9992F4'>**PUT** /soft-skills/\<SoftSkillID></span>
- <span style="color:#9992F4">Body</span>
```json
{
  "name": "Liderazgo"
}
```
#### <span style="color:#9992F4">Responses</span>
- <span style="color:#23A559">**200** - Success</span>
```json
{
  "name": "Skill modificado correctamente"
}
```
- <span style="color:red">**401** - Unauthorized</span>
```json
{
  "message": "Error al decodificar el token"
}

```
- <span style="color:red">**404** - Bad request</span>
```json
{
  "message": "No se encontro el Skill de id: <SSkill>"
}
```
#### <span id='admin-only-sskills-delete' style='color:red'>**DELETE** /soft-skills/\<SoftSkillID></span>
#### <span style="color:#9992F4">Responses</span>
- <span style="color:#23A559">**200** - Success</span>
```json
{
  "name": "Skill eliminado correctamente"
}
```
- <span style="color:red">**404** - Not Found</span>
```json
{
  "message": "No se encontro el Skill de id: <SSkill>"
}
```
[<span style='color:orange'>Volver</span>](#table-of-contents)

---

## User Priviledges

### Languages
#### <span id='user-priviledges-languages-get-all' style='color:#23A559'>**GET** All /languages/all</span>
- <span style="color:#23A559">**200** - Success</span>
```json
[
  {
    "languageId": 1,
    "name": "Espanol"
  },
  {
    "languageId": 2,
    "name": "Ingles"
  },
  {
    "languageId": 3,
    "name": "Frances"
  },
  {
    "languageId": 4,
    "name": "Aleman"
  },
  {
    "languageId": 5,
    "name": "Italiano"
  },
  {
    "languageId": 6,
    "name": "Portugues"
  },
  {
    "languageId": 7,
    "name": "Chino"
  },
  {
    "languageId": 8,
    "name": "Japones"
  },
  {
    "languageId": 9,
    "name": "Coreano"
  },
  {
    "languageId": 10,
    "name": "Ruso"
  },
  {
    "languageId": 11,
    "name": "Arabe"
  },
  {
    "languageId": 12,
    "name": "Hindi"
  },
  {
    "languageId": 13,
    "name": "Bengali"
  },
  {
    "languageId": 14,
    "name": "Urdu"
  },
  {
    "languageId": 15,
    "name": "Persa"
  },
  {
    "languageId": 16,
    "name": "Turco"
  },
  {
    "languageId": 17,
    "name": "Hebreo"
  },
  {
    "languageId": 18,
    "name": "Griego"
  },
  {
    "languageId": 19,
    "name": "Hungaro"
  },
  {
    "languageId": 20,
    "name": "Polaco"
  },
  {
    "languageId": 21,
    "name": "Checo"
  },
  {
    "languageId": 22,
    "name": "Sueco"
  },
  {
    "languageId": 23,
    "name": "Noruego"
  },
  {
    "languageId": 24,
    "name": "Finlandes"
  },
  {
    "languageId": 25,
    "name": "Danes"
  },
  {
    "languageId": 26,
    "name": "Holandes"
  },
  {
    "languageId": 27,
    "name": "Brasileno"
  },
  {
    "languageId": 28,
    "name": "Rumano"
  },
  {
    "languageId": 29,
    "name": "Bulgaro"
  },
  {
    "languageId": 30,
    "name": "Croata"
  },
  {
    "languageId": 31,
    "name": "Serbio"
  },
  {
    "languageId": 32,
    "name": "Esloveno"
  },
  {
    "languageId": 33,
    "name": "Macedonio"
  },
  {
    "languageId": 34,
    "name": "Albanes"
  },
  {
    "languageId": 35,
    "name": "Lituano"
  },
  {
    "languageId": 36,
    "name": "Leton"
  },
  {
    "languageId": 37,
    "name": "Estonio"
  },
  {
    "languageId": 38,
    "name": "Eslovaco"
  },
  {
    "languageId": 39,
    "name": "Esperanto"
  },
  {
    "languageId": 40,
    "name": "Mongol"
  },
  {
    "languageId": 41,
    "name": "Swahili"
  },
  {
    "languageId": 42,
    "name": "Vietnamita"
  },
  {
    "languageId": 43,
    "name": "Tailandes"
  },
  {
    "languageId": 44,
    "name": "Malayo"
  },
  {
    "languageId": 45,
    "name": "Tagalo"
  },
  {
    "languageId": 46,
    "name": "Indonesio"
  },
  {
    "languageId": 47,
    "name": "Farsi"
  },
  {
    "languageId": 48,
    "name": "Kurdo"
  }
]
```
#### <span id='user-priviledges-languages-get-paginated' style='color:#23A559'>**GET** Paginated /languages</span>
- <span style="color:#23A559">**200** - Success</span>
```json
{
  "paginate": {
    "total": 48,
    "page": 1,
    "perPage": 10,
    "pages": 5
  },
  "items": [
    {
      "languageId": 1,
      "name": "Espanol",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "languageId": 2,
      "name": "Ingles",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "languageId": 3,
      "name": "Frances",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "languageId": 4,
      "name": "Aleman",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "languageId": 5,
      "name": "Italiano",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "languageId": 6,
      "name": "Portugues",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "languageId": 7,
      "name": "Chino",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "languageId": 8,
      "name": "Japones",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "languageId": 9,
      "name": "Coreano",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "languageId": 10,
      "name": "Ruso",
      "createdAt": "11/12/2023 - 03:52 PM"
    }
  ]
}
```
#### <span id='user-priviledges-languages-get-by-id' style='color:#23A559'>**GET** By id/languages/\<LanguageID></span>
- <span style="color:#23A559">**200** - Success</span>
```json
{
  "languageId": 9,
  "name": "Coreano",
  "createdAt": "11/12/2023 - 03:52 PM"
}
```

### Careers
#### <span id='user-priviledges-careers-get-all' style='color:#23A559'>**GET** All /careers/all</span>
- <span style="color:#23A559">**200** - Success</span>
```json
[
  {
    "ucareerId": 1,
    "name": "Ingenieria Informatica"
  },
  {
    "ucareerId": 2,
    "name": "Ingenieria Civil"
  },
  {
    "ucareerId": 3,
    "name": "Ingenieria Industrial"
  },
  {
    "ucareerId": 4,
    "name": "Relaciones Industriales"
  },
  {
    "ucareerId": 5,
    "name": "Educacion"
  },
  {
    "ucareerId": 6,
    "name": "Comunicacion Social"
  },
  {
    "ucareerId": 7,
    "name": "Derecho"
  },
  {
    "ucareerId": 8,
    "name": "Administracion de Empresas"
  },
  {
    "ucareerId": 9,
    "name": "Contaduria Publica"
  }
]
```
#### <span id='user-priviledges-careers-get-paginated' style='color:#23A559'>**GET** Paginated /careers</span>
- <span style="color:#23A559">**200** - Success</span>
```json
{
  "paginate": {
    "total": 9,
    "page": 1,
    "perPage": 10,
    "pages": 1
  },
  "items": [
    {
      "ucareerId": 1,
      "name": "Ingenieria Informatica",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "ucareerId": 2,
      "name": "Ingenieria Civil",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "ucareerId": 3,
      "name": "Ingenieria Industrial",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "ucareerId": 4,
      "name": "Relaciones Industriales",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "ucareerId": 5,
      "name": "Educacion",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "ucareerId": 6,
      "name": "Comunicacion Social",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "ucareerId": 7,
      "name": "Derecho",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "ucareerId": 8,
      "name": "Administracion de Empresas",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "ucareerId": 9,
      "name": "Contaduria Publica",
      "createdAt": "11/12/2023 - 03:52 PM"
    }
  ]
}
```
#### <span id='user-priviledges-careers-get-by-id' style='color:#23A559'>**GET**  By id /careers/\<CareerID></span>
- <span style="color:#23A559">**200** - Success</span>
```json
{
  "ucareerId": 9,
  "name": "Contaduria Publica",
  "createdAt": "11/12/2023 - 03:52 PM"
}
```

### Hard Skills
#### <span id='user-priviledges-hskills-get-all' style='color:#23A559'>**GET** All /hskills/all</span>
- <span style="color:#23A559">**200** - Success</span>
```json
[
  {
    "hardSkillId": 1,
    "name": "Java"
  },
  {
    "hardSkillId": 2,
    "name": "Python"
  },
  {
    "hardSkillId": 3,
    "name": "C++"
  },
  {
    "hardSkillId": 4,
    "name": "JavaScript"
  },
  {
    "hardSkillId": 5,
    "name": "HTML"
  },
  {
    "hardSkillId": 6,
    "name": "CSS"
  },
  {
    "hardSkillId": 7,
    "name": "SQL"
  },
  {
    "hardSkillId": 8,
    "name": "React"
  },
  {
    "hardSkillId": 9,
    "name": "Angular"
  },
  {
    "hardSkillId": 10,
    "name": "Node.js"
  },
  {
    "hardSkillId": 11,
    "name": "Git"
  },
  {
    "hardSkillId": 12,
    "name": "Docker"
  },
  {
    "hardSkillId": 13,
    "name": "Machine Learning"
  },
  {
    "hardSkillId": 14,
    "name": "Data Analysis"
  },
  {
    "hardSkillId": 15,
    "name": "Agile Methodology"
  }
]
```
#### <span id='user-priviledges-hskills-get-paginated' style='color:#23A559'>**GET** Paginated /hskills</span>
- <span style="color:#23A559">**200** - Success</span>
```json
{
  "paginate": {
    "total": 15,
    "page": 1,
    "perPage": 10,
    "pages": 2
  },
  "items": [
    {
      "hardSkillId": 1,
      "name": "Java",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "hardSkillId": 2,
      "name": "Python",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "hardSkillId": 3,
      "name": "C++",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "hardSkillId": 4,
      "name": "JavaScript",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "hardSkillId": 5,
      "name": "HTML",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "hardSkillId": 6,
      "name": "CSS",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "hardSkillId": 7,
      "name": "SQL",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "hardSkillId": 8,
      "name": "React",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "hardSkillId": 9,
      "name": "Angular",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "hardSkillId": 10,
      "name": "Node.js",
      "createdAt": "11/12/2023 - 03:52 PM"
    }
  ]
}
```
#### <span id='user-priviledges-hskills-get-by-id' style='color:#23A559'>**GET**  By id /hskills/\<HardSkillID></span>
- <span style="color:#23A559">**200** - Success</span>
```json
{
  "hardSkillId": 13,
  "name": "Machine Learning",
  "createdAt": "11/12/2023 - 03:52 PM"
}
```

### Soft Skills
#### <span id='user-priviledges-sskills-get-all' style='color:#23A559'>**GET** All /sskills/all</span>
- <span style="color:#23A559">**200** - Success</span>
```json
[
  {
    "softSkillId": 1,
    "name": "Communication"
  },
  {
    "softSkillId": 2,
    "name": "Teamwork"
  },
  {
    "softSkillId": 3,
    "name": "Adaptability"
  },
  {
    "softSkillId": 4,
    "name": "Problem Solving"
  },
  {
    "softSkillId": 5,
    "name": "Creativity"
  },
  {
    "softSkillId": 6,
    "name": "Time Management"
  },
  {
    "softSkillId": 7,
    "name": "Leadership"
  },
  {
    "softSkillId": 8,
    "name": "Empathy"
  },
  {
    "softSkillId": 9,
    "name": "Conflict Resolution"
  },
  {
    "softSkillId": 10,
    "name": "Critical Thinking"
  },
  {
    "softSkillId": 11,
    "name": "Stress Management"
  },
  {
    "softSkillId": 12,
    "name": "Decision Making"
  },
  {
    "softSkillId": 13,
    "name": "Flexibility"
  },
  {
    "softSkillId": 14,
    "name": "Positive Attitude"
  },
  {
    "softSkillId": 15,
    "name": "Networking"
  }
]
```
#### <span id='user-priviledges-sskills-get-paginated' style='color:#23A559'>**GET** Paginated /sskills</span>
- <span style="color:#23A559">**200** - Success</span>
```json
{
  "paginate": {
    "total": 15,
    "page": 1,
    "perPage": 10,
    "pages": 2
  },
  "items": [
    {
      "softSkillId": 1,
      "name": "Communication",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "softSkillId": 2,
      "name": "Teamwork",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "softSkillId": 3,
      "name": "Adaptability",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "softSkillId": 4,
      "name": "Problem Solving",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "softSkillId": 5,
      "name": "Creativity",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "softSkillId": 6,
      "name": "Time Management",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "softSkillId": 7,
      "name": "Leadership",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "softSkillId": 8,
      "name": "Empathy",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "softSkillId": 9,
      "name": "Conflict Resolution",
      "createdAt": "11/12/2023 - 03:52 PM"
    },
    {
      "softSkillId": 10,
      "name": "Critical Thinking",
      "createdAt": "11/12/2023 - 03:52 PM"
    }
  ]
}
```
#### <span id='user-priviledges-sskills-get-by-id' style='color:#23A559'>**GET**  By id /sskills/\<SoftSkillID></span>
- <span style="color:#23A559">**200** - Success</span>
```json
{
  "softSkillId": 1,
  "name": "Communication",
  "createdAt": "11/12/2023 - 03:52 PM"
}
```

[<span style='color:orange'>Volver</span>](#table-of-contents)

---

## User Token for Updating Profile

[<span style='color:orange'>Volver</span>](#table-of-contents)

---

## Public

#### <span id='endpoint-generar-cv' style='color:#23A559'>**GET** Generar CV /generar-cv/\<user-id></span>

### Auth

#### <span id='public-auth-post-login' style='color:orange'>**POST** Login /auth/login</span>

- <span style="color:#9992F4">Body</span>

```json
{
  "email": "ajrosas.19@est.ucab.edu.ve",
  "password": "a"
}
```

- <span style="color:#23A559">**202** - Success</span>

```json
{
  "id": 4,
  "name": "Alejandro Rosas",
  "email": "ajrosas.19@est.ucab.edu.ve",
  "role": "admin",
  "token": "token"
}
```

<span style="color:red">**404** - Error sending invalid data</span>

```json
{
  "message": "Email o contraseña incorrecta"
}
```

<span style="color:red">**400** - Error on missing fields</span>

```json
{
  "message": "Datos invalidos en el formulario",
  "details": [
    {
      "field": "email",
      "message": "Required"
    },
    {
      "field": "password",
      "message": "Required"
    }
  ]
}
```

### Users

#### <span id='public-users-get-all' style='color:#23A559'>**GET** All /users/all</span>

- <span style="color:#23A559">**200** - Success</span>

```json
[
  {
    "userId": 1,
    "name": "Jose Andres",
    "email": "jarodriguez.21@est.ucab.edu.ve"
  },
  {
    "userId": 2,
    "name": "Maria Paula",
    "email": "mpforero.21@est.ucab.edu.ve"
  },
  ...
  {
    "userId": 8,
    "name": "Acosta Carrion",
    "email": "yeniffer.acosta3097@gmail.com"
  }
]
```

#### <span id='public-users-get-paginated' style='color:#23A559'>**GET** Paginated /users?page=\<number>&size=\<number></span>

Gets active users

- <span style="color:#23A559">**200** - Success</span>

```json
{
  "paginate": {
    "total": 8,
    "page": 2,
    "perPage": 2,
    "pages": 4
  },
  "items": [
    {
      "userId": 2,
      "name": "Maria Paula",
      "email": "mpforero.21@est.ucab.edu.ve",
      "role": "admin",
      "createdAt": "11/12/2023 - 03:52 PM",
      "updatedAt": "11/12/2023 - 03:52 PM"
    },
    {
      "userId": 8,
      "name": "Acosta Carrion",
      "email": "yeniffer.acosta3097@gmail.com",
      "role": "admin",
      "createdAt": "11/12/2023 - 03:52 PM",
      "updatedAt": "11/12/2023 - 03:52 PM"
    }
  ]
}
```

#### <span id='public-users-get-detailed' style='color:#23A559'>**GET** Detailed /users/\<id></span>

- <span style="color:#23A559">**200** - Success</span>

```json
{
  "userId": 1,
  "name": "Jose Andres",
  "email": "jarodriguez.21@est.ucab.edu.ve",
  "aboutMe": "Soy luffy",
  "phoneNumber": "04147664397",
  "country": "Venezuela",
  "state": "Bolivar",
  "city": "Ciudad Guayana",
  "residenceAddress": "Direccion 1",
  "role": "admin",
  "languages": [
    {
      "languageId": 1,
      "name": "Espanol",
      "proficientLevel": "Native",
      "certificateImageId": "certificateImageId",
      "certificateImageUrl": "certificateImageUrl"
    },
    {
      "languageId": 2,
      "name": "Ingles",
      "proficientLevel": "B1",
      "certificateImageId": "certificateImageId",
      "certificateImageUrl": "certificateImageUrl"
    }
  ],
  "personalLinks": [
    {
      "linkId": 1,
      "name": "LinkedIn",
      "url": "url"
    },
    {
      "linkId": 9,
      "name": "Medium",
      "url": "url"
    }
  ],
  "hardSkills": {
    "featured": [
      {
        "name": "Java"
      },
      {
        "name": "Python"
      }
    ],
    "personal": [
      {
        "name": "Programming"
      },
      {
        "name": "Cloud Computing"
      }
    ]
  },
  "softSkills": {
    "featured": [
      {
        "name": "Communication"
      },
      {
        "name": "Teamwork"
      }
    ],
    "personal": [
      {
        "name": "Effective Communication"
      },
      {
        "name": "Conflict Resolution"
      }
    ]
  },
  "education": {
    "featured": [
      {
        "ucareerId": 1,
        "name": "Ingenieria Informatica",
        "degree": "pregrado",
        "graduationYear": "2022"
      },
      {
        "ucareerId": 2,
        "name": "Ingenieria Civil",
        "degree": "pregrado",
        "graduationYear": "2022"
      }
    ],
    "personal": [
      {
        "studyId": 1,
        "name": "Study Abroad 1",
        "universityName": "Foreign University 1",
        "degree": "pregrado",
        "graduationYear": "2023"
      },
      {
        "studyId": 9,
        "name": "Study Abroad 9",
        "universityName": "Foreign University 9",
        "degree": "maestria",
        "graduationYear": "2025"
      }
    ]
  },
  "workExperiences": [],
  "projects": [
    {
      "projectId": 1,
      "name": "Proyecto de Base de Datos",
      "description": "Llevar el registro de los autos que llegan a un concesionario",
      "projectUrl": null,
      "coverImageId": "coverImageId",
      "coverImageUrl": "coverImageUrl",
      "images": []
    }
  ]
}
```

### Projects

#### <span id='public-users-get-all' style='color:#23A559'>**GET Detailed** /projects/user/\<user-id>/project/\<project-id></span>

- <span style="color:#23A559">**200** - Success</span>

```json
{
  "userId": 4,
  "projectId": 12,
  "projectName": "Prueba  2 add project",
  "projectDescription": "Yo necesito ....Ayudaaaa ....ya no aguanto mas!",
  "projectUrl": "https://unaurl.com",
  "coverImageId": "coverImageId",
  "coverImageUrl": "coverImageUrl",
  "images": [
    {
      "imageCloudId": "coverImageId",
      "imageUrl": "imageUrl"
    },
    {
      "imageCloudId": "coverImageId",
      "imageUrl": "imageUrl"
    },
    {
      "imageCloudId": "coverImageId",
      "imageUrl": "imageUrl"
    }
  ]
}
```

[<span style='color:orange'>Volver</span>](#toc-public)

---
