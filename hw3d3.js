// Constants
const DINGUS_PRICE = 14.25;
const WIDGET_PRICE = 9.99;
const ZERO_FORMAT = '0.00';
const DEBUG = true; // Where might this flag be used? (It's not mandatory)

// Global store (What else would you need here?)
let store = {
//   orderHistory:[[1, "01/01/2020", "1", "1", "24.24"],[2, '01/02/2020', '2', '2', '48.48']],
  orderHistory:[],
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

// window.addEventListener('DOMContentLoaded', function() {
// 	let dataEntried = generateEntries();
// 	console.log(dataEntried);
// })

// localStorage.clear()


window.onload = function() {
	window.old
    let saved = JSON.parse(localStorage.getItem('items'))
    // console.log(saved)
	var cols = this.generateEntries()[0].length;

	if(saved == null){
		old = this.generateEntries()}
	else{
        old = generateEntries().concat(saved)
        console.log(old)
	}
	
	var tbody = document.getElementById('newData');

	for(i = 0; i < old.length; i++){
		
		increment++;
		row = tbody.insertRow();
		inc1 = document.getElementById('dingDash');
		// console.log(inc1)
		topDing = document.getElementById('dingDash').innerHTML;
		// console.log(topDing)
		inc2 = document.getElementById('widgetDash');
		topWidg = document.getElementById('widgetDash').innerHTML;
		// console.log(topWidg)

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
    this.createPie();
    this.PopulateBars();
}




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
    // window.data = window.data.append(lst)
    // console.log(data)
    data = data.push(lst)

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

    document.getElementById("my_dataviz").innerHTML = "";
    this.createPie();
    // location.reload()
    this.PopulateBars();
    // console.log(store.orderHistory)
}	


window.addEventListener('beforeunload', function() {
	let recover = JSON.parse(localStorage.getItem('items'))
	if((recover == null) || (recover.length ==0)){
			localStorage.setItem('items', JSON.stringify(store.orderHistory));
		}
		else{
			storing = recover.concat(store.orderHistory)
            localStorage.setItem('items', JSON.stringify(storing));
            // console.log(this.localStorage)

		}
})

function createPie() {
    let topDing = document.getElementById('dingDash').innerHTML;
	let topWidg = document.getElementById('widgetDash').innerHTML;
        // set the dimensions and margins of the graph
    var width = 450
    height = 450
    margin = 40

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin

    // append the svg object to the div called 'my_dataviz'
    var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", "80%")
    .attr("height", "80%")
    .attr('viewBox','0 0 '+Math.min(width,height)+' '+Math.min(width,height))
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Create dummy data
    var data = {Dingus: Number(topDing), Widget: Number(topWidg)}

    // set the color scale
    var color = d3.scaleOrdinal()
    .domain(data)
    .range(d3.schemeCategory10);

    // Compute the position of each group on the pie:
    var pie = d3.pie()
    .value(function(d) {return d.value; })
    var data_ready = pie(d3.entries(data))
    // Now I know that group A goes from 0 degrees to x degrees and so on.

    // shape helper to build arcs:
    var arcGenerator = d3.arc()
    .innerRadius(0)
    .outerRadius(radius)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
    .selectAll('mySlices')
    .data(data_ready)
    .enter()
    .append('path')
    .attr('d', arcGenerator)
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)

    // Now add the annotation. Use the centroid method to get the best coordinates
    svg
    .selectAll('mySlices')
    .data(data_ready)
    .enter()
    .append('text')
    .text(function(d){ return d.data.key + ' ' + d.data.value})
    .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
    .style("text-anchor", "middle")
    .style("font-size", 17)
}


function PopulateBars() {
    var width = 600;
    var height = 600;

    var svg1 = d3.select("#bar-chart");
    // console.log(svg1)
    var svg = document.getElementById("bar-chart")
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }
    // console.log(svg)
    var x = d3.scaleBand().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // data = store.orderHistory
    window.data = old
    console.log(data)
    // var data = [[1, "01/01/2020", "1", "1", "24.24"],[2, '01/02/2020', '2', '2', '48.48']]
    // data = data.concat(JSON.parse(localStorage.getItem('items')))
  
    x.domain(data.map(function(d) {
        return String(d[1]).slice(0, -5) + " #" + String(d[0])
    }));
    y.domain([0, d3.max(data, function(d) {
        return d[3] + d[2]
    })]);

    
    svg1.selectAll("a")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar-rect")
        .attr("rx", 3)
        .attr("x", function(d) {
            return x(String(d[1]).slice(0, -5) + " #" + String(d[0]))
        })
        .attr("y", function(d) {
            return y(d[2]) - (height - y(d[3]))
        })
        .attr("width", x.bandwidth() - 15)
        .attr("fill", "#f6b6b0")
        .attr("height", function(d) {
            return height - y(d[2])
        })
    
    svg1.selectAll("a")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar-rect")
        .attr("rx", 3)
        .attr("x", function(d) {
            return x(String(d[1]).slice(0, -5) + " #" + String(d[0]))
        })
        .attr("y", function(d) {
            return y(d[3])
        })
        .attr("width", x.bandwidth() - 15)
        .attr("fill", "#e94b3c")
        .attr("height", function(d) {
            return height - y(d[3])
        })

    svg1.selectAll("a")
        .data(data)
        .enter()
        .append("text")
        .attr("x", function(d) {
            return 7 + x(String(d[1]).slice(0, -5) + " #" + String(d[0]))
        })
        .attr("y", function(d) {
            return y(d[3]) - 5
        })
        .attr("fill", "#e94b3c")
        .attr("font-size", "20px")

        // add the x Axis
    svg1.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    

    // add the y Axis
    svg1.append("g")
        .call(d3.axisLeft(y));
    
    var colors = ["#e94b3c","#f6b6b0"];

    var legend = svg1.selectAll(".legend")
    .data(colors)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });
    
    legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", function(d, i) {return colors.slice().reverse()[i];});
    
    legend.append("text")
    .attr("x", width + 5)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .text(function(d, i) { 
        switch (i) {
        case 0: return "Dingus";
        case 1: return "Widgets";

        }
    });

    svg1.selectAll("a")
        .data(data)
        .enter()
        .append("text")
        .attr("x", function(d) {
            return 7 + x(String(d[1]).slice(0, -5) + " #" + String(d[0]))
        })
        .attr("y", function(d) {
            return y(d[3]) - 5
        })
        .attr("fill", "black")
        .attr("font-size", "15px")
        .text(function(d) {
            return  d[2] + " Dingus"
        })
    // add text for widget
    svg1.selectAll("a")
        .data(data)
        .enter()
        .append("text")
        .attr("x", function(d) {
            return x(String(d[1]).slice(0, -5) + " #" + String(d[0]))
        })
        .attr("y", function(d) {
            return y(d[3]) + 20
        })
        .attr("fill", "black")
        .attr("font-size", "15px")
        .text(function(d) {
            return d[3] + " Widget"
        })

    svg1.append("text")
        .attr("x", 500)
        .attr("y", 650)
        .style("text-anchor", "middle")
        .text("Date and Order Number");

    // y axis label
    svg1.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -60)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Number of Dingus or Widget");
}