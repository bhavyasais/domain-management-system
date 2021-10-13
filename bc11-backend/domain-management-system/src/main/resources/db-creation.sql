CREATE DATABASE digital_asset_management;
\c digital_asset_management;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
SET timezone TO 'UTC';

CREATE USER security_officer WITH PASSWORD 's3cur1ty_0ff1c3r';

CREATE TABLE if not exists public.collaborator_platforms
(
    id         UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    name       varchar(50) NOT NULL,
    image_url  varchar(2048) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    created_by varchar(100) NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    updated_by varchar(100) NOT NULL
);

ALTER TABLE public.collaborator_platforms OWNER TO security_officer;

CREATE TABLE if not exists public.departments
(
    id          UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    name        varchar(50) NOT NULL,
    description varchar(200),
    created_at  timestamp with time zone NOT NULL,
    created_by  varchar(100) NOT NULL
);

ALTER TABLE public.departments OWNER TO security_officer;

CREATE TABLE if not exists public.trust_groups
(
    id          UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    group_name  varchar(50) NOT NULL,
    description varchar(200),
    created_at  timestamp with time zone NOT NULL,
    created_by  varchar(100) NOT NULL,
    updated_at  timestamp with time zone NOT NULL,
    updated_by  varchar(100) NOT NULL
);

ALTER TABLE public.trust_groups OWNER TO security_officer;

CREATE TABLE if not exists public.domains(
    id           UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    name         varchar(50) NOT NULL,
    address      varchar(100) NOT NULL,
    relationship varchar(50) NOT NULL,
    trust_score  int NOT NULL,
    is_active    boolean NOT NULL,
    created_at   timestamp with time zone NOT NULL,
    created_by   varchar(100) NOT NULL,
    updated_at   timestamp with time zone NOT NULL,
    updated_by   varchar(100) NOT NULL
);

ALTER TABLE public.domains OWNER TO security_officer;

CREATE TABLE if not exists public.access_permission_types
(
    id          UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    name        varchar(50) NOT NULL,
    description varchar(200),
    created_at  timestamp with time zone NOT NULL,
    created_by  varchar(100) NOT NULL,
    updated_at  timestamp with time zone NOT NULL,
    updated_by  varchar(100) NOT NULL
);

ALTER TABLE public.access_permission_types OWNER TO security_officer;

CREATE TABLE if not exists public.permission_mappings
(
    id                         UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    is_active                  boolean NOT NULL,
    created_at                 timestamp with time zone NOT NULL,
    created_by                 varchar(100) NOT NULL,
    updated_at                 timestamp with time zone NOT NULL,
    updated_by                 varchar(100) NOT NULL,
    access_permission_types_id UUID NOT NULL references public.access_permission_types(id),
    trust_groups_id            UUID NOT NULL references public.trust_groups(id),
    departments_id             UUID NOT NULL references public.departments(id),
    collaborators_id           UUID NOT NULL references public.collaborator_platforms(id)
);

ALTER TABLE public.permission_mappings OWNER TO security_officer;

CREATE TABLE if not exists public.domain_tg_mappings
(
    id                UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    action_at         timestamp with time zone NOT NULL,
    action_by         varchar(100) NOT NULL,
    domains_id        UUID NOT NULL references public.domains(id),
    trust_groups_id   UUID NOT NULL references public.trust_groups(id),
    departments_id    UUID NOT NULL references public.departments(id),
    collaborators_id  UUID NOT NULL references public.collaborator_platforms(id)
);

ALTER TABLE public.domain_tg_mappings OWNER TO security_officer;


-- Permission Types
insert into access_permission_types(name,description,created_at,created_by,updated_at,updated_by) values ('READ','Can Read?',CURRENT_TIMESTAMP,'ABC',CURRENT_TIMESTAMP,'ABC');
insert into access_permission_types(name,description,created_at,created_by,updated_at,updated_by) values ('EDIT','Can Write?',CURRENT_TIMESTAMP,'ABC',CURRENT_TIMESTAMP,'ABC');
insert into access_permission_types(name,description,created_at,created_by,updated_at,updated_by) values ('COMMENT','Can Comment?',CURRENT_TIMESTAMP,'ABC',CURRENT_TIMESTAMP,'ABC');
insert into access_permission_types(name,description,created_at,created_by,updated_at,updated_by) values ('TRANSFER OWNERSHIP','Can transfer ownership?',CURRENT_TIMESTAMP,'ABC',CURRENT_TIMESTAMP,'ABC');

