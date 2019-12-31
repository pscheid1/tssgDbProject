package Tests

import spock.lang.*

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
        and: "Mongo database tssg-tech is pre-populated with data"

        when: "#collection is accessed"
            print collection + " = "

        then: "#objects are returned"
            println objects

        where:
            collection | objects
            "users"    | "u"
            "venues"   | "v"
            "teams"    | "t"
            "meetings" | "m"
    }
}
