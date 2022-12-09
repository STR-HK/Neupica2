import { Navigation } from "./Navigation.js";
import { NeuContainer } from "../../../Native/NeuContainer.js";
import { colorScheme } from "../../Components/Color.js";
import { Level2 } from "../../Components/Elevation.js";
import { Padding } from "../../../../../Tool/Padding.js";
export class BottomAppBar extends Navigation {
    Container;
    constructor() {
        super();
        this.geometry.Width = '100%';
        this.Container = new NeuContainer();
        this.Container.data.Padding = new Padding().LTRB('4rem', '12rem', '16rem', '12rem');
        this.Container.data.BackgroundColor = colorScheme.surface;
        this.Container.geometry.Height = '80rem';
        this.Container.geometry.Width = '100%';
        this.Container.data.Shadow = Level2;
        this.addChild(this.Container);
    }
}
//# sourceMappingURL=BottomAppBar.js.map