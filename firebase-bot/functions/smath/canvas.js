"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var canvas = /** @class */ (function () {
    function canvas(canvas) {
        var _this = this;
        this.fdata = {};
        this.center_x = 0;
        this.center_y = 0;
        this.x_unit = 50;
        this.y_unit = 50;
        this.stored = {};
        this.pathes = {};
        this.objects = [];
        this.fastDrawing = false;
        canvas.height = canvas.scrollHeight;
        canvas.width = canvas.scrollWidth;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.init();
        var start;
        var down = false;
        //When the user starts an action on the canvas.
        canvas.addEventListener('mousedown', function (e) {
            down = true;
            start = { x: e.pageX, y: e.pageY };
            canvas.style.cursor = 'grabbing';
        });
        canvas.addEventListener('touchstart', function (e) {
            down = true;
            start = {
                x: e.touches.item(0).clientX,
                y: e.touches.item(0).clientY
            };
        });
        // When the user moves on the surface of the canvas.
        canvas.addEventListener('mousemove', function (e) {
            if (down == true) {
                var new_start = { x: e.pageX, y: e.pageY };
                var old = start;
                var drawn = _this.move(old, new_start);
                if (drawn) {
                    start = new_start;
                }
            }
        });
        canvas.addEventListener('touchmove', function (e) {
            e.preventDefault();
            if (down == true) {
                var new_start = {
                    x: e.touches.item(0).clientX,
                    y: e.touches.item(0).clientY
                };
                var old = start;
                var drawn = _this.move(old, new_start);
                if (drawn) {
                    start = new_start;
                }
            }
        });
        //When the user stops clicking on teh surface
        canvas.addEventListener('mouseup', function (e) {
            e.preventDefault();
            e.stopPropagation();
            down = false;
            canvas.style.cursor = 'grab';
            _this.hasUpdated();
        });
        canvas.addEventListener('touchend', function (e) {
            e.stopPropagation();
            e.preventDefault();
            down = false;
            _this.hasUpdated();
        });
        try {
            window.addEventListener('resize', function (e) {
                e.stopPropagation();
                e.preventDefault();
                _this.reload();
            });
        }
        catch (error) {
            console.log(error);
        }
        canvas.addEventListener('mousewheel', function (e) {
            e.stopPropagation();
            e.preventDefault();
            var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
            _this.zoom(delta);
            _this.hasUpdated();
        });
        canvas.addEventListener('DOMMouseScroll', function (e) {
            e.preventDefault();
            e.preventDefault();
            var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
            _this.zoom(delta);
            _this.hasUpdated();
        });
    }
    canvas.prototype.getValues = function () {
        return {
            center_x: this.center_x,
            center_y: this.center_y,
            x_unit: this.x_unit,
            y_unit: this.y_unit
        };
    };
    canvas.prototype.setValues = function (values) {
        this.center_x = values['center_x'];
        this.center_y = values['center_y'];
        this.x_unit = values['x_unit'];
        this.y_unit = values['y_unit'];
    };
    canvas.prototype.hasUpdated = function () {
        if (this.onupdate)
            this.onupdate();
    };
    canvas.prototype.zoom = function (delta) {
        if (this.x_unit + delta * 10 > 10) {
            this.x_unit += delta * 10;
        }
        if (this.y_unit + delta * 10 > 10) {
            this.y_unit += delta * 10;
        }
        this.reload();
    };
    canvas.prototype.init = function () {
        this.canvas.height = this.canvas.scrollHeight;
        this.canvas.width = this.canvas.scrollWidth;
        this.draw();
    };
    canvas.prototype.draw = function () {
        this.drawGrid();
    };
    canvas.prototype.drawGrid = function () {
        var max = Math.max(this.canvas.height, this.canvas.width);
        max = max / Math.min(this.x_unit, this.y_unit);
        // Clears the view
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.fillStyle = '#fafafa';
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fill();
        this.ctx.closePath();
        var to = Math.floor(this.center_x + max);
        var xpos = Math.floor(this.center_x - max);
        while (xpos < to) {
            this.drawLine(this.getRelativePositionX(xpos), this.getRelativePositionY(Math.floor(this.center_y + max)), this.getRelativePositionX(xpos), this.getRelativePositionY(Math.floor(this.center_y - max)), Math.floor(xpos) == 0 ? 'black' : undefined);
            this.ctx.beginPath();
            this.ctx.font = '18px Sans Serif';
            this.ctx.fillStyle = 'gray';
            this.ctx.fillText(xpos.toString(), this.getRelativePositionX(xpos), this.getRelativePositionY(0) + 15);
            this.ctx.closePath();
            xpos++;
        }
        to = Math.floor(this.center_y + max);
        var ypos = Math.floor(this.center_y - max);
        while (ypos < to) {
            this.drawLine(this.getRelativePositionX(Math.floor(this.center_x + max)), this.getRelativePositionY(ypos), this.getRelativePositionX(Math.floor(this.center_x - max)), this.getRelativePositionY(ypos), Math.floor(ypos) == 0 ? 'black' : undefined);
            this.ctx.beginPath();
            this.ctx.font = '18px Sans Serif';
            this.ctx.fillStyle = 'gray';
            this.ctx.fillText(ypos.toString(), this.getRelativePositionX(0) -
                (ypos.toString().length * 15) / 2 -
                5, this.getRelativePositionY(ypos));
            this.ctx.closePath();
            ypos++;
        }
    };
    canvas.prototype.move = function (previous, now) {
        var diff_x = previous.x - now.x;
        var diff_y = previous.y - now.y;
        if (Math.sqrt(Math.pow(diff_x, 2) + Math.pow(diff_y, 2)) > 10) {
            this.center_x += diff_x / this.x_unit;
            this.center_y -= diff_y / this.y_unit;
            this.reload();
            return true;
        }
    };
    canvas.prototype.drawLine = function (x, y, x2, y2, color, width) {
        this.ctx.beginPath();
        //console.log('new path');
        if (color == undefined) {
            this.ctx.strokeStyle = '#D0D0D0';
        }
        else {
            this.ctx.strokeStyle = color;
        }
        if (y2 == Infinity)
            console.log((y2 = this.canvas.height), 'Inf' + y2);
        if (y == Infinity)
            console.log((y = this.canvas.height), 'Inf' + y);
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x2, y2);
        if (width == undefined) {
            this.ctx.lineWidth = 1;
        }
        else {
            this.ctx.lineWidth = width;
        }
        this.ctx.stroke();
        //console.log(this.ctx);
    };
    canvas.prototype.getRelativePositionX = function (point) {
        return (this.canvas.width / 2 +
            point * this.x_unit -
            this.center_x * this.x_unit);
    };
    canvas.prototype.getRelativePositionY = function (point) {
        return (this.canvas.height / 2 -
            point * this.y_unit +
            this.center_y * this.y_unit);
    };
    canvas.prototype.drawFromFunc = function (func, color, isPreview) {
        if (color === void 0) { color = undefined; }
        if (isPreview === void 0) { isPreview = this.fastDrawing; }
        if (!color) {
            var letters = '0123456789ABCDEF';
            color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
        }
        var display_size = this.canvas.width / 2 / this.x_unit;
        var x = this.center_x - display_size;
        var last = undefined;
        var label = func;
        var was_defined = true;
        if (this.pathes[label] == undefined) {
            this.pathes[label] = {};
            was_defined = false;
        }
        var xs_increment = Math.min((5 * this.canvas.width) / (this.x_unit * 1000), 0.05);
        var xs_save = xs_increment;
        var restore = undefined;
        while (x < this.center_x + display_size) {
            var pos = void 0;
            var new_y = void 0;
            var new_x = void 0;
            if (was_defined == true && this.pathes[label][x] != undefined) {
                new_y = this.getRelativePositionY(this.pathes[label][x]);
                new_x = this.getRelativePositionX(x);
            }
            else {
                pos = this.getFor(x, func, label);
                //console.log(x, pos);
                this.pathes[label][x] = pos;
                new_y = this.getRelativePositionY(pos);
                new_x = this.getRelativePositionX(x);
            }
            if (last != undefined) {
                var y_diff = Math.abs(new_y - last.y);
                if (y_diff > 75 && xs_increment == xs_save) {
                    if (y_diff > 200) {
                        last = undefined;
                    }
                    else {
                        x -= xs_increment;
                        xs_increment = xs_save / 50;
                        //@ts-ignore
                        new_y = last.y;
                        restore = x + 2;
                    }
                }
                else {
                    this.drawLine(new_x, new_y, last.x, last.y, color, 2);
                }
            }
            last = {
                x: new_x,
                y: new_y
            };
            if (isPreview == true) {
                x += 0.075;
            }
            else {
                if (restore && restore <= x) {
                    restore = undefined;
                    xs_increment = xs_save;
                }
                x += xs_increment;
            }
        }
        return color;
    };
    canvas.prototype.getFor = function (start, func, label) {
        if (this.stored[label] == undefined) {
            this.stored[label] = {};
        }
        if (this.stored[label][start] != undefined) {
            return this.stored[label][start];
        }
        else {
            this.stored[label][start] = func(start, this.fdata);
            return this.stored[label][start];
        }
    };
    canvas.prototype.reload = function (fdata) {
        var _this = this;
        if (fdata != undefined) {
            this.funcs = fdata;
        }
        this.init();
        var data = Object.keys(this.fdata);
        requestAnimationFrame(function () {
            data.forEach(function (key) {
                if (_this.fdata[key].visible == true) {
                    _this.drawFromFunc(_this.fdata[key].array, _this.fdata[key].color);
                }
            });
            var objs = _this.objects;
            objs.forEach(function (obj) {
                if (obj.type == 'point') {
                    var y = NaN;
                    if (!isNaN(obj.y)) {
                        y = obj.y;
                    }
                    else {
                        y = obj.y(parseFloat(obj.x), _this.fdata);
                    }
                    _this.point(obj.x, y);
                }
            });
        });
    };
    canvas.prototype.point = function (x, y, text) {
        if (text === void 0) { text = ''; }
        text = text + "(" + x + ";" + y + ")";
        x = this.getRelativePositionX(x);
        y = this.getRelativePositionY(y);
        this.ctx.beginPath();
        this.ctx.arc(x, y, 3, 0, 2 * Math.PI, true);
        this.ctx.fill();
        this.ctx.font = '12px Arial';
        if (text)
            this.ctx.fillText(text, x + 10, y + 10);
    };
    Object.defineProperty(canvas.prototype, "funcs", {
        get: function () {
            return this.fdata;
        },
        set: function (fdata) {
            this.fdata = fdata;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(canvas.prototype, "object_list", {
        get: function () {
            return {
                objects: this.objects,
                push: function (toAdd) {
                    this.objects.push(toAdd);
                    return this.objects;
                }
            };
        },
        set: function (objects) {
            this.objects = objects;
        },
        enumerable: true,
        configurable: true
    });
    return canvas;
}());
exports.default = canvas;
