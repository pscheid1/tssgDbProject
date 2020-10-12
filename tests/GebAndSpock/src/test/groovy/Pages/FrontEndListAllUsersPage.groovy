package Pages

import Common.FrontEndBasePage

class FrontEndListAllUsersPage extends FrontEndBasePage {

    static url = "${System.properties['geb.build.frontendUrl']}/users/get-all"

    static at = {
        titleText
    }

    static content = {
        titleText { waitfor { $("h4", text: "List All Users") } }
    }
}
