
# mostly from : 
# https://spin.atomicobject.com/2016/08/26/makefile-c-projects/

TARGET ?= bin/lo_send

CFLAGS += -std=c99 -pipe -finput-charset=UTF-8  -g
CFLAGS += -Wall -Wpedantic -Wextra -Wwrite-strings 
CFLAGS += -Wconversion -Wshadow -Wstrict-prototypes
CFLAGS += -Werror=implicit-function-declaration -Werror=implicit-int
CFLAGS += -Werror=incompatible-pointer-types -Werror=int-conversion

#links on system liblo
CFLAGS += -llo

all: release

release: CFLAGS+=-Os -DNDEBUG
release: $(TARGET)

debug: CFLAGS+=-DDEBUG
debug:  $(TARGET)

$(TARGET): $(OBJS)
	$(CC) $(CFLAGS) src/main.c $(LDFLAGS) -o $@
	
-include $(DEPS)

clean:
	$(RM) $(TARGET) $(OBJS) $(DEPS)
	