#
# Arguments
#
OKHTTP_VERSION ?= 4.2.2
OKIO_VERSION ?= 2.0.0
KOTLIN_STDLIB_VERSION ?= 1.3.50

#
# Directories
#
SRC_DIR ?= $(CURDIR)/src
OUT_DIR ?= $(CURDIR)/out
LIB_DIR ?= $(CURDIR)/libs

#
# Tools
#
JAVAC  ?= javac
JFLAGS ?= -g -d $(OUT_DIR) -cp $(OUT_DIR):"$(LIB_DIR)/*" -sourcepath $(SRC_DIR) 
DOCKER ?= docker

#
# Targets
#
.PHONY: all
all: libs $(OUT_DIR) ## Compile the Java client
	$(JAVAC) $(JFLAGS) $(SRC_DIR)/Client.java

$(OUT_DIR): ## Create the out/ directory
	mkdir -p $(OUT_DIR)

.PHONY: libs
libs: ## Retrieve required libraries
	wget -nc -P $(LIB_DIR) https://repo1.maven.org/maven2/com/squareup/okhttp3/okhttp/$(OKHTTP_VERSION)/okhttp-$(OKHTTP_VERSION).jar
	wget -nc -P $(LIB_DIR) https://repo1.maven.org/maven2/com/squareup/okio/okio/$(OKIO_VERSION)/okio-$(OKIO_VERSION).jar
	wget -nc -P $(LIB_DIR) https://repo1.maven.org/maven2/org/jetbrains/kotlin/kotlin-stdlib/$(KOTLIN_STDLIB_VERSION)/kotlin-stdlib-$(KOTLIN_STDLIB_VERSION).jar
	wget -nc -P $(LIB_DIR) https://repo1.maven.org/maven2/org/jetbrains/kotlin/kotlin-stdlib-common/$(KOTLIN_STDLIB_VERSION)/kotlin-stdlib-common-$(KOTLIN_STDLIB_VERSION).jar

.PHONY: clean
clean: ## Remove the out/ directory and all the .class files
	$(RM) -Rfv $(OUT_DIR)
