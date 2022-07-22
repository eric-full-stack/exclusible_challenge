import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAdminSettingsTable1600730157196
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'admin_settings',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'pair',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'spread',
            type: 'float',
          },
          {
            name: 'rate',
            type: 'float',
            isNullable: true,
            default: 0,
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('admin_settings');
  }
}
