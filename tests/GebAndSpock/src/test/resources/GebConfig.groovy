/*
	This is the Geb configuration file.
	
	See: http://www.gebish.org/manual/current/#configuration
*/


import org.openqa.selenium.chrome.ChromeDriver
import org.openqa.selenium.firefox.FirefoxDriver
//import org.openqa.selenium.firefox.FirefoxProfile
import org.openqa.selenium.Platform
import org.openqa.selenium.remote.DesiredCapabilities
import org.openqa.selenium.remote.RemoteWebDriver

waiting {
	timeout = 10
}

reportsDir = 'target/geb-reports'
println "reportsDir = ${reportsDir}"

environments {
	
    // run via “./gradlew chromeTest”
    // See: http://code.google.com/p/selenium/wiki/ChromeDriver
    chromeLocal {
        driver = { new ChromeDriver() }
    }

    chrome {
        println "--------------------------"
        println "Browser = chrome v:81.0.4044.92 on Grid"
        driver = {
            DesiredCapabilities capabilities = DesiredCapabilities.chrome()
            //capabilities.setVersion("81.0.4044.92")
            capabilities.setPlatform(Platform.LINUX)
            new RemoteWebDriver( new URL("http://hub.technologynursery.org/wd/hub"), capabilities )
        }
    }
	
    // run via “./gradlew firefoxTest”
    // See: http://code.google.com/p/selenium/wiki/FirefoxDriver
    firefox {
        println "--------------------------"
        println "Browser = firefox v:75.0 on Grid"
        driver = {
            DesiredCapabilities capabilities = DesiredCapabilities.firefox()
            //capabilities.setVersion("75.0")
            capabilities.setPlatform(Platform.LINUX)
            new RemoteWebDriver( new URL("http://hub.technologynursery.org/wd/hub"), capabilities )

            //FirefoxProfile profile = new FirefoxProfile()
            //profile.setPreference("intl.accept_languages", "en-us")
            //def driverInstance = new FirefoxDriver(profile)
            //driverInstance
        }
    }

    firefoxLocal {
        println "--------------------------"
        println "Browser = firefox on Local"
        driver = { new FirefoxDriver() }
    }

    chromeLocal {
        println "--------------------------"
        println "Browser = chrome on Local"
        driver = { new ChromeDriver() }
    }

}

// To run the tests with all browsers just run “./gradlew test”

// Set the actual baseUrl from alias values.
// For example: in gradle configuration set this VM Option to use the qa environment
// -Dgeb.build.baseUrl=qa
baseUrl = System.properties['geb.build.baseUrl']
def frontendUrl = System.properties['geb.build.frontendUrl']
def backendUrl = System.properties['geb.build.backendUrl']

switch (baseUrl) {
    case ["dev", "scheduledb"]:
        //baseUrl = "https://technologynursery.org/tssgTechScheduledb/"
        baseUrl = "https://website.sdb.technologynursery.org/"
        frontendUrl = "https://frontend.sdb.technologynursery.org/"
        backendUrl = "https://backend.sdb.technologynursery.org/"
        break
    case ["toolbox"]:
        //hostIP = "docker-machine ip".execute().in.text.trim()
        // This environment depends on these hostnames being set in /etc/hosts
        baseUrl = "http://website.sdb/"
        frontendUrl = "http://frontend.sdb/"
        backendUrl = "http://backend.sdb/"
        break
    case ["localhost"]:
        //baseUrl = "http://localhost:4200/"
        // This environment depends on these hostnames being set in /etc/hosts
        baseUrl = "http://website.sdb/"
        frontendUrl = "http://frontend.sdb/"
        backendUrl = "http://backend.sdb/"
        break
    case ["multipage"]:
        baseUrl = "https://technologynursery.org/tssgTechMultipage/"
        break
    case ["qa", "stagedMaster"]:
        baseUrl = "https://technologynursery.org/tssgTechStagedMaster/"
        break
    case ["webflowqa"]:
        baseUrl = "https://technologynursery.org/tssgTechWebflow/"
        break
    case ["prod", "tssgTech"]:
        baseUrl = "https://technologynursery.org/tssgTech/"
        break
    default:
        // Assume that this is a valid URL being passed in the baseUrl property
        //baseUrl = "https://technologynursery.org/tssgTechScheduledb/"
        break
}
System.properties['geb.build.baseUrl'] = baseUrl
System.properties['geb.build.frontendUrl'] = frontendUrl
System.properties['geb.build.backendUrl'] = backendUrl

println "baseUrl = ${baseUrl}"
println "frontendUrl = ${frontendUrl}"
println "backendUrl = ${backendUrl}"
