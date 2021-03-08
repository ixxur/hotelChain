drop table cazare;
drop table angajat;
drop table plata;
drop table rezervare;
drop table regim_cazare;
drop table client;
drop table camera;
drop table tip_camera;
drop table hotel;

--CREARE TABELE

create table HOTEL(
id_hotel number(4)       constraint pk_hotel primary key,
 nr_stele number(1)      default 1 constraint nr_stele_h_nn not null,
 tara varchar2(30)       constraint tara_h_nn not null,
 oras varchar2(30)       constraint oras_h_nn not null,
 strada varchar2(100)    constraint strada_h_nn not null,
 zip varchar2(6)         constraint zip_h_nn not null,
 nr_telefon varchar2(10) constraint nr_tel_h_nn not null,
 
 constraint nr_stele_h_ck check (1 <= nr_stele and nr_stele <= 5),
 constraint tara_h_ck check (tara NOT LIKE '%[^A-Z]%'),
 constraint oras_h_ck check (oras NOT LIKE '%[^A-Z]%'),
 constraint zip_h_ck check (zip NOT LIKE '%[^0-9]%'),
 constraint nr_tel_1ck check (nr_telefon NOT LIKE '%[^0-9]%'),
 constraint nr_tel_2ck check (length(nr_telefon)>9)
);


create table ANGAJAT(
 id_angajat number(10)    constraint pk_angajat primary key,
 id_hotel number(4),
 nume varchar2(50)        constraint nume_ang_nn  not null,
 prenume varchar2(50)     constraint pren_ang_nn not null,
 email varchar2(100)      constraint email_ang_u unique not null,
 nr_telefon varchar2(10)  constraint nrtel_ang_nn not null,
 salariu number(6,2)         constraint sal_ang_nn not null,
 data_angajare date       constraint d_ang_ang_nn not null,
 data_eliberare date,
 departament varchar2(20) constraint dep_ang_nn not null,
 
 constraint nume_ang_ck check (nume NOT LIKE '%[^A-Z]%'),
 constraint prenume_ang_ck check (prenume NOT LIKE '%[^A-Z]%'),
 constraint nr_tel_ang_1ck check (nr_telefon NOT LIKE '%[^0-9]%'),
 constraint nr_tel_ang_2ck check (length(nr_telefon)>9),
 constraint sal_ang_ck check (salariu > 0),
 constraint d_elib_ang_ck check (data_eliberare > data_angajare),
 constraint dep_ang_ck check (departament NOT LIKE '%[^A-Z]%')
);

alter table ANGAJAT
add constraint fk_angajat_hotel
foreign key (id_hotel) references HOTEL(id_hotel) ON DELETE CASCADE;


create table TIP_CAMERA
(id_tip number(1)            constraint pk_tip primary key,
 denumire_tip varchar2(30)   constraint denum_tip_u unique not null,
 nr_paturi number(1)         constraint nrpat_tip_nn not null,
 capacitate_maxima number(1) constraint cap_max_tip_nn not null,
 
 constraint denumire_tip_ck check (denumire_tip NOT LIKE '%[^A-Z]%'),
 constraint cap_max_tip_ck check (capacitate_maxima < 9)
);


create table CAMERA
(id_camera number(7) constraint pk_camera primary key,
 id_hotel number(4),
 id_tip number(1),
 nr_camera number(4) constraint nr_camera_nn not null,
 tarif number(4)     constraint tarif_camera_nn not null, 
 etaj number(2)      constraint etaj_camera_nn not null, 
 
 constraint tarif_cam_ck check (tarif > 0),
 constraint etaj_cam_ck check (etaj > 0)
);

alter table CAMERA
add constraint fk_camera_hotel
foreign key (id_hotel) references HOTEL(id_hotel) ON DELETE CASCADE;

alter table CAMERA
add constraint fk_camera_tip
foreign key (id_tip ) references TIP_CAMERA(id_tip) ON DELETE SET NULL;


create table CLIENT
(CNP varchar2(13)        constraint pk_client primary key,
 nume varchar2(50)       constraint nume_client_nn not null,
 prenume varchar2(50)    constraint pren_client_nn not null,
 email varchar2(50)      constraint email_client_u unique not null,
 nr_telefon varchar2(10) constraint nrtel_client_nn not null,
 
 constraint nume_client_ck check (nume NOT LIKE '%[^A-Z]%'),
 constraint prenume_client_ck check (prenume NOT LIKE '%[^A-Z]%'),
 constraint nr_tel_client_1ck check (nr_telefon NOT LIKE '%[^0-9]%'),
 constraint nr_tel_client_2ck check (length(nr_telefon)>9)
);



