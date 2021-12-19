function makeId(length) {
    var result = '';
    var characters = '';
    characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    characters += 'abcdefghijklmnopqrstuvwxyz';
    characters += '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
class SessionStorageManager {
    constructor() {
        this.storage = {};
        this.setItem = function (key, value) {
            this.storage[key] = value;
        };
        this.getItem = function (key) {
            return this.storage[key];
        };
        this.removeItem = function (key) {
            delete this.storage[key];
        };
        this.clear = function () {
            this.storage = {};
        };
    }
}
window.IndexStorage = new SessionStorageManager();
window.thisClass = (item) => {
    console.log('thisClass :', item, 'converted to', window.IndexStorage.getItem(item.id));
    return window.IndexStorage.getItem(item.id);
};
class NeuWidgets {
    constructor() {
        // windowRize('Index', new SessionStorageManager())
        // function thisClass(this: any) {
        // }
        // windowRize('this', thisFunc())
        this.store = function (elementID, realClass) {
            window.IndexStorage.setItem(elementID, realClass);
            // console.log('Stored :', elementID , 'as', realClass)
            // console.log(realClass)
            // console.log(window.IndexStorage)
        };
        // this.getClass = function (elementID : string) {
        //     return window['SessionStorageManager'].getItem(elementID)
        // }
        this.createCover = function (name) {
            var element = document.createElement('div');
            element.id = `${name}-${makeId(6)}`; // Neu-xxxxxx
            this.store(element.id, this);
            // element.class = window['SessionStorageManager'].getItem(this.id)
            return element;
        };
        this.createElement = function (hidden = false) {
            var element = document.createElement('div');
            element.id = `Neu-Div-${makeId(6)}`; // Neu-xxxxxx
            if (hidden) {
                element.style.display = 'none';
            }
            return element;
        };
        this.createImg = function (hidden = false) {
            var element = document.createElement('img');
            element.id = `Neu-Img-${makeId(6)}`; // Neu-xxxxxx
            if (hidden) {
                element.style.display = 'none';
            }
            return element;
        };
        this.createSvg = function (hidden = false) {
            var element = document.createElement('svg');
            element.id = `Neu-Img-${makeId(6)}`; // Neu-xxxxxx
            if (hidden) {
                element.style.display = 'none';
            }
            return element;
        };
        let that = this;
        this.imgOrSvg = class ImgOrSvg {
            constructor(src) {
                this.img = that.createImg();
                this.svg = that.createSvg();
                this.setSrc(src);
                let thet = this;
                let a = class Style {
                    constructor() {
                        this.setProperty = function (propertyName, value, priority) {
                            thet.img.style.setProperty(propertyName, value, priority);
                            console.log(thet.img.style.backgroundColor = 'a');
                            console.log(thet.img);
                            thet.svg.style.setProperty(propertyName, value, priority);
                        };
                    }
                };
                this.style = new a();
            }
            setSrc(src) {
                console.log(this.img);
                console.log(this.svg);
                console.log(src);
                let extensionRegex = /\w{3,4}($|\?)/;
                if (src.match(extensionRegex)[0] == 'svg') {
                    console.log('View SVG');
                }
                else {
                    console.log('View IMG');
                }
            }
        };
        // document.body.appendChild()
    }
}
class Ripple {
    constructor(element) {
        element.addEventListener("pointerdown", function (event) {
            let element = window.thisClass(this).element;
            let eventTarget = event.currentTarget;
            let elementRect = element.getBoundingClientRect();
            let HMAX = Math.max(Math.abs(event.clientX - elementRect.left), Math.abs(event.clientX - elementRect.right));
            let VMAX = Math.max(Math.abs(event.clientY - elementRect.top), Math.abs(event.clientY - elementRect.bottom));
            let aniVar = 2;
            let hideTime = 1;
            let circle = document.createElement('div');
            circle.classList.add('Neu-Ripple');
            let diameter = Math.sqrt(Math.pow(HMAX, 2) + Math.pow(VMAX, 2)) / aniVar;
            let radius = diameter / 2;
            circle.style.position = 'absolute';
            circle.style.borderRadius = '50%';
            circle.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${event.clientX - eventTarget.offsetLeft - radius}px`;
            circle.style.top = `${event.clientY - eventTarget.offsetTop - radius}px`;
            circle.style.transition = `transform ${0.3 * aniVar}s cubic-bezier(0.03,-0.01, 0, 0.89),
                                        opacity ${hideTime}s ease-out ${0.3 * aniVar}s`;
            circle.setAttribute('aniVar', String(aniVar));
            circle.setAttribute('hideTime', String(hideTime));
            setTimeout(function () {
                circle.style.transform = `scale(${2 * aniVar})`;
            }, 1);
            element.appendChild(circle);
        });
        element.addEventListener("pointerup", function (event) {
            let button = window.thisClass(this).element;
            Array.from(button.getElementsByClassName('Neu-Ripple')).forEach(element => {
                if (element instanceof HTMLElement) {
                    element.style.opacity = '0';
                    setTimeout(function () {
                        element.remove();
                    }, parseFloat(element.getAttribute('hideTime')) * 1000
                        + parseFloat(element.getAttribute('aniVar')) * 300);
                }
            });
        });
    }
}
import { ColorsModule } from "./Colors.js";
const Colors = new ColorsModule();
export class NeuButton extends NeuWidgets {
    constructor() {
        super();
        this.object = {
            Text: '',
            Color: Colors.Black,
            Size: 'medium',
            TextPadding: '100px',
            BackgroundColor: Colors.LightGray,
            StrokeColor: Colors.Gray,
            StrokeWidth: '0px',
            StrokeStyle: 'solid',
            StrokeRadius: '3px',
            RippleColor: Colors.Yellow,
            Icon: null,
            IconColor: null,
            IconSize: '19px',
            IconTop: false,
            IconPadding: '0px',
            Padding: '8px',
            IconGap: '8px',
        };
        this.cover = this.createCover('Button');
        this.element = this.createElement();
        this.icon = this.createImg(true);
        this.text = this.createElement();
        this.element.appendChild(this.icon);
        this.element.appendChild(this.text);
        this.cover.appendChild(this.element);
        this.element.style.userSelect = 'none';
        this.element.style.webkitTapHighlightColor = 'transparent';
        this.element.style.display = 'flex';
        this.element.style.flexDirection = 'row';
        this.element.style.alignItems = 'center';
        this.element.style.cursor = 'pointer';
        this.element.style.boxShadow = '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)';
        this.element.style.overflow = 'hidden';
        this.element.style.position = 'relative';
        this.setText(this.object.Text);
        this.setColor(this.object.Color);
        this.setSize(this.object.Size);
        this.setTextPadding(this.object.TextPadding);
        this.setPadding(this.object.Padding);
        this.setBackgroundColor(this.object.BackgroundColor);
        this.setStrokeColor(this.object.StrokeColor);
        this.setStrokeStyle(this.object.StrokeStyle);
        this.setStrokeWidth(this.object.StrokeWidth);
        this.setStrokeRadius(this.object.StrokeRadius);
        new Ripple(this.cover);
        this.setRippleColor(this.object.RippleColor);
        this.setIconColor(this.object.IconColor);
        this.setIconSize(this.object.IconSize);
        this.setIconTop(this.object.IconTop);
        this.setIconPadding(this.object.IconPadding);
        this.setIconGap(this.object.IconGap);
    }
    setText(text) {
        this.object.Text = text;
        this.text.innerText = text;
    }
    setColor(color) {
        this.object.Color = color;
        this.element.style.color = color;
    }
    setSize(size) {
        this.object.Size = size;
        this.element.style.fontSize = size;
    }
    setTextPadding(padding) {
        this.object.TextPadding = padding;
        this.element.style.padding = padding;
    }
    setPadding(padding) {
        this.object.Padding = padding;
        this.element.style.padding = padding;
    }
    setBackgroundColor(color) {
        this.object.BackgroundColor = color;
        this.element.style.backgroundColor = color;
    }
    setStrokeStyle(style) {
        this.object.StrokeStyle = style;
        this.element.style.borderStyle = style;
    }
    setStrokeColor(color) {
        this.object.StrokeColor = color;
        this.element.style.borderColor = color;
    }
    setStrokeWidth(width) {
        this.object.StrokeWidth = width;
        this.element.style.borderWidth = width;
    }
    setStrokeRadius(radius) {
        this.object.StrokeRadius = radius;
        this.element.style.borderRadius = radius;
    }
    setRippleColor(color) {
        this.object.RippleColor = color;
        console.log(`RippleColor : ${color}`);
    }
    setIcon(icon) {
        // let img = new this.imgOrSvg(icon)
        // console.log(img)
        // document.body.appendChild(img.img)
        // console.log(img.style.setProperty)
        // img.style.setProperty('fill', 'yellow', '!important')
        this.object.Icon = icon;
        this.icon.src = icon;
        this.icon.style.display = '';
    }
    setIconColor(color) {
        this.object.IconColor = color;
        // this.icon.style.color = color
    }
    setIconSize(size) {
        this.object.IconSize = size;
        this.icon.style.width = size;
    }
    setIconTop(top) {
        this.object.IconTop = top;
        this.element.style.flexDirection = top ? 'column' : 'row';
    }
    setIconPadding(padding) {
        this.object.IconPadding = padding;
        this.icon.style.padding = padding;
    }
    setIconGap(gap) {
        this.object.IconGap = gap;
        this.element.style.gap = gap;
    }
}
//# sourceMappingURL=neuwidgets.js.map