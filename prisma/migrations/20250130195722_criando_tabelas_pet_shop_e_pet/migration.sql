-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "vaccinated" BOOLEAN NOT NULL DEFAULT false,
    "deadline_vaccination" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "petShopId" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "petShops" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,

    CONSTRAINT "petShops_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "petShops_cnpj_key" ON "petShops"("cnpj");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_petShopId_fkey" FOREIGN KEY ("petShopId") REFERENCES "petShops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
