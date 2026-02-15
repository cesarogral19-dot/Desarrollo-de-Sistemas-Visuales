/**
 * Configuración de conexión a MongoDB
 * Utiliza Mongoose para gestionar la conexión
 */

import mongoose from 'mongoose';

/**
 * Conecta a la base de datos MongoDB
 * @async
 * @returns {Promise<void>}
 */
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✓ MongoDB conectado: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`✗ Error en conexión a MongoDB: ${error.message}`);
    process.exit(1);
  }
};

/**
 * Desconecta de la base de datos MongoDB
 * @async
 * @returns {Promise<void>}
 */
export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('✓ MongoDB desconectado');
  } catch (error) {
    console.error(`✗ Error al desconectar: ${error.message}`);
    process.exit(1);
  }
};

export default { connectDB, disconnectDB };
