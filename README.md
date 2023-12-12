# Table of contents

- [Table of contents](#table-of-contents)
- [Endpoints](#endpoints)
  - [Admin Only](#admin-only)
    - [Users](#users)
      - [<span style='color:red'>DELETE</span>](#admin-only-user-delete)
    - [Languages](#languages)
      - [<span style='color:orange'>POST</span>](#admin-only-languages-post)
      - [<span style='color:#753A9A'>PUT</span>](#admin-only-languages-put)
      - [<span style='color:red'>DELETE</span>](#admin-only-languages-delete)
    - [Careers](#careers)
      - [<span style='color:orange'>POST</span>](#admin-only-careers-post)
      - [<span style='color:#753A9A'>PUT</span>](#admin-only-careers-put)
      - [<span style='color:red'>DELETE</span>](#admin-only-careers-delete)
    - [Featured Hard Skills](#featured-hard-skills)
      - [<span style='color:orange'>POST</span>](#admin-only-hskills-post)
      - [<span style='color:#753A9A'>PUT</span>](#admin-only-hskills-put)
      - [<span style='color:red'>DELETE</span>](#admin-only-hskills-delete)
    - [Featured Soft Skills](#featured-soft-skills)
      - [<span style='color:orange'>POST</span>](#admin-only-sskills-post)
      - [<span style='color:#753A9A'>PUT</span>](#admin-only-sskills-put)
      - [<span style='color:red'>DELETE</span>](#admin-only-sskills-delete)
  - [User Priviledges](#user-priviledges)
    - [Languages](#languages)
      - [<span style='color:#23A559'>GET All</span>](#user-priviledges-languages-get-all)
      - [<span style='color:#23A559'>GET Paginated</span>](#user-priviledges-languages-get-paginated)
      - [<span style='color:#23A559'>GET By ID</span>](#user-priviledges-languages-get-by-id)
    - [Careers](#careers)
      - [<span style='color:#23A559'>GET All</span>](#user-priviledges-careers-get-all)
      - [<span style='color:#23A559'>GET Paginated</span>](#user-priviledges-careers-get-paginated)
      - [<span style='color:#23A559'>GET By ID</span>](#user-priviledges-careers-get-by-id)
    - [Hard Skills](#hard-skills)
      - [<span style='color:#23A559'>GET All</span>](#user-priviledges-hskills-get-all)
      - [<span style='color:#23A559'>GET Paginated</span>](#user-priviledges-hskills-get-paginated)
      - [<span style='color:#23A559'>GET By Skill ID</span>](#user-priviledges-hskills-get-by-id)
    - [Soft Skills](#soft-skills)
      - [<span style='color:#23A559'>GET All</span>](#user-priviledges-sskills-get-all)
      - [<span style='color:#23A559'>GET Paginated</span>](#user-priviledges-sskills-get-paginated)
      - [<span style='color:#23A559'>GET By Skill ID</span>](#user-priviledges-sskills-get-by-id)
  - [User Token for Updating Profile](#user-token-for-updating-profile)
    - [Users Personal Info](#users-personal-info)
      - [<span style='color:#753A9A'>PUT</span>](#utfup-upi-put)
    - [Profile Skills](#profile-skills)
      - [<span style='color:orange'>POST</span>](#utfup-profile-skills-post)
      - [<span style='color:red'>DELETE</span>](#utfup-profile-skills-delete)
    - [User Studies](#user-studies)
      - [<span style='color:#23A559'>GET</span>](#utfup-user-studies-get)
      - [<span style='color:orange'>POST</span>](#utfup-user-studies-post)
      - [<span style='color:#753A9A'>PUT</span>](#utfup-user-studies-put)
      - [<span style='color:red'>DELETE</span>](#utfup-user-studies-delete)
    - [Foreign Studies](#foreign-studies)
      - [<span style='color:#23A559'>GET</span>](#utfup-foreign-studies-get)
      - [<span style='color:orange'>POST</span>](#utfup-foreign-studies-post)
      - [<span style='color:#753A9A'>PUT</span>](#utfup-foreign-studies-put)
      - [<span style='color:red'>DELETE</span>](#utfup-foreign-studies-delete)
    - [Projects](#projects)
      - [<span style='color:#23A559'>GET</span>](#utfup-projects-get)
      - [<span style='color:orange'>POST</span>](#utfup-projects-post)
      - [<span style='color:#753A9A'>PUT</span>](#utfup-projects-put)
      - [<span style='color:red'>DELETE</span>](#utfup-projects-delete)
    - [User Language](#user-language)
      - [<span style='color:#23A559'>GET</span>](#utfup-user-language-get)
      - [<span style='color:orange'>POST</span>](#utfup-user-language-post)
      - [<span style='color:#753A9A'>PUT</span>](#utfup-user-language-put)
      - [<span style='color:red'>DELETE</span>](#utfup-user-language-delete)
    - [Personal Links](#personal-links)
      - [<span style='color:#23A559'>GET</span>](#utfup-personal-links-get)
      - [<span style='color:orange'>POST</span>](#utfup-personal-links-post)
      - [<span style='color:#753A9A'>PUT</span>](#utfup-personal-links-put)
      - [<span style='color:red'>DELETE</span>](#utfup-personal-links-delete)
    - [Work Experiences](#work-experiences)
      - [<span style='color:#23A559'>GET</span>](#utfup-work-experiences-get)
      - [<span style='color:orange'>POST</span>](#utfup-work-experiences-post)
      - [<span style='color:#753A9A'>PUT</span>](#utfup-work-experiences-put)
      - [<span style='color:red'>DELETE</span>](#utfup-work-experiences-delete)
  - [<span id='toc-public'>Public</span>](#public)
    - [<span style='color:#23A559'>GET Generar CV</span>](#endpoint-generar-cv)
    - [Auth](#auth)
      - [<span style='color:orange'>POST Login</span>](#public-auth-post-login)
    - [Users](#users)
      - [<span style='color:#23A559'>GET All</span>](#public-users-get-all)
      - [<span style='color:#23A559'>GET Paginated</span>](#public-users-get-paginated)
      - [<span style='color:#23A559'>GET Detailed</span>](#public-users-get-detailed)
    - [Projects](#projects)
      - [<span style='color:#23A559'>GET Detailed</span>](#public-projects-get-detailed)

---

# Endpoints

---

## Admin Only

### Users

#### <span id='admin-only-user-delete' style='color:red'>**DELETE** /users/\<id></span>

- <span style='color:'>

[<span style='color:orange'>Volver</span>](#table-of-contents)

---

## User Priviledges

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
