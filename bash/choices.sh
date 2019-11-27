#!/bin/bash
while true; do
    read -p "Do you say yes or no? " yn
    case $yn in
        [Yy]* ) echo "going to next "; break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done

read -p "insert variable? " var
echo "variable is $var" 

exit
