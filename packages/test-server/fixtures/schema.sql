DROP SCHEMA "api$test" CASCADE;

CREATE SCHEMA "api$test" AUTHORIZATION budgets;

-- DROP TYPE "api$test"."TransactionType";

CREATE TYPE "api$test"."TransactionType" AS ENUM (
	'EXPENSE',
	'INCOME');

-- DROP SEQUENCE "api$test"."Category_id_seq";

CREATE SEQUENCE "api$test"."Category_id_seq"
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE "api$test"."Category_id_seq" OWNER TO budgets;
GRANT ALL ON SEQUENCE "api$test"."Category_id_seq" TO budgets;

-- DROP SEQUENCE "api$test"."Transaction_id_seq";

CREATE SEQUENCE "api$test"."Transaction_id_seq"
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE "api$test"."Transaction_id_seq" OWNER TO budgets;
GRANT ALL ON SEQUENCE "api$test"."Transaction_id_seq" TO budgets;
-- "api$test"."Category" definition

-- Drop table

-- DROP TABLE "api$test"."Category";

CREATE TABLE "api$test"."Category" (
	id serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"transactionType" "api$test"."TransactionType" NOT NULL,
	"createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "Category_pkey" PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE "api$test"."Category" OWNER TO budgets;
GRANT ALL ON TABLE "api$test"."Category" TO budgets;


-- "api$test"."Transaction" definition

-- Drop table

-- DROP TABLE "api$test"."Transaction";

CREATE TABLE "api$test"."Transaction" (
	id serial NOT NULL,
	amount numeric(15,2) NOT NULL,
	"date" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	description varchar(511) NOT NULL,
	"transactionType" "api$test"."TransactionType" NOT NULL,
	"createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"categoryId" int4 NOT NULL,
	CONSTRAINT "Transaction_pkey" PRIMARY KEY (id),
	CONSTRAINT "Transaction_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "api$test"."Category"(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Permissions

ALTER TABLE "api$test"."Transaction" OWNER TO budgets;
GRANT ALL ON TABLE "api$test"."Transaction" TO budgets;




-- Permissions

GRANT ALL ON SCHEMA "api$test" TO budgets;
