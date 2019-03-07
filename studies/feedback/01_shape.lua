
----------------------------------------------------
function setup()
    
end

----------------------------------------------------
function draw()
    mg.clear()
    
    mg.center()
    
    mg.begin()
        mg.circle( mg.noise(time, 0.0)-0.5, 0.0, 0.1 )
    mg.close()
end

----------------------------------------------------
function exit()

end