create table REGIM_CAZARE
(id_regim  number(1)     constraint pk_regim primary key,
 nume_regim varchar2(20) constraint num_regim_u unique not null,
 tarif_regim number(5,2)   constraint tarif_regim_nn not null, 
 
 constraint nume_regim_ck check (nume_regim NOT LIKE '%[^A-Z]%'),
 constraint tarif_reg_ck check (tarif_regim > 0)
);


create table REZERVARE
(id_rezervare number(15) constraint pk_rez primary key,
 CNP varchar2(13),
 id_regim number(1),
 data_checkin date       constraint d_in_rez_nn not null,
 data_checkout date      constraint d_out_rez_nn not null,
 nr_persoane number(3)   constraint nr_pers_rez_nn not null, 
 nr_camere number(3)     constraint nr_cam_rez_nn not null,
 total_plata number(6,2) default 1 constraint tot_plata_rez_nn not null,
 
 constraint d_checkout_rez_ck check (data_checkout > data_checkin),
 constraint nr_pers_rez_ck check (nr_persoane > 0),
 constraint nr_camere_rez_ck check (nr_camere > 0),
 constraint total_plata_rez_ck check (total_plata > 0)
);
 
alter table REZERVARE
add constraint fk_rez_client
foreign key (CNP) references "CLIENT"(CNP) ON DELETE CASCADE;

alter table REZERVARE
add constraint fk_rez_regim
foreign key (id_regim) references REGIM_CAZARE(id_regim) ON DELETE SET NULL;
 
 
create table CAZARE
(id_cazare number(20)      constraint pk_cazare primary key,
 id_camera number(4),
 id_rezervare number(15),
 tarif number(4)           default 1 constraint tarif_caz_nn not null,
 data_checkin date         constraint d_in_cazare_nn not null,
 data_checkout date        constraint d_out_cazare_nn not null,
 
 constraint tarif_cazare_ck check (tarif > 0),
 constraint d_checkout_cazare_ck check (data_checkout > data_checkin)
);

alter table CAZARE
add constraint fk_cazare_camera 
foreign key (id_camera) references CAMERA(id_camera) ON DELETE CASCADE;

alter table CAZARE
add constraint fk_cazare_rez
foreign key (id_rezervare) references REZERVARE(id_rezervare) ON DELETE CASCADE;


create table PLATA
(id_plata number(20)      constraint pk_plata primary key,
 id_rezervare number(15),
 nr_card varchar2(16)     constraint nrcard_plata_nn not null,
 cvv number(3)            constraint cvv_plata_nn not null,
 suma number(4,2)         default 1 constraint suma_plata_nn not null,
 
 constraint nr_card_plata_ck check (nr_card NOT LIKE '%[^0-9]%'),
 constraint nr_card_plata_2ck check (length (nr_card) > 15),
 constraint cvv_plata_ck check (length(cvv)>2),
 constraint suma_plata_ck check (suma > 0)
);

alter table PLATA
add constraint fk_plata_rez
foreign key (id_rezervare) references REZERVARE (id_rezervare) ON DELETE SET NULL;


-- INSERARE DATE

--HOTEL
insert into HOTEL
values (1, 4, 'Romania', 'Iasi', 'Bd-ul Copou nr. 204', '600839', '0738938909');

insert into HOTEL
values (2, 5, 'Romania', 'Bucuresti', 'Bd-ul Victoriei nr. 100', '100172', '0792621281');

insert into HOTEL
values (3, 3, 'Romania', 'Cluj-Napoca', 'Bd-ul Eroilor nr.56A', '568329', '0723893572');

COMMIT;

--ANGAJAT
insert into ANGAJAT (id_angajat, id_hotel, nume, prenume, email, nr_telefon, salariu, data_angajare, data_eliberare, departament)
values (1,1,'Todd', 'John', 'john_todd@hotel.com', '0728393583', 2000, TO_DATE('08-08-2017','dd-mm-yyyy'), null, 'Manager');

