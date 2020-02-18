// Constants
const DINGUS_PRICE = 14.25;
const WIDGET_PRICE = 9.99;
const ZERO_FORMAT = '0.00';
const DEBUG = true; // Where might this flag be used? (It's not mandatory)

// Global store (What else would you need here?)
let store = {
  orderHistory:[],
  barChart:[],
};
let increment = 0;

function generateEntries() {
	// Returns an orderHistory array
	// [ID#, Date, Dingus quantity, Widget quantity]
	return [
	  [1, '01/01/2020', 1, 1], 
	  [2, '01/02/2020', 2, 2]
	]
}


localStorage.clear()

var barChart;

window.onload = function() {
	var old
	let saved = JSON.parse(localStorage.getItem('items'))
	// console.log(saved)
	var cols = this.generateEntries()[0].length;

	if(saved == null){
		old = this.generateEntries()}
	else{
		old = generateEntries().concat(saved)
	}
	
	var tbody = document.getElementById('newData');

	for(i = 0; i < old.length; i++){
		
		increment++;
		row = tbody.insertRow();
		inc1 = document.getElementById('dingDash');
		
		topDing = document.getElementById('dingDash').innerHTML;
	
		inc2 = document.getElementById('widgetDash');
		topWidg = document.getElementById('widgetDash').innerHTML;


		for(x = 0; x < old[0].length+1; x++){
			if(x == cols){
				var last_cell = row.insertCell(-1);
				last_cell.style.textAlign = 'center'
				var updated_tot = (DINGUS_PRICE*old[i][2]) + (WIDGET_PRICE*old[i][3])
				updated_tot = updated_tot.toFixed(2);
				last_cell.innerHTML = updated_tot;

				var top4 = document.getElementById('totalDash');
				var topsal = document.getElementById('totalDash').innerHTML;
				top4.innerHTML = (Number(topsal) + this.Number(updated_tot)).toFixed(2);
			}
			else{
				col = row.insertCell();
				col.innerHTML = old[i][x]
				inc1.innerHTML = Number(topDing) + Number(old[i][2]);
				inc2.innerHTML = Number(topWidg) + Number(old[i][3])
				col.style.textAlign = 'center'
			}
		}
	}

	var firstColumn = document.querySelectorAll("table tr td:first-child");
	for(y = 0; y < old.length; y++){
		firstColumn[y].classList.add('gray_cols');
	}

	// this.barChart;
	this.createPie();
	// this.createBar();
	// this.barChart
	if(store.barChart.length == 0){
	
		this.createBar()
		// console.log('hello')
	}
	else{
		// console.log(arr.slice(-1)[0])
		
	}
}

// this.createBar();



document.addEventListener("DOMContentLoaded", function(event) {
	document.getElementById('orderBut').disabled = true;
});

function inputVals() {
	var nameInput = document.getElementById('dingus').value;
	var nameInput2 = document.getElementById('widget').value;
	if ((nameInput <= 0 && nameInput2 <= 0) | (nameInput == '' | nameInput2=='')){
		document.getElementById('orderBut').disabled = true;
	} else {
			document.getElementById('orderBut').disabled = false;
	}
	if(nameInput >=0 || nameInput2 >=0){
		document.getElementById('dingusTot').value = (nameInput*DINGUS_PRICE).toFixed(2);
		document.getElementById('widgetTot').value = (nameInput2*WIDGET_PRICE).toFixed(2);
		var val = nameInput*DINGUS_PRICE + nameInput2*WIDGET_PRICE;
		document.getElementById('total').value = val.toFixed(2);
	}
}

function cancel() {
	var nameInput = document.getElementById('dingus').value = 0;
	var nameInput2 = document.getElementById('widget').value = 0;
	var order = document.getElementById('orderBut').disabled = true;
	var total = document.getElementById('total').value = '0.00'
}

