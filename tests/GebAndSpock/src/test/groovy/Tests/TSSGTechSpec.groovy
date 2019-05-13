package Tests

import Pages.TSSGTechDataAnalyticsPage
import Pages.TSSGTechDevOpsPage
import Pages.TSSGTechHomePage
import Pages.TSSGTechMobilePage
import Pages.TSSGTechTestimonialsPage
import Pages.TSSGTechSchedulePage
import Pages.TSSGTechWebPage
import Pages.TSSGTechQAPage
import geb.spock.GebReportingSpec
import spock.lang.Ignore
import spock.lang.Unroll
import spock.lang.IgnoreRest

class TSSGTechSpec extends GebReportingSpec {
    def testKey
    def testResult

    def cleanup() {
        //testResult = () ? "PASS" : "FAIL"
        println "cleanup(): ${testKey} ${specificationContext.currentIteration.name} "
    }

    def setupSpec() {
        println "baseUrl = ${baseUrl}"
    }

    //@IgnoreRest
    def "Can get to the TSSG home page"() {
        testKey = "TWS-87"
        when:
            to TSSGTechHomePage
        then:
            at TSSGTechHomePage
    }

    //@IgnoreRest
    @Unroll
    def "selecting header menu #menuItem goes to #page.name"() {
        testKey = "TWS-30"
        when:
            to TSSGTechHomePage
            "${menuItem}"().click()
        then:
            //waitFor { "${page}"().focused }
            //at Class.forName("Pages.${page}",  false, Thread.currentThread().contextClassLoader) // page must be a string
            //at ("Pages.${page}" as Class)  // page must be a string
            at page

        where:
            menuItem       | page
            "homeLinkIcon" | TSSGTechHomePage
            "generalMenu"  | TSSGTechHomePage
            "testimonialsMenu" | TSSGTechTestimonialsPage
            "scheduleMenu" | TSSGTechSchedulePage
            "webMenu"      | TSSGTechWebPage
            "mobileMenu"   | TSSGTechMobilePage
            "qaMenu"       | TSSGTechQAPage
            "dataMenu"     | TSSGTechDataAnalyticsPage
            "devopsMenu"   | TSSGTechDevOpsPage

    }

    @Unroll
    def "selecting footer icon #footerIcon goes to #page.name"() {
        testKey = "TWS-189"
        when:
            to TSSGTechHomePage
            "${footerIcon}"().click()
        then:
            at page

        where:
            footerIcon           | page
            "webFooterIcon"      | TSSGTechWebPage
            "mobileFooterIcon"   | TSSGTechMobilePage
            "qaFooterIcon"       | TSSGTechQAPage
            "dataFooterIcon"     | TSSGTechDataAnalyticsPage
            "devopsFooterIcon"   | TSSGTechDevOpsPage

    }

}
