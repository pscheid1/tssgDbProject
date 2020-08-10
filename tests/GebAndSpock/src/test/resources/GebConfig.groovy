/*
	This is the Geb configuration file.
	
	See: http://www.gebish.org/manual/current/#configuration
*/


import org.openqa.selenium.chrome.ChromeDriver
import org.openqa.selenium.firefox.FirefoxDriver
import org.openqa.selenium.firefox.FirefoxProfile
import org.openqa.selenium.Platform
import org.openqa.selenium.remote.DesiredCapabilities
import org.openqa.selenium.remote.RemoteWebDriver

waiting {
	timeout = 10
}

reportsDir = 'target/geb-reports'

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
switch (baseUrl) {
    case ["dev", "scheduledb"]:
        baseUrl = "https://technologynursery.org/tssgTechScheduledb/"
        break
    case ["toolbox"]:
        hostIP = "docker-machine ip".execute().in.text.trim()
        println "hostIP = ${hostIP}"
        baseUrl = "http://${hostIP}:4200/"
        break
    case ["localhost"]:
        baseUrl = "http://localhost:4200/"
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
        baseUrl = "https://technologynursery.org/tssgTechScheduledb/"
        break
}

