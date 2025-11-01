// Set margins and dimensions for both charts
const margin = { top: 20, right: 20, bottom: 30, left: 40 };  // Margins around the charts
const width = 400 - margin.left - margin.right;              // Width of chart area
const height = 300 - margin.top - margin.bottom;             // Height of chart area

// ================= PIE CHART =================

// Fetch temperature data and build pie chart
d3.json("http://localhost:3000/wetterdaten/temperatur")
  .then((data) => {
    // Check if the data structure is valid
    if (!data || !data.hourly || !data.hourly.temperature_2m) {
      throw new Error("Invalid data format received");
    }

    // Get the temperature values
    const temps = data.hourly.temperature_2m;
    const threshold = 20; // Temperature threshold

    // Count how many hours are over and under the threshold
    const over = temps.filter(t => t >= threshold).length;
    const under = temps.length - over;

    // Prepare the data array for the pie chart
    const pieData = [
      { label: `Time over ${threshold}°C`, value: over },
      { label: `Time under ${threshold}°C`, value: under }
    ];

    // Set radius for the pie chart
    const radius = Math.min(width, height) / 2;

    // Create SVG container
    const svg = d3.select("#piechart")
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`) // Make SVG responsive
      .attr("preserveAspectRatio", "xMidYMid meet")
      .classed("w-100", true) // Full width inside container
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`); // Center the pie

    // Create pie and arc generators
    const pie = d3.pie().value(d => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);
    const color = d3.scaleOrdinal(d3.schemeCategory10); // Color scale

    // Draw pie slices
    svg.selectAll("path")
      .data(pie(pieData))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => color(i))
      .attr("stroke", "#333")
      .style("stroke-width", "2px")
      .style("opacity", 0.8)
      .on("mouseover", function () {
        d3.select(this).style("opacity", 1).style("stroke-width", "3px");
      })
      .on("mouseout", function () {
        d3.select(this).style("opacity", 0.8).style("stroke-width", "2px");
      });

    // Add labels to pie slices
    svg.selectAll("text")
      .data(pie(pieData))
      .enter()
      .append("text")
      .text(d => d.data.label)
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .style("text-anchor", "middle")
      .style("font-size", "12px");

  })
  .catch(err => {
    // If fetch or processing fails, log the error
    console.error("Failed to load or process temperature data:", err);
  });

// ================= LINE CHART =================

// Fetch cloud cover data and build line chart
d3.json("http://localhost:3000/wetterdaten/wolkenbedeckung")
  .then((data) => {
    // Check if the data structure is valid
    if (!data || !data.hourly || !data.hourly.time || !data.hourly.cloud_cover) {
      throw new Error("Invalid data format received");
    }

    // Map the time and cloud cover into objects for the chart
    const lineData = data.hourly.time.map((t, i) => ({
      x: new Date(t),
      y: data.hourly.cloud_cover[i]
    }));

    // Create SVG container
    const svg = d3.select("#linechart")
      .append("svg")
      .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .classed("w-100", true)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`); // Add margins inside SVG

    // Set X and Y scales
    const x = d3.scaleTime()
      .domain(d3.extent(lineData, d => d.x))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

    // Draw X axis
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5));

    // Draw Y axis
    svg.append("g")
      .call(d3.axisLeft(y));

    // Create the line generator
    const line = d3.line()
      .x(d => x(d.x))
      .y(d => y(d.y));

    // Draw the line
    svg.append("path")
      .datum(lineData)
      .attr("fill", "none")
      .attr("stroke", "#007bff")
      .attr("stroke-width", 3)
      .attr("d", line);

    // Optionally, draw small circles at data points
    svg.selectAll("circle")
      .data(lineData)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.x))
      .attr("cy", d => y(d.y))
      .attr("r", 2)
      .attr("fill", "#007bff");

  })
  .catch(err => {
    // If fetch or processing fails, log the error
    console.error("Failed to load or process cloud cover data:", err);
  });
