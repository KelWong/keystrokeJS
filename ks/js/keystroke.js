/***********************************************************
                       Keystroke.js
                        
 Wong Wing Hang 14081983D @ Polyu Bsc in Radiography, Minor in Computing
*************************************************!$)*!(*#D**/
var usrname = '';

function transpose(a) {
    return a[0].map(function (_, c) { return a.map(function (r) { return r[c]; }); });
}

var arr = {
    max: function (array) {
        return Math.max.apply(null, array);
    },

    min: function (array) {
        return Math.min.apply(null, array);
    },

    range: function (array) {
        return arr.max(array) - arr.min(array);
    },

    midrange: function (array) {
        return arr.range(array) / 2;
    },

    sum: function (array) {
        var num = 0;
        for (var i = 0, l = array.length; i < l; i++) num += array[i];
        return num;
    },

    mean: function (array) {
        return arr.sum(array) / array.length;
    },

    median: function (array) {
        array.sort(function (a, b) {
            return a - b;
        });
        var mid = array.length / 2;
        return mid % 1 ? array[mid - 0.5] : (array[mid - 1] + array[mid]) / 2;
    },

    modes: function (array) {
        if (!array.length) return [];
        var modeMap = {},
            maxCount = 0,
            modes = [];

        array.forEach(function (val) {
            if (!modeMap[val]) modeMap[val] = 1;
            else modeMap[val]++;

            if (modeMap[val] > maxCount) {
                modes = [val];
                maxCount = modeMap[val];
            }
            else if (modeMap[val] === maxCount) {
                modes.push(val);
                maxCount = modeMap[val];
            }
        });
        return modes;
    },

    variance: function (array) {
        var mean = arr.mean(array);
        return arr.mean(array.map(function (num) {
            return Math.pow(num - mean, 2);
        }));
    },

    standardDeviation: function (array) {
        return Math.sqrt(arr.variance(array));
    },

    meanAbsoluteDeviation: function (array) {
        var mean = arr.mean(array);
        return arr.mean(array.map(function (num) {
            return Math.abs(num - mean);
        }));
    },

    zScores: function (array) {
        var mean = arr.mean(array);
        var standardDeviation = arr.standardDeviation(array);
        return array.map(function (num) {
            return (num - mean) / standardDeviation;
        });
    }
};

function strokes(code, type, time) {
    this.code = code;
    this.type = type;
    this.time = time;
}


function findDownstroke(arr, elem) {
    for (var x = 0; x < arr.length; x++) {
        if (arr[x].stroke.code == elem && !arr[x].hadUp) {
            return x; //returning index if element found
        }
    }
    return -1;//returning -1 if element not found
}

function toChar(code) {
    var output = new String();
    var charCode = code;
    output = String.fromCharCode(charCode).toLowerCase();
    if (charCode == 8) output = "backspace";
    if (charCode == 9) output = "tab";
    if (charCode == 13) output = "enter";
    if (charCode == 16) output = "shift";
    if (charCode == 17) output = "ctrl";
    if (charCode == 18) output = "alt";
    if (charCode == 19) output = "pause/break";
    if (charCode == 20) output = "caps lock";
    if (charCode == 27) output = "escape";
    if (charCode == 33) output = "page up";
    if (charCode == 34) output = "page down";
    if (charCode == 35) output = "end";
    if (charCode == 36) output = "home";
    if (charCode == 37) output = "left arrow";
    if (charCode == 38) output = "up arrow";
    if (charCode == 39) output = "right arrow";
    if (charCode == 40) output = "down arrow";
    if (charCode == 45) output = "insert";
    if (charCode == 46) output = "delete";
    if (charCode == 91) output = "left window/command";
    if (charCode == 92) output = "right window/command";
    if (charCode == 93) output = "select key";
    if (charCode == 96) output = "numpad 0";
    if (charCode == 97) output = "numpad 1";
    if (charCode == 98) output = "numpad 2";
    if (charCode == 99) output = "numpad 3";
    if (charCode == 100) output = "numpad 4";
    if (charCode == 101) output = "numpad 5";
    if (charCode == 102) output = "numpad 6";
    if (charCode == 103) output = "numpad 7";
    if (charCode == 104) output = "numpad 8";
    if (charCode == 105) output = "numpad 9";
    if (charCode == 106) output = "multiply";
    if (charCode == 107) output = "add";
    if (charCode == 109) output = "subtract";
    if (charCode == 110) output = "decimal point";
    if (charCode == 111) output = "divide";
    if (charCode == 112) output = "F1";
    if (charCode == 113) output = "F2";
    if (charCode == 114) output = "F3";
    if (charCode == 115) output = "F4";
    if (charCode == 116) output = "F5";
    if (charCode == 117) output = "F6";
    if (charCode == 118) output = "F7";
    if (charCode == 119) output = "F8";
    if (charCode == 120) output = "F9";
    if (charCode == 121) output = "F10";
    if (charCode == 122) output = "F11";
    if (charCode == 123) output = "F12";
    if (charCode == 144) output = "num lock";
    if (charCode == 145) output = "scroll lock";
    if (charCode == 186) output = ";";
    if (charCode == 187) output = "=";
    if (charCode == 188) output = ",";
    if (charCode == 189) output = "-";
    if (charCode == 190) output = ".";
    if (charCode == 191) output = "/";
    if (charCode == 192) output = "`";
    if (charCode == 219) output = "[";
    if (charCode == 220) output = "\\";
    if (charCode == 221) output = "]";
    if (charCode == 222) output = "'";
    if (charCode == 32) output = "space";
    return output;
}

