import { NeuLayout } from "./NeuLayout.js";
import { NeuContainer } from "../Neupica/Components/Native/NeuContainer.js";
export class NeuScaffold extends NeuLayout {
    head;
    body;
    foot;
    scaffoldings;
    constructor() {
        super();
        this.name = "NeuScaffold";
        // this.element = this.createLayout()
        // this.element.style.flexDirection = "column"
        this.data.FlexDirection = 'column';
        this.head = new NeuContainer();
        this.body = new NeuContainer();
        this.body.geometry.Height = '100%';
        this.body.geometry.Overflow = 'auto';
        this.foot = new NeuContainer();
        this.scaffoldings = [
            this.head,
            this.body,
            this.foot
        ];
        this.scaffoldings.forEach(e => {
            e.geometry.Width = '100%';
        });
        this.addChildren(this.scaffoldings);
    }
}
//# sourceMappingURL=NeuScaffold.js.map