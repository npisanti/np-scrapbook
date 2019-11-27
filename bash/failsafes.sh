#/bin/sh

# will restart when crash
(
    ret=1
    while [ $ret -ne 0 ]; do
        folderkit -p /home/nicola/resources/testsamp/
        ret=$?
    done
) &

# will reboot the system on crash (only rpi)
(
    pixelscript /home/nicola/np-scrapbook/sketches/smoke_mantra/
    ret=$?
    if [ $ret -ne 0 ]; then
        sudo reboot
    fi
) &

exit
