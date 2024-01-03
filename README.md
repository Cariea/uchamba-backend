# Table of contents

- [Table of contents](#table-of-contents)
- [Endpoints](#endpoints)
  - [Admin Only](#admin-only)
    - [Users](#users)
      - [**DELETE** /users/\<id\>](#delete-usersid)
    - [Languages](#languages)
      - [**POST** /languages](#post-languages)
      - [**PUT** /languages/\<languageID\>](#put-languageslanguageid)
      - [**DELETE** /languages/\<languageID\>](#delete-languageslanguageid)
    - [Careers](#careers)
      - [**POST** /careers](#post-careers)
      - [**PUT** /careers/\<CareerID\>](#put-careerscareerid)
      - [**DELETE** /careers/\<CareerID\>](#delete-careerscareerid)
    - [Hard Skills](#hard-skills)
      - [**POST** /hard-skills](#post-hard-skills)
      - [**PUT** /hard-skills/\<HardSkillID\>](#put-hard-skillshardskillid)
      - [**DELETE** /hard-skills/\<HardSkillID\>](#delete-hard-skillshardskillid)
    - [Soft Skills](#soft-skills)
      - [**POST** /soft-skills](#post-soft-skills)
      - [**PUT** /soft-skills/\<SoftSkillID\>](#put-soft-skillssoftskillid)
      - [**DELETE** /soft-skills/\<SoftSkillID\>](#delete-soft-skillssoftskillid)
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
      - [**GET** App Info /app-info](#get-app-info-app-info)
    - [Users Personal Info](#users-personal-info)
      - [**POST** Change Status /users/change-status](#post-change-status-userschange-status)
      - [**PUT** /users/\<userID\>](#put-usersuserid)
      - [**GET** Me /users/me](#get-me-usersme)
    - [Profile Hard Skills](#profile-hard-skills)
      - [**POST** Create /profile-hard-skills](#post-create-profile-hard-skills)
      - [**DELETE** /profile-hard-skills/\<SKILL\_NAME\>](#delete-profile-hard-skillsskill_name)
    - [Profile Soft Skills](#profile-soft-skills)
      - [**POST** Create /profile-soft-skills](#post-create-profile-soft-skills)
      - [**DELETE** /profile-soft-skills/\<SKILL\_NAME\>](#delete-profile-soft-skillsskill_name)
    - [Foreign Studies](#foreign-studies)
      - [**POST** Create /foreign-studies](#post-create-foreign-studies)
      - [**PUT** /foreign-studies/\<ForeignStudyID\>](#put-foreign-studiesforeignstudyid)
      - [**GET** Foreign Study By User and Foreign Study ID /foreign-studies/\<ForeignStudyID\>](#get-foreign-study-by-user-and-foreign-study-id-foreign-studiesforeignstudyid)
      - [**DELETE** /foreign-studies/\<ForeignStudyID\>](#delete-foreign-studiesforeignstudyid)
    - [Projects](#projects)
      - [**POST** Create /projects](#post-create-projects)
      - [**PUT** /projects/\<ProjectID\>](#put-projectsprojectid)
      - [**GET** By Project ID /projects/\<ProjectID\>](#get-by-project-id-projectsprojectid)
      - [**DELETE** /projects/\<ProjectID\>](#delete-projectsprojectid)
    - [User Languages](#user-languages)
      - [**POST** Create /user-languages/language\<LanguageID\>](#post-create-user-languageslanguagelanguageid)
      - [**PUT** /user-languages/language/\<LanguageID\>](#put-user-languageslanguagelanguageid)
      - [**GET** By Language ID /user-languages/\<LanguageID\>](#get-by-language-id-user-languageslanguageid)
      - [**DELETE** /user-languages/language/\<LanguageID\>](#delete-user-languageslanguagelanguageid)
    - [Personal Links](#personal-links)
      - [**POST** Create /personal-links](#post-create-personal-links)
      - [**PUT** /personal-links/\<PersonalLinkID\>](#put-personal-linkspersonallinkid)
      - [**GET** By User ID /personal-links/\<PersonalLinkID\>](#get-by-user-id-personal-linkspersonallinkid)
      - [**DELETE** /personal-links/\<PersonalLinkID\>](#delete-personal-linkspersonallinkid)
    - [Work Experiences](#work-experiences)
      - [**POST** Create /work-experiences](#post-create-work-experiences)
      - [**PUT** /work-experiences/\<WorkExperienceID\>](#put-work-experiencesworkexperienceid)
      - [**GET** By Work Experience ID /work-experiences/\<WorkExperienceID\>](#get-by-work-experience-id-work-experiencesworkexperienceid)
      - [**DELETE** /work-experiences/\<WorkExperienceID\>](#delete-work-experiencesworkexperienceid)
    - [CVs](#cvs)
      - [**POST** Create /user-cvs](#post-create-user-cvs)
      - [**DELETE** /user-cvs/\<CV\_ID\>](#delete-user-cvscv_id)
  - [Public](#public)
      - [**GET** Generar CV /generar-cv/\<user-id\>](#get-generar-cv-generar-cvuser-id)
    - [Auth](#auth)
      - [**POST** Login /auth/login](#post-login-authlogin)
    - [Users](#users-1)
      - [**GET** All /users/all](#get-all-usersall)
      - [**GET** Paginated /users?page=\<number\>\&size=\<number\>](#get-paginated-userspagenumbersizenumber)
      - [**GET** Detailed /users/\<id\>](#get-detailed-usersid)
    - [Projects](#projects-1)
      - [**GET Detailed** /projects/user/\<user-id\>/project/\<project-id\>](#get-detailed-projectsuseruser-idprojectproject-id)

---

# Endpoints

---

## Admin Only

### Users

#### <span id='admin-only-user-delete' style='color:red'>**DELETE** /users/\<id></span>

- <span style='color:#753A9A'>Responses</span>

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
- <span style='color:#753A9A'>Responses</span>
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
- <span style='color:#753A9A'>Responses</span>
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
- <span style='color:#753A9A'>Responses</span>
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
- <span style='color:#753A9A'>Responses</span>
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
- <span style='color:#753A9A'>Responses</span>
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
- <span style='color:#753A9A'>Responses</span>
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
- <span style='color:#753A9A'>Responses</span>
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
- <span style='color:#753A9A'>Responses</span>
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
- <span style='color:#753A9A'>Responses</span>
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
- <span style='color:#753A9A'>Responses</span>
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
- <span style='color:#753A9A'>Responses</span>
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
- <span style='color:#753A9A'>Responses</span>
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
- <span style='color:#753A9A'>Responses</span>

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
    ...
    {
      "languageId": 48,
      "name": "Kurdo"
    }
  ]
  ```
#### <span id='user-priviledges-languages-get-paginated' style='color:#23A559'>**GET** Paginated /languages</span>
- <span style='color:#753A9A'>Responses</span>

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
      ...
      {
        "languageId": 10,
        "name": "Ruso",
        "createdAt": "11/12/2023 - 03:52 PM"
      }
    ]
  }
  ```
#### <span id='user-priviledges-languages-get-by-id' style='color:#23A559'>**GET** By id/languages/\<LanguageID></span>
- <span style='color:#753A9A'>Responses</span>

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
- <span style='color:#753A9A'>Responses</span>

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
    ...
    {
      "ucareerId": 9,
      "name": "Contaduria Publica"
    }
  ]
  ```
#### <span id='user-priviledges-careers-get-paginated' style='color:#23A559'>**GET** Paginated /careers</span>
- <span style='color:#753A9A'>Responses</span>

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
      ...
      {
        "ucareerId": 9,
        "name": "Contaduria Publica",
        "createdAt": "11/12/2023 - 03:52 PM"
      }
    ]
  }
  ```
#### <span id='user-priviledges-careers-get-by-id' style='color:#23A559'>**GET**  By id /careers/\<CareerID></span>
- <span style='color:#753A9A'>Responses</span>
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
- <span style='color:#753A9A'>Responses</span>
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
    ...
    {
      "hardSkillId": 15,
      "name": "Agile Methodology"
    }
  ]
  ```
#### <span id='user-priviledges-hskills-get-paginated' style='color:#23A559'>**GET** Paginated /hskills</span>
- <span style='color:#753A9A'>Responses</span>
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
      ...
      {
        "hardSkillId": 10,
        "name": "Node.js",
        "createdAt": "11/12/2023 - 03:52 PM"
      }
    ]
  }
  ```
#### <span id='user-priviledges-hskills-get-by-id' style='color:#23A559'>**GET**  By id /hskills/\<HardSkillID></span>
- <span style='color:#753A9A'>Responses</span>
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
- <span style='color:#753A9A'>Responses</span>
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
    ...
    {
      "softSkillId": 15,
      "name": "Networking"
    }
  ]
  ```
#### <span id='user-priviledges-sskills-get-paginated' style='color:#23A559'>**GET** Paginated /sskills</span>
- <span style='color:#753A9A'>Responses</span>
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
      ...
      {
        "softSkillId": 10,
        "name": "Critical Thinking",
        "createdAt": "11/12/2023 - 03:52 PM"
      }
    ]
  }
  ```
#### <span id='user-priviledges-sskills-get-by-id' style='color:#23A559'>**GET**  By id /sskills/\<SoftSkillID></span>
- <span style='color:#753A9A'>Responses</span>
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

#### <span id='user-token-for-updating-profile-get-app-info' style='color:#23A559'>**GET** App Info /app-info</span>

### Users Personal Info

#### <span id='user-token-for-updating-profile-users-personal-info-post-change-status' style='color:orange'>**POST** Change Status /users/change-status</span>

- <span style='color:#753A9A'>Responses</span>

  - <span style="color:#23A559">**200** - Success</span>
  ```json
  {
    "message": "Usuario desactivado correctamente"
  }
  ```

  - <span style="color:#23A559">**200** - Success</span>
  ```json
  {
    "message": "Usuario activado correctamente"
  }
  ```

#### <span id='user-token-for-updating-profile-users-personal-info-put' style='color:#9992F4'>**PUT** /users/\<userID></span>

- <span style="color:#9992F4">Body</span>
```json
{
  "aboutMe": "Soy trabajador y organizado",
  "country": "Venezuela",
  "state": "Bolivar",
  "city": "Ciudad Guayana",
  "residenceAddress": "Urbanización Moreno de Mendoza",
  "phoneNumber": "04121320792"
}
```
- <span style='color:#753A9A'>Responses</span>

  - <span style="color:#23A559">**200** - Success</span>
  ```json
  {
    "message": "Usuario modificado correctamente"
  }
  ```
  - <span style="color:red">**400** - Bad Request</span>
  ```json
  {
    "message": "Datos invalidos en formulario",
    "details": [
      {
        "field": "phoneNumber",
        "message": "Required"
      }
    ]
  }
  ```

#### <span id='user-token-for-updating-profile-users-personal-info-get-me' style='color:#23A559'>**GET** Me /users/me</span>

- <span style='color:#753A9A'>Responses</span>

  - <span style="color:#23A559">**200** - Success</span>
  ```json
  {

  }
  ```

### Profile Hard Skills

#### <span id='user-token-for-updating-profile-profile-hard-skills-post-create' style='color:orange'>**POST** Create /profile-hard-skills</span>

- <span style="color:#9992F4">Body</span>
```json
[
  "Java",
  "C#",
  "Angular",
  "C++"
]
```

- <span style='color:#753A9A'>Responses</span>

  - <span style="color:#23A559">**200** - Success</span>
  ```json
  {
    "message": "Habilidades duras añadidas correctamente"
  }
  ```
  - <span style="color:red">**400** - Bad Request</span>
  ```json
  {
    "message": "Las habilidades duras ingresadas ya existen"
  }
  ```

#### <span id='user-token-for-updating-profile-profile-hard-skills-delete' style='color:red'>**DELETE** /profile-hard-skills/<SKILL_NAME></span>

- <span style='color:#753A9A'>Responses</span>

  - <span style="color:#23A559">**200** - Success</span>
  ```json
  {
    "message": "Habilidad Dura eliminada correctamente"
  }
  ```

  - <span style="color:red">**404** - Not Found</span>
  ```json
  {
    "message": "No se encontro la habilidad dura Para ver del usuario: 5"
  }
  ```

### Profile Soft Skills

#### <span id='user-token-for-updating-profile-profile-soft-skills-post-create' style='color:orange'>**POST** Create /profile-soft-skills</span>

- <span style="color:#9992F4">Body</span>
```json
[
  "Communication",
  "Teamwork",
  "Empathy",
  "Positive Attitude"
]
```

- <span style='color:#753A9A'>Responses</span>

  - <span style="color:#23A559">**200** - Success</span>
  ```json
  {
    "message": "Habilidades blandas añadidas correctamente"
  }
  ```
  - <span style="color:red">**400** - Bad Request</span>
  ```json
  {
    "message": "Las habilidades blandas ingresadas ya existen"
  }
  ```

#### <span id='user-token-for-updating-profile-profile-soft-skills-delete' style='color:red'>**DELETE** /profile-soft-skills/<SKILL_NAME></span>

- <span style='color:#753A9A'>Responses</span>

  - <span style="color:#23A559">**200** - Success</span>
  ```json
  {
    "message": "Habilidad Blanda eliminada correctamente"
  }
  ```

  - <span style="color:red">**404** - Not Found</span>
  ```json
  {
    "message": "No se encontro la habilidad blanda Creativity del usuario: 5"
  }
  ```

### Foreign Studies

#### <span id='user-token-for-updating-profile-foreign-studies-post-create' style='color:orange'>**POST** Create /foreign-studies</span>

- <span style="color:#9992F4">Body</span>
```json
{
  "name": "Ingeniería Mecánica",
  "universityName": "UNEXPO",
  "degree": "pregrado",
  "graduationYear": "2017"
}
```

- <span style='color:#753A9A'>Responses</span>

  - <span style="color:#23A559">**200** - Success</span>
  ```json
  {
    "userId": 5,
    "foreignStudyId": 16,
    "name": "Ingeniería Mecánica",
    "universityName": "UNEXPO",
    "degree": "pregrado",
    "graduationYear": "2017",
    "createdAt": "28/12/2023 - 09:50 AM"
  }
  ```
  - <span style="color:red">**400** - Bad Request</span>
  ```json
  {
    "message": "Datos invalidos en formulario",
    "details": [
      {
        "field": "name",
        "message": "Required"
      }
    ]
  }
  ```
  - <span style="color:red">**500** - Internal Server Error</span>
  ```json
  {
    "message": "Ya existe la llave (user_id, name, university_name, degree)=(5, Ingeniería Mecánica, UNEXPO, pregrado)."
  }
  ```

#### <span id='user-token-for-updating-profile-foreign-studies-put' style='color:#9992F4'>**PUT** /foreign-studies/\<ForeignStudyID></span>

- <span style="color:#9992F4">Body</span>
```json
{
  "name":"Fisica",
  "universityName":"La Santiago",
  "degree":"especializacion",
  "graduationYear":"1994"
}
```

- <span style='color:#753A9A'>Responses</span>

  - <span style="color:#23A559">**200** - Success</span>
  ```json
  {
    "message": "Estudio foraneo modificado correctamente"
  }
  ```

  - <span style="color:red">**404** - Not Found</span>
  ```json
  {
    "message": "No se encontro el estudio: 18 del usuario: 5"
  }
  ```

#### <span id='user-token-for-updating-profile-foreign-studies-get-foreign-study-by-user-and-foreign-study-id' style='color:#23A559'>**GET** Foreign Study By User and Foreign Study ID /foreign-studies/\<ForeignStudyID></span>

- <span style='color:#753A9A'>Responses</span>

  - <span style="color:#23A559">**200** - Success</span>
  ```json
  [
    {
      "userId": 5,
      "foreignStudyId": 16,
      "name": "Fisica",
      "universityName": "La Santiago",
      "degree": "especializacion",
      "graduationYear": "1994",
      "createdAt": "28/12/2023 - 09:50 AM"
    }
  ]
  ```
  - <span style="color:red">**404** - Not Found</span>
  ```json
  {
    "message": "No se pudo encontrar el registro de id: 5 "
  }
  ```

#### <span id='user-token-for-updating-profile-foreign-studies-delete' style='color:red'>**DELETE** /foreign-studies/\<ForeignStudyID></span>

- <span style='color:#753A9A'>Responses</span>

  - <span style="color:#23A559">**200** - Success</span>
  ```json
  {
    "message": "Estudio foraneo eliminado correctamente"
  }
  ```
  - <span style="color:red">**404** - Not Found</span>
  ```json
  {
    "message": "No se encontro el estudio foraneo: 16 del usuario: 5"
  }
  ```

### Projects

#### <span id='user-token-for-updating-profile-projects-post-create' style='color:orange'>**POST** Create /projects</span>

- <span style="color:#9992F4">Body **[multipart/form-data]**</span>
```multipart/form-data
  "name" : "Trabajo"
  "description" : "Descripcion de mi trabajo"
  "projectUrl" : "https://hoppscotch.io/"
  "images" : image.jpg
  "coverImage" : image.jpg
```

- <span style='color:#753A9A'>Responses</span>

  - <span style="color:#23A559">**200** - Success</span>
  ```json
  {
    "projectId": 11,
    "name": "Trabajo",
    "description": "Descripcion de mi trabajo",
    "coverImageId": "replit/c486p7caonrkfhzvmodq",
    "coverImageUrl": "http://res.cloudinary.com/dypukp3t0/image/upload/v1704316698/replit/c486p7caonrkfhzvmodq.jpg",
    "projectUrl": "https://hoppscotch.io/",
    "images": [
      {
        "imageCloudId": "replit/jwhmau8rhq71psofwzuw",
        "imageUrl": "http://res.cloudinary.com/dypukp3t0/image/upload/v1704316699/replit/jwhmau8rhq71psofwzuw.jpg",
        "createdAt": "2024-01-03T21:18:19.851Z"
      }
    ]
  }
  ```
  - <span style="color:red">**400** - Bad Request</span>
  ```json
  {
    "message": "Ya existe otro proyecto con el mismo nombre o con el mismo url"
  }
  ```

#### <span id='user-token-for-updating-profile-projects-put' style='color:#9992F4'>**PUT** /projects/\<ProjectID></span>

- <span style="color:#9992F4">Body</span>
```multipart/form-data
  "name" : "Trabajo"
  "description" : "Descripcion de mi trabajo"
  "projectUrl" : "https://hoppscotch.io/"
  "images" : image.jpg
  "coverImage" : image.jpg
```

- <span style='color:#753A9A'>Responses</span>

  - <span style="color:#23A559">**200** - Success</span>
  ```json
  {
    "message": "Proyecto actualizado correctamente"
  }
  ```
#### <span id='user-token-for-updating-profile-projects-get-by-project-id' style='color:#23A559'>**GET** By Project ID /projects/\<ProjectID></span>

- <span style='color:#753A9A'>Responses</span>

  - <span style="color:#23A559">**200** - Success</span>
  ```json
  {
    "userId": 4,
    "projectId": 11,
    "projectName": "Trabajo",
    "projectDescription": "Offside",
    "projectUrl": "https://hoppscotch.io/",
    "coverImageId": "replit/rfxl98lfrzla4liljkxm",
    "coverImageUrl": "http://res.cloudinary.com/dypukp3t0/image/upload/v1704317995/replit/rfxl98lfrzla4liljkxm.jpg",
    "images": [
      {
        "imageCloudId": "replit/jwhmau8rhq71psofwzuw",
        "imageUrl": "http://res.cloudinary.com/dypukp3t0/image/upload/v1704316699/replit/jwhmau8rhq71psofwzuw.jpg"
      },
      {
        "imageCloudId": "replit/zpunlvqjjpkmvcle3buz",
        "imageUrl": "http://res.cloudinary.com/dypukp3t0/image/upload/v1704317997/replit/zpunlvqjjpkmvcle3buz.jpg"
      }
    ]
    }
  ```
  - <span style="color:red">**404** - Not Found</span>
  ```json
  {
    "message": "No se pudo encontrar el registro con el id de usuario: 4 y el id de proyecto: 55"
  }
  ```

#### <span id='user-token-for-updating-profile-projects-delete' style='color:red'>**DELETE** /projects/\<ProjectID></span>

- <span style='color:#753A9A'>Responses</span>

  - <span style="color:#23A559">**200** - Success</span>
  ```json
  {
    "message": "Proyecto eliminado correctamente"
  }
  ```
  - <span style="color:red">**404** - Not Found</span>
  ```json
  {
    "message": "No se pudo encontrar el registro con el id de usuario: 4 y el id de proyecto: 30"
  }
  ```

### User Languages

#### <span id='user-token-for-updating-profile-user-languages-post-create' style='color:orange'>**POST** Create /user-languages/language\<LanguageID></span>

- <span style="color:#9992F4">Body **[multipart/form-data]**</span>
```multipart/form-data
  "proficientLevel" : "NATIVE" (A1 | A2 | B1 | B2 | C1 | C2 | NATIVE)
  "certificateImage" : image.jpg
```

- <span style='color:#753A9A'>Responses</span>

  - <span style="color:#23A559">**200** - Success</span>
  ```json
  {
    "userId": 5,
    "languageId": 16,
    "proficientLevel": "B1",
    "createdAt": "28/12/2023 - 10:23 AM"
  }
  ```

  - <span style="color:red">**400** - Bad Request</span>
  ```json
  {
    "message": "Datos invalidos en formulario",
    "details": [
      {
        "field": "proficientLevel",
        "message": "Invalid enum value. Expected 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Native', received ''"
      }
    ]
  }
  ```

  - <span style="color:red">**500** - Internal Server Error</span>
  ```json
  {
    "message": "Ya existe la llave (user_id, language_id)=(5, 16)."
  }
  ```

#### <span id='user-token-for-updating-profile-user-languages-put' style='color:#9992F4'>**PUT** /user-languages/language/\<LanguageID></span>

- <span style="color:#9992F4">Body **[multipart/form-data]**</span>
```multipart/form-data
  "proficientLevel" : "NATIVE" (A1 | A2 | B1 | B2 | C1 | C2 | NATIVE)
  "certificateImage" : image.jpg
```

- <span style='color:#753A9A'>Responses</span>

  - <span style="color:#23A559">**200** - Success</span>
  ```json
  {
    "message": "idioma modificado correctamente"
  }
  ```
  - <span style="color:red">**404** - Not Found</span>
  ```json
  {
    "message": "No se encontro el idioma de id: 17 del usuario: 5"
  }
  ```

#### <span id='user-token-for-updating-profile-user-languages-get-by-project-id' style='color:#23A559'>**GET** By Language ID /user-languages/\<LanguageID></span>

- <span style='color:#753A9A'>Responses</span>

  - <span style="color:#23A559">**200** - Success</span>
  ```json
  [
    {
      "userId": 5,
      "languageId": 16,
      "proficientLevel": "A1",
      "createdAt": "28/12/2023 - 10:23 AM"
    }
  ]
  ```
  - <span style="color:red">**404** - Not Found</span>
  ```json
  {
    "message": "No se pudo encontrar idiomas para el usuario de id: 5 "
  }
  ```

#### <span id='user-token-for-updating-profile-user-languages-delete' style='color:red'>**DELETE** /user-languages/language/\<LanguageID></span>

- <span style='color:#753A9A'>Responses</span>

  - <span style="color:#23A559">**200** - Success</span>
  ```json
  {
    "message": "Lenguage eliminado correctamente"
  }
  ```
  - <span style="color:red">**404** - Not Found</span>
  ```json
  {
    "message": "No se encontro el idioma de id: 16 del usuario de id: 5"
  }
  ```

### Personal Links

#### <span id='user-token-for-updating-profile-personal-links-post-create' style='color:orange'>**POST** Create /personal-links</span>

- <span style="color:#9992F4">Body</span>
```json
{
  "name": "Instagram",
  "url":"https://github.com/"
}
```

- <span style='color:#753A9A'>Responses</span>

  - <span style="color:#23A559">**200** - Success</span>
  ```json
  {
    "user_id": 5,
    "link_id": 12,
    "name": "Instagram",
    "url": "https://github.com/",
    "created_at": "28/12/2023 - 10:39 AM",
    "updated_at": "28/12/2023 - 10:39 AM"
  }
  ```
  - <span style="color:red">**500** - Internal Server Error</span>
  ```json
  {
    "message": "Ya existe la llave (name)=(Instagram)."
  }
  ```

#### <span id='user-token-for-updating-profile-personal-links-put' style='color:#9992F4'>**PUT** /personal-links/\<PersonalLinkID></span>

- <span style="color:#9992F4">Body</span>
```json
{
  "name":"Instagram",
  "url":"https://img.freepik.com/premium-vector/betty-boop-cowboys_690789-538.jpg"
}
```

- <span style='color:#753A9A'>Responses</span>

  - <span style="color:#23A559">**200** - Success</span>
  ```json
  {
    "message": "personal link modificado correctamente"
  }
  ```
  - <span style="color:red">**404** - Not Found</span>
  ```json
  {
    "message": "No se encontro el link: 13 del usuario: 5"
  }
  ```

#### <span id='user-token-for-updating-profile-personal-links-get-by-user-id' style='color:#23A559'>**GET** By User ID /personal-links/\<PersonalLinkID></span>

- <span style='color:#753A9A'>Responses</span>

  - <span style="color:#23A559">**200** - Success</span>
  ```json
  [
    {
      "userId": 5,
      "linkId": 12,
      "name": "Instagram",
      "url": "https://img.freepik.com/premium-vector/betty-boop-cowboys_690789-538.jpg",
      "createdAt": "28/12/2023 - 10:39 AM",
      "updatedAt": "28/12/2023 - 10:42 AM"
    }
  ]
  ```
  - <span style="color:red">**404** - Not Found</span>
  ```json
  {
    "message": "No se encontro el link de id: 13 para el usuario: 5"
  }
  ```

#### <span id='user-token-for-updating-profile-personal-links-delete' style='color:red'>**DELETE** /personal-links/\<PersonalLinkID></span>

- <span style='color:#753A9A'>Responses</span>

  - <span style="color:#23A559">**200** - Success</span>
  ```json
  {
    "message": "Link eliminado correctamente"
  }
  ```
  - <span style="color:red">**404** - Not Found</span>
  ```json
  {
    "message": "No se encontro el link de id: 12 del usuario: 5"
  }
  ```

### Work Experiences

#### <span id='user-token-for-updating-profile-work-experiences-post-create' style='color:orange'>**POST** Create /work-experiences</span>

- <span style="color:#9992F4">Body</span>
```json
{
  "freelancer": false,
  "organizationName": "Lusitanos",
  "jobTitle": "Auxiliar de equipo",
  "entryDate": "2016-04-03",
  "departureDate": "2020-04-03",
  "description": "Una recarga de agua al lado de una panadería",
  "country": "Venezuela",
  "state": "",
  "city": "",
  "address": "Urbanización Moreno de Mendoza"
}
```

- <span style='color:#753A9A'>Responses</span>

  - <span style="color:#23A559">**200** - Success</span>
  ```json
  {
    "userId": 5,
    "workExpId": 3,
    "organizationName": "Lusitanos",
    "jobTitle": "Auxiliar de equipo",
    "country": "Venezuela",
    "state": "",
    "city": "",
    "address": "Urbanización Moreno de Mendoza",
    "entryDate": "03/04/2016",
    "departureDate": "03/04/2020",
    "description": "Una recarga de agua al lado de una panadería",
    "createdAt": "28/12/2023 - 10:49 AM"
  }
  ```

#### <span id='user-token-for-updating-profile-work-experiences-put' style='color:#9992F4'>**PUT** /work-experiences/\<WorkExperienceID></span>

- <span style="color:#9992F4">Body</span>
```json
{
  "freelancer": false,
  "organizationName": "Lusitanos",
  "jobTitle": "Auxiliar de equipo",
  "entryDate": "2016-04-03",
  "departureDate": "2020-04-03",
  "description": "Una recarga de agua al lado de una panadería",
  "country": "Venezuela",
  "state": "Bolivar",
  "city": "Ciudad Guayana",
  "address": "Urbanización Moreno de Mendoza"
}
```

- <span style='color:#753A9A'>Responses</span>

  - <span style="color:#23A559">**200** - Success</span>
  ```json
  {
    "message": "Experiencia de trabajo modificada correctamente"
  }
  ```
  - <span style="color:red">**400** - Bad Request</span>
  ```json
  {
    "message": "Ya existe otro registro con datos parecidos"
  }
  ```
  - <span style="color:red">**404** - Not Found</span>
  ```json
  {
    "message": "No se pudo encontrar el registro con el id de usuario: 5 y el id de experiencia de trabajo: 4"
  }
  ```

#### <span id='user-token-for-updating-profile-work-experiences-get-by-work-experience-id' style='color:#23A559'>**GET** By Work Experience ID /work-experiences/\<WorkExperienceID></span>

- <span style='color:#753A9A'>Responses</span>

  - <span style="color:#23A559">**200** - Success</span>
  ```json
  {
    "organizationName": "Lusitanoaasdfsdfdsfasdfaadsfasdffasdfasss",
    "jobTitle": "Auxiliar de equipo",
    "country": "asdfdasf",
    "state": "",
    "city": "",
    "address": "",
    "freelancer": false,
    "entryDate": "2016-04-03",
    "departureDate": null,
    "description": "Descripcion",
    "createdAt": "03/01/2024 - 04:43 PM"
  }
  ```
   - <span style="color:red">**404** - Not Found</span>
  ```json
  {
  "message": "No se pudo encontrar el registro con el id de usuario: 4 y el id de experiencia de trabajo: 5"
  }
  ```

#### <span id='user-token-for-updating-profile-work-experiences-delete' style='color:red'>**DELETE** /work-experiences/\<WorkExperienceID></span>

- <span style='color:#753A9A'>Responses</span>

  - <span style="color:#23A559">**200** - Success</span>
  ```json
  {
    "message": "Experiencia de trabajo eliminada correctamente"
  }
  ```
  - <span style="color:red">**404** - Not Found</span>
  ```json
  {
    "message": "No se pudo encontrar el registro con el id de usuario: 5 y el id de experiencia de trabajo: 1"
  }
  ```

### CVs

#### <span id='user-token-for-updating-profile-cvs-post-create' style='color:orange'>**POST** Create /user-cvs</span>

- <span style="color:#9992F4">Body</span>
```json
{
  "careerId": 1,
  "name": "CV de Pruebas",
  "entries": {
    "education": {
      "featured": [8,9],
      "personal": [5]
    },
    "experience": [1, 4],
    "languages": [6, 3],
    "skills": {
      "soft": ["Creatividad en producto", "cualquier verga", "Empatia"],
      "hard": ["React", "Godot", "Generador de seeds"]
    }
  }
}
```

- <span style='color:#753A9A'>Responses</span>

  - <span style="color:#23A559">**200** - Success</span>
  ```json
  {
    "message": "Curriculum Vitae creado correctamente"
  }
  ```
  - <span style="color:red">**500** - Internal Server Error</span>
  ```json
  {
    "message": "Ya existe la llave (name)=(CV de Pruebas)."
  }
  ```

#### <span id='user-token-for-updating-profile-cvs-delete' style='color:red'>**DELETE** /user-cvs/<CV_ID></span>

- <span style='color:#753A9A'>Responses</span>

  - <span style="color:#23A559">**200** - Success</span>
  ```json
  {
    "message": "Curriculum Vitae eliminado correctamente"
  }
  ```
  - <span style="color:red">**404** - Not Found</span>
  ```json
  {
    "message": "No se pudo encontrar el registro de id: 1"
  }
  ```

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

- <span style='color:#753A9A'>Responses</span>

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

  - <span style="color:red">**404** - Error sending invalid data</span>

  ```json
  {
    "message": "Email o contraseña incorrecta"
  }
  ```

  - <span style="color:red">**400** - Error on missing fields</span>

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

- <span style='color:#753A9A'>Responses</span>

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

- <span style='color:#753A9A'>Responses</span>

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

- <span style='color:#753A9A'>Responses</span>

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

- <span style='color:#753A9A'>Responses</span>

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
