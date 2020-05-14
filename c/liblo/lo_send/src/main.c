
#include <stdio.h>
#include <stdlib.h>
#include <lo/lo.h>

int main( void )
{
	lo_address addr = lo_address_new(NULL, "4444");

	if (lo_send( addr, "/test", "ff", 0.12345678f, 23.0f) == -1 ) {
		printf("OSC error %d: %s\n", lo_address_errno( addr ),
		lo_address_errstr( addr ));
	}
	
	return 0;	
}
