--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: boisson; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.boisson (
    boisson_id integer NOT NULL,
    name character varying(50) NOT NULL,
    boisson_type integer
);


ALTER TABLE public.boisson OWNER TO postgres;

--
-- Name: boisson_boisson_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.boisson_boisson_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.boisson_boisson_id_seq OWNER TO postgres;

--
-- Name: boisson_boisson_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.boisson_boisson_id_seq OWNED BY public.boisson.boisson_id;


--
-- Name: commande; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.commande (
    commande_id integer NOT NULL,
    name_client character varying(50),
    adresse character varying(250),
    status integer,
    prix integer
);


ALTER TABLE public.commande OWNER TO postgres;

--
-- Name: commande_commande_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.commande_commande_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.commande_commande_id_seq OWNER TO postgres;

--
-- Name: commande_commande_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.commande_commande_id_seq OWNED BY public.commande.commande_id;


--
-- Name: commande_ligne; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.commande_ligne (
    ligne integer,
    taille character varying(2),
    commande_id integer,
    type_produits integer,
    id_produits integer,
    nombre_produit integer
);


ALTER TABLE public.commande_ligne OWNER TO postgres;

--
-- Name: menu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.menu (
    menu_id integer NOT NULL,
    boisson_id integer,
    entry_id integer,
    pizza_id integer,
    pizza_type integer,
    nom character varying(50),
    description character varying(200)
);


ALTER TABLE public.menu OWNER TO postgres;

--
-- Name: menu_menu_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.menu_menu_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.menu_menu_id_seq OWNER TO postgres;

--
-- Name: menu_menu_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.menu_menu_id_seq OWNED BY public.menu.menu_id;


--
-- Name: pizza; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pizza (
    pizza_id integer NOT NULL,
    name character varying(50) NOT NULL,
    description character varying(50) NOT NULL,
    taille character varying(2)
);


ALTER TABLE public.pizza OWNER TO postgres;

--
-- Name: pizza_pers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pizza_pers (
    pizza_pers_id integer NOT NULL,
    topping1_id integer,
    topping2_id integer,
    topping3_id integer,
    topping4_id integer,
    topping5_id integer,
    topping6_id integer,
    taille character varying(2)
);


ALTER TABLE public.pizza_pers OWNER TO postgres;

--
-- Name: pizza_pers_pizza_pers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pizza_pers_pizza_pers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pizza_pers_pizza_pers_id_seq OWNER TO postgres;

--
-- Name: pizza_pers_pizza_pers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pizza_pers_pizza_pers_id_seq OWNED BY public.pizza_pers.pizza_pers_id;


--
-- Name: pizza_pizza_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pizza_pizza_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pizza_pizza_id_seq OWNER TO postgres;

--
-- Name: pizza_pizza_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pizza_pizza_id_seq OWNED BY public.pizza.pizza_id;


--
-- Name: starter; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.starter (
    starter_id integer NOT NULL,
    name character varying(50) NOT NULL,
    description character varying(255),
    sauce integer
);


ALTER TABLE public.starter OWNER TO postgres;

--
-- Name: starter_starter_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.starter_starter_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.starter_starter_id_seq OWNER TO postgres;

--
-- Name: starter_starter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.starter_starter_id_seq OWNED BY public.starter.starter_id;


