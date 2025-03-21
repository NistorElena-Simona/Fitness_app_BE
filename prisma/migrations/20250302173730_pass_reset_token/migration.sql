-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resetPasswordExpires" TIMESTAMP(3),
ADD COLUMN     "resetPasswordToken" TEXT,
ALTER COLUMN "roles" SET DEFAULT ARRAY['EMPLOYEE']::"Role"[];
