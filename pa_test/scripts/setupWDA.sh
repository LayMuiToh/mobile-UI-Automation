#Run the following command whenever appium is installed. Otherwise, you will encounter such error: 
#ERROR: An unknown server-side error occurred while processing the command. Original error: Unable to launch WebDriverAgent because of xcodebuild failure: "xcodebuild failed with code 65".

#Go to where you installed your appium \
# Run the command: instruments -s device to choose the simulator version and get the udid \
# Execute the build command \
# xcodebuild -project WebDriverAgent.xcodeproj -scheme WebDriverAgentRunner -destination 'id=\<udid\>'

# Execute the test command to install the WDA to the target which run the app. \
# xcodebuild -project WebDriverAgent.xcodeproj -scheme WebDriverAgentRunner -destination 'id=\<udid\>' test

cd ~/.nvm/versions/node/v10.15.1/lib/node_modules/appium/node_modules/appium-xcuitest-driver/WebDriverAgent
mkdir -p Resources/WebDriverAgent.bundle 
/bin/bash Scripts/bootstrap.sh -d
# iphone 6 10.3.1
xcodebuild -project WebDriverAgent.xcodeproj -scheme WebDriverAgentRunner -destination 'id=03AE5EA1-DB79-40F2-A365-677B710B5837' 
xcodebuild -project WebDriverAgent.xcodeproj -scheme WebDriverAgentRunner -destination 'id=03AE5EA1-DB79-40F2-A365-677B710B5837' test

# iphone 6 12.2
#xcodebuild -project WebDriverAgent.xcodeproj -scheme WebDriverAgentRunner -destination 'id=B821DB95-AC86-4BC2-A934-2922F5F44CF2' 
#xcodebuild -project WebDriverAgent.xcodeproj -scheme WebDriverAgentRunner -destination 'id=B821DB95-AC86-4BC2-A934-2922F5F44CF2' test
