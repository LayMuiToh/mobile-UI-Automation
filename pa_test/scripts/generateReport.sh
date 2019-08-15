#!/bin/sh
echo "Shutting existing web server"
cd $PWD
TDIR=`echo $PWD | sed "s/\/scripts//"`
PID=`pgrep -f allure-command`
while pgrep -f allure-command >/dev/null; do
   kill -9 $PID; 
done
if [ -d $TDIR/allure-results ]; then
   allure generate allure-results --clean && allure open
fi

