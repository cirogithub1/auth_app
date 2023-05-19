import mongoose from "mongoose"

const connectMongo = async () => {
	try {
		const { connection } = mongoose.connect( 
			process.env.MONGO_URL
		)

		if (connection.readyState === 1) {
			// 0 : disconnected, 1 : connected, 2 : connecting, 3 : disconecting 
			// console.log('database/conn.jsconnection.readyState =', connection.readyState)
			return Promise.resolve(true)
		}
	} catch (error) {
		return Promise.reject(error)
	}
}

export default connectMongo