-- Collaboration Platforms
insert into collaborator_platforms(name,image_url,created_at,created_by,updated_at,updated_by) values ('Google Suite', './some_url', CURRENT_TIMESTAMP,'ABC',CURRENT_TIMESTAMP,'ABC');

-- Departments
insert into departments(name,description,created_at,created_by) values ('Sales', 'For Sales Dept', CURRENT_TIMESTAMP,'ABC');
insert into departments(name,description,created_at,created_by) values ('Legal', 'For Legal Dept', CURRENT_TIMESTAMP,'ABC');

-- Trust Groups
insert into trust_groups(group_name,description,created_at,created_by,updated_at,updated_by) values ('TOP 10','Top 10 group',CURRENT_TIMESTAMP,'ABC',CURRENT_TIMESTAMP,'ABC');
insert into trust_groups(group_name,description,created_at,created_by,updated_at,updated_by) values ('TOP 100','Top 100 group',CURRENT_TIMESTAMP,'ABC',CURRENT_TIMESTAMP,'ABC');

-- Domains
insert into domains(name,address,relationship,trust_score,is_active,created_at,created_by,updated_at,updated_by) values ('Zemosolabs','zemosolabs.com','PARTNER',222,true,CURRENT_TIMESTAMP,'ABC',CURRENT_TIMESTAMP,'ABC');
insert into domains(name,address,relationship,trust_score,is_active,created_at,created_by,updated_at,updated_by) values ('Skyflow','skyflow.com','CUSTOMER',100,true,CURRENT_TIMESTAMP,'ABC',CURRENT_TIMESTAMP,'ABC');

-- Permission Mappings
insert into permission_mappings(is_active,created_at,created_by,updated_at,updated_by,access_permission_types_id,trust_groups_id,departments_id,collaborators_id) values (true,CURRENT_TIMESTAMP,'ABC',CURRENT_TIMESTAMP,'ABC','93d2b088-bcfd-422d-9dad-3014058c25be','2b46f9f3-95c0-47f7-98b9-40fc8335d2bf','46212a48-febd-45fb-8061-ec1232cde0f4','2ad02944-b523-47e4-a3a8-7078316dbb52');
insert into permission_mappings(is_active,created_at,created_by,updated_at,updated_by,access_permission_types_id,trust_groups_id,departments_id,collaborators_id) values (true,CURRENT_TIMESTAMP,'ABC',CURRENT_TIMESTAMP,'ABC','fff753df-49b5-4e8e-8b5e-7934d1aa4d5d','8ab90b27-2469-4b16-8901-be73c0f8f081','46212a48-febd-45fb-8061-ec1232cde0f4','2ad02944-b523-47e4-a3a8-7078316dbb52');

-- Domain TG Mappings
insert into domain_tg_mappings(action_at,action_by,domains_id,trust_groups_id,departments_id,collaborators_id) values (CURRENT_TIMESTAMP,'ABC','a19c9033-0f32-4c17-916f-8fdef1a56f0b','2b46f9f3-95c0-47f7-98b9-40fc8335d2bf','46212a48-febd-45fb-8061-ec1232cde0f4','2ad02944-b523-47e4-a3a8-7078316dbb52');
insert into domain_tg_mappings(action_at,action_by,domains_id,trust_groups_id,departments_id,collaborators_id) values (CURRENT_TIMESTAMP,'ABC','c2d68c82-e0bf-459b-9a50-881d8c8f4e3b','8ab90b27-2469-4b16-8901-be73c0f8f081','46212a48-febd-45fb-8061-ec1232cde0f4','2ad02944-b523-47e4-a3a8-7078316dbb52');

