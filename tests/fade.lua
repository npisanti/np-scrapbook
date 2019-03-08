
----------------------------------------------------
function setup()
    
end

----------------------------------------------------
function draw()
    mg.fade( 0.5 )
    
    mg.center()
    
    mg.begin()
        mg.circle( lfo.noise(0.9)-0.5, 0.0, 0.1 )
    mg.close()
end

----------------------------------------------------
function exit()

end