insert into ANGAJAT (id_angajat, id_hotel, nume, prenume, email, nr_telefon, salariu, data_angajare, data_eliberare, departament)
values (2, 1,'Porter', 'Jerald', 'porter.gerald@gmail.com', '0757826538', 1200, TO_DATE('14-01-2019','dd-mm-yyyy'), null, 'Bucatarie');

insert into ANGAJAT (id_angajat, id_hotel, nume, prenume, email, nr_telefon, salariu, data_angajare, data_eliberare, departament)
values (3,1,'Robinson','Matt', 'matt1robb@gmail.com','0762836472',750,TO_DATE('27-05-2016','dd-mm-yyyy'),TO_DATE('07-08-2017','dd-mm-yyyy'), 'Manager');

insert into ANGAJAT (id_angajat, id_hotel, nume, prenume, email, nr_telefon, salariu, data_angajare, data_eliberare, departament)
values (4,1, 'Bryan', 'Elvira', 'elvyy99@gmail.com','0789257826',500,TO_DATE('01-11-2016','dd-mm-yyyy'),null,'Curatenie');

insert into ANGAJAT (id_angajat, id_hotel, nume, prenume, email, nr_telefon, salariu, data_angajare, data_eliberare, departament)
values (5,1,'Gonzalez', 'Brett','gonzalez1010@gmail.com','0786926389',1099,TO_DATE('17-05-2019','dd-mm-yyyy'),null,'Bucatarie');

insert into ANGAJAT (id_angajat, id_hotel, nume, prenume, email, nr_telefon, salariu, data_angajare, data_eliberare, departament)
values (6, 2, 'Ramirez', 'April', 'april_ramirez@gmail.com','0782978967',2300,TO_DATE('22-02-2020','dd-mm-yyyy'),null,'Manager' );

insert into ANGAJAT (id_angajat, id_hotel, nume, prenume, email, nr_telefon, salariu, data_angajare, data_eliberare, departament)
values (7,2,'Stone','Jeremy','stoned_jer@gmail.com','0789124567',690,TO_DATE('01-06-2018','dd-mm-yyyy'),TO_DATE('01-09-2018','dd-mm-yyyy'),'Curatenie');

insert into ANGAJAT (id_angajat, id_hotel, nume, prenume, email, nr_telefon, salariu, data_angajare, data_eliberare, departament)
values (8,2,'Lambert','Blanca','blancutza@gmail.com','0726783527',800,TO_DATE('20-12-2020','dd-mm-yyyy'),null,'Spa');

insert into ANGAJAT (id_angajat, id_hotel, nume, prenume, email, nr_telefon, salariu, data_angajare, data_eliberare, departament)
values (9,2,'Kennedy','Lila','kennedyll@gmail.com','0789344325',1600,TO_DATE('02-12-2017','dd-mm-yyyy'),TO_DATE('21-02-2020','dd-mm-yyyy'),'Manager');

insert into ANGAJAT (id_angajat, id_hotel, nume, prenume, email, nr_telefon, salariu, data_angajare, data_eliberare, departament)
values (10,2,'Torres','Rudy','rudyytorres@gmail.com','0712345678',740,TO_DATE('14-12-2018','dd-mm-yyyy'),null,'Entertainment');

insert into ANGAJAT (id_angajat, id_hotel, nume, prenume, email, nr_telefon, salariu, data_angajare, data_eliberare, departament)
values (11,3,'Suuton','Alton','alton.sutt@gmail.com','0728935267',960,TO_DATE('16-04-2019','dd-mm-yyyy'),null,'Spa');

insert into ANGAJAT (id_angajat, id_hotel, nume, prenume, email, nr_telefon, salariu, data_angajare, data_eliberare, departament)
values (12,3,'Warner','Nancy','nancywarner@gmail.com','0712712811',500,TO_DATE('29-09-2016','dd-mm-yyyy'),TO_DATE('31-01-2018','dd-mm-yyyy'),'Bucatarie');

insert into ANGAJAT (id_angajat, id_hotel, nume, prenume, email, nr_telefon, salariu, data_angajare, data_eliberare, departament)
values (13,3,'Reese','Michael','michaelr@gmail.com','0709943667',430,TO_DATE('15-08-2019','dd-mm-yyyy'),null,'Curatenie');

insert into ANGAJAT (id_angajat, id_hotel, nume, prenume, email, nr_telefon, salariu, data_angajare, data_eliberare, departament)
values (14,3,'Burton','Damon','damonthevampire@gmail.com','0766666666',999,TO_DATE('20-02-2020','dd-mm-yyyy'),null,'Manager');

