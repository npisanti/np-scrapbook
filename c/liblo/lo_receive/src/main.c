
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <lo/lo.h>
#include<signal.h>

int lo_server_run = 1;

void sig_handler(int signo);

void osc_error(int num, const char *m, const char *path);

int generic_handler(const char *path, const char *types, lo_arg ** argv,
                    int argc, void *data, void *user_data);

int test_handler(const char *path, const char *types, lo_arg ** argv,
                    int argc, void *data, void *user_data);

int main( void )
{
	if (signal(SIGINT, sig_handler) == SIG_ERR){
		printf("error on assigning signal handler\n");
		return 1;
	}
	  
    lo_server_thread receiver = lo_server_thread_new("4444", osc_error);

    lo_server_thread_add_method(receiver, 
    	NULL, NULL, generic_handler, NULL);

    lo_server_thread_add_method(receiver, 
    	"/test", "ff", test_handler, NULL);

  	lo_server_thread_start(receiver);	
	
	printf("started, CTRL+C to stop...\n");

    while ( lo_server_run ) {
        sleep(1);
    }

	lo_server_thread_free(receiver);
	
	return 0;	
}

void osc_error(int num, const char *msg, const char *path)
{
    printf("liblo server error %d in path %s: %s\n", num, path, msg);
    fflush(stdout);
}

int generic_handler(const char *path, const char *types, lo_arg ** argv,
                    int argc, void *data, void *user_data)
{
    int i;

    printf("path: <%s>\n", path);
    for (i = 0; i < argc; i++) {
        printf("arg %d '%c' ", i, types[i]);
        lo_arg_pp((lo_type)types[i], argv[i]);
        printf("\n");
    }
    printf("\n");
    fflush(stdout);

    return 1;
}

int test_handler(const char *path, const char *types, lo_arg ** argv,
                int argc, void *data, void *user_data)
{
    printf("received /test, args: %f %f \n", argv[0]->f, argv[1]->f);
    fflush(stdout);
    return 0;
}

void sig_handler(int signo)
{
  if (signo == SIGINT){
		printf("\nreceived SIGINT, quitting...\n");
		lo_server_run = 0;
  }
}
