#!/bin/sh

TDIR=`echo $PWD | sed "s/\/scripts//"`
echo "Shutting down any VAServer"
VAServer="VoiceAutomationServer"
PID=`pgrep -f $VAServer`
while pgrep -f $VAServer >/dev/null; do
   kill -9 $PID;
done

echo "Starting VA Server..."
java -jar VoiceAutomationServer-1.0.1.jar >& $TDIR/va.log &
