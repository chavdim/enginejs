#!/bin/sh


moveTemplate()
{
    cp -R ./templates/js/platformer ./temp
    cp -R ./src/internal ./temp/js
    cp -R ./libs ./temp
}

case $1 in
    new )
        echo creating from template...
        moveTemplate
         ;;
esac
