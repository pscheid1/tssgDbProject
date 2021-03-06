package Pages

import Common.TSSGTechBasePage

class TSSGTechQAPage extends TSSGTechBasePage {

    static url = "qaGroup.html#top"

    static at = {
        titleText
        titleIcon
    }

    static content = {
        titleText { $("strong", text: "QUALITY ASSURANCE STUDY GROUP") }
        titleIcon { $("#qa-icon", src: "Images/icon_quality.png") }
    }
}