//Constructor defining Keystroke object structure
function Keystroke() {
    //initialize
    this.myLineChart = [];
    this.myftChart = [];
    this.inputtext = '';
    this.downstrokeCount = 0;
    this.upstrokeCount = 0;
    this.dwellTimes = [];
    this.flightTimes = [];
    this.trainDT = [];
    this.trainFT = [];
    //all and downStrokes events and times
    this.all = [];
    this.downStrokes = [];
    this.upStrokes = [];
    //stores all the letters typed
    this.all_letters = [];
    this.inputCount = 0;

    this.train = function () {
        this.inputtext = $('#ksInput').val();
        if (this.inputtext == 'biometrics' && this.downstrokeCount == 10) {
            $("#alert_bad").hide();
            $("#alert_good").hide();
            $("#alert_good").fadeIn();
            this.inputCount++;
            $('#traincount').text(this.inputCount * 10 + '%');
            $('.progress-bar').css('width', this.inputCount * 10 + '%').attr('aria-valuenow', this.inputCount * 10);
            this.trainDT[this.inputCount - 1] = this.dwellTimes;
            this.trainFT[this.inputCount - 1] = this.flightTimes;
            this.reset();
            console.log(this.trainDT);
            console.log(this.trainFT);
            $('#ksInput').val('');

            //plot graph
            var ctx = $("#dtChart");
            Chart.defaults.global.legend.position = 'right';
            color_bg = ["rgba(75,192,192,0.4)", "rgba(201,224,150,0.4)", "rgba(225,172,145,0.4)", "rgba(157,159,160,0.4)", "rgba(129,207,159,0.4)", "rgba(139,190,232,0.4)", "rgba(232,136,136,0.4)", "rgba(22,78,127,0.4)", "rgba(63,104,71,0.4)", "rgba(155,155,93,0.4)"];
            color = ["rgba(75,192,192,1)", "rgba(201,224,150,1)", "rgba(225,172,145,1)", "rgba(157,159,160,1)", "rgba(129,207,159,1)", "rgba(139,190,232,1)", "rgba(232,136,136,1)", "rgba(22,78,127,1)", "rgba(63,104,71,1)", "rgba(155,155,93,1)"];
            lineChartData = {}; //declare an object
            lineChartData.labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']; //add 'labels' element to object (X axis)
            lineChartData.datasets = []; //add 'datasets' array element to object
            for (line = 0; line < this.trainDT.length; line++) {
                lineChartData.datasets.push({}); //create a new line dataset
                dataset = lineChartData.datasets[line];
                dataset.label = (line + 1);
                dataset.lineTension = 0.1;
                dataset.backgroundColor = color_bg[line];
                dataset.borderColor = color[line];
                dataset.borderCapStyle = 'butt';
                dataset.borderDash = [];
                dataset.fill = false;
                dataset.borderDashOffset = 0.0;
                dataset.borderJoinStyle = 'miter';
                dataset.pointBorderColor = color[line];
                dataset.pointBackgroundColor = "#fff";
                dataset.pointBorderWidth = 1;
                dataset.pointHoverRadius = 5;
                dataset.pointHoverBackgroundColor = color[line];
                dataset.pointHoverBorderColor = "rgba(220,220,220,1)";
                dataset.pointHoverBorderWidth = 2;
                dataset.pointRadius = 1;
                dataset.pointHitRadius = 10;
                dataset.data = this.trainDT[line];
            }

            var ctx_1 = $("#ftChart");
            ftChartData = {}; //declare an object
            ftChartData.labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9']; //add 'labels' element to object (X axis)
            ftChartData.datasets = []; //add 'datasets' array element to object
            for (line = 0; line < this.trainDT.length; line++) {
                ftChartData.datasets.push({}); //create a new line dataset
                dataset = ftChartData.datasets[line];
                dataset.label = (line + 1);
                dataset.lineTension = 0.1;
                dataset.backgroundColor = color_bg[line];
                dataset.borderColor = color[line];
                dataset.borderCapStyle = 'butt';
                dataset.borderDash = [];
                dataset.fill = false;
                dataset.borderDashOffset = 0.0;
                dataset.borderJoinStyle = 'miter';
                dataset.pointBorderColor = color[line];
                dataset.pointBackgroundColor = "#fff";
                dataset.pointBorderWidth = 1;
                dataset.pointHoverRadius = 5;
                dataset.pointHoverBackgroundColor = color[line];
                dataset.pointHoverBorderColor = "rgba(220,220,220,1)";
                dataset.pointHoverBorderWidth = 2;
                dataset.pointRadius = 1;
                dataset.pointHitRadius = 10;
                dataset.data = this.trainFT[line];; //send new line data to dataset
            }
            if (this.inputCount == 1) {
                this.myLineChart = new Chart(ctx, {
                    options: {
                        responsive: false,
                        width: 500,
                        height: 300,
                        title: {
                            display: true,
                            text: 'Dwell Time'
                        }
                    },
                    type: 'line',
                    data: lineChartData,
                });
                this.myftChart = new Chart(ctx_1, {
                    options: {
                        responsive: false,
                        width: 500,
                        height: 300,
                        title: {
                            display: true,
                            text: 'Flight Time'
                        }
                    },
                    type: 'line',
                    data: ftChartData,
                });
            }
            else {
                this.myLineChart.destroy();
                this.myLineChart = new Chart(ctx, {
                    options: {
                        responsive: false,
                        width: 500,
                        height: 300,
                        title: {
                            display: true,
                            text: 'Dwell Time'
                        }
                    },
                    type: 'line',
                    data: lineChartData,
                });
                this.myftChart.destroy();
                this.myftChart = new Chart(ctx_1, {
                    options: {
                        responsive: false,
                        width: 500,
                        height: 300,
                        title: {
                            display: true,
                            text: 'Flight Time'
                        }
                    },
                    type: 'line',
                    data: ftChartData,
                });

            }
        } else {
            this.reset();
            $("#alert_good").hide();
            $("#alert_bad").hide();
            $("#alert_bad").fadeIn();
            $('#ksInput').val('');
        }
        if (this.inputCount == 10) {
            $('.progress-bar').attr('class', 'progress-bar progress-bar-success');
            $("#ksInput").prop('disabled', true);
            setTimeout(function () { $('#onSuccessModal').modal('toggle'); }, 1000);
            var ks = this;
            $("#modal_verify").click(function () {
                ks.verify();
            });
        }

    }
    this.verify = function () {
        $("#train").hide();
        $('#verify').fadeIn();
        var ks_verify = new Keystroke();
        ks_verify.listen("ksInput_1");
        var ks = this;
        $('#verify .btn-signin').click(function () {
            ks_verify.inputtext = $('#ksInput_1').val();
            if (ks_verify.inputtext == 'biometrics' && ks_verify.downstrokeCount == 10) {
                ks.gen_graph(ks_verify.dwellTimes, ks_verify.flightTimes);
                ks.result(ks_verify.dwellTimes, ks_verify.flightTimes);
                ks_verify.reset();
                $('#ksInput_1').val('');
            } else {
                ks_verify.reset();
                $('#ksInput_1').val('');
            }
        });

        $("#ksInput_1").keyup(function (event) {
            if (event.which == 13) {
                ks_verify.inputtext = $('#ksInput_1').val();
                if (ks_verify.inputtext == 'biometrics' && ks_verify.downstrokeCount == 10) {
                    ks.gen_graph(ks_verify.dwellTimes, ks_verify.flightTimes);
                    ks.result(ks_verify.dwellTimes, ks_verify.flightTimes);
                    ks_verify.reset();
                    $('#ksInput_1').val('');
                } else {
                    ks_verify.reset();
                    $('#ksInput_1').val('');
                }
            };
        });


    }

    this.gen_graph = function (trialDT, trialFT) {

        var DT = transpose(this.trainDT);
        var FT = transpose(this.trainFT);

        var lowerDT = [];
        var upperDT = [];
        var lowerFT = [];
        var upperFT = [];
        for (var i = 0; i < DT.length; i++) {
            lowerDT[i] = arr.mean(DT[i]) - arr.standardDeviation(DT[i]) * 2;
            upperDT[i] = arr.mean(DT[i]) + arr.standardDeviation(DT[i]) * 2;
        }
        for (var i = 0; i < FT.length; i++) {
            lowerFT[i] = arr.mean(FT[i]) - arr.standardDeviation(FT[i]) * 2;
            upperFT[i] = arr.mean(FT[i]) + arr.standardDeviation(FT[i]) * 2;
        }
        //plot graph
        this.myLineChart.destroy();

        var ctx = $("#dtprofChart");
        //plugin for fill color between two lines
        var fillBetweenLinesPlugin = {
            afterDatasetsDraw: function (chart) {
                var ctx = chart.chart.ctx;
                var xaxis = chart.scales['x-axis-0'];
                var yaxis = chart.scales['y-axis-0'];
                var datasets = chart.data.datasets;
                ctx.save();

                for (var d = 0; d < datasets.length; d++) {
                    var dataset = datasets[d];
                    if (dataset.fillBetweenSet == undefined) {
                        continue;
                    }

                    // get meta for both data sets
                    var meta1 = chart.getDatasetMeta(d);
                    var meta2 = chart.getDatasetMeta(dataset.fillBetweenSet);

                    ctx.beginPath();

                    // vars for tracing
                    var curr, prev;

                    // trace set1 line
                    for (var i = 0; i < meta1.data.length; i++) {
                        curr = meta1.data[i];
                        if (i === 0) {
                            ctx.moveTo(curr._view.x, curr._view.y);
                            ctx.lineTo(curr._view.x, curr._view.y);
                            prev = curr;
                            continue;
                        }
                        if (curr._view.steppedLine === true) {
                            ctx.lineTo(curr._view.x, prev._view.y);
                            ctx.lineTo(curr._view.x, curr._view.y);
                            prev = curr;
                            continue;
                        }
                        if (curr._view.tension === 0) {
                            ctx.lineTo(curr._view.x, curr._view.y);
                            prev = curr;
                            continue;
                        }

                        ctx.bezierCurveTo(
                            prev._view.controlPointNextX,
                            prev._view.controlPointNextY,
                            curr._view.controlPointPreviousX,
                            curr._view.controlPointPreviousY,
                            curr._view.x,
                            curr._view.y
                        );
                        prev = curr;
                    }


                    // connect set1 to set2 then BACKWORDS trace set2 line
                    for (var i = meta2.data.length - 1; i >= 0; i--) {
                        curr = meta2.data[i];
                        if (i === meta2.data.length - 1) {
                            ctx.lineTo(curr._view.x, curr._view.y);
                            prev = curr;
                            continue;
                        }
                        if (curr._view.steppedLine === true) {
                            ctx.lineTo(prev._view.x, curr._view.y);
                            ctx.lineTo(curr._view.x, curr._view.y);
                            prev = curr;
                            continue;
                        }
                        if (curr._view.tension === 0) {
                            ctx.lineTo(curr._view.x, curr._view.y);
                            prev = curr;
                            continue;
                        }

                        // reverse bezier
                        ctx.bezierCurveTo(
                            prev._view.controlPointPreviousX,
                            prev._view.controlPointPreviousY,
                            curr._view.controlPointNextX,
                            curr._view.controlPointNextY,
                            curr._view.x,
                            curr._view.y
                        );
                        prev = curr;
                    }

                    ctx.closePath();
                    ctx.fillStyle = dataset.fillBetweenColor || "rgba(0,0,0,0.1)";
                    ctx.fill();
                }
            } // end afterDatasetsDraw
        }; // end fillBetweenLinesPlugin

        this.myftChart.destroy();
        Chart.pluginService.register(fillBetweenLinesPlugin);
        this.myLineChart = new Chart(ctx, {
            options: {
                responsive: false,
                width: 500,
                height: 400,
                title: {
                    display: true,
                    text: 'Dwell Time Accept Range'
                }
            },
            type: 'line',
            data: {
                labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                datasets: [
                    {
                        label: "95% CI",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: upperDT,
                        spanGaps: false,
                        fillBetweenSet: 1,
                        fillBetweenColor: "rgba(75,192,192, 0.2)"
                    }, {
                        label: "95% CI",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: lowerDT,
                        spanGaps: false,
                    }, {
                        label: "Trial",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(255,12,12,0.4)",
                        borderColor: "rgba(255,12,12,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(255,12,12,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(255,12,12,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: trialDT,
                        spanGaps: false,
                    }

                ]
            }
        });
        var ctx_1 = $("#ftprofChart");
        this.myftChart = new Chart(ctx_1, {
            options: {
                responsive: false,
                width: 500,
                height: 400,
                title: {
                    display: true,
                    text: 'Flight Time Accept Range'
                }
            },
            type: 'line',
            data: {
                labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                datasets: [
                    {
                        label: "95% CI",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: upperFT,
                        spanGaps: false,
                        fillBetweenSet: 1,
                        fillBetweenColor: "rgba(75,192,192, 0.2)"
                    }, {
                        label: "95% CI",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: lowerFT,
                        spanGaps: false,
                    },
                    {
                        label: "Trial",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(255,12,12,0.4)",
                        borderColor: "rgba(255,12,12,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(255,12,12,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(255,12,12,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: trialFT,
                        spanGaps: false,
                    }

                ]
            }
        });
    }
    this.result = function (trialDT, trialFT) {

        var validity = 0;
        var DT = transpose(this.trainDT);
        var FT = transpose(this.trainFT);

        var lowerDT = [];
        var upperDT = [];
        var lowerFT = [];
        var upperFT = [];
        for (var i = 0; i < DT.length; i++) {
            lowerDT[i] = arr.mean(DT[i]) - arr.standardDeviation(DT[i]) * 2;
            upperDT[i] = arr.mean(DT[i]) + arr.standardDeviation(DT[i]) * 2;
        }
        for (var i = 0; i < FT.length; i++) {
            lowerFT[i] = arr.mean(FT[i]) - arr.standardDeviation(FT[i]) * 2;
            upperFT[i] = arr.mean(FT[i]) + arr.standardDeviation(FT[i]) * 2;
        }
        for (var i = 0; i < trialDT.length; i++) {
            if (trialDT[i] >= lowerDT[i] && trialDT[i] <= upperDT[i]) {
                // fall with in 95%, full 
                validity = validity + 100 / 19;
            } else {
                if (trialDT[i] <= lowerDT[i]) {
                    if ((lowerDT[i] - trialDT[i]) <= (upperDT[i] - lowerDT[i]) / 4 * 3)
                        // fall outside, error/3rd sd * 100/19
                        validity = validity + 100 / 19 * (1 - (lowerDT[i] - trialDT[i]) / (upperDT[i] - lowerDT[i]) / 4 * 3);
                } else {
                    if ((trialDT[i] - upperDT[i]) <= (upperDT[i] - lowerDT[i]) / 4 * 3)
                        validity = validity + 100 / 19 * (1 - (trialDT[i] - upperDT[i]) / (upperDT[i] - lowerDT[i]) / 4 * 3);
                }
            }
        }
        for (var i = 0; i < trialFT.length; i++) {
            if (trialFT[i] >= lowerFT[i] && trialFT[i] <= upperFT[i]) {
                validity = validity + 100 / 19;
            } else {
                if (trialFT[i] <= lowerFT[i]) {
                    if (Math.abs(lowerFT[i] - trialFT[i]) <= (upperFT[i] - lowerFT[i]) / 4 * 3)
                        // fall outside, error/3rd sd * 100/19
                        validity = validity + 100 / 19 * (1 - Math.abs(lowerFT[i] - trialFT[i]) / (upperFT[i] - lowerFT[i]) / 4 * 3);

                } else {
                    if (Math.abs(trialFT[i] - upperFT[i]) <= (upperFT[i] - lowerFT[i]) / 4 * 3)
                        validity = validity + 100 / 19 * (1 - Math.abs(trialFT[i] - upperFT[i]) / (upperFT[i] - lowerFT[i]) / 4 * 3);

                }
            }
        }
        validity = validity.toFixed(2);
        if (validity >= 90) {
            swal({
                title: "Hi, " + usrname + "!",
                showCancelButton: true,
                text: "We have recognized you!",
                type: "success",
                cancelButtonText: "How!?",
                closeOnCancel: true
            }, function (isConfirm) {
                if (!isConfirm) $('#resultModal').modal('toggle');
            });
        } else if (validity > 70) {
            swal({
                title: "Login Failed!",
                showCancelButton: true,
                text: "Most of your keystrokes matched with the database, but it's not enough to verify. Please try again!",
                type: "warning",
                confirmButtonText: "Retry",
            });
        }
        else {
            swal({
                title: "Access Denied!",
                text: "You are definitely <b>NOT</b> " + usrname + ".",
                type: "error",
                confirmButtonText: "Why?",
                closeOnConfirm: true,
                html: true
            }, function () { $('#resultModal').modal('toggle'); });

        }

        $('#resultModal .modal-title').text("Your validity score: " + validity);
    }
    this.reset = function () {
        console.log("reset");
        //initialize
        this.inputtext = '';
        this.downstrokeCount = 0;
        this.upstrokeCount = 0;
        this.dwellTimes = [];
        this.flightTimes = [];
        //all and downStrokes events and times
        this.all = [];
        this.downStrokes = [];
        this.upStrokes = [];
        //stores all the letters typed
        this.all_letters = [];
    }

}
//member functions of Keystroke
Keystroke.prototype = {
    constructor: Keystroke,
    listen: function (identity) {
        var ks = this;
        console.log("Listening at: #" + identity);
        $('#' + identity).keyup(function (event) {
            //console.log("Keyup! @" + event.which);
            if (event.which != 13) { //non enter key
                ks.upstrokeCount++;
                ks.all.push(new strokes(event.which, "keyup", event.timeStamp));
                ks.upStrokes.push({ stroke: new strokes(event.which, "keyup", event.timeStamp), count: ks.upstrokeCount });

                //update dwelltime
                var i = findDownstroke(ks.downStrokes, event.which);
                if (i != -1) {
                    ks.downStrokes[i].hadUp = true;
                    ks.dwellTimes[i] = event.timeStamp - ks.downStrokes[i].stroke.time;
                    console.log("dwell time is " + ks.dwellTimes[i]);
                    $("#ds_" + (i + 1) + ' [name=dwelltime]').text(Math.round(ks.dwellTimes[i])).fadeIn();
                }
                //update negative flight time
                if (ks.downstrokeCount > ks.upstrokeCount) {
                    ks.flightTimes[ks.flightTimes.length] = ks.downStrokes[ks.flightTimes.length].stroke.time - event.timeStamp;
                    $("#sq_" + ks.flightTimes.length + ' [name=flighttime]').text(Math.round(ks.flightTimes[ks.flightTimes.length - 1])).fadeIn();
                }
                //key up/down table
                $("#result_table").find('tbody')
                    .append($('<tr>')
                        .append($('<td>').text(event.which))
                        .append($('<td>').text(toChar(event.which)))
                        .append($('<td>').text("Key Up"))
                        .append($('<td>').text(Math.round(event.timeStamp))).hide().fadeIn()
                    )
            }
            else {
                // Enter key is pressed
            }
        })
            .keydown(function (event) {
                //console.log("Keydown! @" + event.which)
                if (event.which != 13) {
                    ks.downstrokeCount++;
                    ks.downStrokes.push({ stroke: new strokes(event.which, "keydown", event.timeStamp), count: ks.downstrokeCount, hadUp: false, hadFlight: false });
                    console.log(ks.downStrokes)
                    ks.all.push(new strokes(event.which, "keydown", event.timeStamp));

                    //key up/down table
                    $("#result_table").find('tbody')
                        .append($('<tr class="bg-info">')
                            .append($('<td>').text(event.which))
                            .append($('<td>').text(toChar(event.which)))
                            .append($('<td>').text("Key Down"))
                            .append($('<td>').text(Math.round(event.timeStamp)).hide().fadeIn())
                        );
                    // inititalize for dwell time   
                    $("#result_table_1").find('tbody')
                        .append($('<tr>').attr('id', 'ds_' + ks.downstrokeCount)
                            .append($('<td>').text(ks.downstrokeCount))
                            .append($('<td>').text(event.which))
                            .append($('<td>').text(toChar(event.which)))
                            .append($('<td>').attr('name', 'dwelltime').hide().fadeIn())
                        );
                    if (ks.downstrokeCount > 1) {
                        $("#result_table_2").find('tbody')
                            .append($('<tr>').attr('id', 'sq_' + (ks.downstrokeCount - 1))
                                .append($('<td>').text(ks.downstrokeCount - 1))
                                .append($('<td>').text(ks.downStrokes[ks.downstrokeCount - 2].stroke.code + ', ' + event.which))
                                .append($('<td>').text(toChar(ks.downStrokes[ks.downstrokeCount - 2].stroke.code) + ',' + toChar(event.which)))
                                .append($('<td>').attr('name', 'flighttime').hide().fadeIn())
                            );
                    }
                    // flight time 
                    if ((ks.downstrokeCount - ks.upstrokeCount) == 1 && ks.downstrokeCount > 1) {
                        ks.flightTimes[ks.upstrokeCount - 1] = event.timeStamp - ks.upStrokes[ks.upstrokeCount - 1].stroke.time;
                        $("#sq_" + ks.flightTimes.length + ' [name=flighttime]').text(Math.round(ks.flightTimes[ks.flightTimes.length - 1])).fadeIn();
                        console.log("Flight time:" + ks.flightTimes[ks.upstrokeCount - 1] + ',' + ks.upstrokeCount);
                    }
                }
                else {
                    //enter is presseed
                    event.preventDefault();

                }

            });
    }



};
$(document).ready(function () {
    var ks = new Keystroke();
    ks.listen("ksInput");
    $("#ksInput").keyup(function (event) {
        if (event.which == 13) {
            $('#ksInput').tooltip("destroy")
            ks.train();
        };
    });

    $("#alert_good").hide();
    $("#alert_bad").hide();
    $('#verify').hide();
    //$('#onLoadModal').modal('toggle');

    swal({
        title: "Welcome!",
        text: "Please tell us your name :)",
        type: "input",
        showCancelButton: false,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "Name"
    },
        function (inputValue) {
            if (inputValue === false) return false;

            if (inputValue === "") {
                swal.showInputError("You need to write something!");
                return false
            }
            usrname = inputValue;
            $('#profile-name').text("Login as: " + usrname);
            swal({
                title: "Hi, " + usrname,
                text: "This is an authentication system based on your typing behaviour.",
                confirmButtonText:"Let's start!",
            }, function () {
                    $('#ksInput').tooltip({title: 'Type "biometrics" and press enter. Repeat 10 times to train the system.', trigger: "focus", animation: true,placement:"bottom"}); 
                    setTimeout(function(){$('#ksInput').focus();},500);
                });
                 
        });
})