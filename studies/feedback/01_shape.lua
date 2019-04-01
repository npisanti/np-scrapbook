
----------------------------------------------------
function setup()
    
end

----------------------------------------------------
function draw()
    lvg.clear()
    
    lvg.center()
    
    lvg.begin()
        lvg.circle( lfo.noise(0.3)-0.5, 0.0, 0.1 )
    lvg.close()
end

----------------------------------------------------
function exit()

end


