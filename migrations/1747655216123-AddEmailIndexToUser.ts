import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEmailIndexToUser1747655216123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "IDX_user_email" ON "user" ("email")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP INDEX "IDX_user_email"`);
  }
}
