Receipter
=========

##What is?
Receipter is an example Phonegap/Cordova app used to demo app development using
HTML/CSS/JS for STHLM.JS.

The idea for the app is to simplify handling of receipts by taking pictures of them with
your phone and uploading them.

###Dependencies

1. Node.js / npm

    http://nodejs.org/

2. Grunt

        npm install -g grunt-cli

3. XCode >= 5.0 (for ios development)


##Setup project

1. Install Cordova

        npm install -g cordova

2. Clone the repo

        git clone git@github.com:Iteam1337/receipter.git && cd receipter

3. Install dependencies

        npm install

4. Add build platform (in this example ios)

        cordova platform add ios

5. Install Cordova plugins

        cordova plugin add org.apache.cordova.dialogs org.apache.cordova.splashscreen org.apache.cordova.camera

6. Run the build

        grunt

7. Open platforms/ios/Receipter.xcodeproj in Xcode
