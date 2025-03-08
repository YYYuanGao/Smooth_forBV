// Define the subject and file paths

//var subid = ["004","005","007","008","009","010","011","013","014","033","034","037","039","040","045"];
var subid = ["004"]
var series = ["12", "15", "18","21","24","27","30","33","36","39"];
var run = ["1","2","3","4","5","6","7","8","9","10"];
var BasePath = "E:/20240410_WMPFC_7T/V2/";
var VMRFilePath = BasePath + "VMR/";  // set up the VMR folder path 
var VTCFilePath = BasePath + "VTC/";  // set up the vtc folder path


//vtc name example: {series '09'}_JK24_7T_{subid '004'}_RUN{run '1'}_SCCTBL_3DMCTS_THPGLMF2c_undist_IDENTITY.vtc
// vmr name example:   09_JK24_7T_{subid '004'}_RUN1_SCCTBL_3DMCTS_THPGLMF2c_undist_VTC-Host.vmr
// File names

//start for loop from single subject (loop for 'subid'

for (let sub = 0; sub < subid.length; sub++) {
    // Construct the VMR file path
    var VMRfile = VMRFilePath + "12_JK24_7T_" + subid[sub] + "_RUN1_SCCTBL_3DMCTS_THPGLMF2c_undist_VTC-Host.vmr";

    for (let snum = 0; snum < series.length; snum++) {
        for (let rnum = 0; rnum < run.length; rnum++) {
            // Construct the VTC file path
            var VTCfile = VTCFilePath + series[snum] + '_JK24_7T_' + subid[sub] + '_RUN' + run[rnum] + '_SCCTBL_3DMCTS_THPGLMF2c_undist_IDENTITY.vtc';

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
                    docVMR.SpatialGaussianSmoothing(3, "mm");
                    BrainVoyager.PrintToLog("Applied spatial Gaussian smoothing (3 mm FWHM)");
                }
            }
        }
    }
}

