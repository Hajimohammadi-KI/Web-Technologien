// Define margins and dimensions for both charts
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const width = 650 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// =================== PIE CHART ===================

// Fetch temperature data from server and create pie chart
d3.json("http://localhost:3000/wetterdaten/temperatur").then((data) => {
    const temps = data.hourly.temperature_2m;  // Get hourly temperatures
    const threshold = 20;                      // Set temperature threshold in °C

    // Calculate hours over and under the threshold
    const over = temps.filter(t => t >= threshold).length;
    const under = temps.length - over;

    // Prepare data for pie chart
    const pieData = [
        { label: `Time over ${threshold}°C`, value: over },
        { label: `Time under ${threshold}°C`, value: under }
    ];

    // Set radius of the pie
    const radius = Math.min(width, height) / 2;

    // Create the SVG container
    const pieSvg = d3.select("#piechart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)        // Responsive viewBox
        .attr("preserveAspectRatio", "xMidYMid meet")    // Keep aspect ratio on resize
        .classed("w-100", true)                          // Use full width
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`); // Center pie

    // Create pie generator
    const pie = d3.pie().value(d => d.value);

    // Create arc generator
    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    // Set color scale
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Bind data and draw slices
    pieSvg.selectAll("path")
        .data(pie(pieData))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => color(i))
        .attr("stroke", "#333")
        .style("stroke-width", "2px")
        .style("opacity", 0.8)
        .on("mouseover", function() {
            d3.select(this).style("opacity", 1).style("stroke-width", "3px");
        })
        .on("mouseout", function() {
            d3.select(this).style("opacity", 0.8).style("stroke-width", "2px");
        });

    // Add labels to the slices
    pieSvg.selectAll("text")
        .data(pie(pieData))
        .enter()
        .append("text")
        .text(d => d.data.label)
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .style("text-anchor", "middle")
        .style("font-size", "12px");
});

// =================== LINE CHART ===================

// Fetch cloud cover data from server and create line chart
d3.json("http://localhost:3000/wetterdaten/wolkenbedeckung").then((data) => {
    // Map time and cloud cover to usable objects
    const lineData = data.hourly.time.map((t, i) => ({
        x: new Date(t),
        y: data.hourly.cloud_cover[i]
    }));

    // Create SVG container
    const lineSvg = d3.select("#linechart")
        .append("svg")
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .classed("w-100", true)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // X scale (time)
    const x = d3.scaleTime()
        .domain(d3.extent(lineData, d => d.x))
        .range([0, width]);

    // Y scale (0-100%)
    const y = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);

    // Add X axis
    lineSvg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).ticks(5));

    // Add Y axis
    lineSvg.append("g")
        .call(d3.axisLeft(y));

    // Create line generator
    const line = d3.line()
        .x(d => x(d.x))
        .y(d => y(d.y));

    // Draw the line
    lineSvg.append("path")
        .datum(lineData)
        .attr("fill", "none")
        .attr("stroke", "#007bff")  // Bootstrap blue
        .attr("stroke-width", 3)
        .attr("d", line);

    // Optionally, add points to the line
    lineSvg.selectAll("circle")
        .data(lineData)
        .enter()
        .append("circle")
        .attr("cx", d => x(d.x))
        .attr("cy", d => y(d.y))
        .attr("r", 2)
        .attr("fill", "#007bff");
});
