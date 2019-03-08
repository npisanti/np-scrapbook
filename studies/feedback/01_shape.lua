
----------------------------------------------------
function setup()
    
end

----------------------------------------------------
function draw()
    mg.clear()
    
    mg.center()
    
    mg.begin()
        mg.circle( lfo.noise(0.3)-0.5, 0.0, 0.1 )
    mg.close()
end

----------------------------------------------------
function exit()

end


