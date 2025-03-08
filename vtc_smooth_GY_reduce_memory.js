// Define the subject and file paths

var subid = ["004", "005", "007", "008", "009", "010", "011", "013", "014", "033", "034", "037", "039", "040", "045"];
var series = ["09", "10", "11", "12", "13", "14", "15", "16", "17", "18"];
var run = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
var BasePath = "E:/20240410_WMPFC_7T/V2/";
var VMRFilePath = BasePath + "VMR/VMRtocorrect/";  // set up the VMR folder path 
var VTCFilePath = BasePath + "VTC/";  // set up the VTC folder path

// VTC and VMR filenames example
// VTC: {series '09'}_JK24_7T_{subid '004'}_RUN{run '1'}_SCCTBL_3DMCTS_THPGLMF2c_undist_IDENTITY.vtc
// VMR: 09_JK24_7T_{subid '004'}_RUN1_SCCTBL_3DMCTS_THPGLMF2c_undist_VTC-Host.vmr

// Start for loop for each subject (loop for 'subid')
for (let sub = 0; sub < subid.length; sub++) {
    // Construct the VMR file path
    var VMRfile = VMRFilePath + "09_JK24_7T_" + subid[sub] + "_RUN1_SCCTBL_3DMCTS_THPGLMF2c_undist_VTC-Host.vmr";

    for (let snum = 0; snum < series.length; snum++) {
        for (let rnum = 0; rnum < run.length; rnum++) {
            // Construct the VTC file path
            var VTCfile = VTCFilePath + series[snum] + '_JK24_7T_' + subid[sub] + '_RUN' + run[rnum] + '_SCCTBL_3DMCTS_THPGLMF2c_undist_IDENTITY.vtc';

            try {
                // Open the VMR file
                var docVMR = BrainVoyager.OpenDocument(VMRfile);

                if (!docVMR) {
                    BrainVoyager.PrintToLog("Error: Could not open VMR file: " + VMRfile);
                } else {
                    BrainVoyager.PrintToLog("Successfully opened VMR file: " + VMRfile);

                    // Link the VTC file to the opened VMR
                    var linked = docVMR.LinkVTC(VTCfile);
                    if (!linked) {
                        BrainVoyager.PrintToLog("Error: Could not link VTC file: " + VTCfile + " to VMR.");
                    } else {
                        BrainVoyager.PrintToLog("Successfully linked VTC file: " + VTCfile + " to VMR.");

                        // Perform further processing, e.g., spatial Gaussian smoothing
                        docVMR.SpatialGaussianSmoothing(2, "mm");
                        BrainVoyager.PrintToLog("Applied spatial Gaussian smoothing (2 mm FWHM)");

                    }

                    // Close the VMR document after processing
                    docVMR.Close(); // Close the VMR document
                    BrainVoyager.PrintToLog("Closed VMR file: " + VMRfile);

                    // Optionally, you can close the VTC document if needed (though typically, closing the VMR document should also close the linked VTC):
                    BrainVoyager.CloseDocument(VTCfile);  // If needed, uncomment this line
                    BrainVoyager.PrintToLog("Closed VTC file: " + VTCfile);
                }
            } catch (error) {
                // In case of an error, log the error and ensure any opened documents are closed
                BrainVoyager.PrintToLog("An error occurred: " + error.message);
                if (docVMR) {
                    docVMR.Close();
                    BrainVoyager.PrintToLog("Closed VMR file after error: " + VMRfile);
                }
            }
        }
    }
}
