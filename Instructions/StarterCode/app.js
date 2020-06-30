function init()
{
    d3.json("samples.json").then(function(importedData) {
        // var data = importedData;
        // console.log(importedData);

         var names = importedData.names;
         console.log(names);
         
        //dropdown menu
         var dropdown = d3.select("#selDataset");
         console.log(names);
         names.forEach(Sub => dropdown.append("option").text(Sub));  

         var dropdown_menu = names[0];
                getPlots(names)
            //    getMetadata(names);
    });            
};


function getPlots(id) 
{
        //building the bar chart
        // Create the bar chart values and pull the data 
         d3.json("samples.json").then(function(bar) {
            //function buildCharts(dropVal) {


         var bar_data = bar.samples;
         console.log(bar_data);

        // filter
        var filter = bar_data.filter(samples => samples.id == id)[0];


         //variables for bar chart
         var otu_ids = filter.otu_ids;
         var otu_labels = filter.otu_labels;
         var otu_sample_values = filter.sample_values;


         // only plot for top ten otu_id
          var bar_chart = [{
             x: otu_ids.slice(0,10),
             y: otu_sample_values.slice(0,10),
             text: otu_labels.slice(0,10),
             type: "bar",
             orientation: "h"
          }];
        
         // Create the data array for the plot
         var data = [bar_chart];
        
         // the plot layout
         var layout = {
            title: "Top Ten",
            xaxis: { title: "OTU Values" },
            yaxis: { title: "OTU IDS" }
         };
        
         // Plot the chart to a div tag with id "bar-plot"
         Plotly.newPlot("bar-plot", data, layout);

    
         // Create bubble chart using above data from bar chart
         var bubble_chart = {
             x: otu_ids,
             y: otu_sample_values,
             mode: "markers",
             marker: {
                 size: otu_sample_values,
                 color: otu_ids
             },
             text:  otu_labels
         };

         // layout for the bubble plot
         var layout_2 = {
             xaxis:{title: "OTU ID"},
             height: 300,
             width: 3500
         };

         // creating data variable for bubble chart 
         var data2 = [bubble_chart];
     // create the bubble plot
     Plotly.newPlot("bubble", data2, layout_2); 
             });    
        };



// create the function to get the demographic data
function getDemoInfo(id) 
{
    d3.json("samples.json").then((demodata)=> {

        // get the metadata info for the demographic table box
        var metadata = demodata.metadata;
        console.log(metadata)
    
        // filter
        var filter = metadata.filter(meta => meta.id.toString() === id)[0];
          
        // select demographic table
        var demographic_info = d3.select("#sample-metadata");
            
        // empty the table before getting new info
        demographic_info.html("");
    
        // get id and append the info to the table
        Object.entries(result).forEach((key) => {   
        demographic_info.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
};
    // create the function for the change event
    function optionChanged(id) {
        getPlots(id);
        getDemoInfo(id);
    };
    




init();