insert into ANGAJAT (id_angajat, id_hotel, nume, prenume, email, nr_telefon, salariu, data_angajare, data_eliberare, departament)
values (15,3,'Anderson', 'Lucas','lucas_anderson@gmail.com','0783527352',580,TO_DATE('24-11-2016','dd-mm-yyyy'),TO_DATE('12-05-2019','dd-mm-yyyy'),'Spa');

COMMIT;

--TIP_CAMERA
insert into TIP_CAMERA (id_tip, denumire_tip, nr_paturi,capacitate_maxima)
values (1, 'single', 1,1);

insert into TIP_CAMERA (id_tip, denumire_tip, nr_paturi,capacitate_maxima)
values (2, 'twin', 2,2);

insert into TIP_CAMERA (id_tip, denumire_tip, nr_paturi,capacitate_maxima)
values (3, 'dubla standard', 1,2);

insert into TIP_CAMERA (id_tip, denumire_tip, nr_paturi,capacitate_maxima)
values (4, 'dubla premium', 1,2);

insert into TIP_CAMERA (id_tip, denumire_tip, nr_paturi,capacitate_maxima)
values (5, 'tripla1', 2,3);

insert into TIP_CAMERA (id_tip, denumire_tip, nr_paturi,capacitate_maxima)
values (6, 'tripla2', 3,3);

insert into TIP_CAMERA (id_tip, denumire_tip, nr_paturi,capacitate_maxima)
values (7, 'apartament', 5,8);

COMMIT;

--CAMERA
insert into CAMERA (id_camera, id_hotel,id_tip,nr_camera,tarif,etaj)
values (1,1,1,12,50,1);

insert into CAMERA (id_camera, id_hotel,id_tip,nr_camera,tarif,etaj)
values(2,1,2,13,80,1);

insert into CAMERA (id_camera, id_hotel,id_tip,nr_camera,tarif,etaj)
values(3,1,3,21,100,2);

insert into CAMERA (id_camera, id_hotel,id_tip,nr_camera,tarif,etaj)
values(4,1,3,22,100,2);

insert into CAMERA (id_camera, id_hotel,id_tip,nr_camera,tarif,etaj)
values(5,1,5,31,140,3);

insert into CAMERA (id_camera, id_hotel,id_tip,nr_camera,tarif,etaj)
values(6,2,3,11,150,1);

insert into CAMERA (id_camera, id_hotel,id_tip,nr_camera,tarif,etaj)
values (7,2,3,12,150,1);

insert into CAMERA (id_camera, id_hotel,id_tip,nr_camera,tarif,etaj)
values (8,2,4,21,170,2);

insert into CAMERA (id_camera, id_hotel,id_tip,nr_camera,tarif,etaj)
values (9,2,4,22,170,2);

insert into CAMERA (id_camera, id_hotel,id_tip,nr_camera,tarif,etaj)
values (10,2,7,31,300,3);

insert into CAMERA (id_camera, id_hotel,id_tip,nr_camera,tarif,etaj)
values (11,3,2,11,75,1);

insert into CAMERA (id_camera, id_hotel,id_tip,nr_camera,tarif,etaj)
values (12,3,3,12,90,1);

insert into CAMERA (id_camera, id_hotel,id_tip,nr_camera,tarif,etaj)
values (13,3,3,21,90,2);

insert into CAMERA (id_camera, id_hotel,id_tip,nr_camera,tarif,etaj)
values (14,3,5,22,110,2);

insert into CAMERA (id_camera, id_hotel,id_tip,nr_camera,tarif,etaj)
values (15,3,7,33,170,3);

COMMIT;

--CLIENT
insert into "CLIENT" (CNP,nume,prenume,email,nr_telefon)
values ('5000273842688','Murphy','Carlos','carlos.murphy@gmail.com','0782536278');

insert into "CLIENT" (CNP,nume,prenume,email,nr_telefon)
values ('6000276382913','May','Joanne','jojomay@gmail.com','0725367836');

insert into "CLIENT" (CNP,nume,prenume,email,nr_telefon)
values ('5000253678293','Robbins','Bennie','bennie_robb2gmail.com','0782536789');

