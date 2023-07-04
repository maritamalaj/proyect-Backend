import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command() //Crea la instancia de comandos de commander.

program
    .option('-d <dao>', 'DAO Mode', 'MONGO')

program.parse()

dotenv.config();



export default {
    DAO_MODE: program.opts().d,
    MONGO_URI: process.env.MONGO_URI,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
    PORT: process.env.PORT,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    COOKIE_NAME: process.env.COOKIE_NAME,
    ENVIRONMENT: process.env.ENVIRONMENT
}