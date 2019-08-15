import voiceinputSpec from './app.tc.voiceinput.spec';

const XLSX = require('xlsx')
const workbook = XLSX.readFile('./test/testdata/TestData.xlsx');
const xlQns1 = XLSX.utils.sheet_to_json(workbook.Sheets['noattr']);

module.exports = (server) => {
 
    // Sheetname: noattr, index: 24
    let q = 24; 
    if (xlQns1[q].has_data == 'yes' && xlQns1[q].in_scope == 'yes') 
    {
        voiceinputSpec(xlQns1[q].question, 
                        xlQns1[q].image_name + server, 
                        xlQns1[q].image_name, 
                        xlQns1[q].duration, 
                        xlQns1[q].start_delay, 
                        xlQns1[q].end_delay, 'john deere', 0, 'yes')
    } else 
        closemsgSpec(text)
}
