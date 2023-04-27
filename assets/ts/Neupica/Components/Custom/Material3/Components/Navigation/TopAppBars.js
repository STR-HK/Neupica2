import { NeuContainer } from "../../../../Native/NeuContainer.js";
import { blendHEXColors, colorScheme } from "../../Styles/Color.js";
import { Box } from "../../../../../../Tool/Box.js";
import { Navigation } from "./Navigation.js";
import { transit } from "../../Styles/Motion/Transition.js";
export class TopAppBar extends Navigation {
    // declare data: {}
    HeadLine;
    Leading;
    Trailing;
    bIsScrolling;
    bIsColoring;
    constructor() {
        super();
        this.name = "TopAppBar";
        this.bIsScrolling = false;
        this.bIsColoring = false;
        this.geometry.Height = '64rem';
        this.data.BackgroundColor = colorScheme.surface;
        this.data.Padding = new Box().VH('8rem', '4rem');
        this.Leading = new NeuContainer();
        this.Leading.data.TextColor = colorScheme.onSurface;
        this.Leading.data.Symmetric = 'horizontal';
        this.addChild(this.Leading);
        this.HeadLine = new NeuContainer();
        this.addChild(this.HeadLine);
        this.HeadLine.data.TextColor = colorScheme.onSurface;
        // this.HeadLine.Text.data.Content = title
        this.HeadLine.data.FontSize = '22rem';
        this.HeadLine.geometry.Width = '100%';
        this.HeadLine.data.Margin = new Box().left('12rem');
        this.Trailing = new NeuContainer();
        this.Trailing.data.FlexDirection = 'row';
        this.Trailing.data.TextColor = colorScheme.onSurfaceVariant;
        this.addChild(this.Trailing);
    }
    reRender() {
        super.reRender();
        transit(this, {
            'backgroundColor': colorScheme.surface
        });
        transit(this.Leading, {
            'color': colorScheme.onSurface
        });
        transit(this.HeadLine, {
            'color': colorScheme.onSurface
        });
        transit(this.Trailing, {
            'color': colorScheme.onSurfaceVariant
        });
        // this.data.BackgroundColor = colorScheme.surface
        // this.Leading.data.TextColor = colorScheme.onSurface
        // this.HeadLine.data.TextColor = colorScheme.onSurface
        // this.Trailing.data.TextColor = colorScheme.onSurfaceVariant
        if (this.bIsScrolling) {
            this.Scrolling();
        }
        else {
            this.UnScrolling();
        }
    }
    Scrolling() {
        this.bIsScrolling = true;
        let that = this;
        if (!this.bIsColoring) {
            this.bIsColoring = true;
            // console.log(this.bIsColoring)
            transit(this, {
                'backgroundColor': blendHEXColors([
                    colorScheme.surface,
                    colorScheme.primary + '14'
                ]),
                'complete': function (anim) {
                    that.bIsColoring = false;
                }
            });
        }
        // this.data.BackgroundColor = blendHEXColors([
        //     colorScheme.surface,
        //     colorScheme.primary + '14'
        // ])
    }
    UnScrolling() {
        this.bIsScrolling = false;
        // this.data.BackgroundColor = colorScheme.surface
        transit(this, {
            'backgroundColor': colorScheme.surface
        });
    }
    setHeadline(text) {
        this.HeadLine.data.Content = text;
    }
    setLeading(leading) {
        this.Leading.clearChildren();
        this.Leading.addChild(leading);
        return this;
    }
    addTrailing(trailing) {
        this.Trailing.addChild(trailing);
    }
    addTrailings(trailing_list) {
        trailing_list.forEach(e => {
            this.Trailing.addChild(e);
        });
        return this;
    }
}
//# sourceMappingURL=TopAppBars.js.map