import {MigrationInterface, QueryRunner} from "typeorm";

export class categoryToType1650230565203 implements MigrationInterface {
    name = 'categoryToType1650230565203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        `ALTER TABLE 'mentions' RENAME COLUMN 'category' TO 'type'`
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       `ALTER TABLE 'mentions' RENAME COLUMN 'type' TO 'category'`
    }

}