function update() {
	// Creating variables
	var tbody = document.getElementById('newData');
	row = tbody.insertRow();

	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0');
	var yyyy = today.getFullYear();
	today = mm + '/' + dd + '/' + yyyy;

	var dingQuant = document.getElementById('dingus').value;
	var widgetQuant = document.getElementById('widget').value;
	var val = dingQuant*DINGUS_PRICE + widgetQuant*WIDGET_PRICE;
	var total = document.getElementById('total').value = val.toFixed(2);
	increment++
	lst = [increment, today, dingQuant, widgetQuant, total]

	store.orderHistory.push(lst);
	// localStorage.setItem('items', JSON.stringify(lst));
	// increment++
	// creating row with variables
	for(x = 0; x < lst.length; x++){
		col = row.insertCell();
		col.innerHTML = lst[x];
		col.style.textAlign = 'center';
		
		if(x == 0){
			col.classList.add('gray_cols')
		}
	}
	
	// Incrementing the Dashboard
	var inc1 = parseInt(document.getElementById('dingDash').innerHTML)
	inc1 += parseInt(dingQuant)
	document.getElementById('dingDash').innerHTML = inc1

	var inc2 = parseInt(document.getElementById('widgetDash').innerHTML)
	inc2 += parseInt(widgetQuant)
	document.getElementById('widgetDash').innerHTML = inc2

	var inc3 = Number(document.getElementById('totalDash').innerHTML)
	inc3 += Number(total)
	document.getElementById('totalDash').innerHTML = inc3.toFixed(2);

	this.createPie();
	// this.barChart;
	store.barChart.push(this.barChart)

	// console.log(barChart)

}	


window.addEventListener('beforeunload', function() {
	let recover = JSON.parse(localStorage.getItem('items'))
	if((recover == null) || (recover.length ==0)){
			localStorage.setItem('items', JSON.stringify(store.orderHistory));
			this.localStorage.setItem('items', JSON.stringify(store.barChart));
			
		}
		else{
			storing = recover.concat(store.orderHistory)
			barStore = recover.concat(store.barChart)
			localStorage.setItem('items', JSON.stringify(storing));
			this.localStorage.setItem('items', JSON.stringify(barStore))
		
		}
})




function createPie(){
	let topDing = document.getElementById('dingDash').innerHTML;
	let topWidg = document.getElementById('widgetDash').innerHTML;
    var pieChart = Highcharts.chart('pieChart', {
        chart: {
			renderTo: null,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Total Sold'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
					format: '<b>{point.name}</b>: {point.y}'
					// format: '<b>{point.y}</b>'
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Dingus',
                y: Number(topDing),
                sliced: true,
				selected: true,
				color: 'aqua',
            }, {
                name: 'Widget',
				y: Number(topWidg),
				color: 'lightgray',
            }]
        }]
    });
};


// var barChart = createBar();


function createBar(){
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0');
	var yyyy = today.getFullYear();
	today = mm + '/' + dd + '/' + yyyy;

	window.barChart = Highcharts.chart('barChart', {
		chart: {
			renderTo: document.getElementById('barChart'),
			type: 'column'
		},
		title: {
			text: 'Sold Per day'
		},
		xAxis: {
			categories: ['01/01/2020', '01/02/2020']
		},
		yAxis: {
			min: 0,
			title: {
				text: 'Total Sold'
			},
			stackLabels: {
				enabled: true,
				style: {
					fontWeight: 'bold',
					color: ( // theme
						Highcharts.defaultOptions.title.style &&
						Highcharts.defaultOptions.title.style.color
					) || 'gray'
				}
			}
		},
		legend: {
			align: 'right',
			x: -30,
			verticalAlign: 'top',
			y: 25,
			floating: true,
			backgroundColor:
				Highcharts.defaultOptions.legend.backgroundColor || 'white',
			borderColor: '#CCC',
			borderWidth: 1,
			shadow: false
		},
		tooltip: {
			headerFormat: '<b>{point.x}</b><br/>',
			pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
		},
		plotOptions: {
			column: {
				stacking: 'normal',
				dataLabels: {
					enabled: true
				}
			}
		},
		series: [{
			name: 'Dingus',
			data: [1,2],
			color: 'aqua'
		}, {
			name: 'Widgets',
			data: [1,2],
			color: 'lightgray'
		}]
	});
	// $('#orderBut').click(function() {
	// 	dingVal = document.getElementById('dingus').value;
	// 	widgeVal = document.getElementById('widget').value;
	// 	barChart.series[0].addPoint(Number(dingVal))
	// 	barChart.series[1].addPoint(Number(widgeVal))

	// 	arr = barChart.xAxis[0].categories
	// 	arr.push(today)
	// 	barChart.xAxis[0].setCategories(arr)
		
	// 	return barChart
	// })
	// return barChart
}

// var barChart = this.createBar();
// console.log(window.barChart)
function clicky(){
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0');
	var yyyy = today.getFullYear();
	today = mm + '/' + dd + '/' + yyyy;

	dingVal = document.getElementById('dingus').value;
	widgeVal = document.getElementById('widget').value;
	barChart.series[0].addPoint(Number(dingVal))
	console.log(barChart.series[0].yData)
	barChart.series[1].addPoint(Number(widgeVal))
	console.log(barChart.series[1].yData)

	arr = barChart.xAxis[0].categories
	arr.push(today)
	window.barChart.xAxis[0].setCategories(arr)


	
	// return window.barChart
}