--
-- Name: topping; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.topping (
    topping_id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.topping OWNER TO postgres;

--
-- Name: topping_topping_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.topping_topping_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.topping_topping_id_seq OWNER TO postgres;

--
-- Name: topping_topping_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.topping_topping_id_seq OWNED BY public.topping.topping_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    uniqueid integer NOT NULL,
    name text NOT NULL,
    surename text NOT NULL,
    mail text NOT NULL,
    phonen integer,
    favaddr text,
    token text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: boisson boisson_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boisson ALTER COLUMN boisson_id SET DEFAULT nextval('public.boisson_boisson_id_seq'::regclass);


--
-- Name: commande commande_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commande ALTER COLUMN commande_id SET DEFAULT nextval('public.commande_commande_id_seq'::regclass);


--
-- Name: menu menu_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu ALTER COLUMN menu_id SET DEFAULT nextval('public.menu_menu_id_seq'::regclass);


--
-- Name: pizza pizza_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pizza ALTER COLUMN pizza_id SET DEFAULT nextval('public.pizza_pizza_id_seq'::regclass);


--
-- Name: pizza_pers pizza_pers_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pizza_pers ALTER COLUMN pizza_pers_id SET DEFAULT nextval('public.pizza_pers_pizza_pers_id_seq'::regclass);


--
-- Name: starter starter_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.starter ALTER COLUMN starter_id SET DEFAULT nextval('public.starter_starter_id_seq'::regclass);


--
-- Name: topping topping_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topping ALTER COLUMN topping_id SET DEFAULT nextval('public.topping_topping_id_seq'::regclass);


--
-- Data for Name: boisson; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.boisson (boisson_id, name, boisson_type) FROM stdin;
1	Coca-Cola	\N
2	Fanta	\N
3	Sprite	\N
4	Orangina	\N
5	Pepsi	\N
\.


--
-- Data for Name: commande; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.commande (commande_id, name_client, adresse, status, prix) FROM stdin;
\.


--
-- Data for Name: commande_ligne; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.commande_ligne (ligne, taille, commande_id, type_produits, id_produits, nombre_produit) FROM stdin;
\.


--
-- Data for Name: menu; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.menu (menu_id, boisson_id, entry_id, pizza_id, pizza_type, nom, description) FROM stdin;
1	1	1	1	1	La Surprise du Chef	La surprise du chef
\.


--
-- Data for Name: pizza; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pizza (pizza_id, name, description, taille) FROM stdin;
1	Pizza 3 fromages	3 fromages	\N
2	La Reine	Fromage Tomate et Jambon	\N
3	La Forestière	Tomate Fromage et Champignons	\N
\.


--
-- Data for Name: pizza_pers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pizza_pers (pizza_pers_id, topping1_id, topping2_id, topping3_id, topping4_id, topping5_id, topping6_id, taille) FROM stdin;
\.


--
-- Data for Name: starter; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.starter (starter_id, name, description, sauce) FROM stdin;
1	La Salade Grecque	\N	\N
2	La Salade Italienne	\N	\N
3	La Salade Française	\N	\N
\.


--
-- Data for Name: topping; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.topping (topping_id, name) FROM stdin;
1	Fromage
2	Tomate
3	Champi
4	jambon
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (uniqueid, name, surename, mail, phonen, favaddr, token, password) FROM stdin;
1	rayane	rayane	rayanoo1302@gmail.com	\N	\N	EdFtKJKlHpuvIMufSmUBySzUYO05hoJW3MlvhwB2paIOqbrNsXpIrTt4pAHGa9V1oNKDxvtXjMtpid9t0k8pXXcP9XfSeauGJZuj	$2b$10$7J514Dr8v1o188wlFyT1RulP2vYSHQLt9dwISIKKLjEkiVKHkIz/m
\.


--
-- Name: boisson_boisson_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.boisson_boisson_id_seq', 2, true);


--
-- Name: commande_commande_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.commande_commande_id_seq', 15, true);


--
-- Name: menu_menu_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.menu_menu_id_seq', 1, true);


--
-- Name: pizza_pers_pizza_pers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pizza_pers_pizza_pers_id_seq', 1, false);


--
-- Name: pizza_pizza_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pizza_pizza_id_seq', 6, true);


--
-- Name: starter_starter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.starter_starter_id_seq', 4, true);


--
-- Name: topping_topping_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.topping_topping_id_seq', 4, true);


--
-- Name: boisson boisson_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boisson
    ADD CONSTRAINT boisson_name_key UNIQUE (name);


--
-- Name: boisson boisson_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boisson
    ADD CONSTRAINT boisson_pkey PRIMARY KEY (boisson_id);


--
-- Name: commande commande_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commande
    ADD CONSTRAINT commande_pkey PRIMARY KEY (commande_id);


--
-- Name: menu menu_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_pkey PRIMARY KEY (menu_id);


--
-- Name: pizza pizza_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pizza
    ADD CONSTRAINT pizza_name_key UNIQUE (name);


--
-- Name: pizza_pers pizza_pers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pizza_pers
    ADD CONSTRAINT pizza_pers_pkey PRIMARY KEY (pizza_pers_id);


--
-- Name: pizza pizza_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pizza
    ADD CONSTRAINT pizza_pkey PRIMARY KEY (pizza_id);


--
-- Name: starter starter_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.starter
    ADD CONSTRAINT starter_name_key UNIQUE (name);


--
-- Name: starter starter_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.starter
    ADD CONSTRAINT starter_pkey PRIMARY KEY (starter_id);


--
-- Name: topping topping_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topping
    ADD CONSTRAINT topping_name_key UNIQUE (name);


--
-- Name: topping topping_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topping
    ADD CONSTRAINT topping_pkey PRIMARY KEY (topping_id);


--
-- Name: commande_ligne fk_commande; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commande_ligne
    ADD CONSTRAINT fk_commande FOREIGN KEY (commande_id) REFERENCES public.commande(commande_id);


--
-- PostgreSQL database dump complete
--

