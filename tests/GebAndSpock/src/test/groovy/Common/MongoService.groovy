package Common

import com.mongodb.MongoCredential
import com.mongodb.MongoClient
import com.mongodb.DB
import com.mongodb.DBCollection
import com.mongodb.ServerAddress
import com.mongodb.BasicDBObject

class MongoService {
    private MongoClient mongoClient
    def host = "localhost"
    def port = 27017
    def databaseName = 'tssg-tech'
    def user = "root"
    def database = "admin"
    char[] password = "sch3dul3db"
    MongoCredential credential = MongoCredential.createCredential(user, database, password)

    public MongoClient client() {
        mongoClient = mongoClient ?: new MongoClient(
            new ServerAddress(host, port),
            Arrays.asList(credential)
        )

        return mongoClient
    }

    public DBCollection collection(collectionName) {
        DB db = client().getDB(databaseName)

        return db.getCollection(collectionName)
    }
}
