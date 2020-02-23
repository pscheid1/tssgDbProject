package Common

import com.mongodb.MongoCredential
import com.mongodb.MongoClient
import com.mongodb.DB
import com.mongodb.DBCollection
import com.mongodb.ServerAddress
import com.mongodb.BasicDBObject

/**
 * Models a local Mongo database by establishing connectivity and manipulating collections.
 */
class MongoService {
    /** Holds the MongoClient object */
    private MongoClient mongoClient
    /** Hostname or IP address of the mongo database service; default is localhost */
    def host = "localhost"
    /** Port that the mongo database is listening on; default is 27017 */
    def port = 27017
    /** Name of the database to connect to; default is tssg-tech */
    def databaseName = 'tssg-tech'
    /** Name of the administrative user; default is root */
    def user = "root"
    /** Name of the administrative database; default is admin */
    def database = "admin"
    /** The password for connecting to the Mongo database */
    char[] password = "sch3dul3db"
    /** Credential object for accessing the Mongo database */
    MongoCredential credential = MongoCredential.createCredential(user, database, password)

    /**
     * A client to connect and manipulate the mongo database.
     *
     * @return mongoClient A client object for manipulating the mongo database.
     */
    public MongoClient client() {
        mongoClient = mongoClient ?: new MongoClient(
            new ServerAddress(host, port),
            Arrays.asList(credential)
        )

        return mongoClient
    }

    /**
     * Gets a collection object
     *
     * @param collectionName Name of the collection to retrieve.
     * @return a DBCollection of the collection that was specified.
     */
    public DBCollection collection(collectionName) {
        DB db = client().getDB(databaseName)

        return db.getCollection(collectionName)
    }
}
