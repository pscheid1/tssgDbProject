package Pages

import Common.TSSGTechBasePage

class TSSGTechSchedulePage extends TSSGTechBasePage {

    static url = "schedule.html#top"

    static at = {
        titleText
    }

    static content =
    {
        titleText { $("strong", text: "TSSG WEEKLY MEETING SCHEDULE") }
        m1image{ $("#m1image") }
        m2image{ $("#m2image") }
        m3image{ $("#m3image") }
    }
}