insert into "CLIENT" (CNP,nume,prenume,email,nr_telefon)
values ('6000625378923','Gonzalez','Irene','irenegoz@gmail.com','0789898989');

insert into "CLIENT" (CNP,nume,prenume,email,nr_telefon)
values ('6000675849900','Lyons','Daisy','daisyyy@gmail.com','0753627890');

insert into "CLIENT" (CNP,nume,prenume,email,nr_telefon)
values ('5000637489362','Price','Joe','price.joe123@gmail.com','0742532142');

COMMIT;

--REGIM_CAZARE
insert into REGIM_CAZARE (id_regim,nume_regim,tarif_regim)
values (1,'fara mese incluse',0.1);

insert into REGIM_CAZARE (id_regim,nume_regim,tarif_regim)
values (2,'mic_dejun inclus',7);

insert into REGIM_CAZARE (id_regim,nume_regim,tarif_regim)
values  (3,'demipensiune', 18);

insert into REGIM_CAZARE (id_regim,nume_regim,tarif_regim)
values (4,'all inclusive',30);

COMMIT;

--REZERVARE
insert into REZERVARE (id_rezervare,CNP,id_regim,data_checkin,data_checkout,nr_persoane,nr_camere,total_plata)
values (28396473992,'5000637489362','4',TO_DATE('30-12-2019','dd-mm-yyyy'),TO_DATE('02-01-2020','dd-mm-yyyy'),4,2,default);

insert into REZERVARE (id_rezervare,CNP,id_regim,data_checkin,data_checkout,nr_persoane,nr_camere,total_plata)
values (22487347923,'6000276382913',2,TO_DATE('13-08-2019','dd-mm-yyyy'),TO_DATE('16-08-2019','dd-mm-yyyy'),1,1,default);

insert into REZERVARE (id_rezervare,CNP,id_regim,data_checkin,data_checkout,nr_persoane,nr_camere,total_plata)
values (98274892029,'5000273842688',3,TO_DATE('25-11-2018','dd-mm-yyyy'),TO_DATE('27-11-2018','dd-mm-yyyy'),3,2,default);

insert into REZERVARE (id_rezervare,CNP,id_regim,data_checkin,data_checkout,nr_persoane,nr_camere,total_plata)
values (87344629384,'5000253678293',4,TO_DATE('01-03-2020','dd-mm-yyyy'),TO_DATE('04-03-2020','dd-mm-yyyy'),8,1,default);

insert into REZERVARE (id_rezervare,CNP,id_regim,data_checkin,data_checkout,nr_persoane,nr_camere,total_plata)
values (62368439290,'6000625378923',1,TO_DATE('10-09-2019','dd-mm-yyyy'),TO_DATE('17-09-2019','dd-mm-yyyy'),6,3,default);

insert into REZERVARE (id_rezervare,CNP,id_regim,data_checkin,data_checkout,nr_persoane,nr_camere,total_plata)
values (18245754820,'6000675849900',4,TO_DATE('23-04-2018','dd-mm-yyyy'),TO_DATE('26-04-2018','dd-mm-yyyy'),5,1,default);

COMMIT;


--CAZARE
insert into CAZARE (id_cazare, id_camera, id_rezervare, tarif, data_checkin, data_checkout)
values (123345656,3,28396473992,default,TO_DATE('30-12-2019','dd-mm-yyyy'),TO_DATE('02-01-2020','dd-mm-yyyy'));

insert into CAZARE (id_cazare, id_camera, id_rezervare, tarif, data_checkin, data_checkout)
values (123345657,4,28396473992,default,TO_DATE('30-12-2019','dd-mm-yyyy'),TO_DATE('02-01-2020','dd-mm-yyyy'));

insert into CAZARE (id_cazare, id_camera, id_rezervare, tarif, data_checkin, data_checkout)
values (239884830,1,22487347923,default,TO_DATE('13-08-2019','dd-mm-yyyy'),TO_DATE('16-08-2019','dd-mm-yyyy'));

insert into CAZARE (id_cazare, id_camera, id_rezervare, tarif, data_checkin, data_checkout)
values (923478902,11,98274892029,default,TO_DATE('25-11-2018','dd-mm-yyyy'),TO_DATE('27-11-2018','dd-mm-yyyy'));

insert into CAZARE (id_cazare, id_camera, id_rezervare, tarif, data_checkin, data_checkout)
values (923478903,12,98274892029,default,TO_DATE('25-11-2018','dd-mm-yyyy'),TO_DATE('27-11-2018','dd-mm-yyyy'));

