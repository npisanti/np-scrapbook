#/bin/sh

for d in path/to/folders/*/ ; do
    dirname=$(echo $d | cut -d '/' -f3)
	echo "$dirname"
done

exit



