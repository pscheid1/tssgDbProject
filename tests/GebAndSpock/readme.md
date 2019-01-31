# Geb and Gradle Project

This project was derived from geb/geb-example-gradle.

[![Build Status][build_status]](https://snap-ci.com/geb/geb-example-gradle/branch/master)

## Description

This incorporates Geb into a Gradle build. It shows the use of Spock and JUnit 4 tests.

The build is setup to work with Firefox and Chrome. Have a look at the `build.gradle` and the `src/test/resources/GebConfig.groovy` files.

These tests will run against the multipage branch on https://technologynursery.org/tssgTechMultipage
Change to kick off build for demo. Tyler
## JGB comment
## Usage

The following command will launch the test with the individual browser:

    ./gradlew chromeTest

To run with all, you can run:

    ./gradlew test

Replace `./gradlew` with `gradlew.bat` in the above examples if you're on Windows.

## Options

The default url to be tested is the dev endpoint (currently represents the tssgTechMultipage branch).
To change the baseUrl, set to either dev, qa, or prod environments.

To run tests in the dev environment (currently represents the multipage branch):

    ./gradlew chromeTest -Dgeb.build.baseUrl=dev

To run tests in the qa environment (currently represents the tssgTechStagedMaster branch):

    ./gradlew chromeTest -Dgeb.build.baseUrl=qa

To run tests in the prod environment (currently represents the master branch):

    ./gradlew chromeTest -Dgeb.build.baseUrl=prod

## Questions and issues

Please ask questions on [Geb user mailing list][mailing_list] and raise issues in [Geb issue tracker][issue_tracker].


[build_status]: https://snap-ci.com/geb/geb-example-gradle/branch/master/build_image "Build Status"
[mailing_list]: https://groups.google.com/forum/#!forum/geb-user
[issue_tracker]: https://github.com/geb/issues/issues
