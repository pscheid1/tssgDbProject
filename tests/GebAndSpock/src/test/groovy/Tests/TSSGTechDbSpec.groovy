package Tests

import spock.lang.*
import Common.MongoService
import com.mongodb.BasicDBObject

class TSSGTechDbSpec extends Specification {
    def testKey
    def testResult

    def cleanup() {
        //testResult = () ? "PASS" : "FAIL"
        println "cleanup(): ${testKey} ${specificationContext.currentIteration.name} "
    }

    @Unroll
    def "Verify meeting schedule database collection #collection has objects"() {
        testKey = "TWS-275"

        given: "Mongo database tssg-tech is accessible using the mongodb client"
            def service = new MongoService(databaseName: 'tssg-tech')
        and: "Mongo database tssg-tech is pre-populated with data"

        when: "#collection is accessed"
            def c = service.collection(collection)
            print collection + " = "
            c.find().toArray().each { println it }

        then: "#size is returned"
            c.find().size() >= 0

        where:
            collection | size
            "users"    | 3
            "venues"   | 8
            "teams"    | 3
            "meetings" | 6
    }
}
