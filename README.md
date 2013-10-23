Receipter
=========

##What is?
Receipter is an example Phonegap/Cordova app used to demo app development using
HTML/CSS/JS for STHLM.JS.

The talk is here: http://bambuser.com/v/4032987#t=5700s

And the slides are here: https://www.dropbox.com/s/it1xu2sw70eoom7/STHLM.JS.pdf

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

4. Install Cordova plugins

        cordova plugin add org.apache.cordova.dialogs org.apache.cordova.splashscreen org.apache.cordova.camera

5. Add build platform (in this example ios)

        cordova platform add ios

6. Run the build

        grunt

7. Open platforms/ios/Receipter.xcodeproj in Xcode
