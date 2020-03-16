# Geb and Gradle Project

This project was derived from geb/geb-example-gradle.

## Description

The build is setup to work with Firefox and Chrome. Have a look at the `build.gradle` and the `src/test/resources/GebConfig.groovy` files.

These tests will run against the scheduledb branch on https://technologynursery.org/tssgTechScheduledb
Change to kick off build for demo. VM Options for -Dgeb.build.baseUrl are:
* dev or <default>   -> tssgTechScheduledb
* multipage          -> tssgTechMultipage
* qa or stagedMaster -> tssgTechStagedMaster
* webflowqa          -> tssgTechWebflow
* prod or tssgTech   -> tssgTech

## Prerequisite
* If running on Windows, must have Git for Windows installed in the default path (https://gitforwindows.org/).  Git Bash is utilized by the xrayImport task.
* If running from Linux, ensure that bash is in the path.

## Usage

The following command will launch the test 
against the default environment 
with the specified browser 
on the selenium grid:

    ./gradlew chromeTest

To run with all, you can run:

    ./gradlew test

Replace `./gradlew` with `gradlew.bat` in the above examples if you are on Windows.

## Options

### Select target test environment

The default url to be tested is the dev endpoint.
To change the baseUrl, set geb.build.baseUrl property to either localhost, toolbox, dev, qa, or prod environments.

To run UI tests in the dev environment (currently represents the scheduledb branch on the tssgTechScheduledb endpoint):

    ./gradlew chromeTest --tests TSSGTechSpec -Dgeb.build.baseUrl=dev

To run UI tests in the local toolbox docker environment:

    ./gradlew chromeLocalTest --tests TSSGTechSpec -Dgeb.build.baseUrl=toolbox

To run UI tests in the local Linux docker environment:

    ./gradlew chromeLocalTest --tests TSSGTechSpec -Dgeb.build.baseUrl=localhost

To run UI tests in the qa environment (currently represents the master branch on the tssgTechStagedMaster endpoint):

    ./gradlew chromeTest --tests TSSGTechSpec -Dgeb.build.baseUrl=qa

To run UI tests in the prod environment (currently represents the master branch on the production endpoint):

    ./gradlew chromeTest --tests TSSGTechSpec -Dgeb.build.baseUrl=prod

To run UI tests in the webflowqa environment (currently represents the webflow branch on the tssgTechWebflow endpoint):

    ./gradlew chromeTest --tests TSSGTechSpec -Dgeb.build.baseUrl=webflowqa
    
### Xray Import

Xray can import the test results of each test.  Make sure to include the Jira testKey in each test.
    
To run xrayImport task, set the jira.username, jira.password System properties for Jira.

    ./gradlew chromeTest \
        xrayImport \
        -Djira.username=navarror \
        -Djira.password=p@ssw0rd

### ReportSnaps

Generate a web page listing screenshots and html for each test:

    ./gradlew chromeTest reportSnaps
    
The reportArtifacts.html page will be placed in build/reports/chromeTest/ containing links to each snapshot and html page.

## Questions and issues

Please ask questions in the tssg-tech mailing list and raise issues in http://jira.web.technologynursery.org
