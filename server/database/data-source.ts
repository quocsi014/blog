import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOption: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'quocsi',
  database: process.env.DB_DBNAME || 'blog_nestjs',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  synchronize: false,
};
const dataSource = new DataSource(dataSourceOption);
export default dataSource;
