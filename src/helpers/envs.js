import Joi from 'joi';

const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production').required(),
    HOST_DB_PRODUCTION: Joi.string().required(),
    USER_DB_PRODUCTION: Joi.string().required(),
    PASSWORD_DB_PRODUCTION: Joi.string().required(),
    DATABASE_DB_PRODUCTION: Joi.string().required(),
    PORT_DB_PRODUCTION: Joi.number().required(),
    HOST_DB_DEVELOPMENT: Joi.string().required(),
    USER_DB_DEVELOPMENT: Joi.string().required(),
    PASSWORD_DB_DEVELOPMENT: Joi.optional().allow(''),
    DATABASE_DB_DEVELOPMENT: Joi.string().required(),
    PORT_DB_DEVELOPMENT: Joi.number().required(),
    DIALECT_DB: Joi.string().required(),
    PERSISTENCE: Joi.string().valid('sequelize', 'mongo').required(),
    PORT: Joi.number().required(),
    CORS_ORIGIN: Joi.string().min(1),
    COOKIE_SECRET: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
}).unknown().required();

const { error, value: config } = envVarsSchema.validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

const envsVars = {
    env: config.NODE_ENV,
    port: config.PORT,
    persistence: config.PERSISTENCE,
    corsOrigin: config.NODE_ENV === 'production' ? config.CORS_ORIGIN.split(';') : "http://localhost:4200",
    cookieSecret: config.COOKIE_SECRET,
    jwtSecret: config.JWT_SECRET,
    db: {
        host: config.NODE_ENV === 'production' ? config.HOST_DB_PRODUCTION : config.HOST_DB_DEVELOPMENT,
        username: config.NODE_ENV === 'production' ? config.USER_DB_PRODUCTION : config.USER_DB_DEVELOPMENT,
        password: config.NODE_ENV === 'production' ? config.PASSWORD_DB_PRODUCTION : config.PASSWORD_DB_DEVELOPMENT,
        database: config.NODE_ENV === 'production' ? config.DATABASE_DB_PRODUCTION : config.DATABASE_DB_DEVELOPMENT,
        port: config.NODE_ENV === 'production' ? config.PORT_DB_PRODUCTION : config.PORT_DB_DEVELOPMENT,
        dialect: config.DIALECT_DB,
    },
};

export default envsVars;
