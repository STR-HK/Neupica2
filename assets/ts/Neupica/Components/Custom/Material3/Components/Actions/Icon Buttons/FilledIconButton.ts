import { IconButton } from "./IconButton.js"
import { colorScheme } from "../../../Styles/Color.js"

export class FilledIconButton extends IconButton {
    constructor(icon: string) {
        super(icon)
        this.name = 'FilledIconButton'

        this.Icon.data.BackgroundColor = colorScheme.onPrimary
    }
}