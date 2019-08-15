import loginSpec from '../testcases/app.tc.login.spec';
import logoutSpec from '../testcases/app.tc.logout.spec';
import menuSpec from '../testcases/app.tc.menu.spec';
import mainSpec from '../testcases/app.tc.main.spec';
import sanity1Spec from '../testcases/app.tc.sanity.qn1.spec';

const XLSX = require('xlsx')
const workbook = XLSX.readFile('./test/testdata/TestData.xlsx');
const xlLogin = XLSX.utils.sheet_to_json(workbook.Sheets['login']);

loginSpec(0,xlLogin)
sanity1Spec('_sg');
mainSpec();
menuSpec('settings')
logoutSpec()


