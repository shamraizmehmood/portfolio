function historicData() {
    fetch("../javascript/forcaster.json")
        .then(res => res.json())
        .then(data => {
            let ArrayOfMonth = [];
            let ArrayOfyear = [];
            let gas = [];
            let Electricity = [];
            let Liquid_fuels = [];
            let Solid_fuels = [];
            var select = document.getElementById('dropdown-year')
            for (let i in data) {
                if (!ArrayOfyear.includes(data[i]["Year"])) {
                    ArrayOfyear.push(data[i]["Year"])
                }
            }
            for (let i in ArrayOfyear) {
                var option = document.createElement('option');
                option.text = option.value = ArrayOfyear[i];
                select.add(option, 0);
            }
            for (let i = 0; i < 12; i++) {
                gas.push(parseFloat(data[i]["Gas"].toFixed(1)));
                Electricity.push(parseFloat(data[i]["Electricity"].toFixed(1)));
                Liquid_fuels.push(parseFloat(data[i]["Liquid_fuels"].toFixed(1)));
                Solid_fuels.push(parseFloat(data[i]["Solid_fuels"].toFixed(1)));

            }
            const ctx = document.getElementById('myChart');

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['jan', 'feb', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Electricity',
                        data: Electricity,
                        borderWidth: 1
                    },
                    {
                        label: 'Gas',
                        data: gas,
                        borderWidth: 1
                    },
                    {
                        label: 'Solid_fuels',
                        data: Solid_fuels,
                        borderWidth: 1
                    },
                    {
                        label: Liquid_fuels,
                        data: Liquid_fuels,
                        borderWidth: 1
                    }
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: false
                        }
                    }
                }
            });
        })
}

function updateData() {
    document.getElementById('graphContainer').style.display = '';
    document.getElementById('graphContainer2').style.display = 'none';

    fetch("../javascript/forcaster.json")
        .then(res => res.json())
        .then(data => {

            let ArrayOfMonth = [];
            let ArrayOfyear = [];
            let gas = [];
            let Electricity = [];
            let Liquid_fuels = [];
            let Solid_fuels = [];
            var selectYear = document.getElementById("dropdown-year");
            let valued = selectYear.value;
            for (let i in data) {
                if (data[i]['Year'] == valued) {
                    gas.push(parseFloat(data[i]["Gas"].toFixed(1)));
                    Electricity.push(parseFloat(data[i]["Electricity"].toFixed(1)));
                    Liquid_fuels.push(parseFloat(data[i]["Liquid_fuels"].toFixed(1)));
                    Solid_fuels.push(parseFloat(data[i]["Solid_fuels"].toFixed(1)));
                }
            }

            let chartExist = Chart.getChart('myChart')
            chartExist.destroy();

            const ctx = document.getElementById('myChart');

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['jan', 'feb', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Electricity',
                        data: Electricity,
                        borderWidth: 1
                    },
                    {
                        label: 'Gas',
                        data: gas,
                        borderWidth: 1
                    },
                    {
                        label: 'Solid_fuels',
                        data: Solid_fuels,
                        borderWidth: 1
                    },
                    {
                        label: 'Liquid_fuels',
                        data: Liquid_fuels,
                        borderWidth: 1
                    }
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: false
                        }
                    }
                }
            });
        })
}

function manipulation(max, min, arr) {
    let final = [];
    let percentage = Math.round((max - min) / max) * 100 / 100;
    let percent = (percentage * max);
    for (let a in arr) {
        addion = (parseFloat(percent) + parseFloat(arr[a])).toFixed(1);
        final.push(parseFloat(addition));
    }
    return final
}

function prediction() {
    document.getElementById('graphContainer2').style.display = '';
    document.getElementById('graphContainer').style.display = 'none';

    fetch("../javascript/forcaster.json")
        .then(res => res.json())
        .then(data => {
            let temp = 0
            let ArrayOfMonth = [];
            let ArrayOfyear = [];
            let gas = [];
            let Electricity = [];
            let Liquid_fuels = [];
            let Solid_fuels = [];
            var selectYear = document.getElementById("dropdown-year");
            let valued = selectYear.value;
            for (let i in data.reverse()) {
                if (data[i]['Year'] == valued) {
                    gas.push(parseFloat(data[i]["Gas"].toFixed(1)));
                    Electricity.push(parseFloat(data[i]["Electricity"].toFixed(1)));
                    Liquid_fuels.push(parseFloat(data[i]["Liquid_fuels"].toFixed(1)));
                    Solid_fuels.push(parseFloat(data[i]["Solid_fuels"].toFixed(1)));
                    ArrayOfMonth.push(i["Month"]);
                    temp++
                    if (temp > 11) break;
                }
            }
            let colculated = [gas, Solid_fuels, Liquid_fuels, Electricity];
            for (let i = 0; i < 4; i++) {
                colculated.splice(i, 1, manipulation(Math.max(...colculated[i], Math.min(...colculated[i]), colculated[i])));
            }

            ArrayOfMonth = ArrayOfMonth.reverse()
            let chartExist = Chart.getChart('myChart2')
            if (chartExist) {
            chartExist.destroy();
            }

            const ctx2 = document.getElementById('myChart2');

            new Chart(ctx2, {
                type: 'line',
                data: {
                    labels: ['jan', 'feb', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Electricity',
                        data: Electricity,
                        borderWidth: 1
                    },
                    {
                        label: 'Gas',
                        data: gas,
                        borderWidth: 1
                    },
                    {
                        label: 'Solid_fuels',
                        data: Solid_fuels,
                        borderWidth: 1
                    },
                    {
                        label: 'Liquid_fuels',
                        data: Liquid_fuels,
                        borderWidth: 1
                    }
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: false
                        }
                    }
                }
            });
        });
}
