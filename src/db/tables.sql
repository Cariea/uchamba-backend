--------- schema definition  ------------
CREATE DATABASE uchamba;

CREATE TABLE USERS (
    userCode character varying(9),
    name character varying(50) not null,
    email character varying(30) not null,
    password character varying(64) not null,
    aboutMe character varying(128),
    residenceAddress character varying(100),
    userRol character varying(15) not null,
    constraint pk_users primary key(userCode),
    constraint chk_only_letters_and_spaces CHECK (name ~ '^[A-Za-z ]*$')
);

CREATE TABLE UNIVERSITIES  (
    universityCode serial,
    name character varying(50) not null,
    address character varying(100) not null,

    constraint pk_universities primary key(universityCode),
    constraint chk_only_letters_and_spaces CHECK (name ~ '^[A-Za-z ]*$')
);
CREATE TABLE  CAREERS(
    careerCode serial,
    name character varying(30) not null,
    universityCode integer not null,

    constraint pk_careers primary key(careerCode),
    constraint fk_universities foreign key(universityCode) references UNIVERSITIES on update cascade on delete restrict,
    constraint chk_only_letters_and_spaces CHECK (name ~ '^[A-Za-z ]*$')
);
CREATE TABLE LANGUAGES (
    languageCode serial,
    name character varying(20) not null,

    constraint pk_languages primary key(languageCode),
    constraint chk_only_letters_and_spaces CHECK (name ~ '^[A-Za-z ]*$')
);
CREATE TABLE SKILLS (
    skillCode serial,
    description character varying(20) not null,
    type  character varying(1) not null,

    constraint pk_skills primary key(skillCode)
);
CREATE TABLE TECHNOLOGIES(
    techCode serial,
    name character varying(20) not null,

    constraint pk_technologies primary key(techCode),
    constraint chk_only_letters_and_spaces CHECK (name ~ '^[A-Za-z ]*$')
);
CREATE TABLE  SOCIAL_MEDIAS(
    socialCode serial,
    name character varying(20) not null,
    imageLink character varying(64) not null,

    constraint pk_socials primary key(socialCode),
    constraint chk_only_letters_and_spaces CHECK (name ~ '^[A-Za-z ]*$')
);
CREATE TABLE ORGANIZATINOS (
    orgsCode serial,
    name character varying(20) not null,
    address character varying(100) not null,

    constraint pk_organizations primary key(orgsCode),
    constraint chk_only_letters_and_spaces CHECK (name ~ '^[A-Za-z ]*$')
);
CREATE TABLE PROJECTS (
    projectCode serial,
    name character varying(20) not null,
    description character varying(20) ,
    projectLink character varying(30) not null,
    userCode character varying(9) not null,

    constraint pk_projects primary key(projectCode),
    constraint fk_user foreign key(userCode) references USERS on update cascade on delete restrict
);
CREATE TABLE PROJECTS_IMAGE_LINKS (
    projectCode integer,
    imageLink character varying(64) not null,

    constraint pk_pil primary key(projectCode,imageLink),
    constraint fk_project foreign key(projectCode) references PROJECTS on update cascade on delete restrict
);
CREATE TABLE STUDY (
    userCode character varying(9),
    careerCode integer,
    degree character varying(20) not null,
    graduationYear date,

    constraint pk_study primary key(userCode,careerCode),
    constraint fk_user foreign key(userCode) references USERS on update cascade on delete restrict,
    constraint fk_career foreign key(careerCode) references CAREERS on update cascade on delete restrict
);
CREATE TABLE SPEAK (
    userCode character varying(9),
    languageCode integer,
    level character varying(2),

    constraint pk_speak primary key(userCode,languageCode),
    constraint fk_user foreign key(userCode) references USERS on update cascade on delete restrict,
    constraint fk_languages foreign key(languageCode) references LANGUAGES on update cascade on delete restrict
);
CREATE TABLE HAS_SKILLS (
    userCode character varying(9),
    skillCode integer,
    
    constraint pk_hasSkills primary key(userCode,skillCode),
    constraint fk_user foreign key(userCode) references USERS on update cascade on delete restrict,
    constraint fk_skills foreign key(skillCode) references SKILLS on update cascade on delete restrict
);
CREATE TABLE KNOW_TECHS (
    userCode character varying(9),
    techCode integer,

    constraint pk_knowTechs primary key(userCode,techCode),
    constraint fk_user foreign key(userCode) references USERS on update cascade on delete restrict,
    constraint fk_tech foreign key(techCode) references TECHNOLOGIES on update cascade on delete restrict
);
CREATE TABLE HAS_SOCIAL_MEDIAS (
    userCode character varying(9),
    socialCode integer,
    socialLink character varying(30) not null,
    constraint pk_hasSM primary key(userCode,socialCode),
    constraint fk_user foreign key(userCode) references USERS on update cascade on delete restrict,
    constraint fk_social foreign key(socialCode) references SOCIAL_MEDIAS on update cascade on delete restrict
);
CREATE TABLE HAS_WORKED_IN (
    userCode character varying(9),
    orgsCode integer,
    jobTitle character varying(20) not null,
    entryDay date not null,
    departureDay date,
    description character varying(124) not null,
    jobAchivements character varying(124) not null,

    constraint pk_hasWI primary key(userCode,orgsCode),
    constraint fk_user foreign key(userCode) references USERS on update cascade on delete restrict,
    constraint fk_orgs foreign key(orgsCode) references ORGANIZATINOS on update cascade on delete restrict
);