
class FloatManager {
    constructor() {
        let FloatingPlace = document.createElement('div')
        FloatingPlace.classList.add('FloatingPlace')
        FloatingPlace.style.position = 'absolute'
        // this.place =
        console.log(this.place)
        document.body.appendChild(FloatingPlace)
    }


    setFloat(NeuApp) {
        function attach(element) {
            element.style.border = '3px dotted lime'
            element.addEventListener('mousedown', function (e) {
                let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
                element.addEventListener('mousedown', dragMouseDown)
                function dragMouseDown(e) {
                    e = e || window.event;
                    e.preventDefault();
                    // get the mouse cursor position at startup:
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    document.onmouseup = closeDragElement;
                    // call a function whenever the cursor moves:
                    document.onmousemove = elementDrag;
                }

                function elementDrag(e) {
                    e = e || window.event;
                    e.preventDefault();
                    // calculate the new cursor position:
                    pos1 = pos3 - e.clientX;
                    pos2 = pos4 - e.clientY;
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    // set the element's new position:
                    element.style.top = (element.offsetTop - pos2) + "px";
                    element.style.left = (element.offsetLeft - pos1) + "px";
                }

                function closeDragElement() {
                    // stop moving when mouse button is released:
                    document.onmouseup = null;
                    document.onmousemove = null;
                }
            })

            element.addEventListener('click', function init() {
                element.removeEventListener('click', init, false);
                element.className = element.className + ' resizable';
                let resizer = document.createElement('div');
                resizer.className = 'resizer';
                resizer.style.width = '10px'
                resizer.style.height = '10px'
                resizer.style.background = 'gray'
                resizer.style.right = '0'
                resizer.style.bottom = '0'
                resizer.style.cursor = 'se-resize'
                resizer.style.position = 'absolute'
                element.appendChild(resizer);
                resizer.addEventListener('mousedown', initDrag, false);
            }, false);

            // element.click()

            let startX, startY, startWidth, startHeight;

            function initDrag(e) {
                startX = e.clientX;
                startY = e.clientY;
                startWidth = parseInt(document.defaultView.getComputedStyle(element).width, 10);
                startHeight = parseInt(document.defaultView.getComputedStyle(element).height, 10);
                document.documentElement.addEventListener('mousemove', doDrag, false);
                document.documentElement.addEventListener('mouseup', stopDrag, false);
            }

            function doDrag(e) {
                element.style.width = (startWidth + e.clientX - startX) + 'px';
                element.style.height = (startHeight + e.clientY - startY) + 'px';
            }

            function stopDrag(e) {
                document.documentElement.removeEventListener('mousemove', doDrag, false);
                document.documentElement.removeEventListener('mouseup', stopDrag, false);
            }
        }

        let FloatElement = document.createElement('div')
        FloatElement.classList.add('Float')
        FloatElement.style.position = 'absolute'

        attach(FloatElement)

        NeuApp.sculpt(FloatElement)

        document.querySelector('.FloatingPlace').appendChild(FloatElement)
        // document.body.appendChild(FloatElement)
    }


    delFloat(NeuApp) {

    }

    listFloat(NeuApp) {

    }
}

export function initFloat() {
    window.FloatManager = new FloatManager()
    let FM = window.FloatManager
    window.setFloat = FM.setFloat
    window.delFloat = FM.delFloat
    window.listFloat = FM.listFloat
}

