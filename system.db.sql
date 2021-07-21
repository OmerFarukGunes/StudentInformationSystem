BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
	"MigrationId"	TEXT NOT NULL,
	"ProductVersion"	TEXT NOT NULL,
	CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY("MigrationId")
);
CREATE TABLE IF NOT EXISTS "AspNetRoles" (
	"Id"	INTEGER NOT NULL,
	"Name"	TEXT,
	"NormalizedName"	TEXT,
	"ConcurrencyStamp"	TEXT,
	CONSTRAINT "PK_AspNetRoles" PRIMARY KEY("Id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "AspNetUsers" (
	"Id"	INTEGER NOT NULL,
	"Password"	TEXT,
	"UserName"	TEXT,
	"NormalizedUserName"	TEXT,
	"Email"	TEXT,
	"NormalizedEmail"	TEXT,
	"EmailConfirmed"	INTEGER NOT NULL,
	"PasswordHash"	TEXT,
	"SecurityStamp"	TEXT,
	"ConcurrencyStamp"	TEXT,
	"PhoneNumber"	TEXT,
	"PhoneNumberConfirmed"	INTEGER NOT NULL,
	"TwoFactorEnabled"	INTEGER NOT NULL,
	"LockoutEnd"	TEXT,
	"LockoutEnabled"	INTEGER NOT NULL,
	"AccessFailedCount"	INTEGER NOT NULL,
	"Role"	TEXT,
	CONSTRAINT "PK_AspNetUsers" PRIMARY KEY("Id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Payments" (
	"PaymentId"	INTEGER NOT NULL,
	"Loan"	INTEGER NOT NULL,
	"Installment"	INTEGER NOT NULL,
	"Discount"	INTEGER NOT NULL,
	"Paid"	INTEGER NOT NULL,
	"StartMonth"	INTEGER NOT NULL,
	"StartYear"	INTEGER NOT NULL,
	CONSTRAINT "PK_Payments" PRIMARY KEY("PaymentId" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "AspNetRoleClaims" (
	"Id"	INTEGER NOT NULL,
	"RoleId"	INTEGER NOT NULL,
	"ClaimType"	TEXT,
	"ClaimValue"	TEXT,
	CONSTRAINT "PK_AspNetRoleClaims" PRIMARY KEY("Id" AUTOINCREMENT),
	CONSTRAINT "FK_AspNetRoleClaims_AspNetRoles_RoleId" FOREIGN KEY("RoleId") REFERENCES "AspNetRoles"("Id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "AspNetUserClaims" (
	"Id"	INTEGER NOT NULL,
	"UserId"	INTEGER NOT NULL,
	"ClaimType"	TEXT,
	"ClaimValue"	TEXT,
	CONSTRAINT "PK_AspNetUserClaims" PRIMARY KEY("Id" AUTOINCREMENT),
	CONSTRAINT "FK_AspNetUserClaims_AspNetUsers_UserId" FOREIGN KEY("UserId") REFERENCES "AspNetUsers"("Id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "AspNetUserLogins" (
	"LoginProvider"	TEXT NOT NULL,
	"ProviderKey"	TEXT NOT NULL,
	"ProviderDisplayName"	TEXT,
	"UserId"	INTEGER NOT NULL,
	CONSTRAINT "PK_AspNetUserLogins" PRIMARY KEY("LoginProvider","ProviderKey"),
	CONSTRAINT "FK_AspNetUserLogins_AspNetUsers_UserId" FOREIGN KEY("UserId") REFERENCES "AspNetUsers"("Id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "AspNetUserRoles" (
	"UserId"	INTEGER NOT NULL,
	"RoleId"	INTEGER NOT NULL,
	CONSTRAINT "PK_AspNetUserRoles" PRIMARY KEY("UserId","RoleId"),
	CONSTRAINT "FK_AspNetUserRoles_AspNetRoles_RoleId" FOREIGN KEY("RoleId") REFERENCES "AspNetRoles"("Id") ON DELETE CASCADE,
	CONSTRAINT "FK_AspNetUserRoles_AspNetUsers_UserId" FOREIGN KEY("UserId") REFERENCES "AspNetUsers"("Id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "AspNetUserTokens" (
	"UserId"	INTEGER NOT NULL,
	"LoginProvider"	TEXT NOT NULL,
	"Name"	TEXT NOT NULL,
	"Value"	TEXT,
	CONSTRAINT "PK_AspNetUserTokens" PRIMARY KEY("UserId","LoginProvider","Name"),
	CONSTRAINT "FK_AspNetUserTokens_AspNetUsers_UserId" FOREIGN KEY("UserId") REFERENCES "AspNetUsers"("Id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "SchoolInfos" (
	"SchoolInfoId"	INTEGER NOT NULL,
	"StudentId"	INTEGER NOT NULL,
	"SchoolName"	TEXT NOT NULL,
	"Class"	INTEGER NOT NULL,
	"DateOfRegistration"	TEXT NOT NULL,
	"SchoolNumber"	TEXT NOT NULL,
	"Branch"	TEXT NOT NULL,
	PRIMARY KEY("SchoolInfoId" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Students" (
	"StudentId"	INTEGER NOT NULL,
	"Address"	TEXT,
	"City"	TEXT,
	"Gender"	TEXT,
	"LoginId"	INTEGER NOT NULL,
	"StudentName"	TEXT,
	"StudentSurname"	TEXT,
	"TC"	INTEGER NOT NULL,
	CONSTRAINT "PK_Students" PRIMARY KEY("StudentId" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Parents" (
	"ParentId"	INTEGER NOT NULL,
	"FatherName"	TEXT,
	"FatherNumber"	INTEGER NOT NULL,
	"FatherTC"	INTEGER NOT NULL,
	"LoginId"	INTEGER NOT NULL,
	"MotherName"	TEXT,
	"MotherNumber"	INTEGER NOT NULL,
	"MotherTC"	INTEGER NOT NULL,
	CONSTRAINT "PK_Parents" PRIMARY KEY("ParentId" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Connections" (
	"ConnectionId"	INTEGER NOT NULL,
	"ParentId"	INTEGER NOT NULL,
	"PaymentId"	INTEGER,
	"StudentId"	INTEGER NOT NULL,
	CONSTRAINT "PK_Connections" PRIMARY KEY("ConnectionId" AUTOINCREMENT)
);
INSERT INTO "__EFMigrationsHistory" VALUES ('20210621092559_createDb','5.0.7');
INSERT INTO "__EFMigrationsHistory" VALUES ('20210622111804_roleColumn','5.0.7');
INSERT INTO "__EFMigrationsHistory" VALUES ('20210622114408_deletecolumn','5.0.7');
INSERT INTO "__EFMigrationsHistory" VALUES ('20210622115437_changing','5.0.7');
INSERT INTO "__EFMigrationsHistory" VALUES ('20210622120205_update','5.0.7');
INSERT INTO "AspNetUsers" VALUES (28,NULL,'denemee@denemeee.com','DENEMEE@DENEMEEE.COM','denemee@denemeee.com','DENEMEE@DENEMEEE.COM',0,'AQAAAAEAACcQAAAAEKpMwg+AwCUP/Bz96jfgJHiiuPLZ9Cm5mvRpwgY+ubBz27qNP2Ig5Koa4kDh20lTLA==','IK6ZNXKXZRGGIL6WE5II23SYD4HIXXHT','1a4e4d45-afe0-4e51-bf2b-9b4a4677eff0',NULL,0,0,NULL,1,0,'Student');
INSERT INTO "AspNetUsers" VALUES (29,NULL,'sdlkaf@ksald.com','SDLKAF@KSALD.COM','sdlkaf@ksald.com','SDLKAF@KSALD.COM',0,'AQAAAAEAACcQAAAAECg7pTB4of1mju0jCdfsQLJw5ysc0+F15K+5H420iwV5dls9NkZnj6gjLxGtmERXFg==','ZR2PDIDGQP4FOW2RIZJGLGWSWGCRRDYA','b7ac956b-f7e4-459b-8cc4-5aeaeb057530',NULL,0,0,NULL,1,0,'Parent');
INSERT INTO "AspNetUsers" VALUES (30,NULL,'denemeeas@denemeee.com','DENEMEEAS@DENEMEEE.COM','denemeeas@denemeee.com','DENEMEEAS@DENEMEEE.COM',0,'AQAAAAEAACcQAAAAEG8JYIoEfFifYz4dV4D3C8qSEonJssOs7XAElEAcjBfHlY36iDvwXItHLhMto6zn1A==','2DHURNQ6HJTCZKOBOCVPNGCVEUANPWYV','285c81b8-8582-44d0-a592-7e17c7c3cf89',NULL,0,0,NULL,1,0,'Student');
INSERT INTO "AspNetUsers" VALUES (31,NULL,'sdlkafas@ksald.com','SDLKAFAS@KSALD.COM','sdlkafas@ksald.com','SDLKAFAS@KSALD.COM',0,'AQAAAAEAACcQAAAAECHlxEWCmfawiizVmkuscDm1q4wzq2x/4RPj6635glGtWbUQv0U5q31IoiuMLvUxQg==','QMOAVJF4JT6IJ2CE3RM3PO65GXPKB5TQ','67e55124-6339-4790-bfa9-77dbbf15f590',NULL,0,0,NULL,1,0,'Parent');
INSERT INTO "AspNetUsers" VALUES (32,NULL,'denemeeas@denasdemeee.com','DENEMEEAS@DENASDEMEEE.COM','denemeeas@denasdemeee.com','DENEMEEAS@DENASDEMEEE.COM',0,'AQAAAAEAACcQAAAAEB5kGcAz2sH/9hztH+DFdLOQYadp3UgTZuTTIgcpe+IXigxMXpZqZp9PjTgk7iLG+w==','EGPCADFSWYI452RHOY3GQ75DTT5PUSCP','9d11dc98-01d1-4ded-a536-9f25e302fc11',NULL,0,0,NULL,1,0,'Student');
INSERT INTO "AspNetUsers" VALUES (33,NULL,'sdlkafas@ksalasd.com','SDLKAFAS@KSALASD.COM','sdlkafas@ksalasd.com','SDLKAFAS@KSALASD.COM',0,'AQAAAAEAACcQAAAAEEXHXH76qnaTgzxMBOLYpmrAg3HMvZF2mZnznfdfAkY3j2hwNyDCZlcbPTOuWQmgsw==','JN4CN5C6EYT5LBZFHLFQLS55LPWMOP2A','c39d6e21-51c4-42b0-a76f-e18dc2253275',NULL,0,0,NULL,1,0,'Parent');
INSERT INTO "AspNetUsers" VALUES (34,NULL,'adfs@adg.com','ADFS@ADG.COM','adfs@adg.com','ADFS@ADG.COM',0,'AQAAAAEAACcQAAAAEE8wPdvU4ExSGr99UFR0Xo2SiupHLUEBMC3d7SrCd5yrxr0+vqwNVe0DSAeJsERI4A==','ZNPIJ5MV7QVZEVWBDMY3KLO6LGBNXSDP','2c9208c2-7cfa-4750-93d4-0d25fd36cae2',NULL,0,0,NULL,1,0,'Student');
INSERT INTO "AspNetUsers" VALUES (35,NULL,'afiasdlf@gadsf.com','AFIASDLF@GADSF.COM','afiasdlf@gadsf.com','AFIASDLF@GADSF.COM',0,'AQAAAAEAACcQAAAAEMw/dvlsgdLXb0iftjNxIpsUUcROgw5NiIUDjao7fK4H2UEfWy+Jn6h7RiNoROetUA==','WOHLUOBFRNYVH7B5AAF2R5VZQ53S2HGK','e0244c12-a3ac-4ac0-b7a4-769635d0149e',NULL,0,0,NULL,1,0,'Parent');
INSERT INTO "AspNetUsers" VALUES (36,NULL,'adfsasdf@adg.com','ADFSASDF@ADG.COM','adfsasdf@adg.com','ADFSASDF@ADG.COM',0,'AQAAAAEAACcQAAAAEErZ5M12vJQFK1e1fPYT0wTBBKkE4b3RTJGm8OLoKw6vL2e/jXL0MOFEgNYqN5S8aQ==','UYCGGARXSNQQJSSY5BJNNQS5BCIRNRXH','7fb2a7a9-e32f-4d58-9b44-59b58143bc81',NULL,0,0,NULL,1,0,'Student');
INSERT INTO "AspNetUsers" VALUES (37,NULL,'afiasdlsadf@gadsf.com','AFIASDLSADF@GADSF.COM','afiasdlsadf@gadsf.com','AFIASDLSADF@GADSF.COM',0,'AQAAAAEAACcQAAAAEEO+g3nfxngXIqCQyoyI0fG6MS3APZafHMa6++wwxbQAuwZj5qufTEVqCJ6FkBZlDg==','U3PREIRHLOBXPZN7HQVZQB7DMS5QPFHI','adba265a-7f0e-4c3d-aa14-ca6384d3dfae',NULL,0,0,NULL,1,0,'Parent');
INSERT INTO "Students" VALUES (1,'asdflsdfsa','deneme','erkek',28,'buson','deneme',10191911811);
INSERT INTO "Students" VALUES (2,'asdflsdfsa','deneme','erkek',30,'buson','deneme',10191911811);
INSERT INTO "Students" VALUES (3,'asdflsdfsa','deneme','erkek',32,'buson','deneme',10191911811);
INSERT INTO "Students" VALUES (4,'Mardin123sadf','Mardin','Erkek',34,'asdf','denemesdaf',12345632112);
INSERT INTO "Students" VALUES (5,'Mardin123sadf','Mardin','Erkek',36,'asdf','denemesdaf',12345632112);
INSERT INTO "Parents" VALUES (1,'sdfa',1111111111,11111111111,29,'ajsfdjfdsa',1211123111,11191822921);
INSERT INTO "Parents" VALUES (2,'sdfa',1111111111,11111111111,31,'ajsfdjfdsa',1211123111,11191822921);
INSERT INTO "Parents" VALUES (3,'sdfa',1111111111,11111111111,33,'ajsfdjfdsa',1211123111,11191822921);
INSERT INTO "Parents" VALUES (4,'faruk',1231231211,12313414121,35,'adsf',1231231231,24121214121);
INSERT INTO "Parents" VALUES (5,'faruk',1231231211,12313414121,37,'adsf',1231231231,24121214121);
INSERT INTO "Connections" VALUES (2,1,1,2);
INSERT INTO "Connections" VALUES (3,0,0,0);
INSERT INTO "Connections" VALUES (4,0,0,0);
INSERT INTO "Connections" VALUES (5,0,0,0);
INSERT INTO "Connections" VALUES (6,0,0,0);
INSERT INTO "Connections" VALUES (7,5,0,5);
CREATE INDEX IF NOT EXISTS "IX_AspNetRoleClaims_RoleId" ON "AspNetRoleClaims" (
	"RoleId"
);
CREATE UNIQUE INDEX IF NOT EXISTS "RoleNameIndex" ON "AspNetRoles" (
	"NormalizedName"
);
CREATE INDEX IF NOT EXISTS "IX_AspNetUserClaims_UserId" ON "AspNetUserClaims" (
	"UserId"
);
CREATE INDEX IF NOT EXISTS "IX_AspNetUserLogins_UserId" ON "AspNetUserLogins" (
	"UserId"
);
CREATE INDEX IF NOT EXISTS "IX_AspNetUserRoles_RoleId" ON "AspNetUserRoles" (
	"RoleId"
);
CREATE INDEX IF NOT EXISTS "EmailIndex" ON "AspNetUsers" (
	"NormalizedEmail"
);
CREATE UNIQUE INDEX IF NOT EXISTS "UserNameIndex" ON "AspNetUsers" (
	"NormalizedUserName"
);
COMMIT;
