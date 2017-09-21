var functions_informations = {};
var SMath = function () {

    this.ctx = "";

    this.setContext = function (ctx) {
        this.ctx = ctx;
    }

    this.newPoint = function (X, Y, color) {
        var X = this.x_zero + X * parseFloat(this.interval);
        var Y = this.y_zero - Y * parseFloat(this.interval);
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        if (color != undefined) {
            this.ctx.fillStyle = color;
        } else {
            this.ctx.fillStyle = "black";
        }
        this.ctx.arc(X, Y, 1, 0, Math.PI * 2)
        this.ctx.fill();
    }

    this.circle = function (X, Y, radius, color) {
        var centerX = this.x_zero + X * parseFloat(this.interval);
        var centerY = this.y_zero - Y * parseFloat(this.interval);
        radius = radius * this.interval;

        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        this.ctx.lineWidth = 1;
        if (color == undefined) {
            this.ctx.strokeStyle = "#eee";
        } else {
            this.ctx.strokeStyle = color;
        }
        this.ctx.stroke();
    }

    this.newLine = function (X, Y, X2, Y2, color, arrow, width) {
        var X = this.x_zero + X * parseFloat(this.interval);
        var Y = this.y_zero - Y * parseFloat(this.interval);
        var X2 = this.x_zero + X2 * parseFloat(this.interval);
        var Y2 = this.y_zero - Y2 * parseFloat(this.interval);
        this.ctx.beginPath();
        if (color == undefined) {
            this.ctx.strokeStyle = "#eee";
        } else {
            this.ctx.strokeStyle = color;
        }
        this.ctx.moveTo(X, Y);
        this.ctx.lineTo(X2, Y2);
        if (width == undefined) {
            this.ctx.lineWidth = 1;
        } else {
            this.ctx.lineWidth = width;
        }
        this.ctx.stroke();

        if (arrow == true) {
            // console.log(X + "/" + Y + " ++ " + X2 + "/" + Y2);

            if (X < X2) {
                if (Y > Y2) {
                    this.ctx.beginPath();
                    if (color == undefined) {
                        this.ctx.strokeStyle = "#eee";
                    } else {
                        this.ctx.strokeStyle = color;
                    }
                    this.ctx.moveTo(X2, Y2);
                    this.ctx.lineTo(X2 - 0.12 * this.interval, Y2);
                    this.ctx.moveTo(X2, Y2);
                    this.ctx.lineTo(X2, Y2 + 0.12 * this.interval);
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                } else {
                    this.ctx.beginPath();
                    if (color == undefined) {
                        this.ctx.strokeStyle = "#eee";
                    } else {
                        this.ctx.strokeStyle = color;
                    }
                    this.ctx.moveTo(X2, Y2);
                    this.ctx.lineTo(X2 - 0.12 * this.interval, Y2);
                    this.ctx.moveTo(X2, Y2);
                    this.ctx.lineTo(X2, Y2 - 0.12 * this.interval);
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            } else {
                if (Y > Y2) {
                    this.ctx.beginPath();
                    if (color == undefined) {
                        this.ctx.strokeStyle = "#eee";
                    } else {
                        this.ctx.strokeStyle = color;
                    }
                    this.ctx.moveTo(X2, Y2);
                    this.ctx.lineTo(X2 + 0.12 * this.interval, Y2);
                    this.ctx.moveTo(X2, Y2);
                    this.ctx.lineTo(X2, Y2 + 0.12 * this.interval);
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                } else {
                    this.ctx.beginPath();
                    if (color == undefined) {
                        this.ctx.strokeStyle = "#eee";
                    } else {
                        this.ctx.strokeStyle = color;
                    }
                    this.ctx.moveTo(X2, Y2);
                    this.ctx.lineTo(X2 + 0.12 * this.interval, Y2);
                    this.ctx.moveTo(X2, Y2);
                    this.ctx.lineTo(X2, Y2 - 0.12 * this.interval);
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }

    }

    this.label = function (text, X, Y, color) {
        var X = this.x_zero + X * parseFloat(this.interval);
        var Y = this.y_zero - Y * parseFloat(this.interval);

        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        if (color != undefined) {
            this.ctx.fillStyle = color;
        } else {
            this.ctx.fillStyle = "black";
        }
        this.ctx.fillText(text, X, Y);
        this.ctx.fill();
    }

    this.makeGrid = function (force_grid_interval, ix, iy) {
        this.ctx.clearRect(0,0,this.height, this.width);
        
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0,0,this.width, this.height);
        
        var max_x = this.x_zero / this.interval;
        var max_y = this.y_zero / this.interval;

        
        if(force_grid_interval == true){
            var that = this;
            var getVal = function (val) {
                if(val == undefined){
                    return 1;
                }else{
                    return that.exec_and_sort( "" + val )["~"];
                }
            }
            grid_interval_x = getVal(ix);
            grid_interval_y = getVal(iy);
        }else{
            if (this.interval > 200) {
                grid_interval_x = this.interval / (200 * 10);
                grid_interval_y = this.interval / (200 * 10);
                
            } else {
                grid_interval_x = 1;
                grid_interval_y = 1;
            }
        }
        var x_right = 0;
        while (x_right < max_x + 5) {
            this.newLine(x_right, -500, x_right, 500);
            this.label(" " + x_right.toString().substr(0, 4), x_right, 2 / this.interval);
            x_right += grid_interval_x;
        }
        x_right = 0;
        while (x_right > -max_x - 5) {
            this.newLine(x_right, -500, x_right, 500);
            if (x_right != 0) { this.label(" " + x_right.toString().substr(0, 4), x_right, 2 / this.interval); }
            x_right -= grid_interval_x;
        }
        
        var y_bottom = 0;
        while (y_bottom < max_y + 5) {
            this.newLine(-500, y_bottom, 500, y_bottom);
            if (y_bottom != 0) { this.label(" " + y_bottom.toString().substr(0, 4), 0, y_bottom); }
            y_bottom += grid_interval_y;
        }
        y_bottom = 0;
        while (y_bottom > -max_y - 5) {
            this.newLine(-500, y_bottom, 500, y_bottom);
            if (y_bottom != 0) { this.label(" " + y_bottom.toString().substr(0, 4), 0, y_bottom); }
            y_bottom -= grid_interval_y;
        }
        this.newLine(0, -1000 ,0,1000, "black", false, 1);
        this.newLine(-1000 ,0,1000, 0, "black", false, 1); 
    }
    
    this.draw = function (val) {
        
        return this.execPlugin(val);

    }

    this.power2 = function (a, m, p) {

        if (a == undefined) {
            a = 0;
        } else {
            a = parseFloat(a);
        }
        if (m == undefined) {
            m = 0;
        } else {
            m = parseFloat(m);
        }
        if (p == undefined) {
            p = 0;
        } else {
            p = parseFloat(p);
        }
        var start = -40;
        var last = parseFloat(a * Math.pow(start - m, 2) + p);
        while (start <= 40) {
            var from = [start, last];
            start += 0.002;
            last = parseFloat(a * Math.pow(start - m, 2) + p);
            this.newLine(from[0], from[1], start, last, this.color);
        }

        functions_informations[this.to_eval] = {
            "root1": this.getRoot(a, m, p, -1),
            "root2": this.getRoot(a, m, p, 1)
        }
    }
    this.getRoot = function (a, m, p, sign) {

        try {
            var res = (sign * Math.sqrt((-1 * p) / a)) + m;
            return res;
        } catch (error) {
            return NaN;
        }

    }
    this.toCan = function (a, b, c, val) {
        var first_exp = (b / a) * (1 / 2);
        var exp_2 = -a * Math.pow(first_exp, 2);
        exp_2 = (exp_2 + c);
        this.draw(a + "(x+" + first_exp + ")²+" + exp_2);
        //console.log(a + "(x+" + first_exp + ")²+" + exp_2);
    }

    this.vect = function (m) {
        var x = 0;
        var y = 0;
        var e = m[1].replace(/\-\(([0-9||\-||\.]+);([0-9||\-||\.]+)\)/i, function (all, x1, y1) {
            x1 = -parseFloat(x1);
            y1 = -parseFloat(y1);
            return '+(' + x1 + ';' + y1 + ')';
        })

        e = e.replace(/\-([0-9||\-||\.]+)\(([0-9||\-||\.]+);([0-9||\-||\.]+)\)/i, function (all, multi, x1, y1) {
            x1 = -parseFloat(x1);
            y1 = -parseFloat(y1);
            return '+' + multi + '(' + x1 + ';' + y1 + ')';
        })

        var vectors = e.split('+');

        for (var i = 0; i < vectors.length; i++) {
            var element = vectors[i];
            var matchs = element.match(/^\(([0-9||\-||\.]+);([0-9||\-||\.]+)\)$/i)
            if (matchs != null) {
                x += parseFloat(matchs[1]);
                y += parseFloat(matchs[2]);
            }

            matchs = element.match(/^([0-9||\-||\.]+)\(([0-9||\-||\.]+);([0-9||\-||\.]+)\)$/i)
            if (matchs != null) {
                x += parseFloat(matchs[2]) * parseFloat(matchs[1]);
                y += parseFloat(matchs[3]) * parseFloat(matchs[1]);
            }
        }

        if (m[2] != undefined) {
            var x_start_vector = m[2];
        } else {
            var x_start_vector = 0;
        }

        if (m[3] != undefined) {
            var y_start_vector = m[3];
        } else {
            var y_start_vector = 0;
        }
        this.newLine(x_start_vector, y_start_vector, parseFloat(x_start_vector) + x, parseFloat(y_start_vector) + y, this.color, true);
    }

    this.plugin = [
        [/^(([0-9]|\.)*)cos\((.*)\)([\+|\-]*)([0-9]*)$/i, function (m) {
            var $1 = m[1];
            var $2 = m[2];
            var $3 = m[3];
            var $4 = m[4];
            var $5 = m[5];
            if ($1 == "") {
                var big_times = 1;
            } else {
                var big_times = parseFloat($1);
            }
            if ($4 == "") {
                var add2 = 0;
            } else {
                if ($4 == "") {
                    var add2 = 0;
                } else {
                    var add2 = parseFloat($4 + $5);
                }
            }

            if ($3 == "") {
                alert('Une erreur est survenue : cos undefined');
                return;
            } else {
                var array_x = this.exec_and_sort($3);
            }

            var array = {
                times: big_times,
                inside: array_x,
                add2: add2
            }
            console.log(array);
            return this.cos(array);
        }],
        [/^(([0-9]|\.)*)sin\((.*)\)([\+|\-]*)([0-9]*)$/i, function (m) {
            var $1 = m[1];
            var $2 = m[2];
            var $3 = m[3];
            var $4 = m[4];
            var $5 = m[5];
            if ($1 == "") {
                var big_times = 1;
            } else {
                var big_times = parseFloat($1);
            }
            if ($4 == "") {
                var add2 = 0;
            } else {
                if ($4 == "") {
                    var add2 = 0;
                } else {
                    var add2 = parseFloat($4 + $5);
                }
            }

            if ($3 == "") {
                alert('Une erreur est survenue : cos undefined');
                return;
            } else {
                var array_x = this.exec_and_sort($3);
            }

            var array = {
                times: big_times,
                inside: array_x,
                add2: add2
            }
            console.log(array);
            return this.sin(array);
        }],
         [/^(([0-9]|\.)*)tan\((.*)\)([\+|\-]*)([0-9]*)$/i, function (m) {
            var $1 = m[1];
            var $2 = m[2];
            var $3 = m[3];
            var $4 = m[4];
            var $5 = m[5];
            if ($1 == "") {
                var big_times = 1;
            } else {
                var big_times = parseFloat($1);
            }
            if ($4 == "") {
                var add2 = 0;
            } else {
                if ($4 == "") {
                    var add2 = 0;
                } else {
                    var add2 = parseFloat($4 + $5);
                }
            }

            if ($3 == "") {
                alert('Une erreur est survenue : cos undefined');
                return;
            } else {
                var array_x = this.exec_and_sort($3);
            }

            var array = {
                times: big_times,
                inside: array_x,
                add2: add2
            }
            console.log(array);
            return this.tan(array);
        }],
        [
            /\[\((.+);(.+)\) \((.+);(.+)\)\]/i, function (m) {
                this.newLine(m[1], m[2], m[3], m[4], this.color);
            }
        ],
        [
            /y=x/i, function () {
                var start = -40;
                var last = parseFloat(start);
                while (start <= 40) {
                    var from = [start, last];
                    start += 0.002;
                    last = parseFloat(start);
                    this.newLine(from[0], from[1], start, last, this.color);
                }
            }
        ],
        [
            /y=\-1x/i, function () {
                var start = -40;
                var last = -parseFloat(start);
                while (start <= 40) {
                    var from = [start, last];
                    start += 0.002;
                    last = -parseFloat(start);
                    this.newLine(from[0], from[1], start, last, this.color);
                }
            }
        ],
        [
            /^vect\[(.+)\]\[\((.+);(.+)\)\]$/i, this.vect
        ],
        [
            /^vect\[(.+)\]$/i, this.vect
        ],
        [
            /^eval (.+)/i, function (m) {
                try {
                    var eval_r = eval(m[1]);
                    if (eval_r == "no-trace") {
                        return "no-trace";
                    }
                } catch (error) {
                    alert("Votre code javascript est incorrect" + error.message);
                    return "error";
                }
            }
        ], [
            /y=([0-9||\-||\.]+)x\+([0-9||\-||\.]+)/i, function (m) {

                m[1] = parseFloat(m[1]);
                m[2] = parseFloat(m[2]);

                var point1 = {
                    x: -1000,
                    y: 0
                }

                var point2 = {
                    x: 1000,
                    y: 0
                }

                point1.y = (m[1] * point1.x) + m[2];
                point2.y = (m[1] * point2.x) + m[2];

                //console.log(m);
                //console.log(point1);
                //console.log(point2);

                this.newLine(point1.x, point1.y, point2.x, point2.y, this.color);

            }
        ]
    ];
    this.execPlugin = function (val) {
        for (var i = 0; i < this.plugin.length; i++) {
            var element = this.plugin[i];

            var matchs = val.match(element[0]);

            if (matchs != null) {

                this.plugin_exec_function = element[1];
                var ex = this.plugin_exec_function(matchs);
                this.plugin_exec_function = function () { };

                return ex;
            }
        }

        var exp_processed = this.exec(val);

        if (exp_processed == "unknown expression") {
            return "error";
        } else {
            this.traceFromArray(exp_processed);
            return exp_processed;
        }


    }
    this.plugin_exec_function = function () { };

    this.cos = function (args) {

        var start = -200;
        var last = last = args.times * Math.cos(args.times2 * start + args.add1) + args.add2;
        var array = args.inside;
        while (start <= 200) {
            var from = [start, last];
            start += 0.002;
            last = args.times * Math.cos(function () {
                var result = 0;

                for (var i = 0; i < Object.keys(array).length; i++) {
                    var element = Object.keys(array)[i];
                    if (element == "~") {
                        if (array[element] != "") {
                            result += array[element];
                        }
                    } else if (element == "x") {
                        result += array[element] * start;
                    } else if (element.indexOf("^m") > 0) {
                        result += array[element] * (1 / Math.pow(start, parseFloat(element.split("^m")[1])));
                    } else {
                        result += array[element] * Math.pow(start, parseFloat(element.split("^")[1]));
                    }
                }

                return result;
            }()) + args.add2;
            this.newLine(from[0], from[1], start, last, this.color);
        }
    }

    this.sin = function (args) {

        var start = -200;
        var last = last = args.times * Math.sin(args.times2 * start + args.add1) + args.add2;
        var array = args.inside;
        while (start <= 200) {
            var from = [start, last];
            start += 0.002;
            last = args.times * Math.sin(function () {
                var result = 0;

                for (var i = 0; i < Object.keys(array).length; i++) {
                    var element = Object.keys(array)[i];
                    if (element == "~") {
                        if (array[element] != "") {
                            result += array[element];
                        }
                    } else if (element == "x") {
                        result += array[element] * start;
                    } else if (element.indexOf("^m") > 0) {
                        result += array[element] * (1 / Math.pow(start, parseFloat(element.split("^m")[1])));
                    } else {
                        result += array[element] * Math.pow(start, parseFloat(element.split("^")[1]));
                    }
                }

                return result;
            }()) + args.add2;
            this.newLine(from[0], from[1], start, last, this.color);
        }
    }


    this.tan = function () {
        var start = -200;
        while (start <= 200) {
            this.newPoint(start, Math.tan(start), this.color);
            start += 0.001;
        }
    }

    this.traceFromArray = function (array) {
        //console.log(array);
        var start = -150;
        var last = 0;
        while (start <= 150) {
            var from = [start, last];
            start += 0.002;
            last = function () {
                var result = 0;

                for (var i = 0; i < Object.keys(array).length; i++) {
                    var element = Object.keys(array)[i];
                    if (element == "~") {
                        if (array[element] != "") {
                            result += array[element];
                        }
                    } else if (element == "x") {
                        result += array[element] * start;
                    } else if (element.indexOf("^m") > 0) {
                        result += array[element] * (1 / Math.pow(start, parseFloat(element.split("^m")[1])));
                    } else {
                        result += array[element] * Math.pow(start, parseFloat(element.split("^")[1]));
                    }
                }

                return result;
            }();
            this.newLine(from[0], from[1], start, last, this.color);
        }
    }

    this.verify = function (exp) {

        var o_count = 0;
        var c_count = 0;

        for (var i = 0; i < exp.length; i++) {
            var char = exp[i];
            if (char == "(") {
                o_count++;

            } else if (char == ")") {
                c_count++;
            }
        }

        if (o_count == c_count) {
            return true;
        } else {
            return "Erreur de syntaxe";
        }

    }

    this.exec = function (expression) {
        //sconsole.log(expression);
        if (expression.indexOf('(') < 0) {
            return this.exec_and_sort(expression);
        } else {
            var ver = this.verify(expression);
            if (ver == true) {
                return this.parseExp(expression);
            } else {
                return 'Cette expression n\'est pas correcte : ' + ver;
            }
        }
    }

    this.index = 0;
    this.byIndexes = {};
    this.byIndexes2 = {};

    this.parseExp = function (exp) {

        if (exp[0] == "(") {
            exp = "1*" + exp;
        }

        var inside = "";
        var level = 0;
        for (var i = 0; i < exp.length; i++) {
            var char = exp[i];
            if (char == "(") {
                level++;
                if (level == 1) {
                    inside = "";
                } else {
                    inside += "(";
                }
            } else if (char == ")") {
                level--;
                if (level == 0) {
                    this.index++;
                    var index = this.index;
                    this.byIndexes["$" + index] = this.exec(inside);
                    this.byIndexes2["$" + index] = this.stringify(this.exec(inside));

                    //console.log("Exrpession " + this.byIndexes2["$" + index] + " has for index $" + index);

                    exp = exp.replace('(' + inside + ')', "$" + index);
                } else {
                    inside += ")";
                }
            } else {
                inside += char;
            }

        }
        //console.log(exp);
        return this.exec(exp);
    }

    this.exec_and_sort = function (expression) {
        if (expression.indexOf('-') == "0") {
            expression = "0" + expression;
        }
        expression = expression.replace(/²/g, "^2");
        expression = expression.replace(/³/g, "^3");
        expression = expression.replace(/\^\-/g, "^m");
        expression = expression.replace(/(\d|[a-z])\$/g, function (m, $1) {
            console.log('');
            return $1 + "*$";
        });
        expression = expression.replace(/(\d|[a-z])pi/g, function (m, $1) {
            console.log('');
            return $1 + "*pi";
        })
        console.log(expression);
        /*
        Séparation des + 
        */
        var sum_of = expression.split('+');
        var sum_result = {};

        for (var i = 0; i < sum_of.length; i++) {
            var element = sum_of[i];
            /*
            Séparation des -
            */
            var sub_of = element.split("-");
            var sub_result = {};

            for (var sub = 0; sub < sub_of.length; sub++) {
                var sube = sub_of[sub];
                /*
                Séparation des *
                */
                var mult_of = sube.split("*");

                var mult_result = {};

                for (var mult = 0; mult < mult_of.length; mult++) {
                    var multe = mult_of[mult];
                    var div_result = {};
                    var div_of = multe.split("/");
                    for (var div = 0; div < div_of.length; div++) {
                        var dive = div_of[div];
                        //Division ici
                        if (dive.indexOf("x") < 0) {
                            if (div == 0) {
                                if (dive.indexOf('$') == 0) {
                                    div_result = this.byIndexes[dive];
                                }else if(dive == "pi"){
                                    div_result["~"] = Math.PI;
                                } else {
                                    div_result["~"] = parseFloat(dive);
                                }
                            } else {
                                var x_keys = Object.keys(div_result);
                                for (var index = 0; index < x_keys.length; index++) {
                                    var xkey = x_keys[index];
                                    div_result[xkey] = parseFloat(div_result[xkey]) / parseFloat(dive);
                                }

                            }
                        } else {
                            if (div == 0) {
                                div_result[function () {

                                    if (dive.split('x')[1] != "") {
                                        return "x" + dive.split('x')[1];
                                    } else {
                                        return "x";
                                    }

                                }()] = function () {

                                    if (dive.split('x')[0] != "") {
                                        return parseFloat(dive.split('x')[0]);
                                    } else {
                                        return 1;
                                    }

                                }();
                            }
                        }

                    }

                    //console.log(div_result);

                    //Multiplication ici
                    if (mult == 0) {
                        mult_result = div_result;

                    } else {
                        /*console.log("Keys :",  keys, JSON.stringify(div_result));
                        console.log("Keys2 :",  mult_keys, JSON.stringify(mult_result));*/
                        var div_keys = Object.keys(div_result);
                        var mult_keys = Object.keys(mult_result);
                        var new_mult_result = {}

                        for (var index_mult_keys = 0; index_mult_keys < mult_keys.length; index_mult_keys++) {
                            var e_mult = mult_keys[index_mult_keys];
                            var number_of_e_mult = mult_result[e_mult];

                            for (var index_div_keys = 0; index_div_keys < div_keys.length; index_div_keys++) {
                                var e_div = div_keys[index_div_keys];
                                var number_of_e_div = div_result[e_div];

                                if (e_mult == "~" && e_div == e_mult) {
                                    var e_end_power = "~";
                                } else if (e_mult == "x" && e_div == e_mult) {
                                    var e_end_power = "x^2";
                                } else if (e_mult == "~" && e_div.indexOf('x') == 0) {
                                    var e_end_power = e_div;
                                } else if (e_div == "~" && e_mult.indexOf('x') == 0) {
                                    var e_end_power = e_mult;
                                } else if (e_div == "x" && "~" && e_mult.indexOf('x^') == 0) {
                                    var e_end_power = "x^" + (parseFloat(e_mult.replace("x^", "")) + 1);
                                } else if (e_mult == "x" && "~" && e_div.indexOf('x^') == 0) {
                                    var e_end_power = "x^" + (parseFloat(e_div.replace("x^", "")) + 1);
                                } else {
                                    var e_end_power = "x^" + (parseFloat(e_div.replace("x^", "")) + parseFloat(e_mult.replace("x^", "")));
                                }


                                if (new_mult_result[e_end_power] != undefined) {
                                    new_mult_result[e_end_power] += parseFloat(number_of_e_mult) * parseFloat(number_of_e_div);
                                } else {
                                    new_mult_result[e_end_power] = parseFloat(number_of_e_mult) * parseFloat(number_of_e_div);
                                }

                            }


                        }

                        mult_result = new_mult_result;
                    }
                }

                //Sourstraction ici
                if (sub == 0) {
                    sub_result = mult_result;
                } else {
                    var keys = Object.keys(mult_result);
                    for (var ixxxx = 0; ixxxx < keys.length; ixxxx++) {
                        var key = keys[ixxxx];
                        if (sub_result[key] != undefined) {
                            sub_result[key] = parseFloat(sub_result[key]) - parseFloat(mult_result[key]);
                        } else {
                            sub_result[key] = - parseFloat(mult_result[key]);
                        }
                    }
                }
            }
            //Somme ici
            if (i == 0) {
                sum_result = sub_result;
            } else {
                var keys = Object.keys(sub_result);
                for (var ixxxx = 0; ixxxx < keys.length; ixxxx++) {
                    var key = keys[ixxxx];
                    if (sum_result[key] != undefined) {
                        sum_result[key] = parseFloat(sum_result[key]) + parseFloat(sub_result[key]);
                    } else {
                        sum_result[key] = parseFloat(sub_result[key]);
                    }
                }
            }
        }

        return this.array_to_exp(sum_result);

    }

    this.array_to_exp = function (array) {
        return array;
    }

    this.stringify = function (array) {
        var text = "";

        var keys = Object.keys(array);//.sort().reverse()
        var new_keys = [];

        for (var i = 0; i < keys.length; i++) {
            var element = keys[i];
            if (element == "~") {

            } else {
                if (element.indexOf('x') == 0) {

                    if (element == "x") {
                        new_keys.push("1");
                    } else {
                        new_keys.push(element.replace('x^', ""));
                    }

                } else {
                    alert('Unknown error while parsing');
                }
            }

        }

        new_keys.sort().reverse()

        keys = [];

        for (var i = 0; i < new_keys.length; i++) {
            var key = new_keys[i];
            if (key == "1") {
                keys.push("x");
            } else {
                keys.push('x^' + key);
            }
        }

        for (var i = 0; i < keys.length; i++) {
            var element = keys[i];
            if (element == "~") {

            } else {
                if (array[element] != 1) {
                    var e = array[element] + "" + element

                } else {
                    var e = element;
                }

                text += e + "+";
            }

        }

        if (array["~"] != undefined) {
            text += array["~"];
        }

        text = text.replace('x^2+', "x²+");
        text = text.replace('x^3+', "x³+");
        text = text.replace('+-', "-");
        text = text.replace('--', "+");

        if (text[text.length - 1] == "+") {
            text += "end";
            text = text.replace('+end', "");
        }

        if (text == "x^2") {
            text = "x²";
        }

        if (text == "x^3") {
            text = "x³";
        }

        return text;
    }

    this.stats = {

        buffer: { tab: {} }

    }

    return this;
}