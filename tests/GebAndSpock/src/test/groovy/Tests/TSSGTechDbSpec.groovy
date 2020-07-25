package Tests

import spock.lang.*
import Common.MongoService
import com.mongodb.BasicDBObject

/**
 * Tests the mongo database.
 */
class TSSGTechDbSpec extends Specification {
    /** The XRay JIRA test execution issue key that is associated with these tests. */
    def testKey
    /** Result of the test execution as PASS or FAIL. */
    def testResult

    /**
     * Prints out the testKey and spec name after the test.
     *
     * This is a fixture method to print out the testKey and name of the
     * current specification iteration at the end of the test run (during cleanup).
     */
    def cleanup() {
        //testResult = () ? "PASS" : "FAIL"
        println "cleanup(): ${testKey} ${specificationContext.currentIteration.name} "
    }

    /**
     * A data driven feature method to verify that the meeting schedule
     * database collection has objects.
     * </br>
     * Assumes that the default test data
     * has been pre-installed prior to running the test
     * (i.e. from mongo.install script).
     */
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
            c.find().size() >= size

        where:
            collection | size
            "users"    | 3
            "venues"   | 8
            "teams"    | 3
            "meetings" | 5
    }
}
