// Set margins and dimensions for both charts
const margin = { top: 20, right: 20, bottom: 30, left: 40 }; // Margins around the chart
const width = 400 - margin.left - margin.right;             // Chart width without margins
const height = 300 - margin.top - margin.bottom;            // Chart height without margins

// ================= PIE CHART =================

// Fetch temperature data and build pie chart
d3.json("http://localhost:3000/wetterdaten/temperatur")
  .then((data) => {
    // Check if the data format is correct
    if (!data || !data.hourly || !data.hourly.temperature_2m) {
      throw new Error("Invalid data format received"); // Throw error if structure is wrong
    }

    // Get temperature values
    const temps = data.hourly.temperature_2m;
    const threshold = 20; // Threshold for temperature

    // Count hours over and under the threshold
    const over = temps.filter(t => t >= threshold).length;
    const under = temps.length - over;

    // Prepare pie chart data array
    const pieData = [
      { label: `Time over ${threshold}°C`, value: over },
      { label: `Time under ${threshold}°C`, value: under }
    ];

    // Calculate radius for the pie chart
    const radius = Math.min(width, height) / 2;

    // Create the SVG container for pie chart
    const svg = d3.select("#piechart")              // Select piechart div
      .append("svg")                                // Add svg element
      .attr("viewBox", `0 0 ${width} ${height}`)    // Responsive viewBox
      .attr("preserveAspectRatio", "xMidYMid meet")// Keep aspect ratio
      .classed("w-100", true)                       // Bootstrap class for width 100%
      .append("g")                                  // Add group for chart
      .attr("transform", `translate(${width / 2}, ${height / 2})`); // Center the chart

    // Create pie and arc generators
    const pie = d3.pie().value(d => d.value);       // Pie layout based on value
    const arc = d3.arc().innerRadius(0).outerRadius(radius); // Arc for slices
    const color = d3.scaleOrdinal(d3.schemeCategory10);      // Color scale

    // Draw pie slices
    svg.selectAll("path")
      .data(pie(pieData))                           // Bind data
      .enter()
      .append("path")                               // Add path for each slice
      .attr("d", arc)                               // Use arc generator
      .attr("fill", (d, i) => color(i))             // Set slice color
      .attr("stroke", "#333")                       // Border color
      .style("stroke-width", "2px")                 // Border width
      .style("opacity", 0.8)                        // Opacity
      .on("mouseover", function () {                // Highlight on hover
        d3.select(this).style("opacity", 1).style("stroke-width", "3px");
      })
      .on("mouseout", function () {                 // Reset on mouse out
        d3.select(this).style("opacity", 0.8).style("stroke-width", "2px");
      });

    // Add labels to the slices
    svg.selectAll("text")
      .data(pie(pieData))                           // Bind data
      .enter()
      .append("text")                               // Add text element
      .text(d => d.data.label)                      // Set label text
      .attr("transform", d => `translate(${arc.centroid(d)})`) // Position text
      .style("text-anchor", "middle")               // Center text
      .style("font-size", "12px");                  // Font size
  })
  .catch(err => {
    // Log error if fetch or processing fails
    console.error("Failed to load or process temperature data:", err);
  });

// ================= LINE CHART =================

// Fetch cloud cover data and build line chart
d3.json("http://localhost:3000/wetterdaten/wolkenbedeckung")
  .then((data) => {
    // Check if data structure is valid
    if (!data || !data.hourly || !data.hourly.time || !data.hourly.cloud_cover) {
      throw new Error("Invalid data format received");
    }

    // Combine time and cloud cover into objects
    const lineData = data.hourly.time.map((t, i) => ({
      x: new Date(t),                   // Convert time string to Date
      y: data.hourly.cloud_cover[i]     // Get cloud cover value
    }));

    // Create the SVG container for line chart
    const svg = d3.select("#linechart")             // Select linechart div
      .append("svg")
      .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .attr("preserveAspectRatio", "xMidYMid meet")// Keep aspect ratio
      .classed("w-100", true)                       // Make SVG responsive
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`); // Add margins inside SVG

    // Set X scale (time)
    const x = d3.scaleTime()
      .domain(d3.extent(lineData, d => d.x))        // Set domain to min and max time
      .range([0, width]);                           // Output range

    // Set Y scale (0-100%)
    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

    // Draw X axis
    svg.append("g")
      .attr("transform", `translate(0,${height})`)  // Position at bottom
      .call(d3.axisBottom(x).ticks(5));             // Add ticks

    // Draw Y axis
    svg.append("g")
      .call(d3.axisLeft(y));                        // Add Y axis

    // Create line generator
    const line = d3.line()
      .x(d => x(d.x))                               // X coordinate
      .y(d => y(d.y));                              // Y coordinate

    // Draw the line path
    svg.append("path")
      .datum(lineData)                              // Bind data
      .attr("fill", "none")                         // No fill under line
      .attr("stroke", "#007bff")                    // Line color (blue)
      .attr("stroke-width", 3)                      // Line width
      .attr("d", line);                             // Draw line

    // Optionally draw points on the line
    svg.selectAll("circle")
      .data(lineData)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.x))                      // X position
      .attr("cy", d => y(d.y))                      // Y position
      .attr("r", 2)                                 // Point radius
      .attr("fill", "#007bff");                     // Point color
  })
  .catch(err => {
    // Log error if fetch or processing fails
    console.error("Failed to load or process cloud cover data:", err);
  });