insert into CAZARE (id_cazare, id_camera, id_rezervare, tarif, data_checkin, data_checkout)
values (342928340,10,87344629384,default,TO_DATE('01-03-2020','dd-mm-yyyy'),TO_DATE('04-03-2020','dd-mm-yyyy'));

insert into CAZARE (id_cazare, id_camera, id_rezervare, tarif, data_checkin, data_checkout)
values (899126329,8,62368439290,default,TO_DATE('10-09-2019','dd-mm-yyyy'),TO_DATE('17-09-2019','dd-mm-yyyy'));

insert into CAZARE (id_cazare, id_camera, id_rezervare, tarif, data_checkin, data_checkout)
values (899126330,9,62368439290,default,TO_DATE('10-09-2019','dd-mm-yyyy'),TO_DATE('17-09-2019','dd-mm-yyyy'));

insert into CAZARE (id_cazare, id_camera, id_rezervare, tarif, data_checkin, data_checkout)
values (899126331,7,62368439290,default,TO_DATE('10-09-2019','dd-mm-yyyy'),TO_DATE('17-09-2019','dd-mm-yyyy'));

insert into CAZARE (id_cazare, id_camera, id_rezervare, tarif, data_checkin, data_checkout)
values (398713013,15,18245754820,default,TO_DATE('23-04-2018','dd-mm-yyyy'),TO_DATE('26-04-2018','dd-mm-yyyy'));

COMMIT;

--PLATA
insert into PLATA (id_plata,id_rezervare,nr_card,cvv,suma)
values(907134481,28396473992,'1234567890123456',789,default);

insert into PLATA (id_plata,id_rezervare,nr_card,cvv,suma)
values(907134482,28396473992,'1234567890123456',789,default);

insert into PLATA (id_plata,id_rezervare,nr_card,cvv,suma)
values(923486647,22487347923,'8761290825367825',123,default);

insert into PLATA (id_plata,id_rezervare,nr_card,cvv,suma)
values(923486648,22487347923,'8761290825367825',123,default);

insert into PLATA (id_plata,id_rezervare,nr_card,cvv,suma)
values(873476793,98274892029,'9134553472340240',835,default);

insert into PLATA (id_plata,id_rezervare,nr_card,cvv,suma)
values(873476794,98274892029,'9134553472340240',835,default);

insert into PLATA (id_plata,id_rezervare,nr_card,cvv,suma)
values(125473205,87344629384,'6352783528394621',628,default);

insert into PLATA (id_plata,id_rezervare,nr_card,cvv,suma)
values(125473206,87344629384,'6352783528394621',628,default);

insert into PLATA (id_plata,id_rezervare,nr_card,cvv,suma)
values(135643022,62368439290,'1283673376234748',925,default);

insert into PLATA (id_plata,id_rezervare,nr_card,cvv,suma)
values(135643023,62368439290,'1283673376234748',925,default);

insert into PLATA (id_plata,id_rezervare,nr_card,cvv,suma)
values(478239234,18245754820,'7345734013654720',245,default);

insert into PLATA (id_plata,id_rezervare,nr_card,cvv,suma)
values(478239235,18245754820,'7345734013654720',245,default);

COMMIT;

--Adaugare tarif in CAZARE 
update CAZARE
set tarif = (select tarif
             from CAMERA
             where CAMERA.id_camera = CAZARE.id_camera);

--Calcularea total_plata din REZERVARE
update REZERVARE
set total_plata = (select sum(REGIM_CAZARE.tarif_regim*REZERVARE.nr_camere)
                   from REGIM_CAZARE
                   where REGIM_CAZARE.id_regim = REZERVARE.id_regim);

update REZERVARE
set total_plata = (total_plata + (select sum(CAZARE.tarif)
                                 from CAZARE
                                 where CAZARE.id_rezervare = REZERVARE.id_rezervare))


"
declare val number(2);
begin
     select (to_date (data_checkout,'dd-MM-yyyy') - to_date(data_checkin,'dd-MM-yyyy')) into val 
from REZERVARE;
end; 
"

--Calcularea sumei din PLATA
update PLATA
set suma = (select REZERVARE.total_plata*0.5
            from REZERVARE
            where PLATA.id_rezervare = REZERVARE.id_rezervare);
