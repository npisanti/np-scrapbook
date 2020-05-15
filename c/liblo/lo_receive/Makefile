
# mostly from : 
# https://spin.atomicobject.com/2016/08/26/makefile-c-projects/

TARGET ?= bin/$(shell basename $(CURDIR))
SRC_DIRS ?= ./src
DESTDIR?=/usr/local/bin

CFLAGS += -std=c99 -pipe -finput-charset=UTF-8  -g
CFLAGS += -Wall -Wpedantic -Wextra -Wwrite-strings 
CFLAGS += -Wconversion -Wshadow -Wstrict-prototypes
CFLAGS += -Werror=implicit-function-declaration -Werror=implicit-int
CFLAGS += -Werror=incompatible-pointer-types -Werror=int-conversion

# links for system libraries, for example liblo
CFLAGS += -llo

SRCS := $(shell find $(SRC_DIRS) -name *.cpp -or -name *.c -or -name *.s)
OBJS := $(addsuffix .o,$(basename $(SRCS)))
DEPS := $(OBJS:.o=.d)

INC_DIRS := $(shell find $(SRC_DIRS) -type d)
INC_FLAGS := $(addprefix -I,$(INC_DIRS))

CFLAGS += $(INC_FLAGS) -MMD -MP

all: release

release: CFLAGS+=-Os -DNDEBUG
release: $(TARGET)

debug: CFLAGS+=-DDEBUG
debug:  $(TARGET)

$(TARGET): $(OBJS)
	$(CC) $(CFLAGS) $(LDFLAGS) $(OBJS) -o $@ $(LOADLIBES) $(LDLIBS)

-include $(DEPS)

install: all
	install -d $(DESTDIR)
	install $(TARGET) $(DESTDIR)

clean:
	$(RM) $(TARGET) $(OBJS) $(DEPS)
	