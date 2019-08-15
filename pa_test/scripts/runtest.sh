#!/bin/sh

#Check appium is installed by running appium --version 
#Execute the appium server 
#start appium  
#appium &              

#Execute the Voice Server 
#java -jar VoiceAutomationServer-1.0.1.jar

#Open another terminal to start the packager server for the react-native app (for running on iOS Simulator) \
#Go to the app repository folder example: 
#cd ~/Desktop/p/src 
#npm start

#Open another terminal and monitor the appium.log at the repository folder \
#tail -f appium.log
export PLATFORMVERSION=10.3.1
export UDID=03AE5EA1-DB79-40F2-A365-677B710B5837
export APPIUMVERSION=1.12.1
export BUNDLEID=x.p-dev
export APPPATH=/Users/tohlm/Library/Developer/Xcode/DerivedData/p-exzmnafxweexfvdwtpbkbseqplub/Build/Products/Release-iphonesimulator/p.app
export DEVICENAME='iPhone Simulator'
WDIO=wdio.conf.js
SIMPLE_SPEC=app.ts.launch.spec.js
arg=$1
if [[ $# -ne 1 ]]; then
    APPDIR="/Users/tohlm/Desktop/p/src"
    export APPDIR
    echo "Starting Servers..."
    echo "$PWD"
    cd $PWD
    TDIR=`echo $PWD | sed "s/\/scripts//"`
    ./startAppium.sh
    sleep 5s
    ./startVAServer.sh
    sleep 5s
    echo "Start Metro Bundler..."
    echo "App directory at $APPDIR"
    cd $APPDIR
    lsof -i -n -P | grep TCP | grep 8081 && echo Metro Bundler already running || npm start &

    cd $TDIR
    echo "Cleaning up..."
    ./scripts/cleanup.sh i
    rm -fr allure*
    while read t
    do
        #defaults write com.apple.iphonesimulator ConnectHardwareKeyboard -bool no
        node_modules/.bin/wdio config/$WDIO --spec ./test/spec/testscenarios/$t
    done < ./scripts/testspec.lst

    echo "Generating report"
    ./scripts/generateReport.sh
else
    TDIR=`echo $PWD | sed "s/\/scripts//"`
    cd $TDIR
    echo "Running test spec $SIMPLE_SPEC"
    node_modules/.bin/wdio config/$WDIO --spec ./test/spec/testscenarios/$SIMPLE_SPEC
fi
