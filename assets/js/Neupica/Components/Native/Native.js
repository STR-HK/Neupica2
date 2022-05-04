import { Children } from "../../../Common/Children.js"
import { createCover, createDiv, createElement } from "../Create/Create.js"

// Object.defineProperty(String.prototype, "key", {
//     get: function () {
//         return this.value ? this.value : null
//     },
// })

export class Native extends Children {
    constructor() {
        super()
        this.updatePrefix = "u"
        this.apply = function (obj) {
            Object.entries(obj).forEach((entry) => {
                if (entry[1] != null) {
                    try {
                        this[this.updatePrefix + entry[0]](entry[1])
                    } catch (error) {
                        console.warn(
                            `${this.name} -> ${entry[0]}(${entry[1]})` +
                                `\n` +
                                ` ${error}`
                        )
                    }
                }
            })
        }
        this.update = function (key) {
            try {
                this[this.updatePrefix + key]()
            } catch (error) {
                console.error(
                    `${this.name}.${this.updatePrefix}${key}()` +
                        ` -> Error ignored` +
                        `\n` +
                        ` ${error}`
                )
            }
        }

        this.build = function () {
            this.obj = {}

            Object.entries(this.data).forEach(([key, value]) => {
                // console.log(this)
                // console.log("value is..")
                // console.log(value)
                // console.log(Array.isArray(value))
                if (Array.isArray(value)) {
                    this.obj[key] = value[0]
                    this[key] = value[1]
                } else {
                    this.obj[key] = value
                }
            })

            Object.keys(this.data).forEach((key) => {
                Object.defineProperty(this.data, key, {
                    get: () => {
                        // console.log(key, this.obj)
                        return this.obj[key]
                    },
                    set: (newValue) => {
                        this.obj[key] = newValue
                        try {
                            this[key]()
                            // console.log(key)
                        } catch (error) {
                            console.error(
                                `${this.name}.${key}()` +
                                    ` -> Error ignored` +
                                    `\n` +
                                    ` ${error}`
                            )
                        }
                    },
                })
            })
        }

        this.updater = new (class Updater {
            constructor(that) {
                this.that = that
            }

            set(_function) {
                this.that[_function.name] = _function
                console.log(this.that)
            }

            sets(..._functions) {
                _functions.forEach((_function) => {
                    this.set(_function)
                })
            }

            set_obj(obj) {
                Object.entries(obj).forEach(([key, value]) => {
                    this.set(value)
                })
            }
        })(this)

        this.modifyData = function (newData) {
            Object.entries(newData).forEach(([key, value]) => {
                this.data[key] = value
            })
        }

        this.geometry = {
            Width: "auto",
            Height: "auto",
            MinWidth: "0px",
            MinHeight: "0px",
            MaxWidth: "none",
            MaxHeight: "none",
            Left: "auto",
            Top: "auto",
            Right: "auto",
            Bottom: "auto",
            Margin: "0px",
            Padding: "0px",
            Border: "0px",
        }

        this.target = this.element

        this.update_gm = function () {
            try {
                this.target.style
            } catch (e) {
                this.target = this.element
                try {
                    this.target.style
                } catch (e) {
                    console.warn(this)
                    console.warn(
                        '"this.element & this.target" is missing\nUnable to update geometry'
                    )
                    return
                }
            }
            this.target.style.width = this.geometry.Width
            this.target.style.height = this.geometry.Height
            this.target.style.minWidth = this.geometry.MinWidth
            this.target.style.minHeight = this.geometry.MinHeight
            this.target.style.maxWidth = this.geometry.MaxWidth
            this.target.style.maxHeight = this.geometry.MaxHeight
            this.target.style.left = this.geometry.Left
            this.target.style.top = this.geometry.Top
            this.target.style.right = this.geometry.Right
            this.target.style.bottom = this.geometry.Bottom
            this.target.style.margin = this.geometry.Margin
            this.target.style.padding = this.geometry.Padding
            this.target.style.border = this.geometry.Border
        }

        this.build_gm = function () {
            this.gb_obj = {}

            Object.entries(this.geometry).forEach(([key, value]) => {
                this.gb_obj[key] = value
                // this[key] = value
            })

            Object.keys(this.geometry).forEach((key) => {
                Object.defineProperty(this.geometry, key, {
                    get: () => {
                        return this.gb_obj[key]
                    },
                    set: (newValue) => {
                        this.gb_obj[key] = newValue
                        this.update_gm()
                    },
                })
            })
        }
        this.build_gm()

        this.watchEvent = function (eventname, callback) {
            this.cover.addEventListener(eventname, callback)
            return this
        }
        this.watchEvents = function (eventnames, callback) {
            eventnames.forEach((eventname) => {
                console.log(eventname)
                this.cover.addEventListener(eventname, callback)
            })
            return this
        }

        this.cover = this.createCover()
    }

    createCover() {
        return createCover(Object.getPrototypeOf(this).constructor.name)
    }
    createDiv() {
        return createDiv()
    }
    createElement(tagName) {
        return createElement(tagName)
    }
}
